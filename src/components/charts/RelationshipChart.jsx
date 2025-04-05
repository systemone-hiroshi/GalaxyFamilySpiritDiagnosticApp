import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RelationshipChart = ({ data, width = 500, height = 500 }) => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!data) return;
    
    const {
      primaryGalaxy,
      primarySoul,
      secondaryGalaxy,
      secondarySoul,
      compatibility,
      connections
    } = data;
    
    // SVGコンテナをクリア
    d3.select(svgRef.current).selectAll("*").remove();
    
    // チャートの設定
    const margin = { top: 40, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const nodeRadius = 40;
    
    // カラースケール
    const colorScale = d3.scaleOrdinal()
      .domain(['galaxy', 'soul'])
      .range(['#FF9966', '#6699FF']);
    
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
      .text("特性関係分析");
    
    // ノードデータの作成
    const nodes = [
      { id: 'primaryGalaxy', name: primaryGalaxy, type: 'galaxy', primary: true },
      { id: 'primarySoul', name: primarySoul, type: 'soul', primary: true },
      { id: 'secondaryGalaxy', name: secondaryGalaxy, type: 'galaxy', primary: false },
      { id: 'secondarySoul', name: secondarySoul, type: 'soul', primary: false }
    ];
    
    // リンクデータの作成
    const links = [
      { 
        source: 'primaryGalaxy', 
        target: 'primarySoul', 
        value: compatibility * 100,
        description: '主要関係'
      },
      ...connections.map(conn => ({
        source: conn.source,
        target: conn.target,
        value: conn.strength * 100,
        description: conn.description
      }))
    ];
    
    // ノード位置の設定
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(innerWidth / 2, innerHeight / 2))
      .force("collision", d3.forceCollide().radius(nodeRadius + 10));
    
    // シミュレーションを100回実行して位置を固定
    for (let i = 0; i < 100; ++i) simulation.tick();
    
    // リンクの描画
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
      .attr("stroke-width", d => Math.max(1, d.value / 20))
      .attr("stroke", d => d.source.type === d.target.type ? "#aaa" : "#FFA07A")
      .attr("stroke-opacity", 0.6);
    
    // リンクのラベル
    svg.append("g")
      .selectAll("text")
      .data(links)
      .enter()
      .append("text")
      .attr("x", d => (d.source.x + d.target.x) / 2)
      .attr("y", d => (d.source.y + d.target.y) / 2)
      .attr("dy", -5)
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#666")
      .text(d => `${Math.round(d.value)}%`);
    
    // ノードの描画
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x}, ${d.y})`);
    
    // ノードの円
    node.append("circle")
      .attr("r", d => d.primary ? nodeRadius : nodeRadius * 0.8)
      .attr("fill", d => colorScale(d.type))
      .attr("stroke", d => d.primary ? "#333" : "#aaa")
      .attr("stroke-width", d => d.primary ? 2 : 1)
      .attr("fill-opacity", d => d.primary ? 0.9 : 0.7);
    
    // ノードのテキスト
    node.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("font-size", d => d.primary ? "12px" : "10px")
      .style("font-weight", d => d.primary ? "bold" : "normal")
      .style("fill", "white")
      .text(d => d.name);
    
    // 説明テキスト
    svg.append("g")
      .selectAll("text")
      .data(links)
      .enter()
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#333")
      .text(d => d.description);
    
    // 凡例
    const legend = svg.append("g")
      .attr("transform", `translate(${innerWidth - 120}, 10)`);
    
    const legendData = [
      { label: "銀河種族", color: colorScale('galaxy') },
      { label: "一靈四魂", color: colorScale('soul') },
      { label: "主要タイプ", type: "primary" },
      { label: "副次タイプ", type: "secondary" }
    ];
    
    // 凡例のアイテム
    const legendItems = legend.selectAll("g")
      .data(legendData)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`);
    
    // 凡例の色付きマーカー
    legendItems.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("rx", d => d.type ? 0 : 6)
      .attr("ry", d => d.type ? 0 : 6)
      .attr("fill", d => d.color || "white")
      .attr("stroke", d => d.type === "primary" ? "#333" : (d.type === "secondary" ? "#aaa" : "none"))
      .attr("stroke-width", d => d.type ? 2 : 0);
    
    // 凡例のテキスト
    legendItems.append("text")
      .attr("x", 20)
      .attr("y", 6)
      .attr("dy", "0.35em")
      .style("font-size", "10px")
      .text(d => d.label);
    
  }, [data, width, height]);
  
  return (
    <div className="relationship-chart-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default RelationshipChart;