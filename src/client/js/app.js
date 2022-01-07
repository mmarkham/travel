/* Global Variables */
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
// country code optional
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=b863c9b04f652c1c9e39f9ac76dcf176&units=imperial';

const generateBtn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate() +'.'+ d.getFullYear();


// Event listener to the generate button to call a function on click
generateBtn.addEventListener('click', updateWeather);

// Called by event listener
function updateWeather() {
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;
	retrieveWeatherData(baseUrl, zipCode, apiKey)
		.then(function (data) {
			postWeatherData('/weatherData', {
				temp: data.main.temp,
				date: newDate,
				userResponse: userResponse
			});
		})
		.then(function () {
			getWeatherData("/recentWeatherData")
				.then(function (data) {
					setInnerHTML(data);
				})
		});
};

//Updates UI
function setInnerHTML(data) {
    try {
        document.getElementById('temp').innerHTML = data.temp;
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('content').innerHTML = data.userResponse;
    }
    catch (error) {
        console.log("Error retrieving data " + error);
    }
}

// Returns weather data
const retrieveWeatherData = async(baseUrl, zipCode, apiKey) => {
	const res = await fetch(baseUrl + zipCode + apiKey);
	try {
		const data = await res.json()
		return data;
	} catch (error) {
		console.log("Could not retrieve Weather Data", error);
	}
}

//GET request function
const getWeatherData = async(url = '') => {
	const response = await fetch(url, {
		method: 'GET',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	try {
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("Error", error);
	}
}

getWeatherData('/recentWeatherData');

//POST request function
const postWeatherData = async(url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST', 
		credentials: 'same-origin', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data), 
	});

	try {
		const dataToPost = await response.json();
		return dataToPost;
	} catch (error) {
		console.log("Error", error);
	}
}