document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1549 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const image = document.getElementById('image')
  const name = document.getElementById('name')
  const likes = document.getElementById('likes')
  const likeButton = document.getElementById('like_button')
  const commentForm = document.getElementById('comment_form')
  const commentInput = document.getElementById('comment_input')
  const commentList = document.getElementById('comments')

  let imgObject;

  function fetchImg()  {
    fetch(imageURL)
    .then((response)=>response.json())
    .then((data)=>{
      imgObject = data
      render()
    })
  }

  function render() {
    console.log(imgObject)
    image.setAttribute('src', imgObject.url)
    name.innerHTML = imgObject.name
    likes.innerHTML = imgObject.like_count
    likeButton.addEventListener('click', addLike)
    commentForm.addEventListener('submit', submitComment)

    imgObject.comments.forEach((comment)=>{
      // commentList.innerHTML = ''
      const commentItem = document.createElement('li')
      commentItem.innerHTML = comment.content
      commentList.append(commentItem)
    })
  }

  function addLike() {
    imgObject.like_count++
    updateLikes(imgObject.id)
  }

  function updateLikes(imageId) {
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
    .then(fetchImg)
  }

  function submitComment() {
    newComment = {
      "image_id": imgObject.id,
      "content": commentInput.value
    }
    imgObject.comments.push(newComment)
    updateComments(newComment)
  }

  function updateComments(comment) {
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: comment.image_id,
        content: comment.content
      })
    })
    .then(fetchImg)
  }

  fetchImg()
})