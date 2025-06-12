import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { mlbApi } from '../../services/mlbApi';
import LiveGames from './LiveGames';
import Standings from '../Standings/Standings';
import LeagueLeaders from '../PlayerStats/LeagueLeaders';

function Dashboard() {
  const [liveGames, setLiveGames] = useState([]);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [gamesData, standingsData] = await Promise.all([
          mlbApi.getLiveGames(),
          mlbApi.getStandings()
        ]);
        
        setLiveGames(gamesData.dates?.[0]?.games || []);
        // MLB API returns standings in the records array
        if (standingsData && Array.isArray(standingsData.records)) {
          console.log('Setting standings data:', standingsData.records);
          setStandings(standingsData.records);
        } else {
          console.error('Invalid standings data:', standingsData);
          setError('Unable to load standings data');
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, py: 3 }}>
        <Grid container spacing={3}>
          {error ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography color="error" align="center">
                  {error}
                </Typography>
              </Paper>
            </Grid>
          ) : (
            <>
              {/* Live Games Section */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Live Games
                  </Typography>
                  <LiveGames games={liveGames} loading={loading} />
                </Paper>
              </Grid>
            </>
          )}

          {/* Standings Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Standings
              </Typography>
              <Standings data={standings} loading={loading} />
            </Paper>
          </Grid>

          {/* League Leaders and Top Players Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                League Leaders
              </Typography>
              <LeagueLeaders />
            </Paper>
          </Grid>


        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;
