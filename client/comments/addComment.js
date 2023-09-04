setTimeout(() => {
    const inputComment = document.getElementById('input-comment');
    const sendIcons = document.querySelector('.material-symbols-outlined');

    sendIcons.addEventListener('click', () => {
        const new_comment = {
            'content': inputComment.value
        }
        console.log(inputComment.value);
        const id = localStorage.getItem('postId');
        fetch(`https://fesinsta-zsk.onrender.com/api/v1/posts/${id}/comments`, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_comment)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
    })
}, 1000);