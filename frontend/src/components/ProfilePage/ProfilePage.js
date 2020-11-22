import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import "./ProfilePage.style.css";

function ProfilePage({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
      <div>
        <LogoutButton user={sessionUser} />
      </div>
    );

}

export default ProfilePage;

