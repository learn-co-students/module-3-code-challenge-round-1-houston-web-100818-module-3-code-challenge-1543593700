let imageId = 1516; //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
const likeURL = `https://randopic.herokuapp.com/likes/`;
const commentsURL = `https://randopic.herokuapp.com/comments/`;
const imageDiv = document.querySelector("#image-card");
const img = document.querySelector("#image");
const name = document.querySelector("#name");
const likes = document.querySelector("#likes");
const likeButton = document.querySelector("#like-button");
const commentsList = document.querySelector("#comments");
const submitButton = document.querySelector("#submit");

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

const fetchImage = function() {
  fetch(imageURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      image = result;
      renderImage();
    });
  //fetchImage();
};

const renderImage = function() {
  img.src = image.url;
  name.innerText = image.name;
  likes.innerText = image.like_count;
  likeButton.addEventListener("click", function(e) {
    image.like_count++;
  });

  imageDiv.append(img, name, likes);

  commentsList.innerHTML = "";
  image.comments.forEach(function(comment) {
    let li = document.createElement("li");
    li.innerText = comment.content;
    commentsList.append(li);
    increaseLikes();
  });

  function increaseLikes(like) {
    fetch("https://randopic.herokuapp.com/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ like })
    })
      .then(response => response.json())
      .then(response => console.log(response));
  }

  submitButton.addEventListener("click", function(e) {
    e.preventDefault();
  });

  const commentForm = document.getElementById("comment_form");
  commentForm.addEventListener("submit", e => {
    e.preventDefault();
    const commentInput = document.getElementById("comment_input");
    const newComment = comment.value;
  });
};
fetchImage();
