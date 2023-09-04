let id;
setTimeout(() => {
    const postBox = document.querySelectorAll('.post-box .post-image');
    postBox.forEach(element => {
        element.addEventListener('click', () => {
            const link = document.getElementById('link'); 
            // To navigate to a different URL
            localStorage.setItem('postId', element.parentElement.id);
            link.click();
            // window.location.href = 'https://main--cosmic-crumble-da4920.netlify.app';
        })
    });
}, 500);