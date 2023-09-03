

const updateLikes = (postDom) => {
  const heart = postDom.querySelector('.likes-count');
  const likesDom = postDom.querySelector('.hearts-number');
  let likesNumber = parseInt(likesDom.textContent);
  heart.onclick = e => {
    e.preventDefault();
    e.stopPropagation();
    if(heart.classList.contains('ri-heart-line')) {
      heart.classList.remove('ri-heart-line');
      heart.classList.add('ri-heart-fill');
      likesDom.textContent = ++likesNumber;
    } else {
      heart.classList.remove('ri-heart-fill');
      heart.classList.add('ri-heart-line');
      likesDom.textContent = --likesNumber;
    }
    const description = postDom.querySelector('.desc').textContent;
    const image = postDom.querySelector('.post-image').src;
    fetch(`https://fesinsta-zsk.onrender.com/api/v1/posts/${postDom.id}`, {
      method: 'PUT',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({
        description,
        image,
        likes: likesNumber
      })
    })
    .then(response => {
      console.log(response.status);
      console.log(response);
      response.json();
      
    })
    .then(data => {
      console.log('data = ' + data);
      
    })
    .catch(err => console.error(err));
  }
}

export default updateLikes