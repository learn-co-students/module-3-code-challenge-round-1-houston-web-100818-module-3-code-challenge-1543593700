// document.addEventListener('DOMContentLoaded', () => {
// console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

let imageId = 1551; //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
const likeURL = `https://randopic.herokuapp.com/likes/`;
const commentsURL = `https://randopic.herokuapp.com/comments/`;
let imageData;
const imageSpot = document.querySelector("#image");
const image = document.querySelector("img");
const title = document.querySelector("#name");
const likes = document.querySelector("#likes");
const likeButton = document.querySelector("#like_button");
const commentInput = document.querySelector("#comment_input");
const submitButton = document.querySelector("input[type=submit]");
const commentsUl = document.querySelector("#comments");
let commentToBeDeleted;

const fetchData = () => {
  fetch(imageURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      imageData = result;
      render();
    });
};

const render = () => {
  commentsUl.innerHTML = "";
  image.src = imageData.url;
  title.innerHTML = imageData.name;
  likes.innerHTML = imageData.like_count;

  imageData.comments.forEach(comment => {
    const commentLi = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete comment";

    commentLi.innerHTML = comment.content;
    commentLi.append(deleteButton);
    commentsUl.append(commentLi);

    deleteButton.addEventListener("click", function() {
      commentToBeDeleted = comment;
      commentLi.id = "deleting";
      $("#deleting").remove();
      deleteComment();
    });
  });

  submitButton.addEventListener("click", function(e) {
    e.preventDefault();
    let newComment = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete comment";

    newComment.innerHTML = commentInput.value;
    newComment.append(deleteButton);
    commentsUl.append(newComment);
    submitForm(commentInput.value);
    commentInput.value = "";
  });
};

likeButton.addEventListener("click", function() {
  let updatedLikes = parseInt(likes.innerHTML) + 1;
  likes.innerHTML = updatedLikes;
  addLike();
});

const deleteComment = () => {
  fetch(`https://randopic.herokuapp.com/comments/${commentToBeDeleted.id}`, {
    method: "DELETE"
  });
};

const addLike = () => {
  fetch("https://randopic.herokuapp.com/likes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_id: imageId
    })
  });
};

const submitForm = cont => {
  fetch("https://randopic.herokuapp.com/comments", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_id: imageId,
      content: cont
    })
  });
};

fetchData();

// })
