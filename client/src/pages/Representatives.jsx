// src/pages/Representatives.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import AIAssistant from '../components/common/AIAssistant';

const Representatives = () => {
  const { id } = useParams();
  const [selectedRep, setSelectedRep] = useState(null);
  const [filter, setFilter] = useState('all');

  // Mock representatives data
  const mockReps = [
    {
      id: 'pelosi-nancy',
      name: 'Nancy Pelosi',
      party: 'Democrat',
      state: 'California',
      district: '11th District',
      chamber: 'House',
      photoUrl: null,
      yearsInOffice: 36,
      committees: ['Appropriations'],
      recentVotes: [
        { bill: 'HR1234', vote: 'Yes', date: '2024-03-15' },
        { bill: 'S567', vote: 'No', date: '2024-03-10' }
      ]
    },
    {
      id: 'cruz-ted',
      name: 'Ted Cruz',
      party: 'Republican',
      state: 'Texas',
      district: 'At Large',
      chamber: 'Senate',
      photoUrl: null,
      yearsInOffice: 12,
      committees: ['Judiciary', 'Commerce'],
      recentVotes: [
        { bill: 'HR1234', vote: 'No', date: '2024-03-15' },
        { bill: 'S567', vote: 'Yes', date: '2024-03-10' }
      ]
    },
    {
      id: 'ocasio-cortez-alexandria',
      name: 'Alexandria Ocasio-Cortez',
      party: 'Democrat',
      state: 'New York',
      district: '14th District',
      chamber: 'House',
      photoUrl: null,
      yearsInOffice: 6,
      committees: ['Financial Services', 'Oversight'],
      recentVotes: [
        { bill: 'HR1234', vote: 'Yes', date: '2024-03-15' },
        { bill: 'S567', vote: 'Yes', date: '2024-03-10' }
      ]
    }
  ];

  const filteredReps = mockReps.filter(rep => {
    if (filter === 'all') return true;
    if (filter === 'house') return rep.chamber === 'House';
    if (filter === 'senate') return rep.chamber === 'Senate';
    if (filter === 'democrat') return rep.party === 'Democrat';
    if (filter === 'republican') return rep.party === 'Republican';
    return true;
  });

  return (
    <div className="page-container">
      <Header />
      <main className="page-content">
        <div className="page-header">
          <h1>Representatives</h1>
          <p>Explore profiles, voting records, and contact information for all members of Congress</p>
        </div>

        <div className="representatives-layout">
          <div className="reps-sidebar">
            <div className="filter-section">
              <h3>Filter Representatives</h3>
              <div className="filter-options">
                <button 
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All Members
                </button>
                <button 
                  className={`filter-btn ${filter === 'house' ? 'active' : ''}`}
                  onClick={() => setFilter('house')}
                >
                  House
                </button>
                <button 
                  className={`filter-btn ${filter === 'senate' ? 'active' : ''}`}
                  onClick={() => setFilter('senate')}
                >
                  Senate
                </button>
                <button 
                  className={`filter-btn ${filter === 'democrat' ? 'active' : ''}`}
                  onClick={() => setFilter('democrat')}
                >
                  Democrats
                </button>
                <button 
                  className={`filter-btn ${filter === 'republican' ? 'active' : ''}`}
                  onClick={() => setFilter('republican')}
                >
                  Republicans
                </button>
              </div>
            </div>

            <div className="search-section">
              <input 
                type="text" 
                placeholder="Search by name, state, or district..." 
                className="search-reps"
              />
            </div>
          </div>

          <div className="reps-grid">
            {filteredReps.map(rep => (
              <div 
                key={rep.id}
                className={`rep-card ${selectedRep?.id === rep.id ? 'selected' : ''}`}
                onClick={() => setSelectedRep(rep)}
              >
                <div className="rep-photo">
                  <div className="photo-placeholder">
                    {rep.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="rep-info">
                  <h3 className="rep-name">{rep.name}</h3>
                  <div className="rep-details">
                    <span className={`party-indicator ${rep.party.toLowerCase()}`}>
                      {rep.party}
                    </span>
                    <span>{rep.state}</span>
                  </div>
                  <div className="rep-position">
                    {rep.chamber} • {rep.district}
                  </div>
                  <div className="rep-tenure">
                    {rep.yearsInOffice} years in office
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedRep && (
            <div className="rep-profile">
              <div className="profile-header">
                <div className="profile-photo">
                  <div className="photo-placeholder large">
                    {selectedRep.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="profile-info">
                  <h2>{selectedRep.name}</h2>
                  <p className="profile-position">
                    {selectedRep.party} • {selectedRep.state} {selectedRep.district}
                  </p>
                  <p className="profile-chamber">{selectedRep.chamber}</p>
                </div>
              </div>

              <div className="profile-content">
                <div className="profile-section">
                  <h3>Committee Assignments</h3>
                  <ul className="committees-list">
                    {selectedRep.committees.map((committee, index) => (
                      <li key={index}>{committee}</li>
                    ))}
                  </ul>
                </div>

                <div className="profile-section">
                  <h3>Recent Votes</h3>
                  <div className="votes-list">
                    {selectedRep.recentVotes.map((vote, index) => (
                      <div key={index} className="vote-item">
                        <span className="vote-bill">{vote.bill}</span>
                        <span className={`vote-decision ${vote.vote.toLowerCase()}`}>
                          {vote.vote}
                        </span>
                        <span className="vote-date">{vote.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="profile-actions">
                  <button className="btn-primary">Contact Representative</button>
                  <button className="btn-secondary">View Full Voting Record</button>
                  <button className="btn-secondary">Download Bio</button>
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

export default Representatives;
