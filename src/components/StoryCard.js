import React from "react";

function StoryCard({story, onLikeClick, onDeleteClick}) {
  const {id,description,likes,name} = story;

  function likeClick() {
    onLikeClick(id,likes);
  }

  function deleteClick() {
    onDeleteClick(id);
  }

  return (
    <div className="card">
      <h3>{name}</h3>
      <pre>{description}</pre>
      <pre>{likes} Likes </pre>
      <pre>
      <button type="button" className="btn btn-outline-primary" onClick={likeClick}>Like</button>

      <button type="button" className="btn btn-outline-danger" onClick={deleteClick} >Remove</button>
      </pre>
    </div>
  );
}

export default StoryCard;
