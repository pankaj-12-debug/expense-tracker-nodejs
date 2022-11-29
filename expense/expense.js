//const expense = require("../model/expense");
const token = localStorage.getItem('token');
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
    console.log(obj);
    axios.post('http://localhost:8000/addexepens', obj,{headers:{'Authorization':token}})
    .then(response=>{
        console.log('expense working');
        //console.log(response);
       // showExpense(response.data);
        alert('expenses successful');
    })
    .catch(err=>{
        console.log('not take post request');
    })
    showExpense(obj);
})
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:8000/getexepens',{headers:{'Authorization':token}}).then(response=>{
       // showExpense(expense);
        console.log('take get request');
        response.data.expenses.forEach(expense => {
            showExpense(expense);
        });
        
    }).catch(err=>{
        console.log('err');
    })
})
 
function showExpense(expense)
{
    const parentElement=document.getElementById('listOfExpense');
        const expenseElemId=`expense-${expense.id}`;
        parentElement.innerHTML+=`
        <li id=${expenseElemId}>
         Amount: ${expense.amount},Description: ${expense.description},Category: ${expense.category}
        <button onclick='deleteExpense(${expense.id})'>
        Delete Expense</button>
        </li>`
}
function deleteExpense(expenseid){
    console.log(expenseid)
    axios.delete(`http://localhost:8000/deleteExpens/${expenseid}`,{headers:{'Authorization':token}})
    .then(response=>{
        removeUserFromScreen(expenseid);
      console.log('done');
    }).catch(err=>{
        console.log('err');
    })
 //   removeUserFromScreen(expenseid);
}
function removeUserFromScreen(expenseid){
  //  const parentElement=document.getElementById('listOfExpense');
    const expenseElemId=`expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}