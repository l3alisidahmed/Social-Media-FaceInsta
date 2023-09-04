let id;
setTimeout(() => {
    const myLink = document.createElement('a')
    const postBox = document.querySelectorAll('.post-box .post-image');
    const commentIcons = document.querySelectorAll('.toggle-comments');
    postBox.forEach(element => {
        element.addEventListener('click', () => {
            const link = document.getElementById('link'); 
            // To navigate to a different URL
            localStorage.setItem('postId', element.parentElement.id);
            link.click();
            // window.location.href = 'https://main--cosmic-crumble-da4920.netlify.app';
        })
    });

    commentIcons.forEach(element => {
        console.log(element);
        element.addEventListener('click', () => {
            console.log(element);
            localStorage.setItem('postId', element.parentElement.parentElement.parentElement.id);
            myLink.href = '/comments/index.html';
            element.before(myLink);
            myLink.click();
        })
    })
}, 500);