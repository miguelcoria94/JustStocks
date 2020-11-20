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

- `react-redux` - React Redux is the official Redux UI binding library for React. If you are using Redux and React together, you should also use React Redux to bind these two libraries.

- `react-router-dom` - This is a frontend routing library to create routes that allows you to control which components to display using the browsers location. Since this will be a single page app you do not want to have to refresh the page each time the browser changes location. You want to be able to update the browers location and your app's response using JS. This is known as client-side routing.

- `redux` - Redux is a JavaScript Framework for managing the frontend state of a web application. Redux allows you to store information in an organized manner in a web app.Redux also allows you to quickly retrieve that information from anywhere in the app

Advantages of using Redux

    * Redux simplifies some of the more complicated aspects of flux
    * Redux is very lightweight; the library only takes up 2kbs
    * Redux is very fast(the time to insert and retrieve data)
    * Redux is very predictable

- `redux-thunk` - Redux Thunk is a middleware that lets you call action creators that return a function instead of an action object. That function receives the store's dispatch method, which is then used to dispatch regular synchronous actions inside the function's body once the asynchronous operations have been completed.

<h3 align="center">5</h3>
Cd into the frontend folder and "npm install -D" the following packages as dev-dependencies:

- `redux-logger` - This library logs actions in the Developer Console, giving traceable stack of user actions.


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
 * createStore - creates a redux store that holds the complete state tree of your app. There should only be a single store in your app.

 * combineReducers

 
<h3 align="center">10</h3>
 
 Inside "frontend/src/store/index.js" also import 'thunk' from the redux-thunk package.

9. create a 'rootReducer' that calles 'combineReducer' and passes in an empty object

