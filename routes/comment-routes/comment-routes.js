const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt')
const Blog = require('../../models/Blog')
const Comment = require('../../models/Comments')

router.post('/create', async (req,res) => {

try{
// client must provide creator, blog_id, and comment content to save a comment.
const findUser = await User.findOne({where:{ user_name: req.body.commentUserName }, raw: true, nest:true})
if(findUser && req.session.loggedIn) {console.log('User Successfully found!')
console.log(req.session.user)
}
else { res.status(500).json({message:'Please provide a valid username.'})}


const newComment = await Comment.create({ content: req.body.commentText, blogs_id: req.body.blog_id, creator: findUser.id })

const findComments = await Comment.findAll({where: {blogs_id: req.body.blog_id}})
const listComments = findComments.map((item)=> {
  item.get({ plain: true })
})

if(newComment) {
  res.status(200).json('your comment was successfully saved.')
 }

} catch {
  res.json({message:'invalid username provided. Please enter a valid username.'}).end()
}
})



module.exports = router;
