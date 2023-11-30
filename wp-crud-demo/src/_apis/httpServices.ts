// const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // TODOTAB: move this to the ENV

const API_URL = 'http://localhost:8080/';

import axios, { AxiosError, AxiosResponse } from 'axios';

const onFulfilled = (response: AxiosResponse) => {
	console.log('response', response);
	return response?.data;
};

const onRejected = (error: AxiosError) => {
	throw error?.response?.data;
};

// TODOTAB: LOOK AT WHAT TO DO WITH THIS
// function onRejected(error: AxiosError) {
// 	if (
// 		error?.response?.status === 401 &&
// 		error?.config?.url !== 'auth/login'
// 	) {
// 		setSession(null);
// 		setRefreshToken(null);

// 		clearAuthDataFromStorage();

// 		window.location.reload();
// 	}

// 	throw error?.response?.data;
// }

const authService = axios.create({
	baseURL: API_URL + 'auth/',
	withCredentials: true,
});

const userService = axios.create({
	baseURL: API_URL + 'users/',
	withCredentials: true,
});

// TODOTAB: Does this code even work?
authService.interceptors.response.use(onFulfilled, onRejected);
userService.interceptors.response.use(onFulfilled, onRejected);

export { authService, userService };
