
const submitButton = $('#submitBtn')

submitButton.on('click', newAcctCreate)


function newAcctCreate() {
const userName = $('#userName').val();
const emailAddress = $('#userEmail').val();
const pass = $('#userPassword').val();

  fetch('/user/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({username: userName, email: emailAddress, password: pass})
})
.then(response => {
  if(response.status == 200) {
    $('.container-fluid').append(`${response.message}`)
  }

})}