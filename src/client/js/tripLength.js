	// Calculate trip duration
	const CalcTripLength = async () => {
        const start = document.getElementById("startDate").value;
		const end = document.getElementById("endDate").value;
		let startDate = new Date(start).getTime();
		let endDate = new Date(end).getTime();
		let duration = endDate - startDate;
		// convert to days
		let days = Math.floor(duration / (1000 * 60 * 60 * 24));
		
        // update ui
        document.getElementById('duration').innerHTML = `Duration: ${days} days`
	}

    export { CalcTripLength };