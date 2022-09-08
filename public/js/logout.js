$('#logoutBtn').on('click', async (event)=> {
  event.preventDefault();
  const fetchResult = await fetch('http://localhost:3001/user/logout', {
  method: 'POST',
  headers: {
    "Content-Type": 'application/json'
  }
  })
  if(fetchResult.status == 200) {
    window.alert('You have successfully been logged out.')
    setTimeout(reloadPage, 5000)
  }
})


function reloadPage() {
  window.location.replace('/')

}