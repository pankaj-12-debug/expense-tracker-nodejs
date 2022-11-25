let btn = document.querySelector('#btn');
let name1 = document.querySelector('#name');
let email1 = document.querySelector('#email');
let tel1 = document.querySelector('#tel');
let pass1 = document.querySelector('#pass');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    let name=name1.value;
    let email=email1.value;
    let tel=tel1.value;
    let pass=pass1.value;
    let obj={
        name:name,
        email:email,
        tel:tel,
        pass:pass
    }


    axios.post('https://crudcrud.com/api/c38f5b09a81b4d548de706fa646864c6/sign-up', obj)
        .then(() => {
            console.log('success');
            alert('Successfuly signed up');
        });
})