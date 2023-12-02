import express, { Request, Response, NextFunction } from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionTokenViaDB } from '../db/users';
require('dotenv').config();

export const isAuthenticated = async (
	req: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		const sessionToken = req.cookies[process.env.MAIN_COOKIE];
		if (!sessionToken) {
			return response.status(403).send('Unauthenticated').end();
		}

		const existingUser = await getUserBySessionTokenViaDB(sessionToken);

		if (!existingUser) {
			return response.status(404).send('User Not Found').end();
		}

		merge(req, { user: existingUser });

		return next();
	} catch (err) {
		console.error(err);
		return response.sendStatus(400);
	}
};

export const isAuthorized = async (
	req: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		const currentUserId = get(req, 'user.id');
		const { id } = req.params;

		if (currentUserId !== parseInt(id)) {
			return response.status(403).send('Unauthorized').end();
		}

		return next();
	} catch (err) {
		console.error(err);
		return response.sendStatus(400);
	}
};
