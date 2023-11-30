import mysql from 'mysql2';

// DB connection
export const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	// TODOTAB: Should this be from an environment variable?
	password: 'password',
	database: 'wp_db_demo',
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
