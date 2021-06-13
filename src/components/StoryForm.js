import React from "react";

function StoryForm({changeValue, submitForm, storyRecord}) {
  return (
    <div className="container">
      <form onSubmit={submitForm} >
        <h3>Create a story!</h3>
        <div className="form-group">
        <input
          type="text"
          name="name"
          onChange={changeValue}
          placeholder="Enter a story's name..."
          className="form-control"
          value={storyRecord.name}
        />
        </div>
        <div className="form-group">
        <textarea
          type="textarea"
          name="description"
          onChange={changeValue}
          class="form-control"
          rows="3"
          placeholder="Enter a story's description..."
          value={storyRecord.description}
        >
        </textarea>
        </div>
        <button type="submit" class="btn btn-primary">Create New Story</button>
      </form>
    </div>
  );
}

export default StoryForm;
