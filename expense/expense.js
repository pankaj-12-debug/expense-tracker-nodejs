//const expense = require("../model/expense");
//const userId = localStorage.getItem('userId');
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
//download
function download(){
    axios.get('http://localhost:8000/download', { headers: {"Authorization" : token} })
    .then((response) => {
        if(response.status === 200){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
        console.log(err);
        console.log('err');
    });
}
//razorpay added
document.getElementById('rzp-button').onclick = async function (e) {
    console.log('razorpay');
    const response  = await axios.get('http://localhost:8000/purchase', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test@example.com",
       "contact": "8557093399"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:8000/transactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}