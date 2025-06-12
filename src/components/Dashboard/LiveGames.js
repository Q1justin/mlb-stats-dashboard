import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Skeleton, Box, IconButton, Stack, Paper } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

function LiveGames({ games, loading }) {
  const [currentPage, setCurrentPage] = useState(0);
  const gamesPerPage = 5;
  const totalPages = Math.ceil(games.length / gamesPerPage);
  
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };
  
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };
  
  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5].map((skeleton) => (
            <Grid item xs={12} sm={6} lg={2.4} key={skeleton}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (!games.length) {
    return (
      <Box sx={{ width: '100%' }}>
        <Typography variant="body1" color="textSecondary">
          No live games at the moment
        </Typography>
      </Box>
    );
  }

  const currentGames = games.slice(
    currentPage * gamesPerPage,
    (currentPage + 1) * gamesPerPage
  );

  return (
    <Paper sx={{ width: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={13}>
          {currentGames.map((game) => (
            <Grid item xs={12} sm={6} lg={2.4} key={game.gamePk}>
              <Card sx={{ 
                height: 180,
                minWidth: { xs: '100%', sm: '100%' },
                maxWidth: '100%'
              }}>
                <CardContent sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: { xs: 2, sm: 2 }
                }}>
                  <Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mb: 2
                    }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontSize: { xs: '0.9rem', sm: '0.9rem' },
                          width: '75%',
                          pr: 1,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {game.teams.away.team.name}
                      </Typography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontSize: { xs: '0.9rem', sm: '0.9rem' },
                          width: '25%',
                          textAlign: 'right'
                        }}
                      >
                        {game.linescore?.teams?.away?.runs || 0}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2
                    }}>
                      <Typography 
                        variant="h6"
                        sx={{ 
                          fontSize: { xs: '0.9rem', sm: '0.9rem' },
                          width: '75%',
                          pr: 1,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {game.teams.home.team.name}
                      </Typography>
                      <Typography 
                        variant="h6"
                        sx={{ 
                          fontSize: { xs: '0.9rem', sm: '0.9rem' },
                          width: '25%',
                          textAlign: 'right'
                        }}
                      >
                        {game.linescore?.teams?.home?.runs || 0}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography 
                      color="textSecondary" 
                      sx={{ 
                        fontSize: '0.8rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      gutterBottom
                    >
                      {game.status.detailedState}
                    </Typography>
                    {game.linescore && (
                      <Typography 
                        variant="body2"
                        sx={{ 
                          fontSize: '0.8rem'
                        }}
                      >
                        {`Inning: ${game.linescore.currentInning || '-'} ${
                          game.linescore.inningState || ''
                        }`}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {totalPages > 1 && (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              color="primary"
            >
              <ChevronLeft />
            </IconButton>
            <Typography>
              Page {currentPage + 1} of {totalPages}
            </Typography>
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              color="primary"
            >
              <ChevronRight />
            </IconButton>
          </Stack>
        )}
      </Box>
    </Paper>
  );
}

export default LiveGames;
