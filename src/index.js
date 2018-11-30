document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1550 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCard = document.querySelector('#image_card')
  const imageInput = document.querySelector('#image')
  const imageName = document.querySelector('#name')
  let imageLikes = document.querySelector('#likes')
  const likeButton = document.querySelector('#like_button')
  const commentInput = document.querySelector('#comment_input')
  const commentSubmitButton = document.querySelector('#submit')
  const commentsList = document.querySelector('#comments')

  const render = function(){
    fetch(imageURL)
    .then (function(response){
      return response.json()
    })
    .then (function(image){
      // console.log(image)
      renderImage(image)
      renderImageLikes(image)
      renderComments(image)
    })
  }

  const renderImage = function(image){
    imageInput.src = image.url
    imageName.innerHTML = image.name
  }

  const renderImageLikes = function(image){
    //EVERY CLICK IS DOUBLING OUTPUT
    imageLikes.innerHTML = ''
    imageLikes.innerHTML = image.like_count
  }
  
  likeButton.addEventListener('click', function (e) {
    e.preventDefault()
    console.log('hitting event')
    updateLikes()
    render()
  })

  const renderComments = function(image){
    commentsList.innerHTML = ''
    // console.log(image.comments)
    image.comments.forEach(function(comment){
      commentListItem = document.createElement('li')
      commentListItem.innerHTML = comment.content
      commentsList.append(commentListItem)
    })
    // console.log(commentSubmitButton)
  }
      commentSubmitButton.addEventListener('click', function(e){
        e.preventDefault()
        commentContent = commentInput.value
        console.log(commentContent)  
        addComment()
        // commentList = ''
        
        render()
      })


  const updateLikes = function(){
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'},
    body: JSON.stringify({
        image_id: imageId
      })      
    }).then(render)
  }

  const addComment = function(){
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        image_id: imageId,
        content: commentContent
      })
    }).then(render)
  }

  // const submitComment;

  // const addComment = function(){
  // }


  render()
})



