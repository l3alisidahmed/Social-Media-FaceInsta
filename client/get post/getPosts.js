const mainPosts = document.querySelector('.main-posts')

/* I Added This */
import updatePost from "../update/updatePost.js";
import updateLikes from "./updateLikes.js";

const postHeader = () => {
    return `
        <div class="container">
            <span class="options">...</span>
            <ul class="list">
                <li class="update">
                    <a href="/client/update/updatepost.html">Update</a>
                </li>
                <li class="delete">Delete</li>
            </ul>
        </div>
    `;
}

const createPostProfile = () => {
    return `
        <div class="post-profile">
            <div class="post-img">
                <img src="images/pexels-photo-312418.webp" alt="">
            </div>
            <h3>Marques B</h3>
        </div>
    `;
}

const commentsSection = () => {
    return `
        <div class="comments-section" style="display: none;">
            <input type="text" class="comment-input" placeholder="Add a comment...">
            <button id="submit-comment">Submit</button>
            <div class="comments"> </div>
        </div>
    `;
}

const createPostInfo = (likes, comments) => {
    return `
        <div class="post-info">
            ${createPostProfile()}
            <div class="likes">
                <i class="ri-heart-line likes-count"></i>
                <span class="hearts-number">${likes}</span>
                <i class="ri-chat-3-line toggle-comments"></i>
                ${commentsSection()}
                <span>${comments}</span>
            </div>
        </div>
    `;
}

const createPost = (post, numberComments) => {
    const { id, description, image, likes } = post;
    const postDom = document.createElement('div');
    
    postDom.id = id;
    postDom.classList.add('post-box');

    postDom.innerHTML =  `
        ${postHeader()}
        <p class="desc">${description}</p>
        <a href="/comments/index.html" id="link"></a>
        <img src="${image}" alt="" class="post-image"> 
        ${createPostInfo(likes, numberComments)}
    `;
    updatePost(postDom);
    updateLikes(postDom);
    
    return postDom;
}
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

fetch('https://fesinsta-zsk.onrender.com/api/v1/posts')
.then(res => res.json())
.then(data => {
    const arr = data.posts;
    arr.forEach(element => {
        console.log(element.id);
        console.log(element);
        fetch(`https://fesinsta-zsk.onrender.com/api/v1/posts/${element.id}/comments`)
        .then(res => res.json())
        .then(data => {
            console.log(data.comments.length);
            /* I Added This */
            const post = createPost(element, data.comments.length);
            mainPosts.append(post);
            
            const options = document.querySelectorAll('.options');
            
            options.forEach(option => {
                const list = option.nextElementSibling;
                option.onclick = () => {
                    list.classList.toggle('active');
                }
            });
        })
        .catch(err => console.log(err));
    });
})
.catch(err => console.log(err));

setTimeout(() => {
    const deleteBtn = document.querySelectorAll('.delete');
    console.log(deleteBtn);
    deleteBtn.forEach(element => {
        element.addEventListener('click', () => {
            const postId = element.parentElement.parentElement.parentElement.id 
            const post = document.getElementById(postId);
            post.remove();
    
            fetch(`https://fesinsta-zsk.onrender.com/api/v1/posts/${Number(postId)}`, {
                method: 'DELETE'
            }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
        });
    });
}, 2000);