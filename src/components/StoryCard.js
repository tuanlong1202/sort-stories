import React, { useState } from "react";
import EditStory from "./EditStory";

function StoryCard({story, onEditClick, editFormData, onLikeClick, onDeleteClick, onCancelClick, onChangeValue, onSubmitEditForm}) {
  const {id,description,likes,name} = story;

  function likeClick() {
    onLikeClick(id,likes);
  }

  function deleteClick() {
    onDeleteClick(id);
  }

  function editClick() {
    onEditClick(id);
  }

  function showCard(){
    return (
      <div>
      <h3>{name}</h3>
      <pre>{description}</pre>
      <pre>{likes} Likes </pre>
      <pre>
      <button type="button" className="btn btn-outline-primary" onClick={editClick}>Edit</button>
      <button type="button" className="btn btn-outline-primary" onClick={likeClick}>Like</button>

      <button type="button" className="btn btn-outline-danger" onClick={deleteClick} >Remove</button>
      </pre>
      </div>
  )
  }

  return (
    <div className="card">
      {
        (editFormData.id === id) ? <EditStory 
        editStoryData={editFormData} 
        changeValue={onChangeValue}
        submitForm={onSubmitEditForm}
        cancelClick={onCancelClick}
        /> 
        :
        showCard()
      } 
    </div>
  );
}

export default StoryCard;
