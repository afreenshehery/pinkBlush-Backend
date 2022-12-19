const {Sequelize} = require("sequelize");
const sequelize = require('../database');

const Blush = sequelize.define("blush", {
  productId: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true,
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
image:{
    type:Sequelize.TEXT,
    allowNull:false
}

},
{
  timestamps:false,
  freezeTableName: true
});

module.exports = Blush;

// const mongoose = require("mongoose");

// const blushSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   shade: { type: String, required: true },
//   price:{type: String, required: true},
//   image:{type:String,required:true}

// });

// module.exports = mongoose.model("Blush", blushSchema);