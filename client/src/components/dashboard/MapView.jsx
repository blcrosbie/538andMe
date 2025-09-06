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