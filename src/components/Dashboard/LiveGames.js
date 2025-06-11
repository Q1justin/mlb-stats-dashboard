import React from 'react';
import { Grid, Card, CardContent, Typography, Skeleton, Box } from '@mui/material';

function LiveGames({ games, loading }) {
  if (loading) {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3].map((skeleton) => (
          <Grid item xs={12} sm={6} md={4} key={skeleton}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!games.length) {
    return (
      <Typography variant="body1" color="textSecondary">
        No live games at the moment
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {games.map((game) => (
        <Grid item xs={12} sm={6} md={4} key={game.gamePk}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">
                  {game.teams.away.team.name}
                </Typography>
                <Typography variant="h6">
                  {game.linescore?.teams?.away?.runs || 0}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">
                  {game.teams.home.team.name}
                </Typography>
                <Typography variant="h6">
                  {game.linescore?.teams?.home?.runs || 0}
                </Typography>
              </Box>
              <Typography color="textSecondary">
                {game.status.detailedState}
              </Typography>
              {game.linescore && (
                <Typography variant="body2">
                  {`Inning: ${game.linescore.currentInning || '-'} ${
                    game.linescore.inningState || ''
                  }`}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default LiveGames;
