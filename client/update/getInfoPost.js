const postId = 1693581915201;
const desc = document.querySelector('.desc');
const img = document.getElementById('pic');
const likes = document.querySelector('.hearts-number');
const comments = document.querySelector('.comments-number');
const inputDescription = document.querySelector('.desc-inp');
const inputUrl = document.querySelector('.url');

console.log(desc);
console.log(img);

let getNumberComments = (id) => {
    fetch(`https://fesinsta-zsk.onrender.com/api/v1/posts/${id}/comments`)
    .then(res => res.json())
    .then(data => {
        console.log(data.comments.length);
        return 'tr';
    })
    .catch(err => console.log(err));
}


fetch(`https://fesinsta-zsk.onrender.com/api/v1/posts/${postId}`)
.then(res => res.json())
.then(data => {
    console.log(data);
    desc.innerHTML = data.post.description;
    img.src = data.post.image;
    likes.innerHTML = data.post.likes;
    inputUrl.value = data.post.image;
    inputDescription.value = data.post.description;
    inputDescription.id = 'desc-inp'
    inputDescription.focus();
    document.getElementById('desc-inp').onblur = () => {
        desc.innerHTML = inputDescription.value
    }
    inputUrl.onblur = () => {
        img.src = inputUrl.value;
    }
})
.catch(err => console.log(err));