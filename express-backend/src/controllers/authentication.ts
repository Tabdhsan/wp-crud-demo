// API Logic for /auth endpoint

import { Request, Response } from 'express';
import {
	getUserByUsernameViaDB,
	createUserViaDB,
	updateUserSessionTokenById,
	getUserBySessionTokenViaDB,
} from '../db/users';
import { hashThePass as getHashedValue, random } from '../helpers';
import { UserRes } from 'db/types';
import { MAIN_COOKIE, ID_COOKIE } from '../constants';

export const signup = async (req: Request, res: Response) => {
	try {
		const { username, password, firstname, lastname } = req.body;

		if (!username || !password || !firstname || !lastname) {
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
		await updateUserSessionTokenById(createdUser.id, sessionToken);

		res.cookie(MAIN_COOKIE, sessionToken);
		res.cookie(ID_COOKIE, createdUser.id);

		return res.status(201).send(createdUser).end();
	} catch (err) {
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
		res.cookie(MAIN_COOKIE, sessionToken, {
			domain: 'localhost',
			path: '/',
		});
		res.cookie(ID_COOKIE, user.id);

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

export const signout = async (req: Request, res: Response) => {
	try {
		const sessionToken = req.cookies[MAIN_COOKIE];
		const user = await getUserBySessionTokenViaDB(sessionToken);
		updateUserSessionTokenById(user.id, null);
		res.clearCookie(MAIN_COOKIE);
		res.clearCookie(ID_COOKIE);
		return res.status(200).end();
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
};
