// src/components/dashboard/ParliamentDiagram.jsx
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ParliamentDiagram = ({  
  data,  
  onRepresentativeSelect,  
  selectedRepresentative  
}) => {  
  const svgRef = useRef();  

  useEffect(() => {  
    if (!data) return;  

    const svg = d3.select(svgRef.current);  
    svg.selectAll("*").remove(); // Fixed: use "*" instead of "_"

    // Increased dimensions for better visibility
    const width = 600;  
    const height = 480;  
    const radius = 330;  
    const centerX = width / 2;  
    const centerY = height - 50;  

    svg.attr("viewBox", `0 0 ${width} ${height}`)  
      .attr("preserveAspectRatio", "xMidYMid meet");  

    // Create parliament seating  
    const totalSeats = data.totalSeats || 435;  
    const rows = 8;  
    const seatsPerRow = Math.ceil(totalSeats / rows);  
    let seatIndex = 0;  
    const seats = [];  

    for (let row = 0; row < rows; row++) {  
      const rowRadius = radius - (row * 20);  
      const seatsInThisRow = Math.min(seatsPerRow, totalSeats - seatIndex);  
      const angleStep = Math.PI / (seatsInThisRow + 1);  

      for (let seat = 0; seat < seatsInThisRow; seat++) {  
        const angle = angleStep * (seat + 1);  
        const x = centerX - Math.cos(angle) * rowRadius;  
        const y = centerY - Math.sin(angle) * rowRadius;  

        seats.push({  
          x,  
          y,  
          party: data.seats[seatIndex]?.party || 'vacant',  
          representative: data.seats[seatIndex]?.representative,  
          index: seatIndex  
        });  
        seatIndex++;  
        if (seatIndex >= totalSeats) break;  
      }  
      if (seatIndex >= totalSeats) break;  
    }  

    // Draw seats  
    svg.selectAll('.seat')  
      .data(seats)  
      .enter()  
      .append('circle')  
      .attr('class', d => `seat ${d.party}`)  
      .attr('cx', d => d.x)  
      .attr('cy', d => d.y)  
      .attr('r', 5) // Increased seat size for better visibility
      .attr('fill', d => {  
        switch(d.party) {  
          case 'democrat': return '#2563eb';  
          case 'republican': return '#dc2626';  
          case 'independent': return '#059669';  
          default: return '#9ca3af';  
        }  
      })  
      .attr('stroke', '#fff')  
      .attr('stroke-width', 1) // Increased stroke width
      .style('cursor', 'pointer')  
      .on('click', (event, d) => {  
        if (d.representative) {  
          onRepresentativeSelect(d.representative);  
        }  
      })  
      .on('mouseover', function(event, d) {  
        d3.select(this).attr('r', 7); // Increased hover size
      })  
      .on('mouseout', function() {  
        d3.select(this).attr('r', 5); // Reset to original size
      });  

    // Add seat count summary - Fixed positioning to prevent overlap
    const summaryY = height - 30; // Moved up to prevent overlaying
    const parties = ['democrat', 'republican', 'independent', 'vacant'];  
    const partyCounts = parties.map(party => ({  
      party,  
      count: seats.filter(seat => seat.party === party).length  
    }));  

    // Create a container for the legend to prevent text overlap
    const legendGroup = svg.append('g')
      .attr('class', 'legend-container')
      .attr('transform', `translate(0, ${summaryY})`);

    legendGroup.selectAll('.party-summary')  
      .data(partyCounts)  
      .enter()  
      .append('g')  
      .attr('class', 'party-summary')  
      .attr('transform', (d, i) => `translate(${i * 180}, 0)`) // Fixed: Added space between elements
      .each(function(d) {  
        const g = d3.select(this);  
        g.append('circle')  
          .attr('r', 10)  
          .attr('fill', () => {  
            switch(d.party) {  
              case 'democrat': return '#2563eb';  
              case 'republican': return '#dc2626';  
              case 'independent': return '#059669';  
              default: return '#9ca3af';  
            }  
          })  
          .attr('stroke', '#fff')  
          .attr('stroke-width', 1);  

        g.append('text')  
          .attr('x', 15)  
          .attr('y', 0)  
          .attr('dy', '0.35em')  
          .style('font-size', '14px')  
          .style('font-weight', '600')  
          .style('fill', '#1f2937')  
          .text(`${d.party.charAt(0).toUpperCase() + d.party.slice(1)}: ${d.count}`);  
      });  

  }, [data, selectedRepresentative, onRepresentativeSelect]);  

  return (  
    <div className="parliament-diagram">  
      <svg ref={svgRef} className="parliament-svg"></svg>  
    </div>  
  );  
};  

export default ParliamentDiagram;