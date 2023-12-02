// TODOTAB GET THIS FROM CONSTNAT
const API_URL = 'http://localhost:8080/';

import axios, { AxiosError, AxiosResponse } from 'axios';

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
