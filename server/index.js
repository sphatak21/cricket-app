import express from "express"; 
import cors from "cors"; 
import playersController from "./players/player_controller.js"; 
import teamsController from "./teams/team_controller.js"; 
import matchesController from "./matches/match_controller.js"; 
const app = express(); 

app.use(express.json()); //convert request to json
app.use(cors()); //requests
app.use("/api/players", playersController)
app.use("/api/teams", teamsController)
app.use("/api/matches", matchesController)

app.listen(3000, () => console.log("SERVER STARTED")); 