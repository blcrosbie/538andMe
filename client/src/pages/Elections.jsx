
// src/pages/Elections.jsx
import React from 'react';
import Header from '../components/common/Header';
import AIAssistant from '../components/common/AIAssistant';

const Elections = () => {
  return (
    <div className="page-container">
      <Header />
      <main className="page-content">
        <div className="page-header">
          <h1>Elections</h1>
          <p>Track upcoming elections, candidate information, and election forecasts</p>
        </div>

        <div className="elections-content">
          <div className="election-card featured">
            <h2>2024 Elections</h2>
            <p>Comprehensive coverage of the 2024 congressional and presidential elections</p>
            <div className="election-stats">
              <div className="stat">
                <span className="stat-number">435</span>
                <span className="stat-label">House Seats</span>
              </div>
              <div className="stat">
                <span className="stat-number">33</span>
                <span className="stat-label">Senate Seats</span>
              </div>
              <div className="stat">
                <span className="stat-number">50</span>
                <span className="stat-label">States</span>
              </div>
            </div>
          </div>

          <div className="elections-grid">
            <div className="election-section">
              <h3>Upcoming Races</h3>
              <div className="races-list">
                <div className="race-item">
                  <span className="race-state">California</span>
                  <span className="race-type">Senate</span>
                  <span className="race-date">Nov 2024</span>
                </div>
                <div className="race-item">
                  <span className="race-state">Texas</span>
                  <span className="race-type">Governor</span>
                  <span className="race-date">Nov 2024</span>
                </div>
                <div className="race-item">
                  <span className="race-state">Florida</span>
                  <span className="race-type">House Districts</span>
                  <span className="race-date">Nov 2024</span>
                </div>
              </div>
            </div>

            <div className="election-section">
              <h3>Election Forecasts</h3>
              <p>AI-powered predictions and polling aggregation will be displayed here</p>
              <div className="forecast-placeholder">
                🗳️ Interactive election forecasting models coming soon
              </div>
            </div>

            <div className="election-section">
              <h3>Candidate Tracker</h3>
              <p>Follow declared candidates and their campaign progress</p>
              <div className="candidates-placeholder">
                👥 Candidate database and tracking system in development
              </div>
            </div>
          </div>
        </div>
      </main>
      <AIAssistant />
    </div>
  );
};

export default Elections;