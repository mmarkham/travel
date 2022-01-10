async function init() {

	// Create a new date instance dynamically with JS
	let d = new Date();
	let newDate = (d.getMonth()+1)+'.'+ d.getDate() +'.'+ d.getFullYear();

	// Event listener to the submit button to call a function on click
	const submitBtn = document.getElementById('submitBtn');
	submitBtn.addEventListener('click', handleSubmit);

	// Called by event listener
	async function handleSubmit(event) {
		event.preventDefault();

		const city = document.getElementById('city').value;
		const startDate = document.getElementById('startDate').value;
		if (/\S/.test(city) && startDate) {
			console.log("::: Form Submitted :::");
			//retrieve geonames data
			postData('http://localhost:8081/addGeonames', {city: city});
			//retrieve weatherbit data 
			postData('http://localhost:8081/addWeather', {city: city});
			//retrieve pixabay data 
			postData('http://localhost:8081/addPixabay', {city: city});
		}
		else
		{
			alert("Please enter a destination city and arrival date");
		}

		/*retrieveWeatherData(baseUrl, zipCode, apiKey)
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
			});*/
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

	//getWeatherData('/recentWeatherData');

	//POST request function
	const postData = async(url = '', data = {}) => {
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

}

export { init };