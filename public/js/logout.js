$('#logoutBtn').on('click', logout)

$('#logoutNavbar').on('click', logout)


async function logout(event) {
  event.preventDefault();
  const fetchResult = await fetch('/user/logout', {
  method: 'POST',
  headers: {
    "Content-Type": 'application/json'
  }})
  
  if(fetchResult.ok) {
    $('#logoutNavbar').after(`<p id="resultMessage">&#9989; You have been successfully logged out.</p>`)
    setTimeout(reloadPage, 4000)
  }
}




function reloadPage() {
  $("#resultMessage").remove()
  window.location.replace('/')

}