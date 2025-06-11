import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Box,
  Skeleton,
} from '@mui/material';
import { mlbApi } from '../../services/mlbApi';

// Sample top players - in a real app, we'd fetch this from the API
const TOP_PLAYERS = {
  batting: [
    { id: 545361, name: "Mike Trout", stat: ".328", category: "AVG" },
    { id: 660670, name: "Juan Soto", stat: "22", category: "HR" },
    { id: 665487, name: "Ronald Acuña Jr.", stat: "34", category: "SB" },
  ],
  pitching: [
    { id: 477132, name: "Max Scherzer", stat: "2.45", category: "ERA" },
    { id: 543037, name: "Gerrit Cole", stat: "157", category: "SO" },
    { id: 434378, name: "Justin Verlander", stat: "12", category: "W" },
  ],
};

function TopPlayers({ loading }) {
  const [category, setCategory] = useState(0);
  const [players, setPlayers] = useState(TOP_PLAYERS);

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };

  if (loading) {
    return <Skeleton variant="rectangular" height={400} />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={category} onChange={handleCategoryChange} centered>
        <Tab label="Batting" />
        <Tab label="Pitching" />
      </Tabs>
      
      <List>
        {players[category === 0 ? 'batting' : 'pitching'].map((player) => (
          <ListItem key={player.id}>
            <ListItemAvatar>
              <Avatar alt={player.name} src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${player.id}/headshot/67/current`} />
            </ListItemAvatar>
            <ListItemText
              primary={player.name}
              secondary={
                <Typography component="span" variant="body2" color="text.primary">
                  {player.stat} {player.category}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TopPlayers;
