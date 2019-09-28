const loginHelper = async () => {
  const url = "http://localhost:3001/auth/google";
  window.location.replace(url);
}

const logoutHelper = async () => {
  const options = { credentials: "include" };
  const url = "http://localhost:3001/auth/logout";
  try {
    const rawResponse = await fetch(url, options);
    return rawResponse;
  } catch(e) {
    console.log(e.message);
  }
}

const getUserHelper = async () => {
  const options = { credentials: "include" };
  const url = "http://localhost:3001/user";
  try {
    const rawResponse = await(fetch(url, options));
    const response = await rawResponse.json();
    return response;
  } catch(e) {
    console.log(e.message);
  }
};

const getUserTodos = async (googleId) => {
  const options = { credentials: "include" };
  const url = `http://localhost:3001/${googleId}/todos`;
  try {
    const rawResponse = await fetch(url, options);
    const response = await rawResponse.json();
    return response;
  
  } catch(e) {
    console.log(e.message);
  }
}

const saveUserTodos = async (googleId, todoArr) => {
  const options = { 
    method: "POST",
    credentials: "include", 
    body: JSON.stringify({
      todoArr: todoArr
    }),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
  };
  const url = `http://localhost:3001/${googleId}/todos/post`;
  try {
    const rawResponse = await fetch(url, options);
    return rawResponse;
    } catch(e) {
    console.log(e.message);
  }
}

export {loginHelper, logoutHelper, getUserHelper, getUserTodos, saveUserTodos};