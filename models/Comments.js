const {Model, DataTypes, Sequelize} = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')
const { now } = require('moment')

class comment extends Model{}

comment.init({

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creator: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  blogs_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'blogs',
      key: 'id'
    }
  }

},
{
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'comments',
})

module.exports = comment;