const {Sequelize} = require("sequelize");
const sequelize = require('../database');

const Placeorder = sequelize.define("placeorder", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true,
    
  },
  customerid:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
Date:{
  type:Sequelize.DataTypes.STRING,
  allowNull: false,
},
  total: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  status:{
    type:Sequelize.DataTypes.TEXT,
    allowNull:true
  }

},
{
  timestamps:true,
  freezeTableName: true
});
// Placeorder.sync({force:true})
module.exports = Placeorder;

