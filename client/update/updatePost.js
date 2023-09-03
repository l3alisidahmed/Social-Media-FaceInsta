

const submit = document.getElementById('submit-update');

const updatePost = (postDom) => {
  const postId = postDom.id;
  const likes = postDom.querySelector('.hearts-number').textContent;
  console.log(likes);
  const update = postDom.querySelector('.update');
  update.onclick = () => {
    console.log(postId);
    localStorage.setItem('postId', postId);
    localStorage.setItem('likes', likes);
    location.pathname = '/client/update/updatepost.html';
  }
}


if(submit) {
  submit.addEventListener('click', e => {
    e.preventDefault();
    const postId = localStorage.getItem('postId');
    const likes = localStorage.getItem('likes');
    const description = document.getElementById('updatedDescription').value;
    const image = document.getElementById('updatedImageUrl').value;
    const updatedPost = JSON.stringify({
      description,
      image,
      likes
    })
    fetch(`https://fesinsta-zsk.onrender.com/api/v1/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: updatedPost
    })
    .then(response => {
      if(!response.ok) {
        console.error(`Somthing Went Wrong! Status: ${response.status}`);
        return;
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      location.pathname = '/client/index.html';
    })
    .catch(err => console.error(err));
  });
}


export default updatePost