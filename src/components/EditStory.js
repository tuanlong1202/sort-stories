import React from "react";

function EditStory({editStoryData, changeValue, submitForm, cancelClick}) {
  return (
    <div className="">
      <form onSubmit={submitForm} >
        <h3>Edit a story!</h3>
        <div className="form-group">
        <label for="name">Story's name</label>
        <input
          type="text"
          name="name"
          onChange={changeValue}
          placeholder="Enter a story's name..."
          className="form-control"
          value={editStoryData.name}
        />
        </div>
        <div className="form-group">
          <label for="description">Description</label>
        <textarea
          type="textarea"
          name="description"
          onChange={changeValue}
          class="form-control"
          rows="3"
          placeholder="Enter a story's description..."
          value={editStoryData.description}
        >
        </textarea>
        </div>
        <button type="button" class="btn btn-secondary" onClick={cancelClick}>Cancel</button>
        <button type="submit" class="btn btn-primary">Save Story</button>
      </form>
    </div>
  );
}

export default EditStory;
