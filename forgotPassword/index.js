function forgotpassword(e){
    e.preventDefault();
    console.log(e.target.name);
    const form = new FormData(e.target);

    const userDetails = {
        email: form.get("email"),
    }
    console.log(userDetails);
    axios.post('http://localhost:8000/forgotpassword',userDetails).then(response => {
        if(response.status === 202){
        //  alert(`http://localhost:8000/resetpassword/${response.data.id}`)
              document.body.innerHTML += '<div style="color:green;">Mail Successfuly sent <div>'
        } else {
            throw new Error('Something went wrong!!!')
        }
    }).catch(err => {
       document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}
