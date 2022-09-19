
const submitButton = $('#submitBtn')

submitButton.on('click', newAcctCreate)


async function newAcctCreate(event) {
  event.preventDefault()
const userName = $('#userName').val();
const emailAddress = $('#userEmail').val();
const pass = $('#userPassword').val();

const newFetch = await fetch('/user/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({username: userName, email: emailAddress, password: pass})
})

if(newFetch.ok) {
    $('#signupform').append(`You have successfully been logged in.`)
    setTimeout(reloadPage, 4000)
}
}

function reloadPage() {
  window.location.replace('/')

}