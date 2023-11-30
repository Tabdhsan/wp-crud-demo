// API Logic for /auth endpoint

import { Request, Response } from 'express';
import {
	getUserByUsernameViaDB,
	createUserViaDB,
	updateUserSessionTokenById,
} from '../db/users';
import { hashThePass as getHashedValue, random } from '../helpers';
import { UserRes } from 'db/types';

export const signup = async (req: Request, res: Response) => {
	try {
		const { username, password, firstname, lastname } = req.body;

		if (!username || !password || !firstname || !lastname) {
			console.error('Missing required fields');
			return res.status(400).send('Missing required fields').end();
		}

		const existingUser = await getUserByUsernameViaDB(username);

		if (existingUser) {
			return res.status(409).send('User already exists').end();
		}

		const salt = random();
		const hashedPass = getHashedValue(password, salt);
		const createdUser = await createUserViaDB({
			username,
			password: hashedPass,
			firstname,
			lastname,
			salt,
		});

		// Create session token for response
		const sessionSalt = random();
		const sessionToken = getHashedValue(sessionSalt, salt);
		updateUserSessionTokenById(createdUser.id, sessionToken);
		// TODOTAB: If things break add cookie options {
		// 	domain: 'localhost',
		// 	path: '/',
		// } here
		res.cookie('wp-crud-demo-cookie', sessionToken);

		return res.status(201).send(createdUser).end();
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
};

export const signin = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			console.error('Missing required fields');
			return res.status(400).send('Missing required fields').end();
		}

		const user = await getUserByUsernameViaDB(username);

		if (!user) {
			return res.status(404).send('User not found').end();
		}

		const hashedPass = getHashedValue(password, user.salt);

		if (hashedPass !== user.password) {
			return res
				.status(401)
				.send('Please check your username or password')
				.end();
		}

		// Create session token for response
		const sessionSalt = random();
		const sessionToken = getHashedValue(sessionSalt, user.salt);
		updateUserSessionTokenById(user.id, sessionToken);
		// TODOTAB: If things break add cookie options {
		// 	domain: 'localhost',
		// 	path: '/',
		// } here
		res.cookie('wp-crud-demo-cookie', sessionToken, {
			domain: 'localhost',
			path: '/',
		});

		let userRes: UserRes = {
			id: user.id,
			username: user.username,
			firstname: user.firstname,
			lastname: user.lastname,
			description: user.description,
			profilePicName: user.profilePicName,
		};

		return res.status(200).send(userRes).end();
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
};
