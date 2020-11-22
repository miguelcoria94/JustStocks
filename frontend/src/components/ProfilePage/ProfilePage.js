import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import "./ProfilePage.style.css";

function ProfilePage({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return <Redirect to="/" />;

    return (
      <div className="profileContainer">
        <LogoutButton user={sessionUser} />
      </div>
    );

}

export default ProfilePage;

