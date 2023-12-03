import { AxiosResponse } from 'axios';
import { User, UserSignInReq, UserSignUpReq, UserSignUpRes } from './apiTypes';
import { authService } from './httpServices';

export const signupApi = async (
	user: UserSignUpReq
): Promise<AxiosResponse<UserSignUpRes>> => {
	return authService.post('signup', user);
};

export const signinApi = async (
	user: Partial<UserSignInReq>
): Promise<AxiosResponse<User>> => {
	return authService.post('signin', user);
};

export const signoutApi = async (): Promise<void> => {
	return authService.post('signout', {});
};
