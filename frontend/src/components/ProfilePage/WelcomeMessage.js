import React from "react";

function WelcomeMessage({ user }) {

  return (
    <div>
          <h1 className="welcome-message">Welcome Back, {user.username}!</h1>    
    </div>
  );
}

export default WelcomeMessage;
