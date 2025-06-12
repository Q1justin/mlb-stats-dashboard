import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import '../../styles/LeagueLeaders.css';

const formatStat = (category, value) => {
  if (value === undefined || value === null) return '-';
  
  switch (category) {
    case 'battingAverage':
      return `.${String(parseFloat(value).toFixed(3)).split('.')[1] || '000'}`;
    case 'era':
    case 'whip':
      return parseFloat(value).toFixed(2);
    default:
      return value;
  }
};

const getStatName = (category) => {
  const statNames = {
    battingAverage: 'AVG',
    homeRuns: 'HR',
    rbi: 'RBI',
    runs: 'R',
    stolenBases: 'SB',
    era: 'ERA',
    wins: 'W',
    strikeOuts: 'K',
    saves: 'SV',
    whip: 'WHIP'
  };
  return statNames[category] || category;
};

const LeagueLeaderSection = ({ title, data }) => {
  if (!Array.isArray(data)) {
    return (
      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>{title}</Typography>
        <Typography color="text.secondary">No {title.toLowerCase()} leaders available</Typography>
      </Box>
    );
  }

  return (
    <Box mb={3}>
      <Typography variant="subtitle1" gutterBottom>{title}</Typography>
      {data.map(({ category, data: players }) => {
        if (!Array.isArray(players) || players.length === 0) return null;
        
        return (
          <Box key={category} mb={2}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              {getStatName(category)}
            </Typography>
            {players.slice(0, 3).map((player, index) => (
              <Box 
                key={`${player.person?.id || index}`} 
                className="leader-row" 
                display="flex" 
                justifyContent="space-between"
                alignItems="center"
                p={1}
                sx={{
                  borderBottom: index < 2 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.04)'
                  }
                }}
              >
                <Box display="flex" alignItems="center">
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1, minWidth: '20px' }}>
                    {index + 1}.
                  </Typography>
                  <Typography variant="body2">
                    {player.person?.fullName || 'Unknown Player'}
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight="medium">
                  {formatStat(category, player.value)}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      })}
    </Box>
  );
};

// Sample data for league leaders
const SAMPLE_LEADERS = {
  AL: {
    hitting: [
      {
        category: 'battingAverage',
        data: [
          { person: { id: 660670, fullName: 'Juan Soto' }, value: .345 },
          { person: { id: 545361, fullName: 'Mike Trout' }, value: .328 },
          { person: { id: 664034, fullName: 'Bo Bichette' }, value: .322 }
        ]
      },
      {
        category: 'homeRuns',
        data: [
          { person: { id: 592450, fullName: 'Aaron Judge' }, value: 22 },
          { person: { id: 545361, fullName: 'Mike Trout' }, value: 19 },
          { person: { id: 665487, fullName: 'Yordan Alvarez' }, value: 18 }
        ]
      },
      {
        category: 'rbi',
        data: [
          { person: { id: 592450, fullName: 'Aaron Judge' }, value: 58 },
          { person: { id: 665487, fullName: 'Yordan Alvarez' }, value: 52 },
          { person: { id: 660670, fullName: 'Juan Soto' }, value: 48 }
        ]
      }
    ],
    pitching: [
      {
        category: 'era',
        data: [
          { person: { id: 434378, fullName: 'Justin Verlander' }, value: 2.25 },
          { person: { id: 605483, fullName: 'Shane McClanahan' }, value: 2.45 },
          { person: { id: 543037, fullName: 'Gerrit Cole' }, value: 2.64 }
        ]
      },
      {
        category: 'wins',
        data: [
          { person: { id: 543037, fullName: 'Gerrit Cole' }, value: 10 },
          { person: { id: 434378, fullName: 'Justin Verlander' }, value: 9 },
          { person: { id: 605483, fullName: 'Shane McClanahan' }, value: 8 }
        ]
      },
      {
        category: 'strikeOuts',
        data: [
          { person: { id: 543037, fullName: 'Gerrit Cole' }, value: 125 },
          { person: { id: 605483, fullName: 'Shane McClanahan' }, value: 112 },
          { person: { id: 434378, fullName: 'Justin Verlander' }, value: 98 }
        ]
      }
    ]
  },
  NL: {
    hitting: [
      {
        category: 'battingAverage',
        data: [
          { person: { id: 605141, fullName: 'Freddie Freeman' }, value: .338 },
          { person: { id: 671495, fullName: 'Corbin Carroll' }, value: .330 },
          { person: { id: 592518, fullName: 'Mookie Betts' }, value: .325 }
        ]
      },
      {
        category: 'homeRuns',
        data: [
          { person: { id: 592518, fullName: 'Mookie Betts' }, value: 20 },
          { person: { id: 671495, fullName: 'Pete Alonso' }, value: 19 },
          { person: { id: 547180, fullName: 'Matt Olson' }, value: 18 }
        ]
      },
      {
        category: 'rbi',
        data: [
          { person: { id: 671495, fullName: 'Pete Alonso' }, value: 55 },
          { person: { id: 547180, fullName: 'Matt Olson' }, value: 52 },
          { person: { id: 592518, fullName: 'Mookie Betts' }, value: 48 }
        ]
      }
    ],
    pitching: [
      {
        category: 'era',
        data: [
          { person: { id: 477132, fullName: 'Max Scherzer' }, value: 2.35 },
          { person: { id: 605400, fullName: 'Zac Gallen' }, value: 2.48 },
          { person: { id: 592789, fullName: 'Blake Snell' }, value: 2.65 }
        ]
      },
      {
        category: 'wins',
        data: [
          { person: { id: 605400, fullName: 'Zac Gallen' }, value: 9 },
          { person: { id: 477132, fullName: 'Max Scherzer' }, value: 8 },
          { person: { id: 592789, fullName: 'Blake Snell' }, value: 8 }
        ]
      },
      {
        category: 'strikeOuts',
        data: [
          { person: { id: 592789, fullName: 'Blake Snell' }, value: 121 },
          { person: { id: 477132, fullName: 'Max Scherzer' }, value: 110 },
          { person: { id: 605400, fullName: 'Zac Gallen' }, value: 105 }
        ]
      }
    ]
  }
};

const LeagueLeaders = () => {
  const [leaders, setLeaders] = useState(SAMPLE_LEADERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const leagues = {
    AL: '103',
    NL: '104'
  };

  useEffect(() => {
    // Simulate loading state for better UX
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
              <LeagueLeaderSection title="Hitting" data={data.hitting} />
              <LeagueLeaderSection title="Pitching" data={data.pitching} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LeagueLeaders;
