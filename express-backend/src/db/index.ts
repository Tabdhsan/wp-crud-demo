import { DB_HOST, DB_USER, DB_PASS, DB_NAME } from '../constants';
import mysql from 'mysql2';

// DB connection
export const db = mysql.createConnection({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASS,
	database: DB_NAME,
});

export const initializeDb = () => {
	db.connect(err => {
		if (err) {
			console.error('Could not connect to database, exiting server');
			console.error(err);
			process.exit(1); // Exit the application if there is a database connection error
		}

		console.log('Connected to database');
	});
};
