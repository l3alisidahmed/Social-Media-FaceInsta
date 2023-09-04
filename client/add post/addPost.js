// Get a reference to the form element
var form = document.getElementById("myForm");

// Add an event listener for the form's submit event
form.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior, which would trigger a page reload
  event.preventDefault();

  const desc = document.getElementById('desc').value;
  const ImgUrl = document.getElementById('path').value;

  const new_post = {
    'description': desc,
    'image': ImgUrl,
    'likes': 2
   }

  console.log(desc);
  console.log(ImgUrl);

  fetch('https://fesinsta-zsk.onrender.com/api/v1/posts/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(new_post)
  })
  .then(res => res.json())
  .then(data => {
    window.location.href = 'https://main--cosmic-crumble-da4920.netlify.app';
  })
  .catch(err => console.log(err));

  // You can also access form fields and their values, e.g.,:
  // var nameInput = document.getElementById("name");
  // var nameValue = nameInput.value;

  // Perform further processing as needed
});