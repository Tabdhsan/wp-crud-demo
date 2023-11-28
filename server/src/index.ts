import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import http from 'http';
import { User } from 'types';
import mysql from 'mysql2';

const app = express();

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

// TODOTAB: move this to db?
let users: User[] = [
	{
		id: '1',
		username: 'Johnny Lad',
		firstName: 'John',
		lastName: 'Doe',
		password: '123',
		description: 'This is some description text',
	},
	{
		id: '2',
		username: 'John be a legend',
		firstName: 'John',
		lastName: 'Leggers',
		password: '12345',
		description: 'john legend be legendy',
	},
];

app.get('/', (req: Request, res: Response) => {
	res.json({
		statusCode: 200,
		message: 'Success',
		data: 'Hello World',
	});
});

app.get('/users', (req: Request, res: Response) => {
	res.json({
		statusCode: 200,
		message: 'Success',
		data: users,
	});
});

app.get('/users/:id', (req: Request, res: Response) => {
	const user = users.find(user => user.id === req.params.id);
	if (user) {
		res.json({
			statusCode: 200,
			message: 'Success',
			data: user,
		});
	} else {
		res.json({
			statusCode: 404,
			message: 'User not found',
			data: null,
		});
	}
});

app.delete('/users/:id', (req: Request, res: Response) => {
	const user = users.find(user => user.id === req.params.id);
	if (user) {
		users = users.filter(user => user.id !== req.params.id);
		res.json({
			statusCode: 200,
			message: 'Success',
			data: user,
		});
	} else {
		res.json({
			statusCode: 404,
			message: 'User not found',
			data: null,
		});
	}
});

app.patch('/users/:id', (req: Request, res: Response) => {
	console.log('PATCH ABOUT TO RUN', req.body);
	const user = users.find(user => user.id === req.params.id);
	if (user) {
		const updatedUser = {
			...user,
			...req.body,
		};
		users = users.map(user => {
			if (user.id === req.params.id) {
				return updatedUser;
			}
			return user;
		});
		res.json({
			statusCode: 200,
			message: 'Success',
			data: user,
		});
	} else {
		res.json({
			statusCode: 404,
			message: 'User not found',
			data: null,
		});
	}
});
