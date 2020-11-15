import teamsData from "../helpers/teamsData";
import axios from "axios";
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
    axios.post('http://localhost:5000/login', formData)
        .then(res => {
            localStorage.setItem('userData', res.data);
        })
        .catch(err=>{
            console.log(err)
        })
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

    axios.post('http://localhost:5000/signup', formData)
        .then(res => {
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })

    console.log(formData)
};




