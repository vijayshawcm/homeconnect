const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const {
	authRoutes,
	userRoutes,
	applianceRoutes,
	homeRoutes,
	roomRoutes,
} = require('./routes');

// Load environment variables
dotenv.config();

// Initialize Express apps
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/server/auth', authRoutes);
app.use('/server/users', userRoutes);
app.use('/server/appliances', applianceRoutes);
app.use('/server/rooms', roomRoutes);
app.use('/server/homes', homeRoutes);

app.get('/server/google/autocomplete', async (req, res) => {
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
});

app.get('/server/google/geocode', async (req, res) => {
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
});

// Export the app
module.exports = app;
