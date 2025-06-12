import axios from 'axios';

const BASE_URL = 'https://statsapi.mlb.com/api/v1';

export const mlbApi = {
  // Get live game data
  getLiveGames: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/schedule?sportId=1&gameType=R&hydrate=team,linescore,game(content(summary,media(epg))),standings`);
      return response.data;
    } catch (error) {
      console.error('Error fetching live games:', error);
      throw new Error('Failed to fetch live games data: ' + error.message);
    }
  },

  // Get team standings
  getStandings: async () => {
    try {
      // Add standings type and season parameters for complete data
      const response = await axios.get(`${BASE_URL}/standings`, {
        params: {
          leagueId: '103,104',
          season: 2025,
          standingsTypes: 'regularSeason',
          hydrate: 'team,division'
        }
      });
      console.log('Standings API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching standings:', error);
      throw new Error('Failed to fetch standings data: ' + error.message);
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
  getLeagueLeaders: async (statGroup = 'hitting', leagueId) => {
    try {
      const stats = statGroup === 'hitting' 
        ? ['homeRuns', 'battingAverage', 'rbi', 'runs', 'stolenBases']
        : ['era', 'wins', 'strikeOuts', 'saves', 'whip'];
      
      // Use a fixed year for testing since we're in 2025
      const season = 2023;
      
      console.log(`Fetching ${statGroup} leaders for league ${leagueId} for season ${season}`);
      
      const promises = stats.map(stat => {
        console.log(`Fetching stat: ${stat}`);
        return axios.get(`${BASE_URL}/stats/leaders`, {
          params: {
            sportId: 1,
            leagueId: leagueId,
            stat: stat,
            limit: 10,
            group: statGroup,
            season: season,
            hydrate: 'person,team'
          }
        }).then(response => {
          console.log(`Got response for ${stat}:`, response.data);
          return response;
        }).catch(error => {
          console.error(`Error fetching ${stat} leaders:`, error);
          return { data: { leagueLeaders: [{ leaders: [] }] } };
        });
      });

      const responses = await Promise.all(promises);
      console.log('League leaders responses:', responses);
      
      const leaders = responses.map((response, index) => {
        const categoryData = response.data.leagueLeaders?.[0]?.leaders || [];
        return {
          category: stats[index],
          data: categoryData.map(leader => ({
            ...leader,
            value: leader.value,
            person: {
              id: leader.person?.id,
              fullName: leader.person?.fullName || 'Unknown Player'
            }
          }))
        };
      });

      return {
        stats,
        leaders
      };
    } catch (error) {
      console.error('Error fetching league leaders:', error);
      throw new Error(`Failed to fetch ${statGroup} leaders: ${error.message}`);
    } finally {
      console.log(`Finished fetching ${statGroup} leaders for league ${leagueId}`);
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
