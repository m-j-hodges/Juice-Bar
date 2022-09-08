

$('#loginSubmit').on('click', async (event)=> {
  event.preventDefault();
  const user_name = $('#userNameInput').val()
  const userpassword = $('#userPassword').val();

  const bodyOfFetch = {
    username: user_name,
    password: userpassword
  }

const newFetch = await fetch('/user/login', {
  method: 'POST',
  headers: {
    "Content-Type": 'application/json'
  },
  body: JSON.stringify(bodyOfFetch)
})

if(newFetch.status == 200) {
  window.location.replace('/')

} else {
  $('form').append(`<div class="alert alert-dark" id="alert" role="alert">
  please enter a valid username and password.
</div>`)
  setTimeout(deleteAlert, 4000)
}


})

function deleteAlert() {
  $('#alert').remove()
  

}