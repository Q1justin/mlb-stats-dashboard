import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Skeleton,
  Typography,
} from '@mui/material';

function Standings({ data = [], loading }) {
  const [selectedDivision, setSelectedDivision] = useState(0);

  if (loading) {
    return (
      <Skeleton variant="rectangular" height={400} />
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    console.log('Standings data is empty or invalid:', data);
    return (
      <Typography color="textSecondary" align="center" sx={{ p: 3 }}>
        No standings data available
      </Typography>
    );
  }

  console.log('Current standings data:', data);

  const handleTabChange = (event, newValue) => {
    setSelectedDivision(newValue);
  };

  const divisions = data.filter(record => record.division && record.division.name);
  
  const getCurrentDivision = () => {
    return divisions[selectedDivision] || { teamRecords: [] };
  };

  return (
    <>
      <Tabs
        value={selectedDivision}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {divisions.map((record, index) => (
          <Tab 
            key={record.division.id} 
            label={record.division.name}
            sx={{ minWidth: 120 }}
          />
        ))}
      </Tabs>
      
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">W</TableCell>
              <TableCell align="right">L</TableCell>
              <TableCell align="right">PCT</TableCell>
              <TableCell align="right">GB</TableCell>
              <TableCell align="right">L10</TableCell>
              <TableCell align="right">STRK</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getCurrentDivision().teamRecords?.map((team) => (
              <TableRow key={team.team.id}>
                <TableCell component="th" scope="row">
                  {team.team.name}
                </TableCell>
                <TableCell align="right">{team.wins}</TableCell>
                <TableCell align="right">{team.losses}</TableCell>
                <TableCell align="right">{team.winningPercentage}</TableCell>
                <TableCell align="right">{team.gamesBack}</TableCell>
                <TableCell align="right">{team.records?.splitRecords?.find(r => r.type === 'lastTen')?.wins}-
                  {team.records?.splitRecords?.find(r => r.type === 'lastTen')?.losses}</TableCell>
                <TableCell align="right">{team.streak?.streakCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Standings;
