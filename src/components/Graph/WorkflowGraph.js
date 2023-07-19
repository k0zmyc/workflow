import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const Workflow = ({ workflow }) => {
  const d3Container = useRef(null);
  const { states, transitions } = workflow;

  useEffect(() => {
    if (states && transitions && d3Container.current) {
      const svg = d3.select(d3Container.current);

      const width = 800;
      const height = 400;
      const padding = 50;

      svg.attr("width", width).attr("height", height);


      
      const xScale = d3.scalePoint()
        .domain(states.map(d => d.id))
        .range([padding, width-padding])
        .padding(1);

      

      svg.append("rect")
        .attr("x", padding / 2)
        .attr("y", padding / 2)
        .attr("width", width - padding)
        .attr("height", height - padding)
        .attr("stroke", "black")
        .attr("fill", "none")
        .attr("stroke-width", 1);

      svg.selectAll(".state")

        .data(states)
        .enter()
        .append("circle")
        .attr("class", "state")
        .attr("cx", d => xScale(d.id))
        .attr("cy", d => d.name === "Vrátit" ? (height / 2) + 10 : height / 2)
        .attr("r", 10)
        .attr("fill", "blue");

      svg.selectAll(".state-label")
        .data(states)
        .enter()
        .append("text")
        .attr("class", "state-label")
        .attr("x", d => xScale(d.id))
        .attr("y", d => d.name === "Vrátit" ? (height / 2) + 25 : (height / 2) - 15)
        .text(d => d.name)
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "black")
        .attr("text-anchor", "middle");

      svg.selectAll(".paths")
        .data(transitions)
        .enter()
        .append("path")
        .attr("class", "transition")
        .attr("d", d => {
          const sourceX = xScale(d.source.id);
          const destinationX = xScale(d.destination.id);
          const controlPointX = (sourceX + destinationX) / 2;
          const controlPointY = d.name === "Vrátit" ? (height / 2) + 50 : height / 2;
          return `M ${sourceX} ${(height / 2)} Q ${controlPointX} ${controlPointY}, ${destinationX} ${(height / 2)}`;
        })
        .attr("stroke", d => d.name === "Vrátit" ? "red" : "black")
        .attr("fill", "none")
        .attr("stroke-width", 2);

      svg.selectAll(".transition-label")
        .data(transitions)
        .enter()
        .append("text")
        .attr("class", "transition-label")
        .attr("x", d => (xScale(d.source.id) + xScale(d.destination.id)) / 2)
        .attr("y", d => d.name === "Vrátit" ? (height / 2) + 35 : (height / 2) - 15)
        .text(d => d.name)
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "black")
        .attr("text-anchor", "middle");
      }
    }, [states, transitions]);
  
    return (
      <svg ref={d3Container} />
    );
  }
  
  export default Workflow;
