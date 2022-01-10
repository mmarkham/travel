const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require("node-fetch");
let apiData;
let projectData = {};

const dotenv = require('dotenv');
dotenv.config({path: '.env'});

console.log(`Your Weatherbit API key is ${process.env.WEATHERBIT_KEY}`);
console.log(`Your Pixabay API key is ${process.env.PIXABAY_KEY}`);
console.log(`Your Countrylayer API key is ${process.env.COUNTRYLAYER_KEY}`);
console.log(`Your Geonames ID is ${process.env.GEONAMES_ID}`);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('App listening on port 8081!');
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
    console.log(newEntry);
    apiData = retrieveGeoData(GeoBaseURL, newEntry, geoID)
    .then(function(apiData){
      console.log(apiData);
      Object.assign(projectData, {
        latitude: apiData.geonames.lat,
        longitude: apiData.geonames.lng,
        country: apiData.geonames.countryName,
    })
      res.send(projectData);
    })
};

// POST Weatherbit data
const weatherBaseURL = 'http://api.weatherbit.io/v2.0/forecast/daily?city=';
const weatherbitKey = `&key=${process.env.WEATHERBIT_KEY}`;
app.post('/addWeather', addWeatherData);
function addWeatherData (req,res){
    let newEntry = req.body.city //todo;
    console.log(newEntry);
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
const pixabayBaseURL = 'https://pixabay.com/api/?';
const pixabayKey = `&key=${process.env.PIXABAY_KEY}&q=`;
const category = '&category=travel&image_type=photo';
app.post('/addPixabay', addPixabayData);
function addPixabayData (req,res){
    let newEntry = req.body.city //todo;
    console.log(newEntry);
    apiData = retrievePixabayData(pixabayBaseURL, pixabayKey, newEntry, category)
    .then(function(apiData){
      console.log(apiData.hits[0]);
      Object.assign(projectData, {
        image: apiData.hits[0].webformatURL,
    })
      res.send(projectData);
    })
};

//console.log(projectData);


// POST Countrylayer data

// POST data
/*app.post('/addData', addData);
function addData (req,res){
    let newEntry = req.body.ft;
    console.log(newEntry);
    apiData = retrieveData(baseURL, apiKey, newEntry, lang)
    .then(function(apiData){
      projectData = {data: apiData};
      console.log(projectData);
      res.send(projectData);
    })
};*/

// Async GET geodata
const retrieveGeoData = async (url, id, city) =>{
  console.log(url+id+city);
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
  console.log(url+city+key);
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
  console.log(url+id+city);
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

// Async GET countrylayer data