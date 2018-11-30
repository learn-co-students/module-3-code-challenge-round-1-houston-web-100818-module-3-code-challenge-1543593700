document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1553 //Enter the id from the fetched image here
  let imageObj 
  
  let likes = document.getElementById('likes')
  let commentsUl = document.getElementById('comments')

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  

  fetch(imageURL).then(function(r){
    return r.json()
  }).then(data => {
    imageObj = data
    render()
  })

  function render() {
    let myImage = document.getElementById('image')
    myImage.src = imageObj.url
    myImage.dataset.id = imageId

    document.getElementById('name').innerHTML = imageObj.name
    likes.innerHTML = imageObj.like_count

    let commentArray = imageObj.comments
    commentArray.forEach(function(comment){
      let newCommentLi = document.createElement('li')
      newCommentLi.innerHTML = comment.content
      newCommentLi.id = comment.id 
      commentsUl.append(newCommentLi)
    })
  }
})


