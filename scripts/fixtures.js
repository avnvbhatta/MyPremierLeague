//
import axiosAPIFootball from "../helpers/helpers";
import {checkLoggedIn} from "../helpers/auth";
import teamsData from "../helpers/teamsData";




//Check if stored user data is valid
checkLoggedIn();

const userData = JSON.parse(localStorage.getItem('userData'));
const {teamSelect} = userData;
const {logo, subreddit, colors} = teamsData[teamSelect];

document.getElementsByTagName('body')[0].style.backgroundColor = colors;

document.getElementById('userClubLogo').src = logo;

let fixturesData = [];
let currentGW = '';
//Populate gameweek dropdowns
for(let i=1; i<39; i++){
    document.getElementById('gameweek').innerHTML += `<option value="${i}">Gameweek ${i}</option>`
}

axiosAPIFootball.get(`/fixtures/league/2790?timezone=America/New_York`)
  .then(function (response) {
    // handle success
    fixturesData = response.data.api.fixtures;
    
    //https://v2.api-football.com/fixtures/rounds/2790/current
    axiosAPIFootball.get(`/fixtures/rounds/2790/current`)
    .then(function (response) {
      // handle success
      let data = response.data.api.fixtures[0];
      let matches = data.match(/(\d+)/); 
      currentGW = matches[0];
      document.getElementById("gameweek").value = currentGW;
      document.getElementById('gameweek').dispatchEvent(new Event('change'));
      
    })
    .catch(function (error) {
      // handle error
    })
    .then(function () {
      // always executed
    });
    
  })
  .catch(function (error) {
    // handle error
  })
  .then(function () {
    // always executed
  });


document.getElementById("gameweek").addEventListener("change", function(event) {
    let selectedGW = event.target.value-1;
    populate(selectedGW);
});

function populate(selectedGW){
    var fixtureList = document.getElementById("fixturesList");
    fixtureList.innerHTML = "";
    for(let i=selectedGW*10; i<selectedGW*10+10; i++){

      let {homeTeam: {logo: homeTeamLogo, team_name: homeTeamName}} = fixturesData[i];
        let {awayTeam: {logo: awayTeamLogo, team_name: awayTeamName}} = fixturesData[i];
        let date = fixturesData[i].event_date;
        let venue = fixturesData[i].venue;

        
        fixtureList.innerHTML +=
        `
          <div class="fixtureRow">
                <div class="homeTeam">
                    <img src="${homeTeamLogo}" alt="" >
                    <p>${homeTeamName}</p>
                </div>
                <div class="fixtureDetails">
                    <div class="venue">${venue}</div>
                    <div class="datetime">${date}</div>
                </div>
                <div class="awayTeam">
                    <p>${awayTeamName}</p>
                    <img src="${awayTeamLogo}" alt="" >
                </div>
            </div>
        `
      }  
}