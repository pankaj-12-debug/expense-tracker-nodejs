const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt');
const cors=require('cors');
const sequelize=require('./util/database')
const app=express();
const SigupRouter=require('./route/signup')
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(SigupRouter);


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
