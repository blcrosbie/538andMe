// src/pages/BillsAndVotes.jsx
import React, { useState } from 'react';
import Header from '../components/common/Header';
import AIAssistant from '../components/common/AIAssistant';

const BillsAndVotes = () => {
  const [selectedBill, setSelectedBill] = useState(null);

  // Mock bills data
  const mockBills = [
    {
      id: 'hr1234',
      title: 'Infrastructure Investment and Jobs Act',
      status: 'Passed',
      chamber: 'House',
      date: '2024-03-15',
      votes: { yes: 228, no: 206, abstain: 1 },
      summary: 'A comprehensive infrastructure bill addressing roads, bridges, broadband, and clean energy.'
    },
    {
      id: 's567',
      title: 'Healthcare Modernization Act',
      status: 'In Committee',
      chamber: 'Senate',
      date: '2024-03-10',
      votes: null,
      summary: 'Legislation to modernize healthcare systems and expand access to telemedicine.'
    },
    {
      id: 'hr890',
      title: 'Climate Action Framework',
      status: 'Failed',
      chamber: 'House',
      date: '2024-02-28',
      votes: { yes: 201, no: 233, abstain: 1 },
      summary: 'Comprehensive climate legislation setting emissions targets and clean energy standards.'
    }
  ];

  return (
    <div className="page-container">
      <Header />
      <main className="page-content">
        <div className="page-header">
          <h1>Bills & Votes</h1>
          <p>Track legislation, voting records, and bill progress through Congress</p>
        </div>

        <div className="bills-layout">
          <div className="bills-list">
            <div className="bills-filters">
              <select className="filter-select">
                <option>All Bills</option>
                <option>House Bills</option>
                <option>Senate Bills</option>
              </select>
              <select className="filter-select">
                <option>All Status</option>
                <option>Passed</option>
                <option>In Committee</option>
                <option>Failed</option>
              </select>
              <input 
                type="text" 
                placeholder="Search bills..." 
                className="search-bills"
              />
            </div>

            <div className="bills-grid">
              {mockBills.map(bill => (
                <div 
                  key={bill.id}
                  className={`bill-card ${selectedBill?.id === bill.id ? 'selected' : ''}`}
                  onClick={() => setSelectedBill(bill)}
                >
                  <div className="bill-header">
                    <span className="bill-id">{bill.id.toUpperCase()}</span>
                    <span className={`bill-status ${bill.status.toLowerCase().replace(' ', '-')}`}>
                      {bill.status}
                    </span>
                  </div>
                  <h3 className="bill-title">{bill.title}</h3>
                  <p className="bill-summary">{bill.summary}</p>
                  <div className="bill-meta">
                    <span>{bill.chamber}</span>
                    <span>{bill.date}</span>
                  </div>
                  {bill.votes && (
                    <div className="vote-summary">
                      <span className="vote-yes">Yes: {bill.votes.yes}</span>
                      <span className="vote-no">No: {bill.votes.no}</span>
                      <span className="vote-abstain">Abstain: {bill.votes.abstain}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {selectedBill && (
            <div className="bill-details">
              <h2>{selectedBill.title}</h2>
              <div className="bill-info">
                <div className="info-row">
                  <strong>Bill ID:</strong> {selectedBill.id.toUpperCase()}
                </div>
                <div className="info-row">
                  <strong>Status:</strong> {selectedBill.status}
                </div>
                <div className="info-row">
                  <strong>Chamber:</strong> {selectedBill.chamber}
                </div>
                <div className="info-row">
                  <strong>Date:</strong> {selectedBill.date}
                </div>
              </div>
              
              <div className="bill-content">
                <h3>Summary</h3>
                <p>{selectedBill.summary}</p>
                
                {selectedBill.votes && (
                  <div className="voting-results">
                    <h3>Voting Results</h3>
                    <div className="vote-bars">
                      <div className="vote-bar yes" style={{width: `${(selectedBill.votes.yes / 435) * 100}%`}}>
                        Yes: {selectedBill.votes.yes}
                      </div>
                      <div className="vote-bar no" style={{width: `${(selectedBill.votes.no / 435) * 100}%`}}>
                        No: {selectedBill.votes.no}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bill-actions">
                  <button className="btn-primary">View Full Text</button>
                  <button className="btn-secondary">Download PDF</button>
                  <button className="btn-secondary">Share Bill</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <AIAssistant />
    </div>
  );
};

export default BillsAndVotes;
