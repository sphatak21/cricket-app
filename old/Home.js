import { useEffect, useState } from "react";
const Home = () => {
    const [teams, displayTeams] = useState(null); 

    useEffect(() => {
        const getTeams = async () => {
            const response = await fetch('http://localhost:3000/api/teams'); 
            const json = await response.json(); 
            if (response.ok) {
                displayTeams(json); 
            }
        }
        getTeams(); 
    }, [])
    return (
        <div id = 'home'> 
            <div className="teamLists">
                {teams && teams.map((team) => {
                    return (<div key = {team.team_id}>{team.team_name}</div>)
                })}
            </div>
            
        </div>
    )

}
   
export default Home; 