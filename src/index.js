document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1549 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let imgObject;

  function fetchImg()  {
    fetch(imageURL)
    .then((response)=>response.json())
    .then((data)=>{
      imgObject = data
      render()
  })

  function render() {
    
  }



  fetchImg()
})