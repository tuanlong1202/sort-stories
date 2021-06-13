import React, { useState, useEffect } from "react";

import Header from "./Header";
import StoryForm from "./StoryForm";
import StoryContainer from "./StoryContainer";

function App() {
  const newFormRecord = {
    name: "",
    description: "",
    likes: 0    
  }
  const [showForm, setShowForm] = useState(false);

  const [dataForm, setDataForm] = useState(newFormRecord);

  const [storyList, setStoryList] = useState([]);

  const [page, setPage] = useState(0);

  useEffect(loadStories,[]);
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

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function onHandleLikeClick(id,likes) {
    fetch(process.env.REACT_APP_API_URL + "/" + id,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'likes': likes + 1
      })
    })
      .then((r)=>r.json())
      .then(loadStories)
      .catch((e)=>console.error("Error: " + e));
  }

  function onHandleDeleteClick(id) {
    fetch(process.env.REACT_APP_API_URL + "/" + id,{
      method: 'DELETE'
    })
      .then((r)=>r.json())
      .then(loadStories)
      .catch((e)=>console.error("Error: " + e));
  }

  function  handleChange(event) {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    })
  }

  function validateForm(event) {
    if (dataForm.name === "") {
      alert("Story's name must exist !")
      event.target.name.focus();
      return false;
    }
    if (dataForm.description === "") {
      alert("Story's description must exist !")
      event.target.description.focus();
      return false;
    }
    return true;
  }

  function addStory(){
    fetch(process.env.REACT_APP_API_URL, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForm),
    })
      .then(response => response.json())
      .then(loadStories)
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    if (validateForm(event)) {
      //add Form's data
      addStory();
      //reset Form
      setDataForm(newFormRecord);
    }
  }

  return (
    <>
      <Header />
      {showForm ? <StoryForm changeValue={handleChange} submitForm={handleSubmitForm} storyRecord={dataForm} /> : null}
      <div className="buttonContainer">
        <button type="button" className="btn btn-secondary" onClick={handleClick}>{showForm ? "Stop" : "Add"} a Story</button>
      </div>
      <StoryContainer
        handleLikeClick={onHandleLikeClick}
        stories={storyList}
        handleDeleteClick={onHandleDeleteClick}
      />
    </>
  );
}

export default App;
