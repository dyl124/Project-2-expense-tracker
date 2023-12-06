

function renderSignup(){
    const loginElem = document.getElementById("loginDiv");  
    const signupElem = document.getElementById("signupDiv");

    loginElem.style.display = "none";
    signupElem.style.display = "inherit";
};
document.querySelector('#signup-button').addEventListener('click', renderSignup);

function renderLogin(){
    const loginElem = document.getElementById("loginDiv");  
    const signupElem = document.getElementById("signupDiv");

    loginElem.style.display = "inherit";
    signupElem.style.display = "none";
};
document.querySelector('#back-button').addEventListener('click', renderLogin);