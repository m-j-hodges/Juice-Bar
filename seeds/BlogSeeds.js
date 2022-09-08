const Blog = require('../models/Blog.js')



async function seedBlog() {

const Blogs = await Blog.bulkCreate([
  {date: 2022-01-27, title: 'Getting started with Express', content: 'Express is great tool for quickly creating a server.' },
  {date: 2021-12-11, title: 'Javascript for beginners', content: 'Javascript is the foundation of the internet.'},
  {date: 2021-3-16, title: 'Getting the hang of Node', content: 'node is a very powerful language for creating the building blocks of a web-server'},
  {date: 2022-4-27, title: 'Refactoring code', content: 'There are many ways to refactor code to make it better.'}
])
if(Blogs) {
  console.log('your seed data was successfully saved.')
}

}

module.exports = seedBlog
