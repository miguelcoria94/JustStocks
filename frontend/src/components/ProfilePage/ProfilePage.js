import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import WelcomeMessage from "./WelcomeMessage"
import "./ProfilePage.style.css";

function ProfilePage({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

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

