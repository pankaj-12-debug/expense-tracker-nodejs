const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const expense=sequelize.define('expense',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    amount:{
        type:Sequelize.INTEGER
    },
    category:{
        type:Sequelize.STRING
    },
    description:{
        type:Sequelize.STRING
    }
})
module.exports=expense;