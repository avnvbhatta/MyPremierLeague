//
import axiosAPIFootball from "../helpers/helpers";
let fixturesData = [];
let currentGW = '';
let dataLoaded = false;
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
    var ul = document.getElementById("fixturesList");
    ul.innerHTML = "";
    for(let i=selectedGW*10; i<selectedGW*10+10; i++){
        let homeTeam = fixturesData[i].homeTeam.team_name;
        let awayTeam = fixturesData[i].awayTeam.team_name;
        let date = fixturesData[i].event_date;
        let venue = fixturesData[i].venue;
        ul.innerHTML += (`<li>${homeTeam} vs ${awayTeam} - ${date} - ${venue}</li>`);
    }  
}