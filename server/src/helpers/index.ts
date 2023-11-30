import crypto from 'crypto';

// TODOTAB: Get this from environment variable
const SECRET = 'wp-crud-demo';

export const random = () => crypto.randomBytes(128).toString('base64');

export const hashThePass = (salt: string, password: string) => {
	return crypto
		.createHmac('sha256', [salt, password].join('/'))
		.update(SECRET)
		.digest('hex');
};
