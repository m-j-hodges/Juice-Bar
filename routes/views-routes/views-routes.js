const router = require('express').Router();
const sequelize = require('sequelize')

const Blog = require("../../models/Blog")

const moment = require('moment');
const comment = require('../../models/Comments');


router.get('/', async(req,res) => {

const getBlogs = 
await Blog.findAll({
attributes: [
  'id',
  'content',
  'title',
  [sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), 'date']
]

});
let Blogs = getBlogs.map((blog) =>
      blog.get({ plain: true })
    );

Blogs = Blogs.map(obj =>{
  return {...obj, date: new Date(obj.date)};
} )
let sortedBlogs = Blogs.sort(
  (objA, objB) => Number(objB.date) - Number(objA.date),
);
sortedBlogs = sortedBlogs.map((item)=> {
  return {...item, date: item.date.toDateString()}
})
console.log(sortedBlogs)

if(req.session.loggedIn == true) {
res.render('Blogs', {sortedBlogs, loggedIn: req.session.loggedIn})

 }
else {
  res.render('login', {loggedIn: req.session.loggedIn})
}

})

router.get('/blog/:id', async (req,res) => {

try{
if (req.params.id) { 
const findBlog = await Blog.findByPk(req.params.id)
const listComments = await comment.findAll({where: {
  blogs_id: req.params.id
}})

const oneBlog = findBlog.get({ plain: true})

// res.json({oneBlog})
res.render('oneBlog', {oneBlog, listComments})
} else{
  res.json({message: `Please provide a valid blog ID.`})
}
} catch (err) {
  console.log(err);

}

})

router.get('/login', (req,res) => {
  if(req.session.loggedIn) {
    res.render('Blogs', {loggedIn: req.session.loggedIn})

  }
  res.render('login', {loginPage: true, loggedIn: req.session.loggedIn})

})

router.get('/signup', (req,res)=> {
  res.render('signup', {signUp: true, loggedIn: req.session.loggedIn})

})

router.get('/createBlog', (req,res) => {
  if(req.session.loggedIn) {
    res.render('createBlog', {createBlog: true,loggedIn: req.session.loggedIn})

  }
  else{ res.render('login', {createBlog: true, message: 'Please login to view or create blogs.'})}

})

router.post('/createBlog', async (req,res) => {
  try{
    if(req.body) {
      const createNewBlog = await Blog.create({title: req.body.title, content: req.body.content, date: req.body.date})
      if(createNewBlog) {
        res.json({message: 'new blog post successfully created!'})
      }
    }

  } catch (err) {
    console.log(err)
    res.json({message: 'There was an error in creating your blog.'})
  }

})

module.exports = router;