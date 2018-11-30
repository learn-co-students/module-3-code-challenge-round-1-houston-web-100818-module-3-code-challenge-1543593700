const imageSrc = document.querySelector("#image");
const imageName = document.querySelector("#name");
const imageLikes = document.querySelector("#likes");
const imageUlComments = document.querySelector("#comments");
const likeButton = document.querySelector("#like_button");
const commentFormInput = document.querySelector("#comment_input");
const commentFormSubmit = document.querySelector('[type="submit"]');

let myImage;

let imageId = 1556;

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
const likeURL = `https://randopic.herokuapp.com/likes/`;
const commentsURL = `https://randopic.herokuapp.com/comments/`;

likeButton.addEventListener("click", function(e) {
  console.log("like button clicked");
  ++myImage.like_count;
  renderImageInfo();
  updateLikes();
});

commentFormSubmit.addEventListener("click", function(e) {
  e.preventDefault();
  let new_content = commentFormInput.value;
  let new_comment = { content: new_content };
  myImage.comments.push(new_comment);
  renderImageInfo();
  updateComments(new_content);
  commentFormInput.value = "";
});

const fetchInfo = function() {
  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      myImage = response;
      renderImageInfo();
    });
};

const renderImageInfo = function() {
  imageLikes.innerText = "";
  imageUlComments.innerHTML = "";
  imageSrc.src = myImage.url;
  imageName.innerText = myImage.name;
  imageLikes.innerText = myImage.like_count;
  myImage.comments.forEach(function(comment) {
    const commentLi = document.createElement("li");
    imageUlComments.append(commentLi);
    commentLi.innerText = comment.content;
    const commentDelete = document.createElement("button");
    commentLi.append(commentDelete);
    commentDelete.innerText = "Delete";
    commentDelete.addEventListener("click", function(e) {
      console.log("delete button clicked");
      deleteComment(comment);
    });
  });
};

const updateLikes = function() {
  fetch(`${likeURL}`, {
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

const updateComments = function(content) {
  fetch(`${commentsURL}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_id: imageId,
      content: content
    })
  });
};

const deleteComment = function(comment) {
  fetch(`${commentsURL}${comment.id}`, {
    method: "DELETE"
  }).then(fetchInfo);
};

fetchInfo();
