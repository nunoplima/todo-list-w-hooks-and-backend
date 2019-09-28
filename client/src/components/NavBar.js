import React from "react";

const NavBar = ({logout, login, isLoggedIn}) => {

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isLoggedIn ? <h3 onClick={handleLogout}>Logout</h3> : <h3 onClick={handleLogin}>Login</h3> }
    </div>
  )
}

export default NavBar;