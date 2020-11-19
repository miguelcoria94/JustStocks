<h1 align="center">Solo React Project Notes</h1>
<h2 align="center">Personal notes while building JustStocks</h2>

<h3 align="center">1</h3>
The repo we were provided has the skeleton for the backend and an empty frontend folder.

<h3 align="center">2</h3>
Use the "create-react-app" command from inside the 'frontend' folder to initialize React inside of the 'frontend' folder. 

command: 'npx create-react-app . --template @appacademy/simple --use-npm'

<h3 align="center">3</h3>
I created a repo on github and connected it to my local repo

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
    
- `redux-thunk` - add Redux thunk, thunk middlerware for redux

5. Cd into the frontend folder and "npm install -D" the following packages as dev-dependencies:
- `redux-logger` - Log Redux actions in the browers's dev tools console

6. Next, set up the redux store. Create a folder in 'frontend/src' called 'store'.

7. import 'createStore', 'combineReducers', 'applyMiddleware', 'compose' from the redux package

NOTE:
 * createStore - creates a redux store that holds the complete state tree of your app. There should only be a single store in your app.

 * combineReducers

8. import 'thunk' from 'redux-thunk'

9. create a 'rootReducer' that calles 'combineReducer' and passes in an empty object


5. All the Backend is inside the backend folder.

6. I also created a folder to test and experiment with css, I could use figma but I find testing with live server is better. Espcecially since I'm only going to be working with vanilla css.

7. In order to connect the frontend with the backend you have to "npm start" on both the root directory and cd into the "client" folder and "npm start" there too. Don't worry about doing it now. You have to setup the DB first. They are two seperate things and need to both be on to talk to each other.

7. Dont touch anything on the ./bin/www file - remember the bin folder is a common Unix convention for naming a folder that contains executable code. Even though it is lacking the .js file extension, the www file is actually a JS module that contains code to start up the express app.

8. Since your app will use a database for data persistence your project needs to include a way to configure the database connection settings across environments. To do that, let's use environment variables to configure the app.

9. As a reminder the 'per-env' package (It's already installed) allows you to define npm scripts for each of your apps environment. The 'dotenv' package (It's already installed) is used to load environment variables from the .env file and the 'dotenv-cli' (It's already installed) package acts as an intermediary between npx and tools or utilities (like the sequelize cli) to load your environment variables from an .env fila and run the command that you pass into it.