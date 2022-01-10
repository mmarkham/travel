# Project Description


## Getting started

It would probably be good to first get your basic project setup and functioning.
clone this repo and you will need to install everything:

`cd` into your new folder and run:
- `npm install`

## Setting up the API
### Step 1: Signup for an API keys
- Create an account with Geonames [here](http://www.geonames.org/export/web-services.html). 
- Create an account with Weatherbit [here](https://www.weatherbit.io/).
- Create an account with Pixabay [here](https://pixabay.com/api/docs/).
- Create an account with Countrylayer [here](https://countrylayer.com/).

### Step 2: Environment Variables
- [ ] Create a new ```.env``` file in the root of your project
- [ ] Go to your .gitignore file and add ```.env``` - this will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys was pointless.
- [ ] Fill the .env file with your API keys like this:
```
API_ID=***************************
API_KEY=**************************
```

### Step 3: Building
- Open up a console and navigate to the project directory root
- For a production build, enter `npm run build-prod`. 
- For development, enter `npm run build-dev`. The browser should pop up automatically on `localhost:8080`.
- In a new console window, `cd` to the project folder and start the express server by entering, `node \src\server\server.js`.
- The app should now be fully functional on `http://localhost:8080/`.


