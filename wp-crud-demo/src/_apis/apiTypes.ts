import { AxiosResponse } from 'axios';

export type User = {
	id: number;
	username: string;
	firstname: string;
	lastname: string;
	password: string;
	description?: string;
	profilePicName?: string;
	sessionToken?: string;
};

export type UserSignUpReq = Omit<
	User,
	'id' | 'description' | 'profilePicName' | 'sessionToken'
>;

export type UserSignUpRes = Omit<User, 'password' | 'sessionToken'>;

export type UserSignInReq = Pick<User, 'username' | 'password'>;

export type CustomAxiosResponse = Pick<
	AxiosResponse,
	'data' | 'status' | 'statusText'
>;
