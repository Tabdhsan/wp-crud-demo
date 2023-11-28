import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import http from 'http';
import { User } from 'types';
import mysql, { RowDataPacket } from 'mysql2';

// DB connection
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'wp_db_demo',
});

db.connect(err => {
	if (err) {
		console.error('Could not connect to database, exiting server');
		console.error(err);
		process.exit(1); // Exit the application if there is a database connection error
	}

	console.log('Connected to database');
	// You can now start using the database connection for queries or other operations
});

const app = express();

// Express API calls
app.use(
	cors({
		credentials: true,
	})
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8080, () => console.log('Server is listening on port 8080'));

// app.use('/', customRouter());

// TODOTAB: Move these to a utils file and fix types
const errorObject500: {
	statusCode: number;
	message: string;
	data: null;
} = {
	statusCode: 500,
	message: 'Database error',
	data: null,
};

// Hello World test!
app.get('/', (req: Request, res: Response) => {
	res.json({
		statusCode: 200,
		message: 'Success',
		data: 'Aloha Universe',
	});
});

// TODOTAB: Whiteny discuss creating and passwords
// TODOTAB: Whitney discuss making sure username isn't already on file

// Get All Users
app.get('/users', (req: Request, res: Response) => {
	db.query('SELECT * FROM users', (err, results) => {
		if (err) {
			console.error(err);
			return res.json(errorObject500);
		}

		res.json({
			statusCode: 200,
			message: 'Success',
			data: results,
		});
	});
});

// Get User By Id
app.get('/users/:id', (req: Request, res: Response) => {
	db.query(
		'SELECT * FROM users WHERE id = ?',
		[req.params.id],
		(err, results: Array<RowDataPacket>) => {
			let userObj = results[0];
			if (err) {
				console.error(err);
				return res.json(errorObject500);
			}

			res.json({
				statusCode: 200,
				message: 'Success',
				data: userObj,
			});
		}
	);
});

// Delete User by Id
app.delete('/users/:id', (req: Request, res: Response) => {
	db.query(
		'DELETE FROM users WHERE id = ?',
		[req.params.id],
		(err, results) => {
			if (err) {
				console.error(err);
				return res.json(errorObject500);
			}

			res.json({
				statusCode: 200,
				message: 'User Deleted',
			});
		}
	);
});

// Update user by id
// if User does not exist return a 404
// If user exists, update the user and return the updated user
// If new user name is already taken, return a 409
// TODOTAB: Need logic for duplicate user name Whitney
app.patch('/users/:id', (req: Request, res: Response) => {
	db.query(
		'UPDATE users SET ? WHERE id = ?',
		[req.body, req.params.id],
		// TODOTAB: results not being used?
		(err, results) => {
			if (err) {
				console.error(err);
				return res.json(errorObject500);
			}

			res.json({
				statusCode: 200,
				message: 'Success',
				data: req.body,
			});
		}
	);
});
