import axiosAPIFootball from "../helpers/helpers";
import {checkLoggedIn} from "../helpers/auth";
import teamsData from "../helpers/teamsData";
import moment from "moment";

//Check if stored user data is valid
checkLoggedIn();

const userData = JSON.parse(localStorage.getItem('userData'));
const {teamSelect} = userData;
const {logo, colors} = teamsData[teamSelect];

//set background colors based on club selected
let body = document.getElementsByTagName('body')[0];
body.style.backgroundColor = colors;
//get club's logo and place it on navbar
document.getElementById('userClubLogo').src = logo;
//highlight the navbar by underlining the current page
document.getElementsByTagName('a')[1].innerHTML += `<div class="underline"></div>`;
//set background color for overlay
let overlay = document.getElementById('overlay')
overlay.style.backgroundColor = colors;



let fixturesData = [];
let currentGW = 0;
let selectedGW = 0;
let selectDropdown = document.getElementById('gameweek');


//Function to set dropdown value based on gameweek. Triggers a new change event as well.
function setDropdownValue(gameweek){
  selectDropdown.value = gameweek;
  selectDropdown.dispatchEvent(new Event('change'));
  populate(gameweek);
}

//Get fixtures first
axiosAPIFootball.get(`/fixtures/league/2790?timezone=America/New_York`)
  .then(function (response) {
    // handle success
    fixturesData = response.data.api.fixtures;
    
    //Get current gameweek
    axiosAPIFootball.get(`/fixtures/rounds/2790/current`)
    .then(function (response) {
      // handle success
      let data = response.data.api.fixtures[0];
      let matches = data.match(/(\d+)/); 
      currentGW = parseInt(matches[0])-1; //as data fetched is 1 based index, not 0 based.
      selectedGW = parseInt(currentGW);

      //Populate gameweek dropdowns
      for(let i=0; i<38; i++){
        selectDropdown.innerHTML += `<option value="${i}">Gameweek ${i+1} ${i === currentGW ? "(Current)" : ""}</option>`
      }
      setDropdownValue(currentGW);
      overlay.style.display = 'none';
      body.style.overflow = 'auto';

      
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


//Changes the fixtures based on gameweek selected
selectDropdown.addEventListener("change", function(event) {
    let selected = parseInt(event.target.value);
    selectedGW = selected;
    if(selected !== currentGW){
        selectDropdown.style.width = '135px';
    }
    else{
      selectDropdown.style.width = '195px'; 
    }
    populate(selected);
});


//Populates the fixtures based on gameweek selected
function populate(selectedGW){
    var fixtureList = document.getElementById("fixturesList");
    fixtureList.innerHTML = "";
    for(let i=selectedGW*10; i<selectedGW*10+10; i++){
      console.log(fixturesData[i])

      let {homeTeam: {logo: homeTeamLogo, team_name: homeTeamName}} = fixturesData[i];
        let {awayTeam: {logo: awayTeamLogo, team_name: awayTeamName}} = fixturesData[i];
        let {venue, event_date, goalsHomeTeam, goalsAwayTeam} = fixturesData[i];

        
        fixtureList.innerHTML +=
        `
          <div class="fixtureRow">
                <div class="homeTeam">
                    <img src="${homeTeamLogo}" alt="" >
                    <p>${homeTeamName}</p>
                </div>
                <div class="fixtureDetails">
                    ${goalsHomeTeam == null ||  goalsAwayTeam == null ? '' : `<div class="scores">${goalsHomeTeam} - ${goalsAwayTeam}</div>`  }
                    <div class="datetime">${moment(event_date).format('ddd, MMM do @ hA')}</div>
                    <div class="venue">${venue}</div>
                </div>
                <div class="awayTeam">
                    <p>${awayTeamName}</p>
                    <img src="${awayTeamLogo}" alt="" >
                </div>
            </div>
        `
      }  
}


//Event handler for prev gameweek button
document.getElementById('minus').addEventListener('click', function(){
  //Check for bounds
  if(selectedGW>0){
    selectedGW = selectedGW -1;
    setDropdownValue(selectedGW);

  }
})

//Event handler for next gameweek button
document.getElementById('plus').addEventListener('click', function(){
    //Check for bounds
  if(selectedGW<37){
    selectedGW = selectedGW +1;
    setDropdownValue(selectedGW);
  }
})