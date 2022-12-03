const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt');
const cors=require('cors');
const sequelize=require('./util/database')
const app=express();
const dotenv=require('dotenv');
//routes
const SigupRouter=require('./route/signup');
const ExpenseRouter=require('./route/expense');
const purchasRouter=require('./route/purchase');
const ForgotpasswordRouter=require('./route/password');
//model
let User=require('./model/user');
let Expenses=require('./model/expense');
let Order=require('./model/order');
let Forgotpassword=require('./model/password');

dotenv.config();
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(SigupRouter);
app.use(ExpenseRouter);
app.use(purchasRouter);
app.use(ForgotpasswordRouter);
//association
Expenses.belongsTo(User);
User.hasMany(Expenses);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(8000, () => {
      console.log(" listening to 8000 port ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
