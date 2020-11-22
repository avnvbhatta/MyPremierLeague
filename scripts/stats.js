import axiosAPIFootball from "../helpers/helpers";
import teamsData from "../helpers/teamsData";
import {checkLoggedIn} from "../helpers/auth";

//Check if stored user data is valid
checkLoggedIn();

//Get userdata stroed from localstorage
const userData = JSON.parse(localStorage.getItem('userData'));
const {teamSelect} = userData;
const {logo, colors} = teamsData[teamSelect];

//set background colors based on club selected
document.getElementsByTagName('body')[0].style.backgroundColor = colors;
//get club's logo and place it on navbar
document.getElementById('userClubLogo').src = logo;
//highlight the navbar by underlining the current page
document.getElementsByTagName('a')[2].innerHTML += `<div class="underline"></div>`;


//Get Top Scorers
axiosAPIFootball.get(`/topscorers/2790`)
.then(function (response) {
    // handle success
    let data = response.data.api.topscorers;
    //Get element to paste data into
    let topScorersList = document.getElementById("topScorersList");
    
    //For each scorer data, append a 'scorerRow' div with data
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
    let teamStatsList = document.getElementById("teamStatsList");
    //Destructure the data
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

    //Append to element
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