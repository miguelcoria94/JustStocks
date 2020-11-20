<h1 align="center">Solo React Project Notes</h1>
<h2 align="center">Personal notes while building JustStocks</h2>

<h1 align="center">CREATE-REACT-APP</h1>
<h3 align="center">1</h3>
The repo we were provided has the skeleton for the backend and an empty frontend folder.

<h3 align="center">2</h3>
Use the "create-react-app" command from inside the 'frontend' folder to initialize React inside of the 'frontend' folder. 

command: 'npx create-react-app . --template @appacademy/simple --use-npm'

<h3 align="center">3</h3>
I created a repo on github and connected it to my local repo

<h1 align="center">DEPENDENCIES</h1>
<h3 align="center">4</h3>
Cd into the frontend folder and "npm install" all your dependencies:

- `js-cookie` - JsCookies is a simple, lightweight JS API for handling cookies.
    * it works in all browsers
    * accepts any characters
    * heavily tested
    * no dependency
    * supports ES modules
    https://www.npmjs.com/package/js-cookie

- `react-redux` - React Redux is the official Redux UI binding library for React. If you are using Redux and React together, you should also use React Redux to bind these two libraries. https://react-redux.js.org/

- `react-router-dom` - This is a frontend routing library to create routes that allows you to control which components to display using the browsers location. Since this will be a single page app you do not want to have to refresh the page each time the browser changes location. You want to be able to update the browers location and your app's response using JS. This is known as client-side routing. https://reactrouter.com/web/guides/quick-start

- `redux` - Redux is a JavaScript Framework for managing the frontend state of a web application. Redux allows you to store information in an organized manner in a web app.Redux also allows you to quickly retrieve that information from anywhere in the app https://redux.js.org/

Advantages of using Redux

    * Redux simplifies some of the more complicated aspects of flux
    * Redux is very lightweight; the library only takes up 2kbs
    * Redux is very fast(the time to insert and retrieve data)
    * Redux is very predictable

- `redux-thunk` - Redux Thunk is a middleware that lets you call action creators that return a function instead of an action object. That function receives the store's dispatch method, which is then used to dispatch regular synchronous actions inside the function's body once the asynchronous operations have been completed.
https://www.npmjs.com/package/redux-thunk

<h3 align="center">5</h3>
Cd into the frontend folder and "npm install -D" the following packages as dev-dependencies:

- `redux-logger` - This library logs actions in the Developer Console, giving traceable stack of user actions. https://www.npmjs.com/package/redux-logger


<h1 align="center">SETTING UP THE REDUX STORE</h1>
<h3 align="center">6</h3>
Next, set up the redux store. Create a folder in 'frontend/src' called 'store'.

 - NOTE: Redux is a state container for JS apps, often called a Redux store. It    stores the whole state of the app in an immutable object tree.

<h3 align="center">7</h3>

Create an 'index.js' file inside 'frontend/src/store'.

<h3 align="center">8</h3>

Inside "frontend/src/store/index.js" import 'createStore', 'combineReducers', 'applyMiddleware', 'compose' from the redux package.

```js
    // frontend/src/store/index.js
    import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
```

<h3 align="center">9</h3>

NOTE:
 * createStore - creates a redux store that holds the complete state tree of your app. There should only be a single store in your app. https://redux.js.org/api/createstore

 * combineReducers - As your app grows more complex, you'll want to split your reducing function into separate functions, each managing independent parts of the state. The combineReducer helper function turns an object whose values are different reducing functions into a single reducing function you can pass to the store. https://redux.js.org/api/combinereducers

 * applyMiddleware - Middleware is the suggested way to extend Redux with custom functionality. Middleware lets you wrap the store's dispatch method for fun and profit. The key feature of middleware is that it is composable. Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain. https://redux.js.org/api/applymiddleware

 * compose - Composes functions from right to left. All compose does is let you write deeply nested function transformations without the rightward drift of the code. Don't give it too much credit! https://redux.js.org/api/compose

 
<h3 align="center">10</h3>
 
Inside "frontend/src/store/index.js" also import 'thunk' from the redux-thunk package.

```js
    import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
    import thunk from 'redux-thunk';
```

<h3 align="center">11</h3>

NOTE:
 * thunk - Redux Thunk is a middleware that lets you call action creators that return a function instead of an action object. That function receives the store's dispatch method, which is then used to dispatch regular synchronous actions inside the function's body once the asynchronous operations have been completed. https://daveceddia.com/what-is-a-thunk/

<h3 align="center">12</h3>

create a 'rootReducer' that calles 'combineReducer' and passes in an empty object for now.

```js
// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
});
```

<h3 align="center">13</h3>

Initialize an 'enchancer' variable that will be set to different store enhancers.

```js
// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
});

let enhancer;
```

<h3 align="center">14</h3>

NOTE: The enchancer will change depending on if the Node environment is in development or production.

What is an enchancer ? Store enhancers are a formal mechanism for adding capabilities to Redux itself. Most people will never need to write one. To use middleware in Redux, we use the applyMiddleware() function exported by the Redux library. applyMiddleware is itself a store enhancer that lets us change how dispatch() works.

<h3 align="center">15</h3>

In production, the `enhancer` should only apply the `thunk` middleware.

```js
// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  //...
}
```

<h3 align="center">16</h3>

In development, the `logger` middleware and Redux dev tools compose enhancer as
well.

To use these tools, create a `logger` variable that uses the default
export of `redux-logger`. 

Then, grab the Redux dev tools compose enhancer with
`window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__` and store it in a variable called
`composeEnhancers`.

You can use an __or__ `||` to keep the Redux's original `compose` as a fallback. Then set the `enhancer` variable to the return of the `composeEnhancers` function passing in `applyMiddleware` invoked with `thunk`
then `logger`.

```js
    import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
    import thunk from 'redux-thunk';

    const rootReducer = combineReducers({

    })

    let enhancer;

    if (process.env.NODE_ENV === 'production') {
        enhancer = applyMiddleware(thunk);
    } else {
        const logger = require('redux-logger').default;
        const composeEnhancers =
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;
        enhancer = composeEnhancers(applyMiddleware(thunk, logger));
    }
```

<h3 align="center">17</h3>

Next, create a `configureStore` function that takes in an optional `preloadedState`.

```js
    import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
    import thunk from 'redux-thunk';

    const rootReducer = combineReducers({

    })

    let enhancer;

    if (process.env.NODE_ENV === 'production') {
        enhancer = applyMiddleware(thunk);
    } else {
        const logger = require('redux-logger').default;
        const composeEnhancers =
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;
        enhancer = composeEnhancers(applyMiddleware(thunk, logger));
    }

    const configureStore = (preloadedState) => {

    };
```

<h3 align="center">18</h3>
Return `createStore` invoked with the `rootReducer`, the
`preloadedState`, and the `enhancer`.

```js
    import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
    import thunk from 'redux-thunk';

    const rootReducer = combineReducers({

    })

    let enhancer;

    if (process.env.NODE_ENV === 'production') {
        enhancer = applyMiddleware(thunk);
    } else {
        const logger = require('redux-logger').default;
        const composeEnhancers =
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;
        enhancer = composeEnhancers(applyMiddleware(thunk, logger));
    }

    const configureStore = (preloadedState) => {
        return createStore(rootReducer, preloadedState, enhancer);
    };
```

<h3 align="center">19</h3>

Don't forget to export default configureStore;

```js
    import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
    import thunk from 'redux-thunk';

    const rootReducer = combineReducers({

    })

    let enhancer;

    if (process.env.NODE_ENV === 'production') {
        enhancer = applyMiddleware(thunk);
    } else {
        const logger = require('redux-logger').default;
        const composeEnhancers =
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;
        enhancer = composeEnhancers(applyMiddleware(thunk, logger));
    }

    const configureStore = (preloadedState) => {
        return createStore(rootReducer, preloadedState, enhancer);
    };

    export default configureStore;
```

<h3 align="center">20</h3>

The `configureStore` function you just exported will be used by another file also named "index.js" to attach the Redux store to the React App.

<h1 align="center">REDUX PROVIDER AND BROWSERROUTER</h1>
<h3 align="center">21</h3>

In your React application we need to use `BrowserRouter` from React Router for routing and `Provider` from Redux to provide the Redux store.

<h3 align="center">22</h3>

Go to 'frontend/src/index.js' and import React, index.css, ReactDOM, Provider, BrowserRouter, App and the configureStore function you just created. It should look something like this.

```js
// frontend/src/index.js
import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import configureStore from './store';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```
<h3 align="center">23</h3>

Create a variable to access your store and expose it to the 'window'

```js
// frontend/src/index.js
import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

<h3 align="center">24</h3>

It should not be exposed in production, be sure this is only set in development. At this point your 'frontend/src/index.js' should look like this:

```js
// frontend/src/index.js
import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import configureStore from './store';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

<h3 align="center">25</h3>

Next, define a `Root` React functional component.

It should the `App` component wrapped in Redux's `Provider` and React Router DOM's `BrowserRouter` provider components.

Make sure to pass in the key of `store` with the value of `store` to the `Provider`.

Your 'frontend/src/index.js' should look like this:

```js
// frontend/src/index.js
import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import configureStore from './store';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```
<h3 align="center">26</h3>

After defining the `Root` functional component, call `ReactDOM.render` function
passing in the `Root` component and the HTML element with the id of `"root"`.

Your 'frontend/src/index.js' should look like this:

```js
// frontend/src/index.js
import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import configureStore from './store';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

function Root() {
  return (
    <Provider store={store}> // <---
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

<h1 align="center">TEST THE REDUX STORE SETUP</h1>
<h3 align="center">27</h3>

Test your Redux store setup by starting your React frontend server (run `npm start` in your `frontend` folder) and navigate to [http://localhost:3000].

Make sure you CD into the `frontend` folder and npm start

![npm start](https://github.com/miguelcoria94/JustStocks/blob/main/projectnotes/Screen%20Shot%202020-11-19%20at%2011.34.12%20PM.png)

<h3 align="center">28</h3>

Your terminal should look like this if you did all the other steps together

![npm start](https://github.com/miguelcoria94/JustStocks/blob/main/projectnotes/Screen%20Shot%202020-11-19%20at%2011.41.49%20PM.png)

<h3 align="center">29</h3>

Open up your console

![npm start](https://github.com/miguelcoria94/JustStocks/blob/main/projectnotes/Screen%20Shot%202020-11-19%20at%2011.48.39%20PM.png)

You can ignore the "Store does not have a valid reducer" error. This error is a result of not passing in anything into the rootReducer's combineReducer.

<h3 align="center">30</h3>

Check to see if your Redux dev tools was successfully connected and if there is
a `store` on the `window` in your browser's dev tools console.

![npm start](https://github.com/miguelcoria94/JustStocks/blob/main/projectnotes/Screen%20Shot%202020-11-19%20at%2011.55.18%20PM.png)

<h3 align="center">31</h3>

Try to dispatch an action from your browser's dev tools console. Make sure to include a `type` key in the action that you dispatch.

```js
window.store.dispatch({ type: 'hello' });
```

Your `frontend/src/index.js` should look like this:

```js
// frontend/src/index.js
import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import configureStore from './store';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

window.store.dispatch({ type: "hello" });

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

<h3 align="center">32</h3>

If you did everything right your redux dev tools should look like this:

![npm start](https://github.com/miguelcoria94/JustStocks/blob/main/projectnotes/Screen%20Shot%202020-11-20%20at%2012.06.21%20AM.png)

<h3 align="center">33</h3>

If you cannot dispatch an action or if you cannot see the action in the
Redux dev tools, check the syntax in your `frontend/src/store/index.js` and in your `frontend/src/index.js`.

<h1 align="center">WRAPPING 'FETCH' REQUESTS WITH CSRF</h1>

<h3 align="center">34</h3>

Your Express backend server is configured to be CSRF protected and will only accept requests that have the right CSRF secret token in a header and the right CSRF token value in a cookie.

<h3 align="center">35</h3>

You need to add a `"proxy"` in your `frontend/package.json`.

Add a `"proxy"` key with the value of `http://localhost:3000` or wherever you are
serving your backend Express application.

This proxy will force the frontend server to act like it's being served from the backend server.

So if you do a `fetch` request in the React frontend like `fetch('/api/csrf/restore)`, then the `GET /api/csrf/restore` request will be made to the backend server instead of the frontend server.

```json
  "proxy": "http://localhost:3000"
```
Your `frontend/package.json`'s `"proxy"` key should like this:

![npm start](https://github.com/miguelcoria94/JustStocks/blob/main/projectnotes/Screen%20Shot%202020-11-20%20at%2012.18.01%20AM.png)

<h3 align="center">36</h3>

**Remember to restart the frontend server after you make any edits to the
`package.json` file.**

<h3 align="center">37</h3>

Next, to make `fetch` requests with any HTTP verb other than `GET`, you need to set a `XSRF-TOKEN` header on the request and the value of the header should be set to the value of the `XSRF-TOKEN` cookie.

To do this, you are going to wrap the `fetch` function on the `window` that will be used in place of the default `fetch` function. **DONE ON NEXT STEP**

<h3 align="center">38</h3>

Create a `csrf.js` file in the `frontend/src/store` folder.

Import `Cookies` from `js-cookie` that will be used to extract the `XSRF-TOKEN` cookie value.

```js
// frontend/src/store/csrf.js
import Cookies from 'js-cookie';
```

<h3 align="center">39</h3>

Define an `async` function called `fetch` that will take in `url` parameter and an
`options` parameter that defaults to an empty object.

If `options.headers` is not set, default it to an empty object.

```js
// frontend/src/store/csrf.js
import Cookies from 'js-cookie';

export async function fetch(url, options = {}) {
    // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};
}
```

<h3 align="center">40</h3>

If `options.method` is not set, set it to the `GET` method.


```js
// frontend/src/store/csrf.js
import Cookies from 'js-cookie';

export async function fetch(url, options = {}) {
    // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};
}
```

<h3 align="center">41</h3>

If it is any method other than a `GET` method, set the `XSRF-TOKEN` header on the `options` object to the extracted value of the `XSRF-TOKEN` cookie.

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
}
```

<h3 align="center">42</h3>

Call and `await` the `window.fetch` with the `url` and the `options` object to get the response.

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
}
```

<h3 align="center">43</h3>

If the response has a JSON body, then parse it using the `.json` method on the
response.

Set the parsed JSON body as a key of `data` on the response.

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
}
```

<h3 align="center">44</h3>

If the response status code is 400 or above, `throw` the response as the error.

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

<h3 align="center">45</h3>

Finally, Export the custom `fetch` function from this file.

Your `frontend/src/store/csrf.js` should look like this:

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
<h1 align="center">RESTORE THE XSRF-TOKEN COOKIE</h1>
<h3 align="center">46</h3>

In development, the backend and frontend servers are separate. 

In production though, the backend also serves up all the frontend assets, including the `index.html` and any JavaScript files in the `frontend/build` folder after running `npm start` in the `frontend` folder.

In production, the `XSRF-TOKEN` will be attached to the `index.html` file in the `frontend/build` folder.

<h3 align="center">47</h3>

CD into `backend/routes/index.js` file, serve the `index.html` file at the `/` route and any routes that don't start with `/api`.

Along with it, attach the `XSRF-TOKEN` cookie to the response.

Serve the static files in the `frontend/build` folder using the `express.static` middleware.

Your `backend/routes/index.js` file should look like this:

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
```

<h3 align="center">48</h3>

In development, you need another way to get the `XSRF-TOKEN` cookie on your
frontend application because the React frontend is on a different server than
the Express backend.


<h3 align="center">49</h3>

To solve this, add a backend route, `GET /api/csrf/restore` in the same file that can be accessed only in development and will restore the `XSRF-TOKEN` cookie.

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
Your `backend/routes/index.js` should look like this:

```js
// backend/routes/index.js
// ...

// Add a XSRF-TOKEN cookie in development
const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

// router.get("/hello/world", function (req, res) {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   res.send("Hello World!");
// });

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  // Serve the frontend's index.html file at the root route
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}


module.exports = router;

```

<h3 align="center">50</h3>

Back in the React frontend, this `GET /api/csrf/restore` route needs to be called when the application is loaded.

Define and export a function called `restoreCSRF` in the `frontend/src/store/csrf.js` that will call the custom `fetch` function with `/api/csrf/restore` as the `url` parameter.

```js
// frontend/src/store/csrf.js
// ...

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
  return fetch('/api/csrf/restore');
}
```

Your `frontend/src/store/csrf.js` should look like this:

```js
    // frontend/src/store/csrf.js
    import Cookies from "js-cookie";

    export async function fetch(url, options = {}) {
        options.method = options.method || "GET";
        options.headers = options.headers || {};

    if (options.method.toUpperCase() !== "GET") {
        options.headers["Content-Type"] =
        options.headers["Content-Type"] || "application/json";
        options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
    }
    
    const res = await window.fetch(url, options);

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        res.data = data;
    }

        if (res.status >= 400) throw res;

        return res;
    }

    export function restoreCSRF() {
    return fetch("/api/csrf/restore");
    }
```

<h3 align="center">51</h3>

In the frontend entry file (`frontend/src/index.js`), call the `restoreCSRF` function when in development before defining the `Root` functional component.

Attach the custom `fetch` function onto the `window` when in development as `window.csrfFetch`.

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

Your `frontend/src/index.js` should look like this:

```js
import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { restoreCSRF, fetch } from "./store/csrf";

import configureStore from './store';


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = fetch;
  window.store = store;
}

window.store.dispatch({ type: "hello" });

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

<h1 align="center">TEST CUSTOM `FETCH` WITH CSRF</h1>
<h3 align="center">52</h3>

To test the custom `fetch` function that attaches the CSRF token to the header,navigate to root route of the React application, [http://localhost:3000].

In the browser's dev tools console, make a request to `POST /api/login` with the demo user credentials using the `window.csrfFetch` function

There is no need to specify the headers because the default header for `"Content-Type"`, set to `"application/json"`, and the `"XSRF-TOKEN"` header are added by the custom `fetch`.

Make sure you have both the backend and frontend started.

<h1 align="center">SESSION ACTIONS AND REDUCER</h1>

<h3 align="center">53</h3>

The Login Form Page is the first page that you will add to your frontend
application.

add the Redux store actions and reducers that you need for this feature

use the `POST /api/session` backend route to login in a user
as well as add the session user's information to the frontend Redux store.

<h3 align="center">54</h3>

Make a file called `session.js` in the `frontend/src/store` folder. 

This file will contain all the actions specific to the session user's information and the session user's Redux reducer.

The `session` slice of state should look like this if there is a
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

```js
const sessionReducer = (state = {}, action) => {
}
```

<h3 align="center">55</h3>

Create two POJO action creators.

One that will set the session user in the `session` slice of state to the action creator's input parameter, and another that will remove the session user.

```js
const setSession = (user) => {

}

const endSession = (user) => {
    
};
```

<h3 align="center">56</h3>

Their types should be extracted as a constant and used by the action creator and the `session` reducer.

```js
import fetch from "./csrf"

const LOGIN_USER = "LOGIN_USER";
const SET_SESSION = "SET_SESSION";
const END_SESSION = "END_SESSION";

const setSession = (user) => {
    return {
        type: SET_SESSION,
        payload: user,
    }
}

const endSession = (user) => {
    return {
        type: END_SESSION,
    }
};

const sessionReducer = (state = {}, action) => {

}
```

<h3 align="center">57</h3>

You need to call the API to login then set the session user from the response, so add a thunk action for the `POST /api/session`.

Make sure to use the custom `fetch` function from `frontend/src/store/csrf.js`.

The `POST /api/session` route expects the request body to have a key of `credential` with an existing username or email and a key of `password`.

After the response from the AJAX call comes back, dispatch the action for setting the session user to the response'sdata.

Export the login thunk action, and export the reducer as the default export.

```js
import { fetch } from "./csrf";

const LOGIN_USER = "LOGIN_USER";
const SET_SESSION = "SET_SESSION";
const END_SESSION = "END_SESSION";

const setSession = (user) => {
  return {
    type: SET_SESSION,
    payload: user,
  };
};

const endSession = () => {
  return {
    type: END_SESSION,
  };
};

export const login = ({ credential, password }) => async (dispatch) => {
  try {
    const res = await fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password }),
    });

    const { user } = res.data;

    dispatch(setSession(user));

    return {
      type: LOGIN_USER,
      payload: user,
    };
  } catch (err) {
    console.error(err);
  }
};

export const restoreUser = () => async (dispatch) => {
  const res = await fetch("/api/session");
  dispatch(setSession(res.data.user));
  return res;
};

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
  dispatch(setSession(response.data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/session", {
    method: "DELETE",
  });
  dispatch(endSession());
  return response;
};

const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SESSION:
      return { ...state, user: action.payload };
    case END_SESSION:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
```

<h3 align="center">58</h3>

Import the reducer in `session.js` into the file with the root reducer,
`frontend/src/store/index.js`.

Set a key of `session` in the `rootReducer`'s `combineReducer` object argument to the session reducer.

```js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from "./session";

const rootReducer = combineReducers({ session: sessionReducer})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
```

<h1 align="center">TEST THE SESSION ACTIONS AND REDUCER</h1>

<h3 align="center">59</h3>

Login should be working so give it a try! Test the login thunk action and the `session` reducer.

Import all the actions from the `session.js` file into the frontend application entry file, `frontend/src/index.js`.

Then attach the actions to the `window` at the key of `sessionActions`:

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
<h1 align="center">LOGINFORMPAGE COMPONENT</h1>
<h3 align="center">60</h3>

After finishing the Redux actions and the reducer for the login feature, the React components are next.

Create a `components` folder in the `frontend/src` folder. This is where all your components besides `App` will live.

<h3 align="center">61</h3>

Make a folder called `LoginFormPage` nested in the new `components` folder which will hold all the files for the login form.

Add an `index.js` file in the `LoginFormPage`.

Inside of this file, add a React functional component named
`LoginFormPage`.

<h3 align="center">62</h3>

Render a form with a controlled input for the user login credential (username or email) and a controlled input for the user password.

On submit of the form, dispatch the login thunk action with the form input values.

Make sure to handle and display errors from the login thunk action if there are any.

Export the `LoginFormPage` component at the bottom of the file, then render it in `App.js` at the `"/login"` route.

If there is a current session user in the Redux store, then redirect the user to the `"/"` path if trying to access the `LoginFormPage`.

Test your component by navigating to the `"/login"` page. Try logging into the form there with the demo user's credentials.

Once you login, you should be redirected to the `"/"` route.

Check your code for the `LoginFormPage` and the `App` component if this is not the flow that you are experiencing.

Also try logging in with invalid fields to test your handling and displaying of error messages.

<h3 align="center">63</h3>

create and import a LoginFormPage.css page into LoginFormPage.js.

<h1 align="center">RESTORE THE SESSION USER</h1>
<h3 align="center">64</h3>

Right now, if you login successfully, you get redirected to the `"/"` route.

If you refresh at that `"/"` page and navigate to the `"/login"` page, then you will not be redirected because the store does not retain the session user information on a refresh.

How do you retain the session user information across a refresh? By loading the application after accessing the route to get the current session user `GET /api/session` and adding the user info to the Redux store again.

<h3 align="center">65</h3>

Add a thunk action in `frontend/src/store/session.js` that will call the
`GET /api/session` and dispatch the action to set the session user with the data from the response.

Test your thunk action by logging in then refreshing at the
[http://localhost:3000] route.

Make sure you have a `token` in your cookies.

In the browser's dev tools console, try dispatching the restore session user thunk action.

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

If you don't see this behavior, then check your syntax for the restore user thunk action.

<h3 align="center">66</h3>

After you test it to see if it works, then use this thunk action inside of `App.js` after the `App` component's first render.

<h1 align="center">SIGNUP FORM PAGE</h1>
<h3 align="center">65</h3>






























