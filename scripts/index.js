//Login Form Submit
document.getElementById('loginForm').onsubmit = function(event) { 
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let formData = {
        email: email,
        password: password
    }
};

//SignUp Form Submit
document.getElementById('signUpForm').onsubmit = function(event) { 
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let formData = {
        name: name,
        email: email,
        password: password
    }
};


