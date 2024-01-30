import mysql from "mysql2";
import { separateNonNullFieldsCreate, separateNonNullFieldsUpdate } from "../util.js";
import { query } from "express";

class TeamDAO {
  /**
   * @param {mysql.Pool} pool - pool
   */
  constructor(pool) {
    this.pool = pool;
  }

  // Method to create a new team
  async createTeam(teamData) {
    const { stringNonNullFields, stringNonNullValues } = separateNonNullFieldsCreate(teamData);
    try {
      const result = await this.pool.promise().query("INSERT INTO teams (" + stringNonNullFields + ") VALUES (" + stringNonNullValues + ")");
      return result[0].insertId;
    } catch (error) {
      throw new Error(`Error creating team: ${error.message}`);
    }
  }

  // Method to get a team by ID
  async getTeamById(teamId) {
    try {
      const [results] = await this.pool.promise().query('SELECT team_id, team_name FROM teams WHERE team_id = ?', teamId);
      return results[0];
    } catch (error) {
      throw new Error(`Error getting team: ${error.message}`);
    }
  }
  // Getting teams by name
  async getTeamsByName_contains(team_name) {
    try {
        const query = "%" + team_name + "%"
        const [results] = await this.pool.promise().query('SELECT team_id, team_name FROM teams WHERE team_name LIKE ?', query);
        return [results][0];
      } catch (error) {
        throw new Error(`Error getting team: ${error.message}`);
      }
  }
  // Method to get Team by Name and Id
  async getTeamsByNameAndId(team_id, team_name) {
    try {
        const [results] = await this.pool.promise().query('SELECT team_id, team_name FROM teams WHERE team_id = ? AND team_name = ? ', team_id, team_name);
        return results[0];
      } catch (error) {
        throw new Error(`Error getting team: ${error.message}`);
      }
  }

  // Method to update an existing team
  async updateTeam(teamId, updateData) {
    const formattedUpdate = separateNonNullFieldsUpdate(updateData);
    try {
      const result = await this.pool.promise().query(
        "UPDATE teams SET " + formattedUpdate + "  WHERE team_id = ?", teamId
      );
      return result[0].insertId;
    } catch (error) {
      throw new Error(`Error updating team: ${error.message}`);
    }
  }

  // Method to delete a team by ID
  async deleteTeam(teamId) {
    try {
      const result = await this.pool.promise().query('DELETE FROM teams WHERE team_id = ?', teamId);
      return result;
    } catch (error) {
      throw new Error(`Error deleting team: ${error.message}`);
    }
  }

  async getAllTeams() {
        try {
            const result = await this.pool.promise().query('SELECT team_id, team_name FROM teams'); 
            return result[0]; 
        } catch (error) {
            throw new Error(`Error retriveing all teams: ${error.message}`);
        }
  }
}

export default TeamDAO;
