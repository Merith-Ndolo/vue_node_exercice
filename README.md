# Vue & Node exercice

## Getting Started

### Prequisites

- [Node.JS 16+](https://nodejs.org)

### Recommended Tools

[Visual Studio Code](https://code.visualstudio.com/) with recommended extensions (will be proposed to install when opening project):

- sqlite-viewer (usefull to browse local database)
- Volar (Vue.JS support)
- I18n ally (localisation support)

### Run backend

```
cd backend
npm install
npm start
```

⚠ By default, the backend will create a local file-based sqlite database at `backend/local-db.sqlite3`
You can browse it with the VSCode sqlite-viewer extension or any other sql browser tool.

### Run frontend

```
cd frontend
npm install
npm start
```

Open app in your browser: [http://localhost:8080/](http://localhost:8080/)

## App description

This app allow registered users to login to their event dashboard

The App is currently made of 2 screens:

- A login screen which allow registered users to connect
- A Home screen which display currently logged-in user data

Users can currently login using their phone number through the following workflow:

- User enter his phone number
- A random numeric code is generated and sent to the user by SMS (In this exercice **the message is not really sent but printed to the server console instead**)
- User enter the code

Some test data are inserted at first run in order to ease testing:

- John Doe (06 12 34 56 78)
- Jean Dupont (06 00 00 00 00)

## Tech stacks

- **Backend**: NodeJS + ExpressJS + [Sequelize](https://sequelize.org/) + SQLite
- **Frontend**: Vue 3 + VueRouter + Pinia + Vue i18n + [Vuetify 3](https://vuetifyjs.com)

## Exercice

The purpose of the exercice is to extend the App with an alternative login method, using user's lastname and registration number to authenticate.
The registration number is a 5 to 8 digits number which is not yet available in the app model
TODO:

- [ ] Add registration number field in user model (and update test data with some sample registration numbers to be able to test)
- [ ] Add needed backend endpoint to login using lastname and registration number
- [ ] Add a link at the bottom of the login form to switch to the alternative login method
- [ ] Implement alternative login form
