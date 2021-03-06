import teamsData from "../helpers/teamsData";
import {logIn, signUp} from "../helpers/auth";

let selectTeams = document.getElementById('teamSelect');
//populate teams dynamically
for (const [key, value] of Object.entries(teamsData)) {
    selectTeams.innerHTML += `<option value="${key}">${value.name}</option>`
}

//Login Form Submit
document.getElementById('loginForm').onsubmit = function(event) { 
    event.preventDefault();
    let email = document.getElementById("email_login").value;
    let password = document.getElementById("password_login").value;
    let formData = {
        email: email,
        password: password
    }
    logIn(formData);
};

//SignUp Form Submit
document.getElementById('signUpForm').onsubmit = function(event) { 
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email_signup").value;
    let password = document.getElementById("password_signup").value;
    let teamSelect = document.getElementById('teamSelect').value;
    let formData = {
        name: name,
        email: email,
        password: password,
        teamSelect: teamSelect
    }
    signUp(formData);
};




