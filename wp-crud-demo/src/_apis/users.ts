import { User } from './apiTypes';
import { AxiosResponse } from 'axios';
import { userService } from './httpServices';

export const getAllUsersApi = async (): Promise<AxiosResponse<User[]>> => {
	return userService.get('/');
};

export const getUserByIdApi = async (
	id: string
): Promise<AxiosResponse<User>> => {
	return userService.get(id);
};

export const deleteUserByIdApi = async (id: string): Promise<AxiosResponse> => {
	return userService.delete(id);
};

export const updateUserByIdApi = async (
	id: string,
	user: Partial<User>
): Promise<AxiosResponse> => {
	return userService.patch(id, user);
};
