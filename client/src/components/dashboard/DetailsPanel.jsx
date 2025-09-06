// src/components/dashboard/DetailsPanel.jsx
import React from 'react';

const DetailsPanel = ({ 
  currentView, 
  selectedState, 
  selectedRepresentative, 
  data 
}) => {
  // Mock data for selected state/representative
  const mockStateData = {
    'CA': {
      name: 'California',
      population: '39.5M',
      electoral: '54',
      lastElection: '2022',
      senators: [
        { name: 'Dianne Feinstein', party: 'democrat', chamber: 'Senate' },
        { name: 'Alex Padilla', party: 'democrat', chamber: 'Senate' }
      ]
    },
    'TX': {
      name: 'Texas',
      population: '29.1M',
      electoral: '40',
      lastElection: '2020',
      senators: [
        { name: 'Ted Cruz', party: 'republican', chamber: 'Senate' },
        { name: 'John Cornyn', party: 'republican', chamber: 'Senate' }
      ]
    }
  };

  const stateInfo = selectedState ? mockStateData[selectedState] : null;

  return (
    <aside className="details-panel">
      <div className="selection-info">
        <h3 className="panel-title">Selection Details</h3>
        <div className="selected-title">
          {selectedRepresentative ? 
            selectedRepresentative.name : 
            (selectedState ? stateInfo?.name || selectedState : 'Click a state to view details')
          }
        </div>
        <div className="selected-subtitle">
          {selectedRepresentative ? 
            `${selectedRepresentative.party} • ${selectedRepresentative.chamber}` :
            (selectedState ? `${currentView === 'senate' ? 'Senate' : 'House'} representation and voting patterns` : '')
          }
        </div>
      </div>

      {stateInfo && !selectedRepresentative && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Population</div>
              <div className="stat-value">{stateInfo.population}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Electoral Votes</div>
              <div className="stat-value">{stateInfo.electoral}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Last Election</div>
              <div className="stat-value">{stateInfo.lastElection}</div>
            </div>
          </div>

          <div className="representatives-section">
            <h4 className="section-title">Current Representatives</h4>
            <div className="representatives-list">
              {stateInfo.senators.map((rep, index) => (
                <div key={index} className="representative-card">
                  <div className="rep-name">{rep.name}</div>
                  <div className="rep-details">
                    <span>{rep.chamber}</span>
                    <span className={`party-badge ${rep.party}`}>
                      {rep.party.charAt(0).toUpperCase() + rep.party.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedRepresentative && (
        <div className="representative-details">
          <div className="rep-profile">
            <h4 className="section-title">Profile</h4>
            <p>Detailed representative information will be displayed here including voting history, committee assignments, and biographical information.</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default DetailsPanel;