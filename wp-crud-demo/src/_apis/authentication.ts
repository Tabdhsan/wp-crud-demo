import { User, UserSignInReq, UserSignUpReq, UserSignUpRes } from './apiTypes';
import { authService } from './httpServices';

export const signupApi = async (
	user: UserSignUpReq
): Promise<UserSignUpRes> => {
	return authService.post('signup', user);
};

export const signinApi = async (
	user: Partial<UserSignInReq>
): Promise<User> => {
	return authService.post('signin', user);
};
