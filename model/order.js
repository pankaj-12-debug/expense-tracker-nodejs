const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const Order=sequelize.define('order',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    paymentid:{
        type:Sequelize.INTEGER
    },
    orderid:{
        type:Sequelize.STRING
    },
    status:{
        type:Sequelize.STRING
    }
})
module.exports=Order;