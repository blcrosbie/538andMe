// src/pages/Analysis.jsx
import React from 'react';
import Header from '../components/common/Header';
import AIAssistant from '../components/common/AIAssistant';

const Analysis = () => {
  return (
    <div className="page-container">
      <Header />
      <main className="page-content">
        <div className="page-header">
          <h1>Political Analysis</h1>
          <p>In-depth analysis of voting patterns, trends, and political insights</p>
        </div>

        <div className="analysis-grid">
          <div className="analysis-card">
            <h3>Voting Trends</h3>
            <p>Analysis of voting patterns across party lines and key legislation</p>
            <div className="chart-placeholder">
              📊 Interactive charts will be implemented here
            </div>
          </div>

          <div className="analysis-card">
            <h3>Party Unity Scores</h3>
            <p>Measuring how often party members vote together on key issues</p>
            <div className="chart-placeholder">
              📈 Party unity visualization coming soon
            </div>
          </div>

          <div className="analysis-card">
            <h3>Committee Activity</h3>
            <p>Track which committees are most active and influential</p>
            <div className="chart-placeholder">
              🏛️ Committee analysis dashboard
            </div>
          </div>

          <div className="analysis-card">
            <h3>Bipartisan Bills</h3>
            <p>Legislation that receives support from both parties</p>
            <div className="chart-placeholder">
              🤝 Bipartisan cooperation metrics
            </div>
          </div>

          <div className="analysis-card large">
            <h3>Prediction Models</h3>
            <p>AI-powered predictions for upcoming votes and election outcomes</p>
            <div className="chart-placeholder">
              🔮 Predictive analytics dashboard will be integrated here
            </div>
          </div>
        </div>
      </main>
      <AIAssistant />
    </div>
  );
};

export default Analysis;
