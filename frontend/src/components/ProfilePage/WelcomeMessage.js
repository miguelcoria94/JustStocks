import React from "react";
import * as sessionActions from "../../store/session";

function WelcomeMessage({ user }) {

  return (
    <div>
          <h1>Welcome, {user.useranme}</h1>    
    </div>
  );
}

export default WelcomeMessage;
