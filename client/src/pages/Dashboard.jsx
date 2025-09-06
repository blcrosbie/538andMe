
// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import Header from '../components/common/Header';
import ControlPanel from '../components/dashboard/ControlPanel';
import ParliamentDiagram from '../components/dashboard/ParliamentDiagram';
import MapView from '../components/dashboard/MapView';
import DetailsPanel from '../components/dashboard/DetailsPanel';
import AIAssistant from '../components/common/AIAssistant';
import { useVoteData } from '../hooks/useVoteData';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('parliament');
  const [selectedState, setSelectedState] = useState(null);
  const [selectedRepresentative, setSelectedRepresentative] = useState(null);
  const [filters, setFilters] = useState({
    focusArea: 'allissues',
    timePeriod: 'currentsession',
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

  if (loading) {
    return (
      <div className="dashboard-container">
        <Header />
        <div className="loading-screen">
          <p>Loading political data...</p>
        </div>
      </div>
    );
  }

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
              {currentView === 'senate' ? 'United States Senate' : 
               currentView === 'house' ? 'House of Representatives' :
               'Parliament View'}
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