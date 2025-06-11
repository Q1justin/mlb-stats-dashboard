import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { mlbApi } from '../../services/mlbApi';
import '../../styles/LeagueLeaders.css';

const LeagueLeaders = () => {
  const [leaders, setLeaders] = useState({ AL: {}, NL: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const leagues = {
    AL: '103',
    NL: '104'
  };

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        setLoading(true);
        const results = {};
        
        for (const [league, id] of Object.entries(leagues)) {
          const [hitting, pitching] = await Promise.all([
            mlbApi.getLeagueLeaders('hitting', id),
            mlbApi.getLeagueLeaders('pitching', id)
          ]);
          
          results[league] = {
            hitting: hitting.leagueLeaders?.[0]?.leaders || [],
            pitching: pitching.leagueLeaders?.[0]?.leaders || []
          };
        }
        
        setLeaders(results);
      } catch (err) {
        setError('Failed to fetch league leaders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" p={3}><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="league-leaders">
      <Grid container spacing={3}>
        {Object.entries(leaders).map(([league, data]) => (
          <Grid item xs={12} md={6} key={league}>
            <Box className="league-section">
              <Typography variant="h6" gutterBottom>{league} Leaders</Typography>
              
              {/* Hitting Leaders */}
              <Box mb={3}>
                <Typography variant="subtitle1" gutterBottom>Hitting</Typography>
                {data.hitting?.slice(0, 5).map((entry, index) => (
                  <Box key={index} className="leader-row" display="flex" justifyContent="space-between">
                    <Typography variant="body2">
                      {index + 1}. {entry.person?.fullName}
                    </Typography>
                    <Typography variant="body2">
                      {entry.value} {entry.category}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Pitching Leaders */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>Pitching</Typography>
                {data.pitching?.slice(0, 5).map((entry, index) => (
                  <Box key={index} className="leader-row" display="flex" justifyContent="space-between">
                    <Typography variant="body2">
                      {index + 1}. {entry.person?.fullName}
                    </Typography>
                    <Typography variant="body2">
                      {entry.value} {entry.category}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LeagueLeaders;
