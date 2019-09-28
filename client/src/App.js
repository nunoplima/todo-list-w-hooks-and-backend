import React, { useState, useEffect } from 'react';
import Todo from "./components/Todo";
import TodoAdder from "./components/TodoAdder";
import NavBar from "./components/NavBar";
import TodoResetOrSave from "./components/TodoResetOrSave";
import { loginHelper, logoutHelper, getUserHelper, getUserTodos, saveUserTodos } from "./utils/authHelper";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  
  // State
  const [ todoArr, setTodo ] = useState([])
  const [ isLoggedIn, setLoggedStatus ] = useState(false);
  const [ currentUser, setUser ] = useState(null);

  // Other functionalities
  const addToTodoArr = (activity) => {
    const todo = {
      activity: activity,
      done: false
    }
    setTodo([...todoArr, todo]);
  }

  const removeFromTodoArr = (todoIdx) => {
    todoArr.splice(todoIdx, 1);
    setTodo([...todoArr]);
  }

  const markTodoAsDone = (todoIdx) => {
    todoArr[todoIdx].done = !todoArr[todoIdx].done;
    setTodo([...todoArr]);
  }

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserHelper();
      if (user) {
        setLoggedStatus(true);
        setUser(user.id);
        const todosArr = await getUserTodos(user.id);
        if (todosArr) {
          setTodo(todosArr);
        }
      }
    }
    fetchUser();
  }, []);

  const resetTodos = async () => {
    const todosArr = await getUserTodos(currentUser);
    if (todosArr) {
      setTodo(todosArr);
    }
  }

  const saveTodos = async () => {
    saveUserTodos(currentUser, todoArr).then(res => res)
  }

  const logout = async () => {
    logoutHelper().then(res => {
      setLoggedStatus(false);
      setUser(null);
      setTodo([]);
      window.history.pushState({}, null, "http://localhost:3000");
    })
    
  };

  const login = () => {
    loginHelper().then(res => {
      setLoggedStatus(true);
    });
  };

  return (
    <BrowserRouter>
      <NavBar logout={logout} login={login} isLoggedIn={isLoggedIn} />
      {/* <Switch>
        <Route path="/:userName/todos" exact render={props => <SearchResults boxArr={boxArr} />}/>
      </Switch> */}
      
      
      {todoArr.map((todo, idx) => {
        return <Todo todo={todo} idx={idx} removeFromTodoArr={removeFromTodoArr} markTodoAsDone={markTodoAsDone} />
      })}
      {isLoggedIn ?
        <React.Fragment>
          <TodoAdder addToTodoArr={addToTodoArr} />
          <TodoResetOrSave resetTodos={resetTodos} saveTodos={saveTodos} />
        </React.Fragment>
        :
        <p>Please login to start adding and viewing your Todos</p>
      }
    </BrowserRouter>
  );
}

export default App;
