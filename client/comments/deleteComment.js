setTimeout(() => {
    const trashIcons = document.querySelectorAll(".trash-icons .material-symbols-outlined");
    console.log(trashIcons);
    trashIcons.forEach(element => {
        console.log(element);
        element.addEventListener('click', () => {
            const commentId = element.parentElement.parentElement.parentElement.id;
            const postId = localStorage.getItem('postId');
            
            element.parentElement.parentElement.parentElement.remove();
            console.log(element.parentElement.parentElement.parentElement);
            
            fetch(`https://fesinsta-zsk.onrender.com/api/v1/posts/${postId}/comments/${commentId}`,{
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => {
            })
            .catch(err => console.log(err));
        });
    });
}, 1000);

