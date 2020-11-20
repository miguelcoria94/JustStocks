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
    <Provider>
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












