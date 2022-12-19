const {Sequelize} = require("sequelize");
const sequelize = require('../database');

const Auth = sequelize.define("auth", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true,
  },
  userid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  }

},
{
  timestamps:true,
  freezeTableName: true
});
// Auth.sync({force:true})
module.exports = Auth;