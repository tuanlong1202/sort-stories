import React, { useState, useEffect } from "react";

import Header from "./Header";
import StoryForm from "./StoryForm";
import StoryContainer from "./StoryContainer";

function App() {
  
  // variable and object declaration

  const newFormRecord = {
    name: "",
    description: "",
    likes: 0    
  }

  const editFormRecord = {
    name: "",
    description: "",
    likes: 0,
    id: 0
  }

  const [showForm, setShowForm] = useState(false);

  const [addForm, setAddForm] = useState(newFormRecord);

  const [editForm, setEditForm] = useState(editFormRecord);

  const [storyList, setStoryList] = useState([]);

  const [page, setPage] = useState(0);

  useEffect(loadStories,[]);
  
  // database interactive
  
  function loadStories() {
    fetch(process.env.REACT_APP_API_URL)
      .then((r)=>r.json())
      .then((data)=>{
        setStoryList([...data]);
      })
      .catch((e)=>{
        console.error("Error: " + e)
      });
  }

  function loadRecord(id) {
    fetch(process.env.REACT_APP_API_URL + "/" + id)
      .then((r)=>r.json())
      .then((data)=>{
        setEditForm(data);
      })
      .catch((e)=>{
        console.error("Error: " + e)
      });
  }

  function addNewRecord() {
    fetch(process.env.REACT_APP_API_URL, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addForm),
    })
      .then(response => response.json())
      .then(loadStories)
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function editRecord(id,dtaObject) {
    fetch(process.env.REACT_APP_API_URL + "/" + id,{
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dtaObject)
    })
      .then((r)=>r.json())
      .then(loadStories)
      .catch((e)=>console.error("Error: " + e));
  }

  function deleteRecord(id) {
    fetch(process.env.REACT_APP_API_URL + "/" + id,{
      method: 'DELETE'
    })
      .then((r)=>r.json())
      .then(loadStories)
      .catch((e)=>console.error("Error: " + e));
  }

  // Handle events

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
    
    // Add new form

    function  handleChangeAddNewForm(event) {
      setAddForm({
        ...addForm,
        [event.target.name]: event.target.value,
      })
    }

    function validateForm(event) {
      if (addForm.name === "") {
        alert("Story's name must exist !")
        event.target.name.focus();
        return false;
      }
      if (addForm.description === "") {
        alert("Story's description must exist !")
        event.target.description.focus();
        return false;
      }
      return true;
    }
  
    function handleSubmitAddNewForm(event) {
      event.preventDefault();
      if (validateForm(event)) {
        //add Form's data
        addNewRecord();
        //reset Form
        setAddForm(newFormRecord);
      }
    }

    // Story Card
    
    function onHandleLikeClick(id,likes) {
      let objData = {
        'likes': likes + 1
      };
      editRecord(id,objData);
    }

    function onHandleDeleteClick(id) {
      deleteRecord(id);
    }

    function onHandleEditClick(id) {
      loadRecord(id);
    }

    function onHandleCancelClick(){
      setEditForm(editFormRecord);
    }

    function handleChangeEditForm(event) {
      setEditForm({
        ...editForm,
        [event.target.name]: event.target.value,
      })
    }

    function validateEditForm(event) {
      if (editForm.name === "") {
        alert("Story's name must exist !")
        event.target.name.focus();
        return false;
      }
      if (editForm.description === "") {
        alert("Story's description must exist !")
        event.target.description.focus();
        return false;
      }
      return true;
    }

    function onHandleEditStory(event) {
      event.preventDefault();
      if (validateEditForm(event)) {
        // edit story
        saveStory();
        //reset Form
        setEditForm(editFormRecord);
      }
    }

    function saveStory() {
      let objData = {
        'name': editForm.name,
        'description': editForm.description
      };
      editRecord(editForm.id,objData);
    }

  return (
    <>
      <Header />
      {showForm ? <StoryForm changeValue={handleChangeAddNewForm} submitForm={handleSubmitAddNewForm} storyRecord={addForm} /> : null}
      <div className="buttonContainer">
        <button type="button" className="btn btn-secondary" onClick={handleClick}>{showForm ? "Stop" : "Add"} a Story</button>
      </div>
      {
        (storyList.length === 0) 
        ? "Loading ... "
        :
      <StoryContainer
        stories={storyList.sort(function(a,b){
          return b.id - a.id;
        })}
        handleLikeClick={onHandleLikeClick}
        handleDeleteClick={onHandleDeleteClick}
        editStory={editForm}
        handleEditClick={onHandleEditClick}
        handleCancelClick={onHandleCancelClick}
        handleOnChangeValue={handleChangeEditForm}
        handleEditStory={onHandleEditStory}
      />
      }
    </>
  );
}

export default App;
