$(document).ready(function () {

  $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

});


$('#leaveComment').on('click', (e) => {
  e.preventDefault();
  const newForm = document.createElement('form')
  newForm.innerHTML = `<div class='form-group'>
  <label for='commentInput'></label>
  <textarea class='form-control' id='commentInput' rows='3'></textarea>
</div>
<div class="input-group mb-3">
  <span class="input-group-text">Username:</span>
  <div class="form-floating">
    <input type="text" class="form-control" id="userNameInput" placeholder="Username">
  </div>
</div>
<button class="btn btn-primary" type="submit" id="commentSubmit">submit</button>`
  e.target.parentNode.append(newForm)

} )

$('form #commentSubmit').on('click', (event) => {
  event.preventDefault();
  const commentText = $('#commentInput').val();
  const blogId = $('#blogId').dataset.id;
console.log(commentText, blogId)

})