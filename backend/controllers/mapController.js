
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// ✅ Geocode helper
async function geocode(place) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      place
    )}`
  );
  const data = await res.json();
  if (data.length > 0) {
    return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
  }
  return null;
}

// ✅ Route controller function
const getRoute = async (req, res) => {
  const { pickup, destination } = req.body;

  try {
    const pickupCoords = await geocode(pickup);
    const destCoords = await geocode(destination);

    if (!pickupCoords || !destCoords) {
      return res.json({ error: "Invalid locations" });
    }

    // Use OSRM public API for routing
    const routeRes = await fetch(
      `http://router.project-osrm.org/route/v1/driving/${pickupCoords[0]},${pickupCoords[1]};${destCoords[0]},${destCoords[1]}?overview=full&geometries=geojson`
    );
    const routeData = await routeRes.json();

    if (routeData.routes.length > 0) {
      const coords = routeData.routes[0].geometry.coordinates.map((c) => [
        c[1],
        c[0],
      ]);
      res.json({ route: coords });
    } else {
      res.json({ error: "Route not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getRoute
};
