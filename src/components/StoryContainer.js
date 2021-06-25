import React, { useEffect, useState } from "react";
import StoryCard from "./StoryCard";


function StoryContainer({stories, handleLikeClick, handleDeleteClick, editStory, handleEditClick, handleCancelClick, handleOnChangeValue, handleEditStory}) {

  const [position, setPosition] = useState(0);

  const storiesToDisplay = listToShow().map((item,index)=>{
    return (
      <StoryCard 
        key={index}
        story={item}
        onEditClick={handleEditClick}
        editFormData={editStory}
        onLikeClick={handleLikeClick}
        onDeleteClick={handleDeleteClick}
        onCancelClick={handleCancelClick}
        onChangeValue={handleOnChangeValue}
        onSubmitEditForm={handleEditStory}
      />
    )
  })

  function onPreviousClick(){
    if ((position - 4) >= 0){
      setPosition(position - 4);
    }
  }

  function onNextClick() {
    if ((stories.length - position) > 4){
      setPosition(position + 4);
    }
  }

  function listToShow(){
    if (stories.length < 4){
      return stories;
    } else {
      let startPosition = position;
      let endPosition = startPosition + 4;
      let returnArray = stories.slice(startPosition,endPosition);
      return returnArray;
    }
  }

  function showPageBtn(){
      return (
        <div>
          <button type="button" class="btn btn-link" onClick={onPreviousClick}>Previous</button>
          <button type="button" class="btn btn-link" onClick={onNextClick}>Next</button>
        </div>
      )
  }

  return (
    <div id="collection">
      {storiesToDisplay}
      {(stories.length > 0) ? showPageBtn() : null}
    </div>
  );
}

export default StoryContainer;
