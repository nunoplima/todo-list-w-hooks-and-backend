import React from "react";

const Todo = ({ todo, idx, removeFromTodoArr, markTodoAsDone }) => {
  
  const removeHandler = () => {
    removeFromTodoArr(idx);
  }

  const doneHandler = () => {
    markTodoAsDone(idx);
  }

  return (
    <h3 style={todo.done ? { "textDecoration": "line-through" } : null}>
      {todo.activity}
      <span><button onClick={removeHandler}>X</button></span>
      <span><button onClick={doneHandler}>Done</button></span>
    </h3>
  )
}

export default Todo;