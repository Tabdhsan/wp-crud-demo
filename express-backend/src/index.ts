import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import customRouter from './router';
import { initializeDb } from './db';

const app = express();
initializeDb();

// Express API calls
app.use(
	cors({
		credentials: true,
		origin: [
			'http://localhost:3000',
			'http://localhost:3001',
			'http://localhost:4173',
		],
	})
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8080, () => console.log('Server is listening on port 8080'));

// Anything that matches base "/" goes through customRouter
// This will be useful as other routes are added that require new routers
app.use('/', customRouter());
