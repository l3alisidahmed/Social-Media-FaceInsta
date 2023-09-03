setTimeout(() => {
    const trashIcons = document.querySelectorAll(".trash-icons .material-symbols-outlined")
    console.log(trashIcons);
    trashIcons.forEach(element => {
        element.addEventListener('click', () => {
            const commentId = element.parentElement.parentElement.parentElement.id;
            const postId = localStorage.getItem('postId');

            fetch(`http://localhost:5000/api/v1/posts/${postId}/comments/${commentId}`,{
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
        });
    });
}, 1000);

