import axiosAPIFootball from "../helpers/helpers";
import teamsData from "../helpers/teamsData";
import {checkLoggedIn} from "../helpers/auth";

//Check if stored user data is valid
checkLoggedIn();

const userData = JSON.parse(localStorage.getItem('userData'));
const {teamSelect} = userData;
const {logo, colors} = teamsData[teamSelect];
document.getElementsByTagName('body')[0].style.backgroundColor = colors;
document.getElementById('userClubLogo').src = logo;


  

//Get Top Scorers
axiosAPIFootball.get(`/topscorers/2790`)
.then(function (response) {
    // handle success
    let data = response.data.api.topscorers;
    let topScorersList = document.getElementById("topScorersList");
    

    data.forEach(scorer => {
        console.log(scorer);
        let {player_name, team_id, team_name, goals: {total, assists}} = scorer;
        let {logo} = teamsData[team_id];
        topScorersList.innerHTML += 
        (`<div class="scorerRow">
          <img src=${logo} alt="scorerClubLogo" />
          <div class="scorerDetails">
              <div class="scorerName">${player_name}</div>
              <div class="scorerTeam">${team_name}</div>
              <div class="goals">${total} Goals ${assists === null ? 0 : assists} Assists</div>
          </div>
        </div>`);
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
    console.log('statsdata', data);
    let teamStatsList = document.getElementById("teamStatsList");
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


    teamStatsList.innerHTML += 
    `<div class="teamStats">
      <img class="teamStatsLogo" src=${logo} alt="teamStatsLogo"/> 
      <h2>Goals</h2>
      <div class="goals">
          <p>Scored: ${totalFor}</p>
          <p>Conceded: ${totalAgainst}</p>
      </div>
      <h2>Matches</h2>
      <div class="matches">
          <p>Played: ${totalMatches}</p>
          <p>Wins: ${totalWins}</p>
          <p>Draws: ${totalDraws}</p>
          <p>Losses: ${totalLosses}</p>
      </div>
    </div>`;


})
.catch(function (error) {
  // handle error
})
.then(function () {
  // always executed
});