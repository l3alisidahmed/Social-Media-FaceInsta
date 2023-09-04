const mainPosts = document.querySelector('.main-posts')
// const postBox = document.createElement('div');
// const myContainer = document.createElement('div');
// const mySpan = document.createElement('span');
// const myList = document.createElement('ul');
// const item1 = document.createElement('li');
// const item2 = document.createElement('li');
// const myP = document.createElement('p');
// const myTxt = `☕ Coffee is a beloved beverage enjoyed by people around the world🥰.`;
// const myImg = document.createElement('img');
// const postInfo = document.createElement('div');
// const postProfile = document.createElement('div');
// const postImg = document.createElement('div');
// const imgProfile = document.createElement('img');
// const myH3 = document.createElement('h3');
// const h3Txt = "Marques B";
// const likes = document.createElement('div');
// const heartIcon = document.createElement('i');
// const likesSpan = document.createElement('span');
// const likesTxt = "86.3k";
// const commentIcon = document.createElement('i');
// const commentSpan = document.createElement('span');
// const commentTxt = "80";

// postBox.className = 'post-box';
// myContainer.className = 'container';
// mySpan.className = 'options';
// myList.className = 'list';
// item1.className = 'update';
// item2.className = 'delete';
// postInfo.className = 'post-info';
// postProfile.className = 'post-profile';
// postImg.className = 'post-img';
// imgProfile.src = 'images/pexels-photo-312418.webp';
// likes.className = 'likes';
// heartIcon.className = 'ri-heart-line';
// commentIcon.className = 'ri-chat-3-line toggle-comments';

// postBox.appendChild(myContainer);
// mySpan.textContent = "..."
// myContainer.appendChild(mySpan);
// myContainer.appendChild(myList);
// item1.textContent = item1.className;
// item2.textContent = item2.className;
// myList.appendChild(item1);
// myList.appendChild(item2);
// postBox.appendChild(myP);
// postBox.appendChild(myImg);
// postInfo.appendChild(postProfile);
// postProfile.appendChild(postImg);
// postImg.appendChild(imgProfile);
// myH3.textContent = h3Txt;
// postProfile.appendChild(myH3);
// postBox.appendChild(postInfo);
// likes.appendChild(heartIcon);
// likes.appendChild(likesSpan);
// likes.appendChild(commentIcon);
// commentSpan.textContent = commentTxt;
// likes.appendChild(commentSpan);
// postInfo.appendChild(likes);

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
        <a href="../comments/index.html"></a>
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
