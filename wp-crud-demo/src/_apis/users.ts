import { User } from './apiTypes';
import axios from 'axios';
import { userService } from './httpServices';

// TODOTAB: Move this to the ENV
const API_URL = 'http://localhost:8080';

export const getAllUsersApi = async (): Promise<User[]> => {
	console.log('about to get all users');
	return userService.get('/');
};

export const getUserByIdApi = async (id: string): Promise<User[]> => {
	console.log('about to get user', id);
	return userService.get(id);
};

export const deleteUserByIdApi = async (
	id: string
): Promise<{
	statusCode: number;
	message: string;
	data: {
		data: User;
	};
}> => {
	console.log('About to delete', id);
	return axios.delete(API_URL + '/users/' + id);
};

export const updateUserByIdApi = async (
	id: string,
	user: Partial<User>
): Promise<{
	statusCode: number;
	message: string;
	data: {
		data: User;
	};
}> => {
	console.log('About to update', id);
	return userService.patch(id, user);
};
