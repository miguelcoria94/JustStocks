import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import WelcomeMessage from "./WelcomeMessage"
import SearchBar from "./SearchBar"
import "./ProfilePage.style.css";

function ProfilePage() {

  const sessionUser = useSelector(state => state.session.user);
  const searchBar = useSelector((state) => state.profile.symbol);

  if (sessionUser) {
    document.title = `JustStocks - ${sessionUser.username}`
  } else {
    document.title = 'JustStocks'
  }

    if (!sessionUser) return <Redirect to="/" />;

    return (
      <div className="profileContainer">
        <div className="profile_navdiv">
          <WelcomeMessage user={sessionUser} />
          <SearchBar search={searchBar}/>
          <LogoutButton user={sessionUser} />
          
        </div>
      </div>
    );

}

export default ProfilePage;

