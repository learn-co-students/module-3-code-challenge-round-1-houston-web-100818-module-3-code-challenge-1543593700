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
let deleteButton

document.addEventListener('DOMContentLoaded', () => {
  console.log('🦜 %c DOM Content Loaded and Parsed! 🦜', 'color: magenta')
  likeButton.style.margin = '3px'
  likeButton.addEventListener('mouseover', (e) => {
    likeButton.innerText = 'Like 👍'
  })
  likeButton.addEventListener('mouseout', (e) => {
    likeButton.innerText = 'Like'
  })
  submitButton.addEventListener('mouseover', (e) => {
    submitButton.value = 'Submit 🦜'
  })
  submitButton.addEventListener('mouseout', (e) => {
    submitButton.value = 'Submit'
  })
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

  likeButton.addEventListener('click', (e) => {
    i.like_count++
    addLike(i)
  })

  let commentsListItems = i.comments
  commentsListItems.forEach( c => {
    let listItem = document.createElement('li')
    listItem.innerText = c.content
    commentsList.append(listItem)
    // makeDeleteButton(listItem)
    // listItem.append(deleteButton)
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
  let commentText = commentField.value
  if (commentText != '') {
    let listItem = document.createElement('li')
    listItem.innerHTML = `✨✨<b>"${commentText}"</b> added ✨✨`
    commentsList.append(listItem)
    commentField.value = ''
    commentField.placeholder="Add MOAR Comments"
    setTimeout( () => {
      listItem.innerHTML = `${commentText}`
    }, 1200)
    // setTimeout( () => {
    //   makeDeleteButton(listItem)
    //   listItem.append(deleteButton)
    // }, 1210)
    fetch('https://randopic.herokuapp.com/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentText
      })
    })
  }
  else {alert('please type in your comment, we are not psychic 🔮')}
}

// const makeDeleteButton = (comment) => {
//   deleteButton = document.createElement('button')
//   deleteButton.innerText = "X"
//   deleteButton.style.width = '20px'
//   deleteButton.style.padding = '1px'
//   deleteButton.style.margin = '10px'
//   deleteButton.style.background = 'rgb(247, 150, 150)'
//
//   // deleteButton.addEventListener('click', (e) => {
//   //   fetch(`https://randopic.herokuapp.com/comments/${comment.id}`, {
//   //   method: 'DELETE'})
//   //   .then(fetchImg)
//   // })
// }
