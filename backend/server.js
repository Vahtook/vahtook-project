require('dotenv').config(); // must be first

const express = require('express');
const cors = require('cors');
const mapRouter = require('./routes/mapRoutes'); // <-- import the router (not the controller)

const app = express();

// allow your FE origins
app.use(cors({ origin: ['http://localhost:5173', 'https://www.vahtook.com'] }));
app.use(express.json());

// quick health check
app.get('/health', (_req, res) => res.send('ok'));

// mount routes at /routes/map
app.use('/routes/map', mapRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
