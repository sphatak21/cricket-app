import mysql from 'mysql2'
import {separateNonNullFieldsCreate} from "../util.js"
class match_dao {
     /**
     * @param {mysql.Pool} pool - pool
     */
    constructor (pool) {
        this.pool = pool; 
    }

    async getAllMatches_ongoingFlag(ongoing_flag) {
        try {
            const result = await this.pool.promise().query(
            `
                SELECT matches.match_id, teams_home.team_name AS home_team, teams_away.team_name AS away_team, matches.location
                FROM matches
                JOIN teams AS teams_home ON matches.home_team = teams_home.team_id
                JOIN teams AS teams_away ON matches.away_team = teams_away.team_id
                WHERE matches.isOngoing = ?;
            `, ongoing_flag);
            // const result = await this.pool.promise().query("SELECT match_id, home_team, away_team, location FROM matches WHERE isOngoing = ?", ongoing_flag);
            console.log(result[0]); 
            return result[0]; 
        } catch (error) {
            console.log(error.message); 
            throw new Error(`Error getting ongoing/nongoing matches: ${error.message}`);
           
        }
    }

    async createMatch(body) {
        try {
            const { stringNonNullFields, stringNonNullValues } = separateNonNullFieldsCreate(body);
            const result = await this.pool.promise().query(
                `INSERT INTO matches (${stringNonNullFields}) VALUES (${stringNonNullValues})`
            ); 
            return result[0].insertId; 

        } catch (error) {
            throw new Error(`Error creating new match: ${error.message}`);
        }
    }

    async getMatch(match_id) {
        const result = await this.pool.promise().query(
            `SELECT match_id FROM matches WHERE match_id = ?`, match_id
        )
        return result[0]
    }

    async patchOngoingFlag(match_id, ongoing) {
        const result = await this.pool.promise().query(
            `UPDATE matches SET isOngoing = ? WHERE ongoing = ?`, match_id, ongoing
        )
        return result[0]
    }

    async getInnings(match_id) {
        const result = await this.pool.promise().query(
            `SELECT inning_number FROM innings WHERE match_id = ? ORDER BY inning_number DESC`, match_id
        )
        return result[0]; 
    }

    async getTeamsForMatch(match_id) {
        const result = await this.pool.promise().query(
            `SELECT matches.match_id, teams_home.team_id AS home_team_id, teams_away.team_id AS away_team_id, teams_home.team_name AS home_team, teams_away.team_name AS away_team, matches.location
            FROM matches
            JOIN teams AS teams_home ON matches.home_team = teams_home.team_id
            JOIN teams AS teams_away ON matches.away_team = teams_away.team_id
            WHERE matches.match_id = ?;`, match_id
        )
        
        return result[0][0]
    }

    async createInningForMatch(data) {
        const { stringNonNullFields, stringNonNullValues } = separateNonNullFieldsCreate(data);

        const result = await this.pool.promise().query(
            `INSERT INTO innings (${stringNonNullFields}) VALUES (${stringNonNullValues})`
        )
        console.log(result)
        return result[0].insertId; 
    }

    async getInningsCountForMatch(match_id) {
        const result = await this.pool.promise().query(
            `SELECT COUNT(*) FROM innings WHERE match_id = ?`, match_id
        )
        return result[0][0]['COUNT(*)']
    }

}
export default match_dao; 