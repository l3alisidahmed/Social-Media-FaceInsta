setTimeout(() => {
    const trashIcons = document.querySelectorAll(".trash-icons .material-symbols-outlined");
    trashIcons.forEach(element => {
        element.addEventListener('click', () => {
            const commentId = element.parentElement.parentElement.parentElement.id;
            const postId = localStorage.getItem('postId');

            fetch(`https://fesinsta-zsk.onrender.com/api/v1/posts/${postId}/comments/${commentId}`,{
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                document.getElementById(`${commentId}`).remove();
            })
            .catch(err => console.log(err));
        });
    });
}, 1000);

