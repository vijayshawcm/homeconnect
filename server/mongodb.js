const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.error('Error connecting to MongoDB:', err);
	});

// Export MongoDB connection
module.exports = mongoose.connection;