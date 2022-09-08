const router = require('express').Router();

const Blog = require("../../models/Blog")


router.get('/', async(req,res) => {

const getBlogs = await Blog.findAll();
const Blogs = getBlogs.map((blog) =>
      blog.get({ plain: true })
    );
if(req.session.loggedIn == true) {
res.render('Blogs', {Blogs, loggedIn: req.session.loggedIn})

 }
else {
  res.render('login', {loggedIn: req.session.loggedIn})
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
    res.render('createBlog', {loggedIn: req.session.loggedIn})

  }
  else{ res.render('/login', {createBlog: true, message: 'Please login to view or create blogs.'})}

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