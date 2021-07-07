import teamsData from "../helpers/teamsData";
import {logIn, signUp} from "../helpers/auth";

document.getElementById('nav').style.display = 'none';

let selectTeams = document.getElementById('teamSelect');
//populate teams dynamically
for (const [key, value] of Object.entries(teamsData)) {
    selectTeams.innerHTML += `<option value="${key}">${value.name}</option>`
}

//Login Form Submit
let loginForm = document.getElementById('loginForm');
loginForm.onsubmit = function(event) { 
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
let signUpForm  = document.getElementById('signUpForm');
signUpForm.onsubmit = function(event) { 
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

    //clear form on submit
    signUpForm.reset();
};

//Reset login errors field
loginForm.addEventListener('input' , function(){
    document.getElementById('error').innerHTML = '';
})

