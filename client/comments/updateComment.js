const myInput = document.createElement('input')


setTimeout(() => {
    const comment = document.querySelectorAll('.content p');
    console.log(comment);
    comment.forEach(element => {
        element.addEventListener('click', () => {
            const postId = localStorage.getItem('postId');
            const commentId = element.parentElement.parentElement.id;
            const parentDiv = element.parentElement;
            const txtComment = element.innerHTML;
            myInput.alt = "";
            myInput.value = txtComment;
            myInput.id = 'update-comment';
            myInput.style.border = 'none';
            element.remove();
            parentDiv.prepend(myInput)
            myInput.onblur = () => {
                const updateComment = {
                    'content': myInput.value
                }

                fetch(`http://localhost:5000/api/v1/posts/${postId}/comments/${commentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateComment)
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err));
            }
            
        });
    });
}, 1000);