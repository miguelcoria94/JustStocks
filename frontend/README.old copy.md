# Authenticate Me - Frontend

This is part two of a two-part project. In the first part, you should have
implemented the entire Express + Sequelize backend with user authentication
routes. In this part, you will add a React frontend that uses your backend API
routes to login, signup, and logout a user.

## Phase 0: Set Up

### `create-react-app`

Use the `create-react-app` command from inside your `frontend` folder to
initialize React inside of the `frontend` folder:

```bash
npx create-react-app . --template @appacademy/simple --use-npm
```

### Dependencies

In the `frontend` folder, `npm install` the following packages as dependencies:

- `js-cookie` - extracts cookies
- `react-redux` - React components and hooks for Redux
- `react-router-dom` - routing for React
- `redux` - Redux
- `redux-thunk` - add Redux thunk

`npm install -D` the following packages as dev-dependencies:

- `redux-logger` - log Redux actions in the browser's dev tools console

### Setting up the Redux Store

First, setup your Redux store. Make a folder in `frontend/src` called `store`
and add an `index.js` file. In this file, import `createStore`,
`combineReducers`, `applyMiddleware`, and `compose` from the `redux` package.
Import `thunk` from `redux-thunk`.

```js
// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
```

Create a `rootReducer` that calls `combineReducers` and pass in an empty object
for now.

```js
// frontend/src/store/index.js
// ...
const rootReducer = combineReducers({
});
```

Initialize an `enhancer` variable that will be set to different store enhancers
depending on if the Node environment is in development or production.

In production, the `enhancer` should only apply the `thunk` middleware.

In development, the `logger` middleware and Redux dev tools compose enhancer as
well. To use these tools, create a `logger` variable that uses the default
export of `redux-logger`.  Then, grab the Redux dev tools compose enhancer with
`window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__` and store it in a variable called
`composeEnhancers`. You can use an __or__ `||` to keep the Redux's original
`compose` as a fallback. Then set the `enhancer` variable to the return of the
`composeEnhancers` function passing in `applyMiddleware` invoked with `thunk`
then `logger`.

```js
// frontend/src/store/index.js
// ...

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}
```

Next, create a `configureStore` function that takes in an optional
`preloadedState`. Return `createStore` invoked with the `rootReducer`, the
`preloadedState`, and the `enhancer`.

```js
// frontend/src/store/index.js
// ...

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
```

Finally, export the `configureStore` function at the bottom of the file as the
default export. This function will be used by `index.js` to attach the Redux
store to the React application.

### Redux `Provider` and `BrowserRouter`

In your React application, you'll be using `BrowserRouter` from React Router for
routing and `Provider` from Redux to provide the Redux store. Import those
components as well as the `configureStore` function that you just wrote in
`frontend/src/store/index.js`.

Your imports should now look something like this:

```js
// frontend/src/index.js
import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import configureStore from './store';
```

Create a variable to access your store and expose it to the `window`. It should
not be exposed in production, be sure this is only set in development.

```js
// frontend/src/index.js
// ...
const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}
```

Next, define a `Root` React functional component that returns the `App`
component wrapped in Redux's `Provider` and React Router DOM's `BrowserRouter`
provider components.

```js
// frontend/src/index.js
// ...
function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
```

Make sure to pass in the key of `store` with the value of `store` to the
`Provider`.

After defining the `Root` functional component, call `ReactDOM.render` function
passing in the `Root` component and the HTML element with the id of `"root"`.

```js
// frontend/src/index.js
// ...
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

#### Test the Redux Store setup

Test your Redux store setup by starting your React frontend server (run
`npm start` in your `frontend` folder) and navigate to [http://localhost:3000].

Check to see if your Redux dev tools was successfully connected and if there is
a `store` on the `window` in your browser's dev tools console.

You can ignore the "Store does not have a valid reducer" error. This error is a
result of not passing in anything into the `rootReducer`'s `combineReducer`.

Try to dispatch an action from your browser's dev tools console. Make sure to
include a `type` key in the action that you dispatch.

```js
window.store.dispatch({ type: 'hello' });
```

![test-redux-store-image]

If you cannot dispatch an action or if you cannot see the action in the Redux
dev tools, check the syntax in your `frontend/src/store/index.js` and in your
`frontend/src/index.js`.

**Now is a good time to commit your initial set up!**

### Wrapping `fetch` requests with CSRF

Your Express backend server is configured to be CSRF protected and will only
accept requests that have the right CSRF secret token in a header and the right
CSRF token value in a cookie.

First, you need to add a `"proxy"` in your `frontend/package.json`. Add a
`"proxy"` key with the value of `http://localhost:5000` or wherever you are
serving your backend Express application. This proxy will force the frontend
server to act like it's being served from the backend server. So if you do a
`fetch` request in the React frontend like `fetch('/api/csrf/restore)`, then the
`GET /api/csrf/restore` request will be made to the backend server instead of
the frontend server.

Your `frontend/package.json`'s `"proxy"` key should like this:

```json
  "proxy": "http://localhost:5000"
```

**Remember to restart the frontend server after you make any edits to the
`package.json` file.**

Next, to make `fetch` requests with any HTTP verb other than `GET`, you need to
set a `XSRF-TOKEN` header on the request and the value of the header should be
set to the value of the `XSRF-TOKEN` cookie. To do this, you are going to wrap
the `fetch` function on the `window` that will be used in place of the default
`fetch` function.

Add a `csrf.js` file in the `frontend/src/store` folder. Import `Cookies` from
`js-cookie` that will be used to extract the `XSRF-TOKEN` cookie value. Define
an `async` function called `fetch` that will take in `url` parameter and an
`options` parameter that defaults to an empty object. If `options.headers` is
not set, default it to an empty object. If `options.method` is not set, set it
to the `GET` method. If it is any method other than a `GET` method, set the
`XSRF-TOKEN` header on the `options` object to the extracted value of the
`XSRF-TOKEN` cookie. Call and `await` the `window.fetch` with the `url` and the
`options` object to get the response.

If the response has a JSON body, then parse it using the `.json` method on the
response. Set the parsed JSON body as a key of `data` on the response. If the
response status code is 400 or above, `throw` the response as the error.
Otherwise, return the response.

```js
// frontend/src/store/csrf.js
import Cookies from 'js-cookie';

export async function fetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json", and set the "CSRF-TOKEN" header to the value of the 
    // "XSRF-TOKEN" cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }
  // call the default window's fetch with the url and the options passed in
  const res = await window.fetch(url, options);

  // if the response's body is JSON, then parse the JSON body and set it to a
    // key of `data` on the response
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await res.json();
    res.data = data;
  }

  // if the response status code is 400 or above, then throw an error with the
    // error being the response
  if (res.status >= 400) throw res;

  // if the response status code is under 400, then return the response to the
    // next promise chain
  return res;
}
```

Export the custom `fetch` function from this file.

### Restore the XSRF-TOKEN Cookie

In development, the backend and frontend servers are separate. In production
though, the backend also serves up all the frontend assets, including the
`index.html` and any JavaScript files in the `frontend/build` folder after
running `npm start` in the `frontend` folder.

In production, the `XSRF-TOKEN` will be attached to the `index.html` file in the `frontend/build` folder. In the `backend/routes/index.js` file, serve the
`index.html` file at the `/` route and any routes that don't start with `/api`.
Along with it, attach the `XSRF-TOKEN` cookie to the response. Serve the static
files in the `frontend/build` folder using the `express.static` middleware.

```js
// backend/routes/index.js
// ... after `router.use('/api', apiRouter);`

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

// ...
```

In development, you need another way to get the `XSRF-TOKEN` cookie on your
frontend application because the React frontend is on a different server than
the Express backend. To solve this, add a backend route, `GET /api/csrf/restore`
in the same file that can be accessed only in development and will restore the
`XSRF-TOKEN` cookie.

```js
// backend/routes/index.js
// ...

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

// ...
```

Back in the React frontend, this `GET /api/csrf/restore` route needs to be
called when the application is loaded.

Define and export a function called `restoreCSRF` in the
`frontend/src/store/csrf.js` that will call the custom `fetch` function with
`/api/csrf/restore` as the `url` parameter.

```js
// frontend/src/store/csrf.js
// ...

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
  return fetch('/api/csrf/restore');
}
```

In the frontend entry file (`frontend/src/index.js`), call the `restoreCSRF`
function when in development before defining the `Root` functional component.
Also, attach the custom `fetch` function onto the `window` when in development
as `window.csrfFetch`.

```js
// frontend/src/index.js
// ... other imports
import { restoreCSRF, fetch } from './store/csrf';

// ... const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = fetch;
  window.store = store;
}
```

#### Test Custom `fetch` with CSRF

To test the custom `fetch` function that attaches the CSRF token to the header,
navigate to root route of the React application, [http://localhost:3000]. In the
browser's dev tools console, make a request to `POST /api/login` with the demo
user credentials using the `window.csrfFetch` function. There is no need to
specify the headers because the default header for `"Content-Type"`, set to
`"application/json"`, and the `"XSRF-TOKEN"` header are added by the custom
`fetch`.

```js
window.csrfFetch('/api/test', {
  method: 'POST',
  body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
}).then(res => console.log(res.data));
```

If you see an object with a key of `user` logged in the terminal, then you
successfully set up CSRF protection on the frontend. If you don't then check
your syntax in the `frontend/src/store/csrf.js` and the `frontend/src/index.js`.

At this point, all the frontend setup is been complete. **Commit your code!**

Now it's time to render some React components!

## Phase 1: Login Form Page

The Login Form Page is the first page that you will add to your frontend
application.

### Session Actions and Reducer

First, you will add the Redux store actions and reducers that you need for this
feature. You will use the `POST /api/session` backend route to login in a user
as well as add the session user's information to the frontend Redux store.

Make a file called `session.js` in the `frontend/src/store` folder. This file
will contain all the actions specific to the session user's information and the
session user's Redux reducer.

In this file, add a `session` reducer that will hold the current session user's
information. The `session` slice of state should look like this if there is a
current session user:

```js
{
  user: {
    id,
    email,
    username,
    createdAt,
    updatedAt
  }
}
```

If there is no session user, then the `session` slice of state should look like
this:

```js
{
  user: null
}
```

By default, there should be no session user in the `session` slice of state.

Create two POJO action creators. One that will set the session user in the
`session` slice of state to the action creator's input parameter, and another
that will remove the session user. Their types should be extracted as a
constant and used by the action creator and the `session` reducer.

You need to call the API to login then set the session user from the response,
so add a thunk action for the `POST /api/session`. Make sure to use the custom
`fetch` function from `frontend/src/store/csrf.js`. The `POST /api/session`
route expects the request body to have a key of `credential` with an existing
username or email and a key of `password`. After the response from the AJAX call
comes back, dispatch the action for setting the session user to the response's
data.

Export the login thunk action, and export the reducer as the default export.

Import the reducer in `session.js` into the file with the root reducer,
`frontend/src/store/index.js`.

Set a key of `session` in the `rootReducer`'s `combineReducer` object argument
to the session reducer.

#### Test the Session Actions and Reducer

Login should be working so give it a try! Test the login thunk action and the
`session` reducer.

Import all the actions from the `session.js` file into the frontend application
entry file, `frontend/src/index.js`. Then attach the actions to the `window`
at the key of `sessionActions`:

```js
// frontend/src/index.js
// ... other imports
import * as sessionActions from './store/session';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = fetch;
  window.store = store;
  window.sessionActions = sessionActions;
}
// ...
```

Navigate to [http://localhost:3000] and in the browser's dev tools console, try
dispatching the login thunk action with the demo user login credentials.

The `previous state` in the console should look like this:

```js
{
  session: {
    user: null
  }
}
```

The `next state` in the console should look something like this:

```js
{
  session: {
    user: {
      createdAt: "<Some date time format>",
      email: "demo@appacademy.io",
      id: 1,
      updatedAt: "<Some date time format>",
      username: "Demo-lition",
    }
  }
}
```

If there is an error or if the previous or next state does not look like this,
then check your logic in your session reducer and your actions.

After you finished testing, **commit your code**.

#### Example Session Actions and Reducer

There is no absolute "right" way of doing this. As long as your `session`
actions and reducers are displaying the expected initial state and states after
each dispatched action, then your setup is fine.

Here's an example for the `session` actions and reducer:

```js
// frontend/src/store/session.js
import { fetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  dispatch(setUser(response.data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
```

Here's an example for the `rootReducer` setup:

```js
// frontend/src/store/index.js
// ...
import sessionReducer from './session';

const rootReducer = combineReducers({
  session: sessionReducer,
});
// ...
```

Here's an example for the login thunk action test in the browser's dev tools
console:

```js
window.store.dispatch(window.sessionActions.login({
  credential: 'Demo-lition',
  password: 'password'
}));
```

### `LoginFormPage` Component

After finishing the Redux actions and the reducer for the login feature, the
React components are next.

Create a `components` folder in the `frontend/src` folder. This is where all
your components besides `App` will live.

Make a folder called `LoginFormPage` nested in the new `components` folder which
will hold all the files for the login form. Add an `index.js` file in the
`LoginFormPage`. Inside of this file, add a React functional component named
`LoginFormPage`.

Render a form with a controlled input for the user login credential (username or
email) and a controlled input for the user password.

On submit of the form, dispatch the login thunk action with the form input
values. Make sure to handle and display errors from the login thunk action
if there are any.

Export the `LoginFormPage` component at the bottom of the file, then render it
in `App.js` at the `"/login"` route.

If there is a current session user in the Redux store, then redirect the user
to the `"/"` path if trying to access the `LoginFormPage`.

Test your component by navigating to the `"/login"` page. Try logging into the
form there with the demo user's credentials. Once you login, you should be
redirected to the `"/"` route. Check your code for the `LoginFormPage` and the
`App` component if this is not the flow that you are experiencing.

Also try logging in with invalid fields to test your handling and displaying of
error messages.

After testing, **commit your `LoginFormPage` code**!

#### Example `LoginFormPage` Component

Again, there is no absolute "right" way of doing this. As long as your React
application is behaving as expected, then you don't need to make your code look
exactly like the example code.

Here's an example for `LoginFormPage` component:

```js
// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginFormPage;
```

Here's an example for how `App.js` should look like now:

```js
// frontend/src/App.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
```

#### `LoginForm` CSS

Add a `LoginForm.css` file in your `LoginFormPage` folder. Import this CSS
file into the `frontend/src/components/LoginFormPage/index.js` file.

```js
// frontend/src/components/LoginFormPage/index.js
// ...
import './LoginForm.css';
// ...
```

Define all your CSS styling rules for the `LoginFormPage` component in the
`LoginForm.css` file. Practice doing some CSS now to make your login page
look better. Make sure to **commit your code afterwards**!

## Restore the Session User

Right now, if you login successfully, you get redirected to the `"/"` route. If
you refresh at that `"/"` page and navigate to the `"/login"` page, then you
will not be redirected because the store does not retain the session user
information on a refresh. How do you retain the session user information
across a refresh? By loading the application after accessing the route to
get the current session user `GET /api/session` and adding the user info to the
Redux store again.

Add a thunk action in `frontend/src/store/session.js` that will call the
`GET /api/session` and dispatch the action to set the session user with the data
from the response.

Test your thunk action by logging in then refreshing at the
[http://localhost:3000] route. Make sure you have a `token` in your cookies. In
the browser's dev tools console, try dispatching the restore session user
thunk action.

The `previous state` in the console should look like this:

```js
{
  session: {
    user: null
  }
}
```

The `next state` in the console should look something like this:

```js
{
  session: {
    user: {
      createdAt: "<Some date time format>",
      email: "demo@appacademy.io",
      id: 1,
      updatedAt: "<Some date time format>",
      username: "Demo-lition",
    }
  }
}
```

If you don't see this behavior, then check your syntax for the restore user
thunk action.

After you test it to see if it works, then use this thunk action inside of
`App.js` after the `App` component's first render.

**Commit after testing!**

### Example Restore Session User Thunk Action

Again, there is no absolute "right" way of doing this. As long as your React
application is behaving as expected, then you don't need to make your code look
exactly like the example code.

Here's an example of the restore session user thunk action:

```js
// frontend/src/store/session.js
// ...
export const restoreUser = () => async dispatch => {
  const res = await fetch('/api/session');
  dispatch(setUser(res.data.user));
  return res;
};
// ...
```

Here's an example of how to test the `restoreUser` thunk action:

```js
window.store.dispatch(window.sessionActions.restoreUser());
```

Here's an example for how `App.js` could look like now:

```js
// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
```

## Phase 2: Signup Form Page

The Signup Form Page is the second page that you will add to your frontend
application. The flow will be very similar to how you did the Login Form Page.
Can you remember all the steps to implement it? If so, **try doing this on your
own before looking below for help!**

### Signup Action

You will use the `POST /api/users` backend route to signup a user.

In the session store file, add a signup thunk action that will hit the signup
backend route with `username`, `email`, and `password` inputs. After the
response from the AJAX call comes back, dispatch the action for setting the
session user to the response's data.

Export the signup thunk action.

#### Test the Signup Action

Test the signup thunk action.

Navigate to [http://localhost:3000]. If there is a `token` cookie, remove it and
refresh. In the browser's dev tools console, try dispatching the signup thunk
action with a new `username`, a new `email`, and a `password`.

The `previous state` in the console should look like this:

```js
{
  session: {
    user: null
  }
}
```

The `next state` in the console should look something like this:

```js
{
  session: {
    user: {
      createdAt: "<Some date time format>",
      email: "<new email>",
      id: "<new id>",
      updatedAt: "<Some date time format>",
      username: "<new password>",
    }
  }
}
```

If there is an error or if the previous or next state does not look like this,
then check your logic in your signup action.

**Commit your code for the signup actions!**

#### Example Signup Action

Again, there is no absolute "right" way of doing this. As long as your signup
action is displaying the expected initial state and states after each dispatched
action, then your setup is fine.

Here's an example for the signup thunk action:

```js
// frontend/src/store/session.js
// ...
export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  dispatch(setUser(response.data.user));
  return response;
};
// ...
```

Here's an example for the signup thunk action test in the browser's dev tools
console:

```js
window.store.dispatch(window.sessionActions.signup({
  username: 'NewUser',
  email: 'new@user.io',
  password: 'password'
}));
```

### `SignupFormPage` Component

After finishing the Redux action for the signup feature, the React components
are next.

Create a folder in the `components` directory for your signup page components.
Add an `index.js` and create a functional component named `SignupFormPage`.

Render a form with controlled inputs for the new user's username, email, and
password, and confirm password fields.

On submit of the form, validate that the confirm password is the same as the
password fields, then dispatch the signup thunk action with the form input
values. Make sure to handle and display errors from the signup thunk action
if there are any. If the confirm password is not the same as the password,
display an error message for this.

Export the `SignupFormPage` component at the bottom of the file, then render it
in `App.js` at the `"/signup"` route.

If there is a current session user in the Redux store, then redirect the user
to the `"/"` path if trying to access the `SignupFormPage`.

Test your component by navigating to the `"/signup"` page. Try logging into the
form there with new user's information. Once you signup, you should be
redirected to the `"/"` route. Check your code for the `SignupFormPage` and the
`App` component if this is not the flow that you are experiencing.

Also try signing up with invalid fields to test your handling and displaying of
error messages.

**After testing, commit your `SignupFormPage` code!**

#### Example `SignupFormPage` Component

Again, there is no absolute "right" way of doing this. As long as your React
application is behaving as expected, then you don't need to make your code look
exactly like the example code.

Here's an example for `SignupFormPage` component:

```js
// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;
```

Here's an example for how `App.js` should look like now:

```js
// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    </Switch>
  );
}

export default App;
```

#### `SignupForm` CSS

Add a `SignupForm.css` file in your `SignupFormPage` folder. Import this CSS
file into the `frontend/src/components/SignupFormPage/index.js` file.

```js
// frontend/src/components/SignupFormPage/index.js
// ...
import './SignupForm.css';
// ...
```

Define all your CSS styling rules for the `SignupFormPage` component in the
`SignupForm.css` file. Practice doing some CSS now to make your signup page
look better. Make sure to **commit your code afterwards**!

## Phase 3: Log Out

The last part of the authentication flow is logging out. The log out button will
be placed in a dropdown menu in a navigation bar only when a session user
exists.

### Log Out Action

You will use the `DELETE /api/session` backend route to logout a user.

In the session store file, add a logout thunk action that will hit the logout
backend route. After the response from the AJAX call comes back, dispatch the
action for removing the session user to the response's data.

Export the logout thunk action.

#### Test the Logout Action

Test the logout thunk action.

Navigate to [http://localhost:3000]. If there is no `token` cookie, add one by
logging in or signing up. In the browser's dev tools console, try dispatching
the logout thunk action.

The `previous state` in the console should look like this:

```js
{
  session: {
    user: {
      createdAt: "<Some date time format>",
      email: "<new email>",
      id: "<new id>",
      updatedAt: "<Some date time format>",
      username: "<new password>",
    }
  }
}
```

The `next state` in the console should look something like this:

```js
{
  session: {
    user: null
  }
}
```

If there is an error or if the previous or next state does not look like this,
then check your logic in your logout action and in your session reducer.

**Commit your code for the logout action.**

#### Example Logout Action

Again, there is no absolute "right" way of doing this. As long as your logout
action is displaying the expected initial state and states after each dispatched
action, then your setup is fine.

Here's an example for the logout thunk action:

```js
// frontend/src/store/session.js
// ...
export const logout = () => async (dispatch) => {
  const response = await fetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};
// ...
```

Here's an example for the logout thunk action test in the browser's dev tools
console:

```js
window.store.dispatch(window.sessionActions.logout());
```

### `Navigation` Component

After finishing the Redux action for the logout feature, the React components
are next. The `Navigation` component will render navigation links and a logout
button.

Make a folder called `Navigation` nested in the `frontend/src/components`
folder which will hold all the files for the signup form. Add an `index.js` file
in the `Navigation` folder. Inside of this file, add a React functional
component named `Navigation`.

Your navigation should render an unordered list with a navigation link to the
home page. It should only contain navigation links to the login and signup
routes when there is no session user and a logout button when there is.

Make a `ProfileButton.js` file in the `Navigation` folder. Create a React
functional component called `ProfileButton` that will render an icon from
[Font Awesome].

Follow the [instructions here for setting up Font Awesome][Font Awesome]. The
easiest way to connect Font Awesome to your React application is by sharing your
email and creating a new kit. The kit should let you copy an HTML `<script>`.
Add this script to the `<head>` of your `frontend/public/index.html` file.

**If you don't want to signup for Font Awesome** and are okay with using Font
Awesome icons that may not be up to date, you can just add the following `link`
to the `<head>` of your `frontend/public/index.html` file:

```html
<link
  rel="stylesheet"
  href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
  integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
  crossorigin="anonymous" />
```

Now you can use any of the [free icons available in Font Awesome][Choose a Font Awesome Icon] by adding the `<i>` element with the desired `className` to ber
rendered in a React component. To change the size or color of the icon, wrap
the `<i>` element in a parent element like a `div`. Manipulating the `font-size`
of the parent element changes the size of the icon. The color of the parent
element will be the color of the icon. For example, to render a big orange
[carrot icon]:

```js
const Carrot = () => (
  <div style={{ color: "orange", fontSize: "100px" }}>
    <i className="fas fa-carrot"></i>
  </div>
);
```

[Choose an icon][Choose a Font Awesome Icon] that will represent the user
profile button and render it in the `ProfileButton` component.

Export the `ProfileButton` component at the bottom of the file, and import it
into the `Navigation` component. Render the `ProfileButton` component only when
there is a session user.

Export the `Navigation` component and import it into the `App` component. Render
the `Navigation` component so that it shows up at the top of each page.

Navigate to the [http://localhost:3000] and remove the `token` cookie if there
is one. Refresh and see if there is a navigation bar with links to the login
and signup pages. After logging in, the navigation bar should have the links
to login and signup replaced with the Font Awesome user icon.

**Now is a good time to commit your working code.**

#### Dropdown Menu

When clicked, the profile button should trigger a component state change and
cause a dropdown menu to be rendered. When there is a click outside of the
dropdown menu list or on the profile button again, then the dropdown menu should
disappear.

Dropdown menus in React is a little challenging. You will need to use your
knowledge of vanilla JavaScript DOM manipulation for this feature.

First, create a state variable called `showMenu` to control displaying the
dropdown. `showMenu` defaults to `false` indicating that the menu is hidden.
When the `ProfileButton` is clicked, toggle `showMenu` to `true` indicating that
the menu should now be shown. Modify the return value of your functional
component conditionally to either show or hide the menu based on the `showMenu`
_state variable_. The dropdown navigation menu should show the session user's
username and email, and add a button that will dispatch the logout action when
clicked.

Test this out by navigating to [http://localhost:3000]. If you click the profile
button, the menu list with the logout button should appear with the session
user's username and email. When you click the logout button, the profile button
and menu list should disappear. If you try logging in again and clicking the
profile button, there is currently no way to close the menu list once it's open
unless you logout. Let's work on this next, but first, make sure that you have
the above behavior in your navigation bar.

The dropdown menu should close when anywhere outside the dropdown menu is
clicked. To do this, you need to add an event listener to the entire document
to listen to any click changes and set the `showMenu` state variable to `false`
for any clicks outside of the dropdown menu.

Create a function called `openMenu` in the `ProfileButton` component. If
`showMenu` is `false`, nothing should happen. If `showMenu` is `true`, then
set the `showMenu` to `true`. When the profile button is clicked, it should call
`openMenu`.

When the dropdown menu is open, you need to register an event listener for
`click` events on the entire page (the `document`), in order to know when to
close the menu. Use an `useEffect` hook to create, register, and remove this
listener.

Inside the `useEffect`, create a function called `closeMenu`. When this function
is called set the `showMenu` state variable to `false` to trigger the dropdown
menu to close. Register the `closeMenu` function as an event listener for
`click` events on the entire page. The cleanup function for the `useEffect`
should remove this event listener.

If you try to test this on [http://localhost:3000], you'll notice that the
dropdown menu just doesn't open at all. Why do you think that is? Add a
`debugger` in the `openMenu` and the `closeMenu` functions. When you click on
the profile button, both `debugger`'s in the `openMenu` and `closeMenu`
functions will be triggered. To prevent this behavior, the listener should only
be added when `showMenu` changes to `true`. Make sure to only add the event
listener and return the cleanup function if `showMenu` is `true`. Add `showMenu`
to the dependencies array for `useEffect`.

Now, navigate to the home page and try opening and closing the dropdown menu.
You should see the dropdown menu open and close as expected!

Congratulations on implementing an awesome dropdown menu all in React! **Make
sure to commit your code!**

#### Examples of `Navigation` and `ProfileButton` Components

Here's an example for how `Navigation/index.js` should look like:

```js
// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
```

Here's an example for how `ProfileButton.js` should look like:

```js
// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
```

Here's an example for how `App.js` should look like now:

```js
// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
```

Here's an example for how `frontend/public/index.html` should look like now with
the recommended [Font Awesome] setup. Replace `{kit_id}` in the `script`'s `src`
with the value of your Font Awesome starter kit's id.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Simple React App</title>
    <script src="https://kit.fontawesome.com/{kit_id}.js" crossorigin="anonymous"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

As an alternative, you can also use the somewhat outdated Font Awesome CSS
stylesheet if you don't want to register for Font Awesome:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Simple React App</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

#### `Navigation` CSS

Add a `Navigation.css` file in your `Navigation` folder. Import this CSS
file into the `frontend/src/components/Navigation/index.js` file.

```js
// frontend/src/components/Navigation/index.js
// ...
import './Navigation.css';
// ...
```

Define all your CSS styling rules for the `Navigation` component in the
`Navigation.css` file. Make your navigation bar look good and your dropdown menu
flow well with the rest of the elements. **Afterwards, commit!**

## Bonus: Make the Login Form Page into a Modal

Modals are everywhere in modern applications. Here's one way of implementing a
modal in React without any external libraries/packages.

You will create a modal with using `ReactDOM`'s `createPortal` method.
[Portals in React] provide a way to render React elements into an entirely
separate HTML DOM element from where the React component is rendered.

Let's get started!

### Modal Context

First, make a folder in `frontend/src` called `context`. This folder will hold
all the different context and context providers for your application. Add a file
in the `context` folder called `Modal.js`. Create a React context called a
`ModalContext`.

Create a functional component called `ModalProvider` that renders the
`ModalContext.Provider` component with all the `children` from the props as a
child. Render a `div` element as a sibling and right after the
`ModalContext.Provider`.

Create a React ref called `modalRef`. Set the `ref` prop on the rendered `div`
element to this `modalRef`. `modalRef.current` will be set to the actual HTML
DOM element that gets rendered from the `div`. Create a component state variable
called `value` that will be set to `modalRef.current` after the initial render
(hint: use the `useEffect` hook). Pass this `value` as the `value` prop to the
`ModalContext.Provider` component. Export the `ModalProvider` component.

Create a functional component called `Modal` that expects an `onClose` function
and `children` as props. Get the value of the `ModalContext` into the `Modal`
component by using the `useContext` hook and setting the value equal to a
variable called `modalNode`. Render a `div` with an id of `modal` and nest a
`div` with an id of `modal-background` and another `div` with an id of
`modal-content`. In the `modal-content` div, render the `children` props. When
the `modal-background` is clicked, the `onClose` prop should be invoked. Return
`null` if `modalNode` is falsey.

The `modal-background` div needs to be rendered **before** the `modal-content`
because it will naturally be placed "behind" the depth of the `modal-content`
if it comes before the `modal-content` in the DOM tree.

To get these elements to show up in the `div` in the `ModalProvider` component,
pass the rendered elements in the `Modal` component as the first argument of
`ReactDOM.createPortal` and pass in the `modalNode` as the second argument,
which is the reference to the actual HTML DOM element of the `ModalProvider`'s
`div`. Return the invocation of `ReactDOM.createPortal`. Make sure to import
`ReactDOM` from the `react-dom` package.

Add a CSS file in the `context` folder called `Modal.css`. The `modal` div
should have a `position` `fixed` and take up the entire width and height of the
window. The `modal-background` should also take up the entire width and height
of the window and have a `position` `absolute`. The `modal-content` div should
be centered inside of the `modal` div by flexing the `modal` div and have a
`position` of `absolute`. You may want to give the `modal-background` a
`background-color` of `rgba(0, 0, 0, 0.7)` and the `modal-content` a
`background-color` of `white` just to see them better.

Import the `Modal.css` file into the `Modal.js` context file.

### Login Form Modal

Now it's time to refactor the `LoginFormPage` component to be a modal instead
of a page.

Rename the `LoginFormPage` folder to `LoginFormModal`. Create a file called
`LoginForm.js` in this folder and move all the code from the `index.js` file in
the `LoginFormModal` file over to the `LoginForm.js` file. Rename the component
from `LoginFormPage` to just `LoginForm`. The code for redirecting the user
if there is no session user in the Redux store can be removed.

In the `index.js` file, import the `LoginForm` component. Create a functional
component called `LoginFormModal`. Add a component state variable called
`showModal` and default it to `false`. Render a button with the text `Log In`
that, when clicked, will set the `showModal` state variable to `true`.

Import the `Modal` component into this file. Render the `Modal` component with
the `LoginForm` component as its child **only when** the `showModal` state
variable is `true`. Add an `onClose` prop to the `Modal` component set to a
function that will change the `showModal` state variable to `false` when
invoked. Export the `LoginFormModal` component as default from this file.

Import the new `LoginFormModal` component into the `Navigation` component.
Replace the link to the login page with this `LoginFormModal` component.

Remove the `LoginFormPage` component from the `App` component.

It's finally time to test out your login form modal! Head to the home page,
[http://localhost:3000], and make sure you are logged out. Click the `Log In`
button. The login form modal should pop up. It should close when you click
anywhere outside of the form. Make sure the login functionality still works!

**Commit, commit, commit!**

### Example Modal and Login Form Modal

Here's an example for how `Modal.js` should look like:

```js
// frontend/src/context/Modal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}
```

Here's an example for how `Modal.css` should look like:

```css
/* frontend/src/context/Modal.css */
#modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#modal-background {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
}

#modal-content {
  position: absolute;
  background-color:white;
}
```

Here's an example for how `LoginFormModal/index.js` should look like:

```js
// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
```

Here's an example for how `LoginForm.js` should look like:

```js
// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
```

Here's an example for how `Navigation.js` should look like now:

```js
// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
```

Here's an example of how `App.js` should look like now:

```js
// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
```

[test-redux-store-image]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/react-redux-auth/authenticate-me/assets/test-redux-store-setup.png
[Font Awesome]: https://fontawesome.com/start
[Choose a Font Awesome Icon]: https://fontawesome.com/icons?d=gallery&m=free
[carrot icon]: https://fontawesome.com/icons/carrot?style=solid
[Portals in React]: https://reactjs.org/docs/portals.html

[http://localhost:3000]: http://localhost:3000
