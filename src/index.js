let imageId = 1552
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const image = document.querySelector('#image')
const name = document.querySelector('#name')
const likes = document.querySelector('#likes')
const likeButton = document.querySelector('#like_button')
const commentsList = document.querySelector('#comments')
const commentField = document.querySelector('#comment_input')
const submitButton = document.querySelector('#submit-button')

document.addEventListener('DOMContentLoaded', () => {
  console.log('🦜 %c DOM Content Loaded and Parsed! 🦜', 'color: magenta')
  fetchImg()
})

const fetchImg = () => {
  fetch(imageURL)
  .then( response => {
    return response.json()
  })
  .then( render )
}

const render = (i) => {
  image.src = i.url
  name.innerText = i.name
  likes.innerText = `${i.like_count}`

  likeButton.style.margin = '3px'
  likeButton.addEventListener('mouseover', (e) => {
    likeButton.innerText = 'Like 👍'
  })
  likeButton.addEventListener('mouseout', (e) => {
    likeButton.innerText = 'Like'
  })
  likeButton.addEventListener('click', (e) => {
    i.like_count++
    addLike(i)
  })

  let commentsListItems = i.comments
  commentsListItems.forEach( c => {
    let listItem = document.createElement('li')
    listItem.innerText = c.content
    commentsList.append(listItem)
  })

  submitButton.addEventListener('mouseover', (e) => {
    submitButton.value = 'Submit 🦜'
  })
  submitButton.addEventListener('mouseout', (e) => {
    submitButton.value = 'Submit'
  })
  submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    addComment()
  })
}

const addLike = (i) => {
  likes.innerText = `${i.like_count}`
  fetch('https://randopic.herokuapp.com/likes', {
    method: 'POST',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  })
}

const addComment = () => {
  let newComment = document.createElement('li')
  let commentText = commentField.value
  newComment.innerHTML = `✨✨<b>'${commentText}'</b> added ✨✨`
  commentsList.append(newComment)
  commentField.value = ''
  setTimeout( () => {
    newComment.innerHTML = `${commentText}`
  }, 2000)
}
