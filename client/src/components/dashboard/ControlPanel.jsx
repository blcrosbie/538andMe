
// src/components/dashboard/ControlPanel.jsx
import React from 'react';

const ControlPanel = ({ 
  currentView, 
  onViewChange, 
  filters, 
  onFiltersChange 
}) => {
  const handleFilterChange = (category, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const focusAreas = [
    'All Issues', 'Healthcare', 'Economy', 'Environment', 
    'Education', 'Defense', 'Immigration', 'Technology'
  ];

  const timePeriods = [
    'Last 30 Days', 'Last 6 Months', 'Current Session', '2024 Elections'
  ];

  const voteActivities = [
    'High Participation', 'Low Participation', 'Key Votes', 'Party Line Votes'
  ];

  return (
    <aside className="control-panel">
      <h3 className="panel-title">View Controls</h3>
      
      <div className="toggle-section">
        <label className="toggle-label">Legislative Body</label>
        <div className="legislature-toggle">
          <button 
            className={`toggle-btn ${currentView === 'senate' ? 'active' : ''}`}
            onClick={() => onViewChange('senate')}
          >
            Senate
          </button>
          <button 
            className={`toggle-btn ${currentView === 'house' ? 'active' : ''}`}
            onClick={() => onViewChange('house')}
          >
            House
          </button>
          <button 
            className={`toggle-btn ${currentView === 'parliament' ? 'active' : ''}`}
            onClick={() => onViewChange('parliament')}
          >
            Chamber
          </button>
        </div>
      </div>

      <div className="filter-section">
        <label className="toggle-label">Focus Areas</label>
        <div className="filter-grid">
          {focusAreas.map(area => (
            <div 
              key={area}
              className={`filter-item ${filters.focusArea === area.toLowerCase().replace(' ', '') ? 'active' : ''}`}
              onClick={() => handleFilterChange('focusArea', area.toLowerCase().replace(' ', ''))}
            >
              {area}
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="toggle-label">Time Period</label>
        <div className="filter-grid">
          {timePeriods.map(period => (
            <div 
              key={period}
              className={`filter-item ${filters.timePeriod === period.toLowerCase().replace(' ', '') ? 'active' : ''}`}
              onClick={() => handleFilterChange('timePeriod', period.toLowerCase().replace(' ', ''))}
            >
              {period}
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="toggle-label">Vote Activity</label>
        <div className="filter-grid">
          {voteActivities.map(activity => (
            <div 
              key={activity}
              className={`filter-item ${filters.voteActivity === activity.toLowerCase().replace(' ', '') ? 'active' : ''}`}
              onClick={() => handleFilterChange('voteActivity', activity.toLowerCase().replace(' ', ''))}
            >
              {activity}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ControlPanel;
