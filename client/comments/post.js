const myImg = document.querySelector(".post-img");
const description = document.querySelector(".desc");
const comments = document.querySelector('.comments');

const id = localStorage.getItem('postId');

let new_url = (URL) => {
    let new_url = URL.post.image.split('/');
    new_url.splice(1,1);
    return new_url.join('/');
}

// get post with id
fetch(`https://fesinsta-zsk.onrender.com/api/v1/posts/${id}`)
.then(res => res.json())
.then(data => {
    const url = new_url(data);
    
    const desPost = description.innerHTML += descriptionPost(data.post.description);
    const imgPost = myImg.innerHTML += postImg(url);
} )
.catch(err => console.log(err));

// get comment with id of post
fetch(`https://fesinsta-zsk.onrender.com/api/v1/posts/${id}/comments`)
.then(res => res.json())
.then(data => {
    const arr = data.comments;
    arr.forEach(element => {
        const comm = comments.innerHTML += comment(element.content, element.id);
    });
})
.catch(err => console.log(err));

const postImg = (imgUrl) => {
    return `
        <img src=${imgUrl} alt="" srcset="">
    `;
}

const comment = (content, id) => {
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

const descriptionPost = (desc) => {
    return `
        <p>${desc}</p>
    `
}