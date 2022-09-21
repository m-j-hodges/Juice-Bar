


$(document).ready(function () {

  $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });
  $('#commentForm').hide()

});

// $(document).ready( function () {
// $('form').submit(function(e) {
//     e.preventDefault()
//     submitComment();
// })

// })


$('#leaveComment').on('click', (e) => {
  e.preventDefault();
  $('#commentForm').show();

} )

const submitBtn = document.getElementById('commentSubmit')

submitBtn.addEventListener('click', commentSubmit)

async function commentSubmit() { 
  const commentText = $('#commentInput').val();
  const blogIdent = document.getElementById('blogId')
  const blog_id = blogIdent.dataset.number.replaceAll("`","")
  const commentUserName = $('#userNameInput').val();

  function reloadPage() {
    window.location.replace(`/oneBlog/${blog_id}`)
  
  }


const newFetch = await fetch('/comment/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({blog_id:blog_id, commentUserName:commentUserName, commentText:commentText})
})
  console.log(newFetch)
  const responseResult = await newFetch.json();
 const responseMessage = responseResult.message
if(responseMessage) {
  const commentBtn = document.getElementById('commentSubmit')
  const newAlert = document.createElement('p')
  newAlert.className = 'alert alert-danger'
  newAlert.innerText = `error:${responseMessage}`
  commentBtn.after(newAlert)
  setTimeout(removeMessage, 4000)
} else if (newFetch.status == 200) {
  const commentBtn = document.getElementById('commentSubmit')
  const successAlert = document.createElement('p')
  successAlert.className = 'alert alert-success'
  successAlert.innerText = `Your comment has been saved!`
  commentBtn.after(successAlert)
  setTimeout(removeMessage, 4000)
  setTimeout(reloadPage,4000)
}


//   .catch((err) => {
//     const commentBtn = document.getElementById('commentSubmit')
//     commentBtn.after(`${err}`)

//   })
//   .then((result) => {
// if(result.message) {
//  const alertMessage = document.createElement('div');
//  alertMessage.setAttribute('class', 'alert alert-danger')
//  alertMessage.innerHTML = `<p>${response.message}</p>`
//   $('#leaveComment').append(alertMessage)
// }
// window.location.replace(`/oneBlog/${blog_id}`)
// }
// )

}



function removeMessage() {
  $('.alert-danger').remove()
}