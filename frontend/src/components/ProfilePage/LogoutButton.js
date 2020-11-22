import React from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function LogoutButton({ user }) {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={logout} to="/" className="profile-logout-button">
        <i className="fas fa-user-circle" /> Logout
      </button>
    </>
  );
}

export default LogoutButton;