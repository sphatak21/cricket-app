import express from 'express'; 
import PlayerDAO from './player_dao.js';
import sql_connection_pool from '../sql_connection_pool.js';

const router = express.Router(); 
const player_dao = new PlayerDAO(sql_connection_pool); 


router.get("/", (req, res) =>  {
    console.log("player get api hit"); 

})

export default router; 