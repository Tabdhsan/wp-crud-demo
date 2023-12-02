import mysql from 'mysql2';
require('dotenv').config();

// DB connection
export const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

export const initializeDb = () => {
	db.connect(err => {
		if (err) {
			console.error('Could not connect to database, exiting server');
			console.error(err);
			process.exit(1); // Exit the application if there is a database connection error
		}

		console.log('Connected to database');
		// You can now start using the database connection for queries or other operations
	});
};
