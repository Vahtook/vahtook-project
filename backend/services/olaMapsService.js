const axios = require('axios');

const BASE_URL = 'https://api.olamaps.io';
const API_KEY = process.env.OLAMAPS_API_KEY;
const FORWARDED_ORIGIN = process.env.OLAMAPS_ALLOWED_ORIGIN || '';

if (!API_KEY) {
  console.warn('[OlaMaps] OLAMAPS_API_KEY is missing; requests will fail.');
}

async function olaGet(path, params = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = {};
  if (FORWARDED_ORIGIN) {
    headers.Origin = FORWARDED_ORIGIN;
    headers.Referer = FORWARDED_ORIGIN;
  }
  try {
    const res = await axios.get(url, {
      params: { ...params, api_key: API_KEY },
      headers,
      timeout: 8000,
    });
    return res.data;
  } catch (err) {
    const status = err.response?.status || 500;
    const msg =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      `Ola Maps error ${status}`;
    const e = new Error(msg);
    e.status = status;
    e.data = err.response?.data;
    throw e;
  }
}

function extractFirstLatLng(payload) {
  if (payload?.point && typeof payload.point.lat === 'number' && typeof payload.point.lng === 'number') {
    return payload.point;
  }
  const d = payload?.data || payload;

  const r0 = d?.results?.[0];
  const lat1 = r0?.geometry?.location?.lat;
  const lng1 = r0?.geometry?.location?.lng;
  if (typeof lat1 === 'number' && typeof lng1 === 'number') return { lat: lat1, lng: lng1 };

 
  const a0 = Array.isArray(d) ? d[0] : d?.data?.[0];
  if (a0 && typeof a0.lat === 'number' && typeof a0.lng === 'number') return { lat: a0.lat, lng: a0.lng };


  if (r0 && typeof r0.lat === 'number' && typeof r0.lng === 'number') return { lat: r0.lat, lng: r0.lng };

  return null;
}

module.exports = { olaGet, extractFirstLatLng };

