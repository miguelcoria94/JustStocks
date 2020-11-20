5. All the Backend is inside the backend folder.

6. I also created a folder to test and experiment with css, I could use figma but I find testing with live server is better. Espcecially since I'm only going to be working with vanilla css.

7. In order to connect the frontend with the backend you have to "npm start" on both the root directory and cd into the "client" folder and "npm start" there too. Don't worry about doing it now. You have to setup the DB first. They are two seperate things and need to both be on to talk to each other.

7. Dont touch anything on the ./bin/www file - remember the bin folder is a common Unix convention for naming a folder that contains executable code. Even though it is lacking the .js file extension, the www file is actually a JS module that contains code to start up the express app.

8. Since your app will use a database for data persistence your project needs to include a way to configure the database connection settings across environments. To do that, let's use environment variables to configure the app.

9. As a reminder the 'per-env' package (It's already installed) allows you to define npm scripts for each of your apps environment. The 'dotenv' package (It's already installed) is used to load environment variables from the .env file and the 'dotenv-cli' (It's already installed) package acts as an intermediary between npx and tools or utilities (like the sequelize cli) to load your environment variables from an .env fila and run the command that you pass into it.