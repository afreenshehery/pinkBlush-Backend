const {Sequelize} = require("sequelize");
const sequelize = require('../database');

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
image:{
    type:Sequelize.TEXT,
    allowNull:false
}

},
{
  timestamps:false,
  freezeTableName: true
});

module.exports = Product;