document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1549 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  const image = document.getElementById('image')
  const name = document.getElementById('name')
  const likes = document.getElementById('likes')
  const upvote = document.getElementById('like_button')
  const downvote = document.getElementById('dislike_button')
  
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
    renderImage()
    renderLikes()
    renderComments()
    
    upvote.addEventListener('click', ()=>{addLike(true)})
    downvote.addEventListener('click', ()=>{addLike(false)})
    commentForm.addEventListener('submit', submitComment)
  }

  const renderImage = function() {  
    image.setAttribute('src', imgObject.url)
    name.innerHTML = imgObject.name
  }
  
  const renderLikes = function() {
    likes.innerHTML = imgObject.like_count
  }

  const renderComments = function() {
  commentList.innerHTML = ''
  imgObject.comments.forEach((comment) => {
    const commentItem = document.createElement('li')
    commentItem.innerHTML = comment.content
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'x'

    deleteButton.addEventListener('click', () => { deleteComment(comment.id) })

    commentItem.append(deleteButton)
    commentList.append(commentItem)
  })
}

  function addLike(bool) {
    if (bool) {
      imgObject.like_count++
      updateLikes(imgObject.id, true)
    } else {
      imgObject.like_count--
      updateLikes(imgObject.id, false)
    }
    renderLikes()
  }

  function updateLikes(imageId, isUp) {
    if (isUp) {
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
    } else {
      // no route implemented for randopic API
      // fetch(likeURL, {
      //   method: 'DELETE'
      // })
    }
  }

  function submitComment(e) {
    e.preventDefault()
    newComment = {
      "image_id": imgObject.id,
      "content": commentInput.value
    }
    imgObject.comments.push(newComment)
    commentInput.value = ''
    console.log(imgObject)
    renderComments()
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
  }

  function deleteComment(commentID) {
    fetch(commentsURL + commentID, {
      method: 'DELETE'
    })
    .then(fetchImg)
  }

  fetchImg()
})