const express = require('express');
const cors = require('cors');
// Multer used for form handling but idk if i wanna keep it cuz html forms use urlencoding
const multer = require('multer');
// Bcrypt for password hashing
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mongodb = require('./mongodb');
const User = require('./models/user');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const upload = multer();

// Set default view engine and file extension to render
app.set('view engine', 'ejs');

// JSON Web Token functions
const jwtSecret = process.env.JWT_SECRET;

async function generateJWT(res, user) {
	let data = {
        time: Date(),
        userId: user._id,
		username: user.username,
    }

	// Create JWT
	const token = jwt.sign(data, jwtSecret); 
	console.log('New json token was created.');

	// Save JWT in browser cookies
	// TODO: add cookie kill time probably
	res.clearCookie('JWT');
	res.cookie('JWT', token);
}

// Test route to check cookies (to be deleted)
app.get('/test', (req, res) => {
	return res.send(req.cookies);
});

// Home page
app.get('/', (req, res) => {
	return res.render('./home');
});

// Secret page
app.get('/secret', (req, res) => {

	const token = req.cookies['JWT'];
	console.log(token)

	if(!token) {
		return res.status(401).send('Unauthorised access, please create or sign in to an existing account.');
	}

	const verifyToken = jwt.verify(token, jwtSecret);

	if(verifyToken) {
		return res.send('Authenticated to system');
	}

	return res.status(401).send('Unauthorised access, please create or sign in to an existing account.');
})

// Very pretty register form
// TODO: Link this with front end form lol
app.get('/register', (req, res) => {
	return res.render('./register');
});

// Register user
app.post('/register-user', upload.none(), async (req, res) => {
	const passwordHash = await bcrypt.hash(req.body.password, 10)

	try {
		const user = await User.create({
			username: req.body.username,
			passwordHash: passwordHash,
		})
		
		generateJWT(res, user); // Generate JWT for user and save in cookie
		return res.status(200).redirect('/secret');
	} catch (err) {
		return res.status(500).send("Internal Server Error.");
	}
});

// Very pretty login form
// TODO: Link this with front end form lol
app.get('/login', (req, res) => {
	return res.render('./login', {message : null});
});

// Handle user login
// Note that this passes a message to the ejs part so we might want to handle it differently in the front end
app.post('/login', async (req, res) => {
	// Check if user exists
	const validUser = await User.findOne({username: req.body.username});
	if(!validUser) {
		return res.render('./login', { message: 'Invalid username or password!' });
	}

	// Check if password hash matches
	const validPassword = await bcrypt.compare(req.body.password, validUser.passwordHash) 
	if(!validPassword) {
		return res.render('./login', { message: 'Invalid username or password!' });
	}

	generateJWT(res, validUser); // Generate JWT for user and save in cookie
	return res.redirect('/secret');
});

// Handle user logout
app.get('/logout', (req, res) => {
	res.clearCookie('JWT');
	res.send("Logout successful");
})

// Export the app
module.exports = app;
