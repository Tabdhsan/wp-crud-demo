// TODOTAB: Check if this file is used

import { userService } from '../_apis/httpServices';

const setSession = (accessToken: string | null) => {
	if (accessToken) {
		localStorage.setItem('accessToken', accessToken);

		userService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
	} else {
		localStorage.removeItem('accessToken');

		delete userService.defaults.headers.common.Authorization;
	}
};

export { setSession };
