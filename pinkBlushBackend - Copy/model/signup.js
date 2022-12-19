const {Sequelize,DataTypes} = require('sequelize')
const sequelize = require('../database');


const Signup = sequelize.define('signuptable',{
    id:{
    
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,

    },
    name:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    contact:{
        type: Sequelize.STRING,
        allowNull:false,
    
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
     
    },
    password:{
        type: Sequelize.STRING,
        allowNull:false,
        
    },
    status:{
        type: Sequelize.BOOLEAN,
         allowNull: false, 
         defaultValue:false
    
    },
  
  
},
{
    freezeTableName:true,
    timestamps:true

});
// Signup.sync({force:true})
module.exports = Signup;