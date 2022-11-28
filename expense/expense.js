const amount=document.getElementById('amount');
const description=document.getElementById('description');
const category=document.getElementById('category');
const btn=document.getElementById('btn-add');
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const amount1=amount.value;
    const description1=description.value;
    const category1=category.value;

    let obj={
        amount:amount1,
        description:description1,
        category:category1
    }
    axios.post('http://localhost:8000/addexpense', obj)
    .then(response=>{
        console.log('expense working');
        console.log(response);
        alert('expenses successful');
    })
    .catch(err=>{
        console.log(err);
        alert('err');
    })
})