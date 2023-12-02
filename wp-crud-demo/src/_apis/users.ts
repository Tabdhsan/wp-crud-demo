import { User } from './apiTypes';
import { AxiosResponse } from 'axios';
import { userService } from './httpServices';

// TODOTAB: Move this to the ENV
// const API_URL = 'http://localhost:8080';

export const getAllUsersApi = async (): Promise<AxiosResponse<User[]>> => {
	console.log('about to get all users');
	return userService.get('/');
};

export const getUserByIdApi = async (
	id: string
): Promise<AxiosResponse<User>> => {
	console.log('about to get user', id);
	return userService.get(id);
};

export const deleteUserByIdApi = async (id: string): Promise<AxiosResponse> => {
	console.log('About to delete', id);
	return userService.delete(id);
};

export const updateUserByIdApi = async (
	id: string,
	user: Partial<User>
): Promise<AxiosResponse> => {
	console.log('About to update', id);
	return userService.patch(id, user);
};
