const User = require('./User.js')
const comments = require('./Comments.js')
const Blog = require('./Blog.js');
const { Model } = require('sequelize/types/index.js');


User.hasMany(comments, {
  foreignKey: 'creator',
  onDelete: 'CASCADE',
});

comments.belongsTo(User, {
  foreignKey: 'creator',
})

Blog.hasMany(comments, {
  foreignKey: 'blogs_id',
  onDelete: 'CASCADE',
})

comments.belongsTo(Blog, {
  foreignKey: 'blogs_id'
})

module.exports = {comments, Blog, User}