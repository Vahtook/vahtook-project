


const socket = io();

// Track live location
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
      console.error(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}

const map = L.map("map").setView([0, 0], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "OpenStreetMap",
}).addTo(map);

const markers = {};
let routeLayer; // to store route polyline

socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  }
});

socket.on("user-disconnected", (id) => {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
});

// Handle form submit
document.getElementById("routeForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const pickup = document.getElementById("pickup").value;
  const destination = document.getElementById("destination").value;

  const res = await fetch("/api/maps/route", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pickup, destination }),
  });

  const data = await res.json();

  if (data.route) {
    if (routeLayer) {
      map.removeLayer(routeLayer);
    }
    routeLayer = L.polyline(data.route, { color: "blue" }).addTo(map);
    map.fitBounds(routeLayer.getBounds());
  } else {
    alert("Route not found");
  }
});



