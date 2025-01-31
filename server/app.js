const express = require('express');
const cors = require('cors');
// Multer used for form handling but idk if i wanna keep it cuz html forms use urlencoding
const multer = require('multer');
const mongodb = require('./mongodb');
const User = require('./models/user');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const upload = multer();

// Set default view engine and file extension to render
app.set('view engine', 'ejs');

// Home page
app.get('/', (req, res) => {
	res.send('HomeConnect Backend is running!');
});

// Very pretty register form
// TODO: Link this with front end form lol
app.get('/register', (req, res) => {
	res.render('./register');
});

// Register user
app.post('/register-user', upload.none(), async (req, res) => {
	console.log(req.body);

	try {
		const user = await User.create({
			username: req.body.username,
			password: req.body.password,
		})
		
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).send("Internal Server Error.")
	}
});



// app.get('/v', async (req, res) => {
// 	const collections = await mongodb.db.listCollections().toArray()
// 	console.log('Collections:', collections);

// 	console.log('sending stuff now');
// 	res.json(collections);
// });





// Export the app
module.exports = app;
