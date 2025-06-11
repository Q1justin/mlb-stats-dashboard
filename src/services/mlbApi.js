import axios from 'axios';

const BASE_URL = 'https://statsapi.mlb.com/api/v1';

export const mlbApi = {
  // Get live game data
  getLiveGames: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/schedule?sportId=1&gameType=R&hydrate=team,linescore,game(content(summary,media(epg))),standings`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fetching live games:', error);
      throw error;
    }
  },

  // Get team standings
  getStandings: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/standings?leagueId=103,104`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching standings:', error);
      throw error;
    }
  },

  // Get player stats
  getPlayerStats: async (playerId) => {
    try {
      const response = await axios.get(`${BASE_URL}/people/${playerId}?hydrate=stats(group=[hitting,pitching],type=[season])`);
      return response.data;
    } catch (error) {
      console.error('Error fetching player stats:', error);
      throw error;
    }
  },

  // Get team roster
  getTeamRoster: async (teamId) => {
    try {
      const response = await axios.get(`${BASE_URL}/teams/${teamId}/roster/active`);
      return response.data;
    } catch (error) {
      console.error('Error fetching team roster:', error);
      throw error;
    }
  },

  // Get team statistics
  getTeamStats: async (teamId) => {
    try {
      const response = await axios.get(`${BASE_URL}/teams/${teamId}/stats?stats=season&group=hitting,pitching,fielding`);
      return response.data;
    } catch (error) {
      console.error('Error fetching team stats:', error);
      throw error;
    }
  },

  // Get league leaders
  getLeagueLeaders: async (statGroup = 'hitting', leagueId, season = 2025) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/stats/leaders?sportId=1&leagueId=${leagueId}&season=${season}&statGroup=${statGroup}&limit=10`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching league leaders:', error);
      throw error;
    }
  },

  // Get game schedule for a date range
  getSchedule: async (startDate, endDate) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/schedule?sportId=1&startDate=${startDate}&endDate=${endDate}&hydrate=team,linescore,probablePitcher,stats,game(content(summary))`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching schedule:', error);
      throw error;
    }
  },

  // Get head-to-head records for a team
  getHeadToHead: async (teamId) => {
    try {
      const response = await axios.get(`${BASE_URL}/teams/${teamId}/record?recordType=vsOpponent`);
      return response.data;
    } catch (error) {
      console.error('Error fetching head to head records:', error);
      throw error;
    }
  },

  // Get player rankings
  getPlayerRankings: async (statType = 'season', group = 'hitting') => {
    try {
      const response = await axios.get(
        `${BASE_URL}/stats?stats=${statType}&group=${group}&sortStat=avg&limit=10&hydrate=person`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching player rankings:', error);
      throw error;
    }
  }
};
