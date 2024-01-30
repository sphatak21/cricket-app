import express from 'express'; 
import TeamDAO from './team_dao.js';
import sql_connection_pool from '../sql_connection_pool.js';

const router = express.Router(); 
const team_dao = new TeamDAO(sql_connection_pool); 

router.get('/', async (req, res) => {
    try {
        const result = await team_dao.getAllTeams(); 
        res.status(200).json(result); 
    } catch(err) {
        res.status(403).json("Error while retrieving all teams"); 
    }
})

router.get('/team_name/:team_name', async (req, res) => {
    try {
        const result = await team_dao.getTeamsByName_contains(req.params.team_name); 
        console.log(result); 
        if (result == undefined) {
            res.status(404).json([])
        } else {
            res.status(200).json(result); 
        }
        
    } catch (err) {
        res.status(404).json("No teams found with this name")
    }
})

router.post('/', async (req, res) => {
    try {
        const body = req.body; 
        const result = await team_dao.createTeam(body); 
        console.log(result); 
        return res.status(200).json(result); 
    } catch (error) {
        console.log(error.message); 
        res.status(400).json("Error while creating team, try again"); 
    }
})

export default router; 