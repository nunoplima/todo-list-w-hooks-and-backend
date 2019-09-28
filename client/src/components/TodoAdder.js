import React, { useState } from "react";

const TodoAdder = ({ addToTodoArr }) => {
  const [ text, setText ] = useState("");

  const inputHandler = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const todoAddHandler = (e) => {
    e.preventDefault();
    addToTodoArr(text);
    setText("");
  }

  return (
    <form onSubmit={todoAddHandler}>
      <input type="text" value={text} onChange={inputHandler} placeholder="Add a todo..."></input>
    </form> 
  )
}

export default TodoAdder;