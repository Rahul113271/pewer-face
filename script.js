document.addEventListener("DOMContentLoaded", () => {
    const altitudeSpan = document.getElementById("altitude");
    const temperatureSpan = document.getElementById("temperature");
    const graphContainer = document.getElementById("graph-container");
    const tableContainer = document.getElementById("table-container");
    const dataGraph = document.getElementById("data-graph");

    // Initialize data storage
    const dataPoints = {
        time: [],
        altitude: [],
        temperature: []
    };

    let chartInstance; // To store the Chart.js instance

    // Fetch real-time data
    function fetchData() {
        const currentTime = new Date().toLocaleTimeString();
        const newAltitude = Math.random() * 1000; // Simulate altitude
        const newTemperature = (Math.random() * 50).toFixed(2); // Simulate temperature

        // Update live display
        altitudeSpan.textContent = newAltitude.toFixed(2);
        temperatureSpan.textContent = newTemperature;

        // Update data arrays
        if (dataPoints.time.length >= 20) {
            dataPoints.time.shift();
            dataPoints.altitude.shift();
            dataPoints.temperature.shift();
        }
        dataPoints.time.push(currentTime);
        dataPoints.altitude.push(newAltitude);
        dataPoints.temperature.push(newTemperature);

        // Update chart
        if (chartInstance) {
            chartInstance.data.labels = dataPoints.time;
            chartInstance.data.datasets[0].data = dataPoints.altitude;
            chartInstance.data.datasets[1].data = dataPoints.temperature;
            chartInstance.update();
        }
    }

    setInterval(fetchData, 1000); // Fetch data every second

    // Show Graph button handler
    document.getElementById("show-graph").addEventListener("click", () => {
        tableContainer.style.display = "none";
        graphContainer.style.display = "block";

        if (!chartInstance) {
            const ctx = dataGraph.getContext("2d");
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dataPoints.time,
                    datasets: [
                        {
                            label: 'Altitude (m)',
                            data: dataPoints.altitude,
                            borderColor: 'blue',
                            backgroundColor: 'rgba(0, 0, 255, 0.1)',
                            fill: true
                        },
                        {
                            label: 'Temperature (°C)',
                            data: dataPoints.temperature,
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.1)',
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Time'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Value'
                            }
                        }
                    }
                }
            });
        }
    });

    // Show Table button handler
    document.getElementById("show-table").addEventListener("click", () => {
        graphContainer.style.display = "none";
        tableContainer.style.display = "block";

        const tableBody = document.getElementById("data-table").querySelector("tbody");
        tableBody.innerHTML = ""; // Clear existing rows

        dataPoints.time.forEach((time, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${time}</td>
                <td>${dataPoints.altitude[index].toFixed(2)}</td>
                <td>${dataPoints.temperature[index]}</td>
            `;
            tableBody.appendChild(row);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const altitudeSpan = document.getElementById("altitude");
    const temperatureSpan = document.getElementById("temperature");
    const latitudeSpan = document.getElementById("latitude");
    const longitudeSpan = document.getElementById("longitude");

    // Initialize Leaflet map
    const map = L.map("map").setView([0, 0], 2); // Default view at (0, 0)
    
    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker for the rocket
    const rocketMarker = L.marker([0, 0]).addTo(map);

    // Simulated data storage
    const dataPoints = {
        time: [],
        altitude: [],
        temperature: [],
        latitude: [],
        longitude: []
    };

    // Simulate rocket data updates
    function fetchRocketData() {
        // Simulate altitude, temperature, and GPS coordinates
        const newAltitude = (Math.random() * 1000).toFixed(2);
        const newTemperature = (Math.random() * 50).toFixed(2);
        const newLatitude = (Math.random() * 180 - 90).toFixed(6); // Latitude range: -90 to 90
        const newLongitude = (Math.random() * 360 - 180).toFixed(6); // Longitude range: -180 to 180

        // Update real-time display
        altitudeSpan.textContent = newAltitude;
        temperatureSpan.textContent = newTemperature;
        latitudeSpan.textContent = newLatitude;
        longitudeSpan.textContent = newLongitude;

        // Update marker on the map
        const lat = parseFloat(newLatitude);
        const lon = parseFloat(newLongitude);
        rocketMarker.setLatLng([lat, lon]);
        map.setView([lat, lon], 8); // Adjust zoom level as needed

        // Store data for potential graphing or table use
        const currentTime = new Date().toLocaleTimeString();
        dataPoints.time.push(currentTime);
        dataPoints.altitude.push(newAltitude);
        dataPoints.temperature.push(newTemperature);
        dataPoints.latitude.push(newLatitude);
        dataPoints.longitude.push(newLongitude);

        // Keep data manageable (e.g., last 20 entries)
        if (dataPoints.time.length > 20) {
            dataPoints.time.shift();
            dataPoints.altitude.shift();
            dataPoints.temperature.shift();
            dataPoints.latitude.shift();
            dataPoints.longitude.shift();
        }
    }

    // Fetch new data every 2 seconds (simulated)
    setInterval(fetchRocketData, 2000);
});

function calculateThrust() {
    let m_dot = parseFloat(document.getElementById("massFlowRate").value);
    let v_e = parseFloat(document.getElementById("exhaustVelocity").value);
    let A_e = parseFloat(document.getElementById("exitArea").value);
    let P_e = parseFloat(document.getElementById("exhaustPressure").value);
    let P_0 = parseFloat(document.getElementById("ambientPressure").value);
    
    let thrust = (m_dot * v_e) + (A_e * (P_e - P_0));
    
    document.getElementById("thrustOutput").innerText = "Thrust: " + thrust.toFixed(2) + " N";
}
function clearValues() {
    document.getElementById("massFlowRate").value = "";
    document.getElementById("exhaustVelocity").value = "";
    document.getElementById("exitArea").value = "";
    document.getElementById("exhaustPressure").value = "";
    document.getElementById("ambientPressure").value = "";
    document.getElementById("thrustOutput").innerText = "Thrust: ";
}
function showMessage() {
    alert("Please the values below");
}
