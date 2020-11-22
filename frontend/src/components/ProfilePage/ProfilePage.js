import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import WelcomeMessage from "./WelcomeMessage"
import "./ProfilePage.style.css";

function ProfilePage() {

  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    document.title = `JustStocks - ${sessionUser.username}`
  } else {
    document.title = 'JustStocks'
  }

    if (!sessionUser) return <Redirect to="/" />;

    return (
      <div className="profileContainer">
        <div className="profile_navdiv">
          <WelcomeMessage user={sessionUser}/>
          <LogoutButton user={sessionUser} />
        </div>
      </div>
    );

}

export default ProfilePage;

