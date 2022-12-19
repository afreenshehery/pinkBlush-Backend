const {Sequelize} = require("sequelize");
const sequelize = require('../database');

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true,
  },
  productId:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  customerid:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  orderid:{
    type:Sequelize.DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue:1
  },
image:{
    type:Sequelize.TEXT,
    allowNull:false
}

},
{
  timestamps:true,
  freezeTableName: true
});

module.exports = Cart;

// Cart.sync({force:true})

// const mongoose = require("mongoose");

// const blushSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   shade: { type: String, required: true },
//   price:{type: String, required: true},
//   image:{type:String,required:true}

// });

// module.exports = mongoose.model("Blush", blushSchema);