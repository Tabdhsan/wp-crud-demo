export type User = {
	id: number;
	username: string;
	firstname: string;
	lastname: string;
	password: string;
	salt: string;
	description?: string;
	profilePicName?: string;
	sessionToken?: string;
};
