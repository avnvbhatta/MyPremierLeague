//Handle Log Out
document.getElementById('logOutBtn').onclick = function logOut(){
    localStorage.removeItem('userData');
    window.location.replace("../index.html");
}
