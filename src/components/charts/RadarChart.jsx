import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

/**
 * レーダーチャートコンポーネント
 * @param {Object} props コンポーネントのプロパティ
 * @param {Array} props.data チャートに表示するデータ配列
 * @param {number} [props.width=500] チャートの幅
 * @param {number} [props.height=500] チャートの高さ
 * @returns {JSX.Element} レーダーチャートコンポーネント
 */
const RadarChart = ({ data, width = 500, height = 500 }) => {
  const svgRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeAxis, setActiveAxis] = useState(null);
  
  // ウィンドウサイズの変更を検知
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // スマートフォン向けに最適化されたサイズ計算
  const getOptimizedSize = () => {
    if (windowWidth < 480) {
      return { width: 320, height: 320, fontSize: '8px', hoverFontSize: '10px', labelPadding: 1.25 };
    } else if (windowWidth < 768) {
      return { width: 400, height: 400, fontSize: '9px', hoverFontSize: '11px', labelPadding: 1.2 };
    }
    return { width, height, fontSize: '10px', hoverFontSize: '12px', labelPadding: 1.18 };
  };
  
  // データが変更されたときにチャートを描画
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    const { width: optimizedWidth, height: optimizedHeight, fontSize, hoverFontSize, labelPadding } = getOptimizedSize();
    drawChart(optimizedWidth, optimizedHeight, fontSize, hoverFontSize, labelPadding);
  }, [data, windowWidth]);
  
  /**
   * チャートを描画する関数
   * @param {number} chartWidth チャートの幅
   * @param {number} chartHeight チャートの高さ
   * @param {string} baseFontSize 基本のフォントサイズ
   * @param {string} hoverFontSize ホバー時のフォントサイズ
   * @param {number} labelPadding ラベルと軸の間のパディング係数
   */
  const drawChart = (chartWidth, chartHeight, baseFontSize, hoverFontSize, labelPadding) => {
    // SVGコンテナをクリア
    d3.select(svgRef.current).selectAll("*").remove();
    
    // マージンの設定 (ラベル表示領域を考慮して少し広めに)
    const margin = { top: 60, right: 60, bottom: 60, left: 60 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;
    
    // 中心と半径の計算
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    const radius = Math.min(centerX, centerY) * 0.9; // 少し内側に描画
    
    // SVGの設定
    const svg = d3.select(svgRef.current)
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("viewBox", `0 0 ${chartWidth} ${chartHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left + centerX}, ${margin.top + centerY})`);
    
    // チャートタイトルの追加
    svg.append("text")
      .attr("x", 0)
      .attr("y", -radius - margin.top / 2) // タイトル位置調整
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("銀河ファミリー＆一靈四魂プロファイル");
    
    // 軸の角度を計算
    const angleSlice = (Math.PI * 2) / data.length;
    
    // カテゴリの配色
    const colorScale = d3.scaleOrdinal()
      .domain(["銀河種族", "一靈四魂"])
      .range(["#FF9966", "#6699FF"]);
    
    // データのカテゴリをグループ化
    const categories = Array.from(new Set(data.map(d => d.category)));
    
    // 凡例の追加
    const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${radius * 0.7}, ${-radius * 1.0 - 10})`); // 凡例位置調整
    
    categories.forEach((category, i) => {
      const legendRow = legend.append("g")
        .attr("transform", `translate(0, ${i * 20})`);
      
      legendRow.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", colorScale(category));
      
      legendRow.append("text")
        .attr("x", 20)
        .attr("y", 12)
        .style("font-size", "12px")
        .text(category);
    });
    
    // 目盛りを作成
    const levels = 5; // 目盛りの数
    const gridColor = "#DDDDDD";
    const gridOpacity = 0.5;
    
    // 同心円グリッドを描画
    for (let j = 0; j < levels; j++) {
      const levelFactor = radius * ((j + 1) / levels);
      
      // 同心円
      svg.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", levelFactor)
        .attr("class", "gridCircle")
        .style("fill", "none")
        .style("stroke", gridColor)
        .style("stroke-opacity", gridOpacity)
        .style("stroke-dasharray", j === levels - 1 ? "none" : "3,3");
      
      // 目盛りの数値
      if (j === levels - 1) {
        svg.append("text")
          .attr("x", 5)
          .attr("y", -levelFactor - 5)
          .attr("class", "legend")
          .style("font-size", "10px")
          .attr("text-anchor", "middle")
          .text("100%");
      }
    }
    
    // 軸グリッドを描画
    const axis = svg.selectAll(".axis")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "axis");
    
    // 軸の線を描画
    axis.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("class", "line")
      .style("stroke", gridColor)
      .style("stroke-width", "1px");
    
    // 軸のラベルを追加
    axis.append("text")
      .attr("class", "legend axis-label") // クラス追加 for styling/selection
      .style("font-size", baseFontSize) // 適用
      .attr("text-anchor", (d, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const angleDeg = angle * (180 / Math.PI);
        
        // 角度に応じてアンカーを微調整
        if (Math.abs(angleDeg - 90) < 10 || Math.abs(angleDeg - 270) < 10) { // 左右の軸に近い場合
            return "middle";
        } else if (angleDeg > -90 && angleDeg < 90) { // 右半分の軸
            return "start";
        } else { // 左半分の軸
            return "end";
        }
      })
      .attr("dy", (d, i) => { // 垂直方向のオフセット調整
        const angle = angleSlice * i - Math.PI / 2;
        const angleDeg = angle * (180 / Math.PI);
        
        if (Math.abs(angleDeg - 0) < 10 || Math.abs(angleDeg - 180) < 10) { // 上下の軸に近い場合
            return angleDeg < 0 ? "-0.9em" : "1.8em"; // 上下の軸のオフセットを増やす
        } else if (Math.abs(angleDeg - 90) < 10 || Math.abs(angleDeg - 270) < 10) { // 左右の軸に近い場合
            return "0.4em"; // 左右の軸は微調整
        }
         else {
            return "0.4em"; // デフォルト
        }
      })
      .attr("dx", (d, i) => { // 水平方向のオフセット調整 (左右の軸用)
        const angle = angleSlice * i - Math.PI / 2;
        const angleDeg = angle * (180 / Math.PI);
         if (Math.abs(angleDeg - 90) < 10) { // 右の軸に近い場合
             return "0.5em";
         } else if (Math.abs(angleDeg - 270) < 10) { // 左の軸に近い場合
             return "-0.5em";
         }
         return "0";
      })
      .attr("x", (d, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const labelDistance = radius * labelPadding; // 適用
        return labelDistance * Math.cos(angle);
      })
      .attr("y", (d, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const labelDistance = radius * labelPadding; // 適用
        return labelDistance * Math.sin(angle);
      })
      .text(d => d.axis)
      .style("fill", d => colorScale(d.category))
      .style("font-weight", "bold")
      .on("mouseover", (event, d) => {
        setActiveAxis(d.axis);
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .style("font-size", hoverFontSize); // 適用
      })
      .on("mouseout", (event) => {
        setActiveAxis(null);
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .style("font-size", baseFontSize); // 適用
      });
    
    // レーダーチャート本体の描画
    const radarLine = d3.lineRadial()
      .curve(d3.curveLinearClosed)
      .radius(d => d.value * radius)
      .angle((d, i) => i * angleSlice);
    
    // データポイントを収集してシリーズごとにグループ化
    const radarData = data.map((d, i) => ({
      angle: angleSlice * i - Math.PI / 2,
      value: d.value,
      axis: d.axis,
      category: d.category
    }));
    
    // レーダーラインを描画
    svg.append("path")
      .datum(radarData)
      .attr("class", "radarArea")
      .attr("d", d => {
        const points = d.map(point => [
          point.value * radius * Math.cos(point.angle),
          point.value * radius * Math.sin(point.angle)
        ]);
        return d3.line()(points.concat([points[0]]));
      })
      .style("fill", "rgba(255, 153, 102, 0.2)")
      .style("stroke", "#FF9966")
      .style("stroke-width", 2);
    
    // データポイントを追加
    svg.selectAll(".radarCircle")
      .data(radarData)
      .enter()
      .append("circle")
      .attr("class", "radarCircle")
      .attr("r", 4)
      .attr("cx", d => d.value * radius * Math.cos(d.angle))
      .attr("cy", d => d.value * radius * Math.sin(d.angle))
      .style("fill", d => colorScale(d.category))
      .style("fill-opacity", 0.8)
      .append("title") // ツールチップ用
      .text(d => `${d.axis}: ${Math.round(d.value * 100)}%`);
    
    // アクティブな軸の強調表示 (オプション)
    if (activeAxis) {
       svg.selectAll('.axis-label')
         .filter(d => d.axis === activeAxis)
         .style('fill', 'black'); // または他の強調スタイル
    }
  };
  
  // アクセシビリティのためのテーブル表示
  const renderAccessibleTable = () => {
    if (!data || data.length === 0) return null;
    
    return (
      <div className="sr-only">
        <h3>銀河ファミリー＆一靈四魂プロファイルデータテーブル</h3>
        <table>
          <thead>
            <tr>
              <th>軸</th>
              <th>カテゴリ</th>
              <th>値（%）</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.axis}</td>
                <td>{item.category}</td>
                <td>{Math.round(item.value * 100)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <div className="radar-chart-container" role="img" aria-label="銀河ファミリー＆一靈四魂プロファイルのレーダーチャート">
      <svg ref={svgRef} width={getOptimizedSize().width} height={getOptimizedSize().height} />
      {renderAccessibleTable()}
      
      {activeAxis && (
        <div className="axis-description">
          <h4>{activeAxis}</h4>
          <p>{data.find(d => d.axis === activeAxis)?.description || `${activeAxis}の値を表示しています。`}</p>
        </div>
      )}
      
      <style jsx>{`
        .radar-chart-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
        
        .axis-description {
          margin-top: 1rem;
          padding: 1rem;
          background-color: #f5f5f5;
          border-radius: 8px;
          border-left: 4px solid #FF9966;
        }
        
        .axis-description h4 {
          margin-top: 0;
          color: #FF7733;
        }
        
        @media (max-width: 768px) {
          .radar-chart-container {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default RadarChart;