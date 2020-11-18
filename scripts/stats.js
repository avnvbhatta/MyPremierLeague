import axiosAPIFootball from "../helpers/helpers";
import {checkLoggedIn} from "../helpers/auth";

//Check if stored user data is valid
checkLoggedIn();

const userData = JSON.parse(localStorage.getItem('userData'));
const {teamSelect} = userData;

//Get Top Scorers
axiosAPIFootball.get(`/topscorers/2790`)
.then(function (response) {
    // handle success
    let data = response.data.api.topscorers;
    let ul = document.getElementById("topScorersList");
    data.forEach(scorer => {
        let {player_name, team_name, goals: {total, assists}} = scorer;
        ul.innerHTML += (`<li>${player_name} - ${team_name} - ${total} Goals ${assists === null ? 0 : assists} Assists</li>`);
    })
  
})
.catch(function (error) {
  // handle error
})
.then(function () {
  // always executed
});


//Get Top Scorers
axiosAPIFootball.get(`/statistics/2790/${teamSelect}`)
.then(function (response) {
  // handle success
    let data = response.data.api.statistics;
    let ul = document.getElementById("teamStatsList");
    let {
        goals : {
            goalsAgainst: {total: totalAgainst}, 
            goalsFor: {total: totalFor} 
        }, 
        matchs: {
            draws: {total: totalDraws}, 
            loses: {total: totalLosses}, 
            matchsPlayed: {total: totalMatches}, 
            wins: {total: totalWins}
        }
    } = data;


    ul.innerHTML += (`<li>Goals <br> For: ${totalFor} Against: ${totalAgainst} <br> Matches <br> Played: ${totalMatches} Wins: ${totalWins} Draws: ${totalDraws} Losses: ${totalLosses}</li>`);


})
.catch(function (error) {
  // handle error
})
.then(function () {
  // always executed
});