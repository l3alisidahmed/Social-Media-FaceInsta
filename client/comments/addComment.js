const inputComment = document.getElementById('input-comment');
const sendIcons = document.querySelector('.material-symbols-outlined');


const comme = (content, id) => {
    return `
    <div class="comment" id="${id}">
        <div class="profile-info">
            <div class="profile-img"></div>
            <div class="profile-name">
                <h3>Sid ahmed</h3>
                <p>il ya 3h</p>
            </div>
        </div>
        <div class="content">
            <p>${content}</p>
            <div class="trash-icons">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </div>
        </div>
        <hr>
    </div>
    `
}


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
        const com = document.querySelector('.comments').innerHTML += comme(new_comment.content, id);
        console.log(data);
        location.reload()
    })
    .catch(err => console.log(err));
})