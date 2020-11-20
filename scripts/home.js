const axiosDefault = require('axios').default;
import axiosAPIFootball from "../helpers/helpers";
import placeHolderImage from "../images/img-placeholder.png";
import teamsData from "../helpers/teamsData";
import {checkLoggedIn} from "../helpers/auth";

//Check if stored user data is valid
checkLoggedIn();
console.log('hi')
const userData = JSON.parse(localStorage.getItem('userData'));
const {teamSelect} = userData;

const {subreddit, colors} = teamsData[teamSelect];

const numOfFixtures = 5;

document.getElementsByTagName('body')[0].style.backgroundColor = colors;


axiosAPIFootball.get(`/fixtures/team/${teamSelect}/next/${numOfFixtures}?timezone=America/New_York`)
  .then(function (response) {
    // handle success
    let data = response.data.api.fixtures;
    var fixtureList = document.getElementById("fixturesList");
    console.log(data)
    data.forEach(fixture => {
        // let homeTeam = fixture.homeTeam.team_name;
        let {homeTeam: {logo: homeTeamLogo, team_name: homeTeamName}} = fixture;
        let {awayTeam: {logo: awayTeamLogo, team_name: awayTeamName}} = fixture;
        let date = fixture.event_date;
        let venue = fixture.venue;
        // fixtureList.innerHTML += (`<div>${homeTeam} vs ${awayTeam} - ${date} - ${venue}</div>`);
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

    data.forEach(teamData =>{
        let {teamName, rank, logo, forme, goalsDiff, points, all} = teamData;
        let {win, lose, draw, matchsPlayed} = all;
        
        let rowData = `<tr><td>${rank}</td>
        <td><img class="teamLogo" src="${logo}" alt="${teamName}" ></td>
        <td class="teamName">${teamName}</td>
        <td>${forme}</td>
        <td>${points}</td>
        <td>${matchsPlayed}</td>
        <td>${win}</td>
        <td>${lose}</td>
        <td>${draw}</td>
        <td>${goalsDiff}</td></tr>`
        leagueTable.innerHTML += rowData;
    })
})
  .catch(function (error) {
    // handle error
  })
  .then(function () {
    // always executed
  });

  


  axiosDefault.get(`${subreddit}.json?limit=10`)
  .then(function (response) {
    // handle success
    let data = response.data.data.children;
    var newsList = document.getElementById("newsList");
    data.forEach(news => {
        
        let redditURL = `http://www.reddit.com${news.data.permalink}`;
        let thumbnail = news.data.thumbnail === 'self' ? placeHolderImage : news.data.thumbnail;
        let title = news.data.title;
        newsList.innerHTML += (`<div><img class="redditThumb" src=${thumbnail} alt="${title}" /><a href="${redditURL}" target="_blank">${title}</a></div>`);
    })
  })
  .catch(function (error) {
    // handle error
  })
  .then(function () {
    // always executed
  });
