import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { mlbApi } from '../../services/mlbApi';
import LiveGames from './LiveGames';
import Standings from '../Standings/Standings';
import TopPlayers from '../PlayerStats/TopPlayers';
import LeagueLeaders from '../PlayerStats/LeagueLeaders';

function Dashboard() {
  const [liveGames, setLiveGames] = useState([]);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesData, standingsData] = await Promise.all([
          mlbApi.getLiveGames(),
          mlbApi.getStandings()
        ]);
        
        setLiveGames(gamesData.dates[0]?.games || []);
        setStandings(standingsData.records || []);
        setLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
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
          {/* Live Games Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Live Games
              </Typography>
              <LiveGames games={liveGames} loading={loading} />
            </Paper>
          </Grid>

          {/* Standings Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Standings
              </Typography>
              <Standings standings={standings} loading={loading} />
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

          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Top Players
              </Typography>
              <TopPlayers />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;
