document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  // DATA
  let imageId = 1557 //Enter the id from the fetched image here
  let myImage
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes`
  const commentsURL = `https://randopic.herokuapp.com/comments`
  const deleteURL = `https://randopic.herokuapp.com/comments/`

  // DOM ELEMENTS
  const qs = function(id) {
    return document.querySelector(id)
  }
  const imageTag = qs('#image')
  const imageName = qs('#name')
  const likesSpan = qs('#likes')
  const likeButton = qs('#like_button')
  const commentForm = qs('#comment_form')
  const commentInput = qs('#comment_input')
  const commentList = qs('#comments')

  // FETCH IMAGE FROM API
  fetch(imageURL)
    .then(function(response) {
      return response.json()
    })
    .then(function(result) {
      myImage = result
      render()
    })

  // PAGE RENDER FUNCTIONS
  const render = function() {
    renderImage()
    renderComments()
  }

  const renderImage = function() {
    imageTag.src = myImage.url
    imageTag.dataset.id = myImage.id
    imageName.innerText = myImage.name
    likesSpan.innerText = myImage.like_count
  }

  const renderComments = function() {
    commentInput.value = ''
    commentList.innerHTML = ''
    myImage.comments.forEach(function(comment) {
      const commentListItem = commentList.appendChild(document.createElement('li'))
      commentListItem.innerText = comment.content + " "
      renderDeleteButton(comment, commentListItem)
    })
  }

  const renderDeleteButton = function(comment, commentListItem) {
    const deleteButton = commentListItem.appendChild(document.createElement('button'))
    deleteButton.innerText = 'Delete Comment'
    deleteButton.addEventListener('click', function() {
      deleteComment(comment)
    })
  }

  // HELPER FUNCTIONS
  const addLike = function() {
    const imageObj = {
      image_id: imageId
    }
    myImage.like_count++
    render()
    saveImage(likeURL, imageObj)
  }

  const addComment = function() {
    const imageObj = {
      content: commentInput.value,
      image_id: imageId
    }
    myImage.comments.push(imageObj)
    render()
    saveImage(commentsURL, imageObj)
  }

  const deleteComment = function(commentToDelete) {
    myImage.comments = myImage.comments.filter(function(comment) {
      return comment !== commentToDelete
    })
    render()
    fetch(deleteURL + `${commentToDelete.id}`, {
      method: 'DELETE'
    })
  }

  const saveImage = function(url, obj) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
  }

  // EVENT LISTENERS
  likeButton.addEventListener('click', addLike)
  commentForm.addEventListener('submit', function(event) {
    event.preventDefault()
    addComment()
  })
})
