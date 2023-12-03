import { UserReqType as UserReq, UserRes } from './types';
import { db } from './index';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { User } from 'types';

////////////////////////////
/// User  CRUD Code Below //
////////////////////////////

export const getUsersViaDB = async (): Promise<UserRes[]> => {
	let sqlQuery = `SELECT * FROM users`;
	let res = await db.promise().query<RowDataPacket[]>(sqlQuery);
	let allUsers: UserRes[] = res[0].map(user => {
		return {
			id: user.id,
			username: user.username,
			firstname: user.firstname,
			lastname: user.lastname,
			profilePic: user.profilePicName,
			description: user.description,
		};
	});

	return allUsers;
};

export const getUserByUsernameViaDB = async (
	username: string
): Promise<User> => {
	let sqlQuery = `SELECT * FROM users WHERE username = '${username}'`;
	let res = await db.promise().query<RowDataPacket[]>(sqlQuery);

	if (res[0].length === 0) {
		return;
	}

	return res[0][0] as User;
};

export const getUserByIdViaDB = async (id: number) => {
	let sqlQuery = `SELECT * FROM users WHERE id = '${id}'`;
	let res = await db.promise().query<RowDataPacket[]>(sqlQuery);
	let user = res[0][0] as UserRes;
	let userRes: UserRes = {
		id: user.id,
		username: user.username,
		firstname: user.firstname,
		lastname: user.lastname,
		profilePicName: user.profilePicName,
		description: user.description,
	};
	return userRes;
};

export const createUserViaDB = async ({
	username,
	password,
	firstname,
	lastname,
	salt,
}: UserReq): Promise<UserRes> => {
	let sqlQuery = `INSERT INTO users (username, password, firstname, lastname, salt) VALUES ('${username}', '${password}', '${firstname}', '${lastname}', '${salt}')`;
	let res = await db.promise().query<ResultSetHeader>(sqlQuery);

	return {
		id: res[0]?.insertId,
		username,
		firstname,
		lastname,
	};
};

export const deleteUserByIdViaDB = async (id: number): Promise<void> => {
	let sqlQuery = `DELETE FROM users WHERE id = '${id}'`;
	await db.promise().query<ResultSetHeader>(sqlQuery);
	return;
};

export const updateUserByIdViaDB = async (
	id: number,
	user: Partial<UserReq>
) => {
	const validFields = [
		'username',
		'password',
		'firstname',
		'lastname',
		'description',
		'profilePicName',
	];

	let sqlQuery = `UPDATE users SET `;
	let fields = Object.keys(user);
	let values = Object.values(user);
	let fieldValues = fields.map((field, i) => {
		if (validFields.includes(field)) {
			return `${field} = '${values[i]}'`;
		}
	});

	sqlQuery += fieldValues.join(', ');
	sqlQuery += ` WHERE id = '${id}'`;

	await db.promise().query<ResultSetHeader>(sqlQuery);
	let updateUser = await getUserByIdViaDB(id);
	return updateUser;
};

////////////////////////////
/// User Auth Code Below //
//////////////////////////

export const getUserBySessionTokenViaDB = async (
	sessionToken: string
): Promise<User> => {
	let sqlQuery = `SELECT * FROM users WHERE sessionToken = '${sessionToken}'`;
	let res = await db.promise().query<RowDataPacket[]>(sqlQuery);

	if (res[0].length === 0) {
		return;
	}

	return res[0][0] as User;
};

// Add user sessiontoken to db
export const updateUserSessionTokenById = async (
	id: number,
	sessionToken: string
): Promise<void> => {
	let sqlQuery = `UPDATE users SET sessionToken = '${sessionToken}' WHERE id = '${id}'`;
	await db.promise().query<ResultSetHeader>(sqlQuery);
	return;
};
