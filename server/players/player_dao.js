import mysql from "mysql2"; 
import { separateNonNullFieldsCreate, separateNonNullFieldsUpdate } from "../util.js"
class PlayerDAO {
    /**
     * @param {mysql.Pool} pool - pool
     */
    constructor(pool) {
        this.pool = pool; 
    }

    // Method to create a new player
    async createPlayer(playerData) {
        const { stringNonNullFields, stringNonNullValues } = separateNonNullFieldsCreate(playerData);
        try {
            const result = await this.pool.promise().query("INSERT INTO players (" + stringNonNullFields  + ") VALUES ("+ stringNonNullValues +")")
            return result[0].insertId;
        } catch (error) {
            throw new Error(`Error creating player: ${error.message}`);
        }
    }
    // Method to get a player by ID
    async getPlayerById(playerId) {
        try {
            const [results] = await this.pool.promise().query('SELECT player_id, first_name, last_name, middle_name, class_year FROM players WHERE player_id = ?', playerId); 
            return results[0]; 
        } catch (error) {
            throw new Error(`Error getting player : ${error.message}`); 
        }
            
    }

    // Method to update an existing player
    async updatePlayer(playerId, updateData) {
        const formattedUpdate = separateNonNullFieldsUpdate(updateData);
        try {
            console.log(formattedUpdate); 
            const result = await this.pool.promise().query(
                "UPDATE players SET " + formattedUpdate + "  WHERE player_id = ? " , playerId)
            return result[0].insertId;
        } catch (error) {
            throw new Error(`Error creating player: ${error.message}`);
        }
   
    }

    // Method to delete a player by ID
    async deletePlayer(playerId) {
        try {
            const result = await this.pool.promise().query('DELETE FROM player WHERE player_id = ?', playerId)
            return result;
        } catch (error) {
            throw new Error(`Error deleting player: ${error.message}`);
        }
    }
  
}

export default PlayerDAO;