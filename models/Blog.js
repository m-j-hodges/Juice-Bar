const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')


class Blog extends Model{}

Blog.init({

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey:true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true,
  }

},
{
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'blogs',
}
)

module.exports = Blog;