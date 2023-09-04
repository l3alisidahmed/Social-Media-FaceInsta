const mainPosts = document.querySelector('.main-posts')

/* I Added This */
import updatePost from "../update/updatePost.js";
import updateLikes from "./updateLikes.js";

const postHeader = () => {
    return `
        <div class="container">
            <span class="options">...</span>
            <ul class="list">
                <a href="../update/updatepost.html">
                    <li class="update">Update</li>
                </a>
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

const createPostInfo = (likes) => {
    return `
        <div class="post-info">
            ${createPostProfile()}
            <div class="likes">
                <i class="ri-heart-line likes-count"></i>
                <span class="hearts-number">${likes}</span>
                <i class="ri-chat-3-line toggle-comments"></i>
                ${commentsSection()}
                <span>96</span>
            </div>
        </div>
    `;
}

const createPost = (post) => {
    const { id, description, image, likes } = post;
    const postDom = document.createElement('div');
    postDom.id = id;
    postDom.classList.add('post-box');

    postDom.innerHTML =  `
        ${postHeader()}
        <p class="desc">${description}</p>
        <a href="/comments/index.html" id="link"></a>
        <img src="${image}" alt="" class="post-image"> 
        ${createPostInfo(likes)}
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
        // myImg.alt = "";
        // myImg.src = element.image;
        // myP.textContent = element.description;
        // likesSpan.textContent = element.likes;
        // postBox.id = element.id;

        /* I Added This */
        const post = createPost(element);
        mainPosts.append(post);
        /*^^^^^^^^^^^^^^*/

        // mainPosts.append(postBox);

        const options = document.querySelectorAll('.options');

        options.forEach(option => {
            const list = option.nextElementSibling;
            option.onclick = () => {
                list.classList.toggle('active');
            }
        });
    });
    let deleteBtn = document.querySelectorAll('.delete');
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
})
.catch(err => console.log(err));
