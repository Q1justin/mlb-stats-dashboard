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
} from '@mui/material';

function Standings({ data, loading }) {
  const [selectedDivision, setSelectedDivision] = useState(0);

  if (loading) {
    return (
      <Skeleton variant="rectangular" height={400} />
    );
  }

  const handleTabChange = (event, newValue) => {
    setSelectedDivision(newValue);
  };

  const getCurrentDivision = () => {
    return data[selectedDivision] || { teamRecords: [] };
  };

  return (
    <>
      <Tabs
        value={selectedDivision}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {data.map((division, index) => (
          <Tab key={index} label={division.division.name} />
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
