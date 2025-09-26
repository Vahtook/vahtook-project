const { olaGet, extractFirstLatLng } = require('../services/olaMapsService');

exports.health = (_req, res) => {
  res.json({ ok: true, provider: 'Ola Maps', time: new Date().toISOString() });
};

exports.autocomplete = async (req, res) => {
  try {
    const input = (req.query.input || '').trim();
    if (!input) return res.status(400).json({ success: false, message: 'Query param "input" is required' });

    const data = await olaGet('/places/v1/autocomplete', { input });
    res.json({ success: true, data });
  } catch (e) {
    res.status(e.status || 500).json({ success: false, message: e.message, details: e.data || null });
  }
};

exports.geocode = async (req, res) => {
  try {
    const address = (req.query.address || '').trim();
    if (!address) return res.status(400).json({ success: false, message: 'Query param "address" is required' });

    const data = await olaGet('/geocoding/v1/geocode', { address });
    const point = extractFirstLatLng({ data }) || extractFirstLatLng(data);
    res.json({ success: true, point, data });
  } catch (e) {
    res.status(e.status || 500).json({ success: false, message: e.message, details: e.data || null });
  }
};

exports.reverse = async (req, res) => {
  try {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return res.status(400).json({ success: false, message: 'Query params "lat" and "lng" must be valid numbers' });
    }

    const data = await olaGet('/geocoding/v1/reverse', { lat, lng });
    res.json({ success: true, data });
  } catch (e) {
    res.status(e.status || 500).json({ success: false, message: e.message, details: e.data || null });
  }
};
