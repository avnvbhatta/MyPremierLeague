const axios = require('axios').default;

const logIn = (formData) => {
    axios.post('http://localhost:5000/login', formData)
        .then(res => {
            console.log(res.data)
            if(res.data.data){
                localStorage.setItem('userData', JSON.stringify(res.data.data));
                window.location.replace("/pages/home.html");
            }
            else{
                alert('No user found')
            }
            
        })
        .catch(err=>{
            console.log(err)
        })
}

const signUp =(formData) =>{
    axios.post('http://localhost:5000/signup', formData)
    .then(res => {
        console.log(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

const checkLoggedIn = () => {
    //Check localstorage if user data exists
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
        window.location.replace("../index.html");
        return;
    }
    const {id} = userData;

    axios.post('http://localhost:5000/checkloggedin', {"id": id})
        .catch(err=>{
            console.log(err)
            window.location.replace("../index.html");

        })
        
}

export {
    logIn, signUp, checkLoggedIn
}
