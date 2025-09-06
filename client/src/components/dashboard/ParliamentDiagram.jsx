
// ParliamentDiagram.jsx - Parliament seating visualization
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
    svg.selectAll("*").remove();

    const width = 800;
    const height = 400;
    const radius = 180;
    const centerX = width / 2;
    const centerY = height - 20;

    svg.attr("viewBox", `0 0 ${width} ${height}`)
       .attr("preserveAspectRatio", "xMidYMid meet");

    // Create parliament seating
    const totalSeats = data.totalSeats || 435;
    const rows = 8; // Number of concentric arcs
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
       .attr('r', 4)
       .attr('stroke', '#fff')
       .attr('stroke-width', 0.5)
       .style('cursor', 'pointer')
       .on('click', (event, d) => {
         if (d.representative) {
           onRepresentativeSelect(d.representative);
         }
       })
       .on('mouseover', function(event, d) {
         d3.select(this).attr('r', 6);
         
         // Show tooltip
         const tooltip = d3.select('body')
           .append('div')
           .attr('class', 'tooltip')
           .style('opacity', 0);

         tooltip.transition()
           .duration(200)
           .style('opacity', 0.9);
           
         tooltip.html(`
           <strong>${d.representative?.name || 'Vacant'}</strong><br/>
           ${d.representative?.state || ''}<br/>
           ${d.party.charAt(0).toUpperCase() + d.party.slice(1)}
         `)
           .style('left', (event.pageX + 10) + 'px')
           .style('top', (event.pageY - 28) + 'px');
       })
       .on('mouseout', function() {
         d3.select(this).attr('r', 4);
         d3.selectAll('.tooltip').remove();
       });

    // Add majority line
    const majoritySeats = Math.ceil(totalSeats / 2);
    const majorityAngle = (majoritySeats / totalSeats) * Math.PI;
    
    svg.append('line')
       .attr('class', 'majority-line')
       .attr('x1', centerX)
       .attr('y1', centerY)
       .attr('x2', centerX - Math.cos(majorityAngle) * radius)
       .attr('y2', centerY - Math.sin(majorityAngle) * radius)
       .attr('stroke', '#666')
       .attr('stroke-width', 2)
       .attr('stroke-dasharray', '5,5');

    // Add seat count summary
    const summaryY = height - 80;
    const parties = ['democrat', 'republican', 'independent', 'vacant'];
    const partyCounts = parties.map(party => ({
      party,
      count: seats.filter(seat => seat.party === party).length
    }));

    svg.selectAll('.party-summary')
       .data(partyCounts)
       .enter()
       .append('g')
       .attr('class', 'party-summary')
       .attr('transform', (d, i) => `translate(${100 + i * 150}, ${summaryY})`)
       .each(function(d) {
         const g = d3.select(this);
         
         g.append('circle')
          .attr('r', 8)
          .attr('class', d.party)
          .attr('stroke', '#fff')
          .attr('stroke-width', 1);
         
         g.append('text')
          .attr('x', 15)
          .attr('y', 0)
          .attr('dy', '0.35em')
          .style('font-size', '14px')
          .style('font-weight', '600')
          .text(`${d.party.charAt(0).toUpperCase() + d.party.slice(1)}: ${d.count}`);
       });

  }, [data, selectedRepresentative]);

  return (
    <div className="parliament-diagram">
      <svg ref={svgRef} className="parliament-svg"></svg>
    </div>
  );
};

export default ParliamentDiagram;