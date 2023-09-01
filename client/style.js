const options = document.querySelectorAll('.options');

options.forEach(option => {
    const list = option.nextElementSibling;
    option.onclick = () => {
        list.classList.toggle('active');
    }
})
// Add this code to your style.js file
// Add this code to your style.js file

// Function to handle the logout action
function logout() {
    // Open the logout page in a new window or tab
    window.open('logout.html', '_blank');
}

// Add an event listener to the Logout button
const logoutButton = document.querySelector('.ri-logout-box-r-fill');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        // Call the logout function when the logout button is clicked
        logout();
    });
}
// Get all elements with the class "post-box"
const postBoxes = document.querySelectorAll(".post-box");

// Add a click event listener to each post box
postBoxes.forEach((postBox) => {
  // Find the heart icon and the likes count element inside the current post box
  const heartIcon = postBox.querySelector(".ri-heart-line");
  const likesCount = postBox.querySelector(".likes span");

  // Initialize a variable to track the like state (liked or not)
  let isLiked = false;

  // Add a click event listener to the heart icon
  heartIcon.addEventListener("click", () => {
    // Toggle the like state
    isLiked = !isLiked;

    // Update the heart icon's class based on the like state
    if (isLiked) {
      heartIcon.classList.remove("ri-heart-line");
      heartIcon.classList.add("ri-heart-fill");
    } else {
      heartIcon.classList.remove("ri-heart-fill");
      heartIcon.classList.add("ri-heart-line");
    }

    // Update the likes count based on the like state
    likesCount.textContent = isLiked ? parseFloat(likesCount.textContent) + 1 : parseFloat(likesCount.textContent) - 1;
  });
});
// Get all elements with the class "post-box"


// Get references to all toggle-comments elements
const toggleCommentsList = document.querySelectorAll('.toggle-comments');

// Function to toggle comments for each element
toggleCommentsList.forEach(function (toggleComments) {
    toggleComments.addEventListener('click', function () {
        const commentsSection = toggleComments.nextElementSibling;
        if (commentsSection.style.display === 'none' || commentsSection.style.display === '') {
            commentsSection.style.display = 'block';
        } else {
            commentsSection.style.display = 'none';
        }
    });
});

// Function to add a new comment
const submitCommentList = document.querySelectorAll('.submit-comment');
submitCommentList.forEach(function (submitComment) {
    submitComment.addEventListener('click', function () {
        const commentInput = submitComment.previousElementSibling;
        const newComment = commentInput.value.trim();
        if (newComment !== '') {
            const comments = submitComment.parentElement.querySelector('.comments');
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.textContent = newComment;
            comments.appendChild(commentElement);
            commentInput.value = '';
        }
    });
});
