import React from "react";

const TodoResetOrSave = ({ resetTodos, saveTodos }) => {
  return (
    <React.Fragment>
      <button onClick={() => resetTodos()}>Reset</button>
      <button onClick={() => saveTodos()}>Save</button>
    </React.Fragment>
  )
};

export default TodoResetOrSave;