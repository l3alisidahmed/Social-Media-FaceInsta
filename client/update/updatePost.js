

const submit = document.getElementById('submit-update');

const updatePost = (postDom) => {
  const postId = postDom.id;
  const likes = postDom.querySelector('.hearts-number').textContent;
  const update = postDom.querySelector('.update');
  update.onclick = () => {
    localStorage.setItem('postId', postId);
    localStorage.setItem('likes', likes);
    location.pathname = '/update/updatepost.html';
  }
}

if(submit) {
  submit.addEventListener('click', e => {
    e.preventDefault();
    const postId = localStorage.getItem('postId');
    const likes = localStorage.getItem('likes');
    const description = document.getElementById('updatedDescription').value;
    console.log(description);
    const image = document.getElementById('updatedImageUrl').value;
    console.log(image);
    const updatedPost = JSON.stringify({
      description,
      image,
      likes
    })
    console.log(updatedPost);
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
      location.href = 'https://main--cosmic-crumble-da4920.netlify.app';
    })
    .catch(err => console.error(err));
  });
}


export default updatePost