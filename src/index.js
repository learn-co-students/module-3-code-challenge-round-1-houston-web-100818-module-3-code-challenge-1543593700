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
    image.setAttribute('src', imgObject.url)
    name.innerHTML = imgObject.name
    likes.innerHTML = imgObject.like_count

    imgObject.comments.forEach((comment)=>{
      const commentItem = document.createElement('li')
      commentItem.innerHTML = comment.content
      commentList.append(commentItem)
    })
  }



  fetchImg()
})