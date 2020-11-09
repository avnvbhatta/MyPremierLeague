const axiosDefault = require('axios').default;
import axiosAPIFootball from "../helpers/helpers";
import placeHolderImage from "../images/img-placeholder.png";

// Make a request for a user with a given ID
const teamID = 33;
const numOfFixtures = 5;

axiosAPIFootball.get(`/fixtures/team/${teamID}/next/${numOfFixtures}?timezone=America/New_York`)
  .then(function (response) {
    // handle success
    let data = response.data.api.fixtures;
    var ul = document.getElementById("fixturesList");
    data.forEach(fixture => {
        let homeTeam = fixture.homeTeam.team_name;
        let awayTeam = fixture.awayTeam.team_name;
        let date = fixture.event_date;
        let venue = fixture.venue;
        ul.innerHTML += (`<li>${homeTeam} vs ${awayTeam} - ${date} - ${venue}</li>`);
    })
  })
  .catch(function (error) {
    // handle error
  })
  .then(function () {
    // always executed
  });


axiosAPIFootball.get(`/leagueTable/2790`)
  .then(function (response) {
    // handle success
    let data = response.data.api.standings[0];
    let leagueTable = document.getElementById('leagueTable');

    // console.log(data);
    data.forEach(teamData =>{
        let {teamName, rank, logo, forme, goalsDiff, points, all} = teamData;
        let {win, lose, draw, matchsPlayed} = all;
        
        let rowData = `<td>${rank}</td>
        <td><img class="teamLogo" src="${logo}" alt="${teamName}" >${teamName}</td>
        <td>${forme}</td>
        <td>${points}</td>
        <td>${matchsPlayed}</td>
        <td>${win}</td>
        <td>${lose}</td>
        <td>${draw}</td>
        <td>${goalsDiff}</td>`
        leagueTable.innerHTML += rowData;
    })
})
  .catch(function (error) {
    // handle error
  })
  .then(function () {
    // always executed
  });



  axiosDefault.get(`https://www.reddit.com/r/reddevils.json?limit=10`)
  .then(function (response) {
    // handle success
    let data = response.data.data.children;
    var ul = document.getElementById("newsList");
    data.forEach(news => {
        
        let redditURL = `http://www.reddit.com${news.data.permalink}`;
        let thumbnail = news.data.thumbnail === 'self' ? placeHolderImage : news.data.thumbnail;
        let title = news.data.title;
        console.log(thumbnail)
        ul.innerHTML += (`<li><img class="redditThumb" src=${thumbnail} alt="${title}" /><a href="${redditURL}" target="_blank">${title}</a></li>`);
    })
  })
  .catch(function (error) {
    // handle error
  })
  .then(function () {
    // always executed
  });
