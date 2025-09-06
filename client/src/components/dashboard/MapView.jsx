
// src/components/dashboard/MapView.jsx
import React from 'react';

const MapView = ({ 
  currentView, 
  data, 
  onStateSelect, 
  selectedState 
}) => {
  // Mock state grid for now (will be replaced with actual map)
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const getStateColor = (state) => {
    // Mock political lean data
    const democratStates = ['CA', 'NY', 'MA', 'CT', 'VT', 'WA', 'OR'];
    const republicanStates = ['TX', 'FL', 'AL', 'MS', 'WY', 'ID', 'UT'];
    
    if (democratStates.includes(state)) return 'democrat';
    if (republicanStates.includes(state)) return 'republican';
    return 'tossup';
  };

  return (
    <div className="map-view">
      <div className="mock-map">
        <div className="state-grid-map">
          {states.map(state => (
            <div
              key={state}
              className={`state-cell ${getStateColor(state)} ${selectedState === state ? 'selected' : ''}`}
              onClick={() => onStateSelect(state)}
            >
              {state}
            </div>
          ))}
        </div>
        <div className="map-note">
          <p>Interactive Mapbox map with congressional districts will be integrated here</p>
          <p>Currently showing simplified state grid with mock data</p>
        </div>
      </div>
    </div>
  );
};

export default MapView;