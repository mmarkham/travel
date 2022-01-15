import { CalcTripLength } from "..";

async function init() {
	const hostName = window.location.protocol + '//' + window.location.hostname;
	// Event listener to the submit button to call a function on click
	const submitBtn = document.getElementById('submitBtn');
	submitBtn.addEventListener('click', handleSubmit);
	let city = '';

	// Called by event listener
	async function handleSubmit(event) {
		event.preventDefault();

		city = document.getElementById('city').value;
		const startDate = document.getElementById('startDate').value;
		const endDate = document.getElementById('endDate').value;
		if (/\S/.test(city) && startDate && endDate) {
			if (endDate > startDate) {
				console.log("::: Form Submitted :::");

				//retrieve geonames data
				const geonamesData = await postData(`${hostName}:3000/addGeonames`, {city: city});
				//retrieve weatherbit data 
				const weatherData = await postData(`${hostName}:3000/addWeather`, {city: city});
				//retrieve pixabay data 
				const pixabayData = await postData(`${hostName}:3000/addPixabay`, {city: city});

			if (geonamesData && weatherData && pixabayData) {
				CalcTripLength();
				updateUI();
			}
			} 
			else 
			{
				alert("Return date must occur after the selected arrival date");
			}		
		}
		else
		{
			alert("Please enter a destination city, an arrival date, and a return date");
		}
	};

	// Update UI Elements
	const updateUI = async () => {
		const request = await fetch(`${hostName}:3000/all`);
		try {
			const res = await request.json();
			//console.log(res);
			document.getElementById('location').innerHTML = `<strong>Traveling to ${res.city}, ${res.country}</strong>`;
			document.getElementById('lat').innerHTML = `Latitude: ${res.lat}`;
			document.getElementById('lng').innerHTML = `Longitude: ${res.lng}`;
			document.getElementById('weather').innerHTML = `<strong>Today's Weather Forecast</strong>`;
			document.getElementById('temp').innerHTML = `Avg Temperature: ${res.temp}°C`;
			document.getElementById('minTemp').innerHTML = `Low: ${res.minTemp}°C`;
			document.getElementById('maxTemp').innerHTML = `High: ${res.maxTemp}°C`;
			document.getElementById('description').innerHTML = res.description;
			document.getElementById('cityImg').setAttribute("src",`${res.image}`);
		} catch(error) {
			console.log("error", error);
		}
	} 

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