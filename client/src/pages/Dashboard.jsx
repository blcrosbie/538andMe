// pages/Dashboard.jsx - Landing dashboard page
import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import ControlPanel from '../components/dashboard/ControlPanel';
import ParliamentDiagram from '../components/dashboard/ParliamentDiagram';
import MapView from '../components/dashboard/MapView';
import DetailsPanel from '../components/dashboard/DetailsPanel';
import AIAssistant from '../components/common/AIAssistant';
import { useVoteData } from '../hooks/useVoteData';
import './Dashboard.css';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('senate');
  const [selectedState, setSelectedState] = useState(null);
  const [selectedRepresentative, setSelectedRepresentative] = useState(null);
  const [filters, setFilters] = useState({
    focusArea: 'all',
    timePeriod: 'current',
    voteActivity: 'all'
  });

  const { data: voteData, loading, error } = useVoteData(filters);

  const handleViewChange = (view) => {
    setCurrentView(view);
    setSelectedState(null);
    setSelectedRepresentative(null);
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedRepresentative(null);
  };

  const handleRepresentativeSelect = (representative) => {
    setSelectedRepresentative(representative);
  };

  return (
    <div className="dashboard-container">
      <Header />
      
      <main className="main-content">
        <ControlPanel
          currentView={currentView}
          onViewChange={handleViewChange}
          filters={filters}
          onFiltersChange={setFilters}
        />

        <div className="visualization-panel">
          <div className="viz-header">
            <h2 className="viz-title">
              {currentView === 'senate' ? 'United States Senate' : 'House of Representatives'}
            </h2>
            <div className="viz-legend">
              <div className="legend-item">
                <div className="legend-color democrat"></div>
                <span>Democrat</span>
              </div>
              <div className="legend-item">
                <div className="legend-color republican"></div>
                <span>Republican</span>
              </div>
              <div className="legend-item">
                <div className="legend-color independent"></div>
                <span>Independent</span>
              </div>
              <div className="legend-item">
                <div className="legend-color vacant"></div>
                <span>Vacant</span>
              </div>
            </div>
          </div>

          <div className="viz-content">
            {currentView === 'parliament' ? (
              <ParliamentDiagram
                data={voteData}
                onRepresentativeSelect={handleRepresentativeSelect}
                selectedRepresentative={selectedRepresentative}
              />
            ) : (
              <MapView
                currentView={currentView}
                data={voteData}
                onStateSelect={handleStateSelect}
                selectedState={selectedState}
                projection="albers"
              />
            )}
          </div>
        </div>

        <DetailsPanel
          currentView={currentView}
          selectedState={selectedState}
          selectedRepresentative={selectedRepresentative}
          data={voteData}
        />
      </main>

      <AIAssistant />
    </div>
  );
};

export default Dashboard;

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

// MapView.jsx - Mapbox with Albers projection
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { getAlbersProjection } from '../utils/mapProjections';

const MapView = ({ 
  currentView, 
  data, 
  onStateSelect, 
  selectedState 
}) => {
  const mapContainer = useRef();
  const map = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize Mapbox
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-98.5, 39.8], // Center of US
      zoom: 3,
      projection: 'albers' // Albers USA projection
    });

    map.current.on('load', () => {
      setMapLoaded(true);
      loadMapData();
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (mapLoaded && data) {
      updateMapData();
    }
  }, [data, currentView, mapLoaded]);

  const loadMapData = async () => {
    try {
      // Load state boundaries
      const statesResponse = await fetch('/api/geojson/states');
      const statesData = await statesResponse.json();

      map.current.addSource('states', {
        type: 'geojson',
        data: statesData
      });

      // Load congressional districts if in house view
      if (currentView === 'house') {
        const districtsResponse = await fetch('/api/geojson/congressional-districts');
        const districtsData = await districtsResponse.json();

        map.current.addSource('districts', {
          type: 'geojson',
          data: districtsData
        });
      }

      addMapLayers();
    } catch (error) {
      console.error('Error loading map data:', error);
    }
  };

  const addMapLayers = () => {
    // Add state fill layer
    map.current.addLayer({
      id: 'states-fill',
      type: 'fill',
      source: 'states',
      paint: {
        'fill-color': [
          'case',
          ['==', ['get', 'political_lean'], 'democrat'], '#2563eb',
          ['==', ['get', 'political_lean'], 'republican'], '#dc2626',
          ['==', ['get', 'political_lean'], 'tossup'], '#7c3aed',
          '#9ca3af'
        ],
        'fill-opacity': 0.7
      }
    });

    // Add state borders
    map.current.addLayer({
      id: 'states-border',
      type: 'line',
      source: 'states',
      paint: {
        'line-color': '#fff',
        'line-width': 1
      }
    });

    // Add congressional districts if in house view
    if (currentView === 'house' && map.current.getSource('districts')) {
      map.current.addLayer({
        id: 'districts-fill',
        type: 'fill',
        source: 'districts',
        paint: {
          'fill-color': [
            'case',
            ['==', ['get', 'party'], 'democrat'], '#2563eb',
            ['==', ['get', 'party'], 'republican'], '#dc2626',
            ['==', ['get', 'party'], 'tossup'], '#7c3aed',
            '#9ca3af'
          ],
          'fill-opacity': 0.6
        }
      });

      map.current.addLayer({
        id: 'districts-border',
        type: 'line',
        source: 'districts',
        paint: {
          'line-color': '#fff',
          'line-width': 0.5
        }
      });
    }

    // Add click handlers
    map.current.on('click', 'states-fill', (e) => {
      const stateName = e.features[0].properties.name;
      onStateSelect(stateName);
    });

    // Add hover effects
    map.current.on('mouseenter', 'states-fill', () => {
      map.current.getCanvas().style.cursor = 'pointer';
    });

    map.current.on('mouseleave', 'states-fill', () => {
      map.current.getCanvas().style.cursor = '';
    });
  };

  const updateMapData = () => {
    // Update colors based on current data
    if (map.current.getLayer('states-fill')) {
      // Update state colors based on latest voting data
      // This would use your real-time data from the backend
    }
  };

  return (
    <div className="map-view">
      <div ref={mapContainer} className="map-container" />
      {selectedState && (
        <div className="map-info-box">
          <h4>{selectedState}</h4>
          <p>Click for detailed information</p>
        </div>
      )}
    </div>
  );
};

export default MapView;

// App.jsx - Main application component
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BillsAndVotes from './pages/BillsAndVotes';
import Representatives from './pages/Representatives';
import Analysis from './pages/Analysis';
import Elections from './pages/Elections';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bills" element={<BillsAndVotes />} />
          <Route path="/representatives" element={<Representatives />} />
          <Route path="/representatives/:id" element={<Representatives />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/elections" element={<Elections />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;