const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt')
const Blog = require('../../models/Blog')

//user wants to create an account
router.post('/', async (req,res) => {
  try{ 
  if(req.body) {
   const createUser = await User.create({ user_name: req.body.username, email: req.body.email, password: req.body.password})
   if(createUser) {
    console.log(createUser)
    req.session.save(() => {
      req.session.loggedIn = true;
    res.status(200).json({loggedIn: req.session.loggedIn})
    })
   }
  }
} catch (err) {
  console.log(err)
  res.status(500).json(err)
}
}

)

router.post('/login', async (req,res) => {
  try{
  const findUser = await User.findOne({ where: {user_name: req.body.username}})
  if(findUser) {
    const comparePass = await bcrypt.compare(req.body.password, findUser.password)
    if(comparePass == true) {
      req.session.save(() => {
        req.session.loggedIn = true;
        res.status(200).json({message: 'You are now logged in!'}).end()
      })
    } else {res.render('login', {message: 'you must be logged in to view this page.'}) }
    }
} catch (err) {console.log(err)}
})
// this route is for creating an account.
router.post('/create', async (req, res) => {
  const bodyPayload = req.body
  
  const createUser = await User.create({
    user_name: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  if(createUser) {
    const getBlogs = await Blog.findAll();
  const Blogs = getBlogs.map((blog) =>
      blog.get({ plain: true }))
    req.session.save(() => {
      req.session.loggedIn = true;
      res.render('Blogs', {Blogs, loggedIn: req.session.loggedIn})
    })

  } else {
    res.json({message: 'There was an error creating your user. Please provide a username, email, and password.'})
  }

})

router.post('/logout', (req,res) => {
  if(req.session.loggedIn) {
    req.session.destroy(()=> {
      res.status(204).json({body:{message:"&#9989; You have successfully been logged out."}});

    })

  } else { res.status(404).json({message: "There was a problem logging you out."}).end();}

});


module.exports = router;