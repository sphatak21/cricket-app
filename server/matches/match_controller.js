import express from 'express'; 
import match_dao from './match_dao.js';
import sql_connection_pool from '../sql_connection_pool.js';

const router = express.Router(); 
const match_Dao = new match_dao(sql_connection_pool); 

// get ongoing matches
router.get("/ongoing/:ongoing", async (req, res) => {
    const ongoing = req.params.ongoing;  
    try {
        const result = await match_Dao.getAllMatches_ongoingFlag(ongoing);
        res.status(200).json(result); 
    } catch {
        res.status(404).json({}); 
    }
})

// create match 
router.post("/", async (req, res) => {
    const body = req.body; 
    if (body.home_team == undefined || body.away_team == undefined) {
        res.status(400).json("Cannot create match with less than two teams"); 
    }
    try { 
       const result = await match_Dao.createMatch(body); 
       res.status(200).json(result); 
        
    } catch (error) {
        console.log(error); 
    }
})

// setting the ongoing flag of a given match. 
router.patch("/:id/ongoing/:ongoing", async (req, res) => {
    const match_id = req.params.id;  
    const status_change = req.params.ongoing; 
    try {
        const result = await match_Dao.patchOngoingFlag(match_id, status_change); 
        res.status(200).json(result); 
    } catch (e) {
        console.log(e); 
    }
})

// get innings of a particular match
router.get("/:id/innings", async (req, res) => {
    try {
        const num_of_innings = await match_Dao.getInningsCountForMatch(req.params.id)
        if (num_of_innings == 0) {
            res.status(404).json("No innings for match"); 
        } else {
            try {   
                const result = await match_Dao.getInnings(req.params.id); 
                res.status(200).json(result); 
        
            } catch (e) {
                console.log(e)
                res.status(404).json("Error"); 
            }
        }
        
    } catch(e) {
        res.status(404).json("Match not found")
    }

})

// get teams in match
router.get("/:id/teams", async (req, res) => {
    try {
        const teams = await match_Dao.getTeamsForMatch(req.params.id); 
        res.status(200).json(teams); 
    } catch (e) {
        res.status(404).json("Match not found"); 
    }
})

// get innings of match
router.post("/:match_id/innings/", async (req, res) => {
    const data = req.body; 
    data.match_id = req.params.match_id
    try {
        const innings_count = await match_Dao.getInningsCountForMatch(data.match_id); 
        data.inning_number = 1 + innings_count; 
    } catch (e) {
        res.status(404).json("Match not found")
    }
    try {
        const inning_id = await match_Dao.createInningForMatch(data)
        console.log(inning_id)
        res.status(200).json(inning_id)
    } catch (e) {
        console.log(e)
    }
})

// get number of innings in match 
router.post("/:match_id/innings/count", async (req, res) => {
    try {
        const innings_count = await match_Dao.getInningsCountForMatch(req.params.match_id); 
        res.status(200).json(innings_count); 
    } catch (e) {
        res.status(404).json("Match not found"); 
    }
})


export default router; 