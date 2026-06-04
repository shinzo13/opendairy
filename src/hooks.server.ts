import { verifyToken } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	if (token) {
		const payload = verifyToken(token);
		if (payload) event.locals.userId = payload.userId;
	}
	return resolve(event);
};
