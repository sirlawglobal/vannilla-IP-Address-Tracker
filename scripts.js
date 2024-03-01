document.getElementById("trackBtn").addEventListener("click", function() {
  const ipAddress = document.getElementById("ipInput").value;
  const apiKey = 'at_DMF2M80RJXe83Y4vMv5eonvaCV0LF'; // Replace with your API key
  const url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`;
  
console.log(url);
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (!data || !data.location) {
        throw new Error('Location data not available');
      }

      // Display geolocation data in resultDiv
      const resultDiv = document.querySelector(".geolocation-details");
      resultDiv.innerHTML = `
        <div>
          <p>IP Address</p>
          <h3>${data.ip}</h3>
        </div>

        <div>
          <p>Location</p>
          <h3>${data.location.city}, ${data.location.region}, ${data.location.country}</h3>
        </div>

        <div>
          <p>Timezone</p>
          <h3>UTC:${data.location.timezone}</h3>
        </div>

        <div>
          <p>ISP</p>
          <h3>${data.isp}</h3>
        </div>
      `;

if (!document.querySelector('.leaflet-container')) {
  // Display real-time map
  const map = L.map('map').setView([data.location.lat, data.location.lng], 20);

  // Add tile layer to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);


  
  // Add marker to the map
  L.marker([data.location.lat, data.location.lng]).addTo(map)
    .bindPopup(`${data.location.city}, ${data.location.region}, ${data.location.country}`)
    .openPopup();
}

    })

  
    .catch(error => {
      console.error("Error fetching IP geolocation:", error);
    });
});
