


$('#blogCreateBtn').on('click', async (event) => {
const blogTitle = $('#blogTitle').val();
const blogDate = $('#blogDate').val();
const blogContent = $('#blogContent').val()
  const results = await fetch('/createBlog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({date: blogDate, content: blogContent, title: blogTitle})
  })

if(results.status == 200) {
  $('#.blogContent').after('<p>&#9745;Your blog was successfully created</p>')

} else {$('#.blogContent').after('&#x1f44e; There was an error saving your blog.') }

})