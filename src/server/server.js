const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require("node-fetch");
const path = require("path");
let apiData;
let projectData = {};

const dotenv = require('dotenv');
dotenv.config({path: '.env'});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const whitelist = ["http://localhost:3000", "http://localhost:8080", "https://travel-app-mmarkham.herokuapp.com:3000", "https://travel-app-mmarkham.herokuapp.com"]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions));

app.use(express.static('dist'));

console.log(path.join(__dirname, '..', '..', 'dist', 'index.html'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
})

app.get('/test', async (req, res) => {
  res.json({message: 'pass!'})
})

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT || 3000, function () {
    console.log('App listening on port 3000!');
})

// GET route
app.get('/all', sendData);
function sendData (req, res) {
  res.send(projectData);
};

// POST Geonames data
const GeoBaseURL = `http://api.geonames.org/searchJSON?q=`;
const geoID = `&maxRows=1&username=${process.env.GEONAMES_ID}`;
app.post('/addGeonames', addGeoData);
function addGeoData (req,res){
    let newEntry = req.body.city //todo;
    //console.log(newEntry);
    apiData = retrieveGeoData(GeoBaseURL, newEntry, geoID)
    .then(function(apiData){
      console.log(apiData);
      Object.assign(projectData, {
        lat: apiData.geonames[0].lat,
        lng: apiData.geonames[0].lng,
        city: apiData.geonames[0].name,
        country: apiData.geonames[0].countryName,
    })
      res.send(projectData);
    })
};

// POST Weatherbit data
const weatherBaseURL = `http://api.weatherbit.io/v2.0/forecast/daily?city=`;
const weatherbitKey = `&key=${process.env.WEATHERBIT_KEY}`;
app.post('/addWeather', addWeatherData);
function addWeatherData (req,res){
    let newEntry = req.body.city //todo;
    //console.log(newEntry);
    apiData = retrieveWeatherData(weatherBaseURL, newEntry, weatherbitKey)
    .then(function(apiData){
      console.log(apiData.data[0]);
      Object.assign(projectData, {
        minTemp: apiData.data[0].min_temp,
        maxTemp: apiData.data[0].max_temp,
        temp: apiData.data[0].temp,
        description: apiData.data[0].weather.description,
    })
      res.send(projectData);
    })
};

// POST Pixabay data
const pixabayBaseURL = `https://pixabay.com/api/?`;
const pixabayKey = `&key=${process.env.PIXABAY_KEY}&q=`;
const category = '&category=travel&image_type=photo';
app.post('/addPixabay', addPixabayData);
function addPixabayData (req,res){
    let newEntry = req.body.city //todo;
    //console.log(newEntry);
    apiData = retrievePixabayData(pixabayBaseURL, pixabayKey, newEntry, category)
    .then(function(apiData){
      //console.log(apiData.hits[0]);
      Object.assign(projectData, {
        image: apiData.hits[0].webformatURL,
    })
      res.send(projectData);
    })
};

// Async GET geodata
const retrieveGeoData = async (url, id, city) =>{
  //console.log(url+id+city);
  const request = await fetch(url+id+city);
  try {
  // Transform into JSON
  const allData = await request.json()
  return allData;
  }
  catch(error) {
    console.log("error", error);
  }
};

// Async GET weather data
const retrieveWeatherData = async (url, city, key) =>{
  //console.log(url+city+key);
  const request = await fetch(url+city+key);
  try {
  // Transform into JSON
  const allData = await request.json()
  return allData;
  }
  catch(error) {
    console.log("error", error);
  }
};

// Async GET pixabay data
const retrievePixabayData = async (url, id, city) =>{
  //console.log(url+id+city);
  const request = await fetch(url+id+city);
  try {
  // Transform into JSON
  const allData = await request.json()
  return allData;
  }
  catch(error) {
    console.log("error", error);
  }
};

module.exports = app;