import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '../contants';

const onFulfilled = (response: AxiosResponse) => {
	return response;
};

const onRejected = (error: AxiosError) => {
	throw error?.response?.data;
};

const authService = axios.create({
	baseURL: API_URL + 'auth/',
	withCredentials: true,
});

const userService = axios.create({
	baseURL: API_URL + 'users/',
	withCredentials: true,
});

authService.interceptors.response.use(onFulfilled, onRejected);
userService.interceptors.response.use(onFulfilled, onRejected);

export { authService, userService };
