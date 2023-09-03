let id;
setTimeout(() => {
    const postBox = document.querySelectorAll('.post-box .pic');
    console.log(postBox);
    console.log(window.location.href);
    postBox.forEach(element => {
        element.addEventListener('click', () => {
            // To navigate to a different URL
            localStorage.setItem('postId', element.parentElement.id);
            window.location.href = 'http://127.0.0.1:5500/client/comments/index.html';
        })
    });
}, 5000);