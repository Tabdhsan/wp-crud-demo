import { User } from 'types';

export type UserReqType = Omit<User, 'id'>;
export type UserRes = Omit<User, 'password' | 'salt' | 'sessionToken'>;
