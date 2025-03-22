const geoAutocomplete = async (req, res) => {
	const { input } = req.query;
	if (!input) {
		return res.status(400).json({ error: 'Missing input parameter' });
	}
	try {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
				input
			)}&key=${process.env.GOOGLE_API_KEY}`
		);
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.error('Autocomplete Error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const generateGeocode = async (req, res) => {
	const { lat, lng } = req.query;
	if (!lat || !lng) {
		return res
			.status(400)
			.json({ error: 'Missing latitude or longitude parameter' });
	}
	try {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`
		);
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.error('Geocoding Error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = {
    geoAutocomplete,
    generateGeocode
}