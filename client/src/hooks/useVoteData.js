
// src/hooks/useVoteData.js
import { useState, useEffect } from 'react';

export const useVoteData = (filters) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock data fetch
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock parliament data
      const mockData = {
        totalSeats: 435,
        seats: []
      };

      // Generate mock seats
      for (let i = 0; i < 435; i++) {
        const parties = ['democrat', 'republican', 'independent'];
        const randomParty = parties[Math.floor(Math.random() * parties.length)];
        
        mockData.seats.push({
          party: randomParty,
          representative: {
            name: `Rep ${i + 1}`,
            state: 'CA',
            district: i + 1
          }
        });
      }

      setData(mockData);
      setLoading(false);
    };

    fetchData();
  }, [filters]);

  return { data, loading, error };
};
