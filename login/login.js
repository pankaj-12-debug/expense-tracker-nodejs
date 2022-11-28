//const { response } = require("express");

const email=document.getElementById('email');
const pass=document.getElementById('pass');
const btn=document.getElementById('btn-login');
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const email2=email.value;
    const pass2=pass.value;
     
    const obj={
        email:email2,
        pass:pass2
    }
    axios.post('http://localhost:8000/login', obj)
    .then(response=>{
        console.log('login work');
        console.log(response);
        alert('login successful');
        window.location.href='../expense/index.html';
    })
    .catch(err=>{
        console.log(err);
        alert('email does not exist please signup');
    })
})