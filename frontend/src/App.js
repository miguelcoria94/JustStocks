import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import RegisterFormPage from "./components/RegisterFormPage/RegisterFormPage";
import DefaultHomePage from "./components/DefaultHomePage/DefaultHomePage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <Switch>
        <Route exact path="/">
          <DefaultHomePage />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/register">
          <RegisterFormPage />
        </Route>
      </Switch>
    )
  );
}

export default App;
