import React from "react";

function WelcomeMessage({ user }) {

  return (
          <h1 className="welcome-message">Welcome Back, {user.username}!</h1>
  );
}

export default WelcomeMessage;
