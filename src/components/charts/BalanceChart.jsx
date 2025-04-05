import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BalanceChart = ({ data, width = 500, height = 300 }) => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    // SVGコンテナをクリア
    d3.select(svgRef.current).selectAll("*").remove();
    
    // チャートの設定
    const margin = { top: 40, right: 30, bottom: 30, left: 30 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const barHeight = 30;
    const spacing = 50; // バー間の間隔
    
    // SVGコンテナの作成
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // タイトルを追加
    svg.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("バランス分析");
    
    // 各軸のグループを作成
    const axisGroups = svg.selectAll(".axis-group")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "axis-group")
      .attr("transform", (d, i) => `translate(0, ${i * spacing})`);
    
    // 軸のラベル
    axisGroups.append("text")
      .attr("x", 0)
      .attr("y", -10)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text(d => d.axis);
    
    // 左側のラベル
    axisGroups.append("text")
      .attr("x", 0)
      .attr("y", barHeight / 2)
      .attr("dy", "0.35em")
      .style("font-size", "10px")
      .style("text-anchor", "start")
      .text(d => d.leftSide);
    
    // 右側のラベル
    axisGroups.append("text")
      .attr("x", innerWidth)
      .attr("y", barHeight / 2)
      .attr("dy", "0.35em")
      .style("font-size", "10px")
      .style("text-anchor", "end")
      .text(d => d.rightSide);
    
    // バーの背景
    axisGroups.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", innerWidth)
      .attr("height", barHeight)
      .style("fill", "#f0f0f0")
      .style("rx", barHeight / 2)
      .style("ry", barHeight / 2);
    
    // バランスを示すバー
    axisGroups.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", d => d.value * innerWidth)
      .attr("height", barHeight)
      .style("fill", d => {
        // バランスに応じて色を変える（0.5が完全なバランス）
        if (d.value >= 0.45 && d.value <= 0.55) {
          return "#4CAF50"; // バランスが良い場合の緑色
        } else if (d.value < 0.45) {
          return "#3F51B5"; // 左側に偏っている場合の青色
        } else {
          return "#FF9800"; // 右側に偏っている場合のオレンジ色
        }
      })
      .style("rx", barHeight / 2)
      .style("ry", barHeight / 2);
    
    // バランスのマーカー（中央）
    axisGroups.append("line")
      .attr("x1", innerWidth / 2)
      .attr("y1", -5)
      .attr("x2", innerWidth / 2)
      .attr("y2", barHeight + 5)
      .style("stroke", "#aaa")
      .style("stroke-dasharray", "2,2")
      .style("stroke-width", 1);
    
    // バランス値のテキスト
    axisGroups.append("text")
      .attr("x", d => {
        // バーの長さに応じてテキスト位置を調整
        const position = d.value * innerWidth;
        if (position < 40) return position + 10;
        if (position > innerWidth - 40) return position - 10;
        return position;
      })
      .attr("y", barHeight / 2)
      .attr("dy", "0.35em")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("text-anchor", d => {
        const position = d.value * innerWidth;
        if (position < 40) return "start";
        if (position > innerWidth - 40) return "end";
        return "middle";
      })
      .style("fill", d => {
        const position = d.value * innerWidth;
        if (position > 40 && position < innerWidth - 40) return "white";
        return "#333";
      })
      .text(d => `${Math.round(d.value * 100)}%`);
    
    // 説明テキスト
    axisGroups.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", barHeight + 20)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("fill", "#666")
      .text(d => d.description ? d.description.slice(0, 60) + (d.description.length > 60 ? "..." : "") : "");
    
  }, [data, width, height]);
  
  return (
    <div className="balance-chart-container">
      <svg ref={svgRef}></svg>
      {data && data.length > 0 && (
        <div className="balance-descriptions">
          {data.map((item, index) => (
            <div key={index} className="balance-description">
              <h4>{item.axis}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BalanceChart;