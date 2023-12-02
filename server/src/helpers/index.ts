import crypto from 'crypto';
require('dotenv').config();

export const random = () => crypto.randomBytes(128).toString('base64');

export const hashThePass = (salt: string, password: string) => {
	return crypto
		.createHmac('sha256', [salt, password].join('/'))
		.update(process.env.HASH_SECRET)
		.digest('hex');
};
