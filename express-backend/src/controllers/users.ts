// API Logic for /users endpoint
// TODO: Implement input validation to avoid SQL injections
import { Request, Response } from 'express';
import {
	deleteUserByIdViaDB,
	getUserByIdViaDB,
	getUserByUsernameViaDB,
	getUsersViaDB,
	updateUserByIdViaDB,
} from '../db/users';
import { UserReqType } from 'db/types';
import { MAIN_COOKIE, ID_COOKIE } from '../constants';

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await getUsersViaDB();
		return res.status(200).send(users).end();
	} catch (err) {
		return res.sendStatus(400);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await deleteUserByIdViaDB(parseInt(id));

		res.clearCookie(MAIN_COOKIE);
		res.clearCookie(ID_COOKIE);

		return res
			.status(200)
			.send({
				message: `User with id ${id} deleted`,
			})
			.end();
	} catch (err) {
		return res.sendStatus(400);
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await getUserByIdViaDB(parseInt(id));
		return res.status(200).send(user).end();
	} catch (err) {
		return res.sendStatus(400);
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		// Make sure body is not empty
		if (Object.keys(req.body).length === 0) {
			return res.status(400).send('Missing required fields').end();
		}

		const { username } = req.body;

		// Make sure username does not already exist
		let user = await getUserByUsernameViaDB(username);
		if (user && user.id !== parseInt(id)) {
			return res.status(409).send('Username already exists').end();
		}

		// Remove undefined values from body
		let customBody: Partial<UserReqType> = {};
		Object.keys(req.body).forEach(key => {
			if (req.body[key] !== undefined) {
				customBody[key as keyof UserReqType] = req.body[key];
			}
		});

		// Update user in DB
		await updateUserByIdViaDB(parseInt(id), customBody);

		// Set up updated user for return
		const updateUser = {
			...user,
			...customBody,
		};

		return res.status(200).send(updateUser).end();
	} catch (err) {
		console.log('test', err);
		return res.sendStatus(400);
	}
};
