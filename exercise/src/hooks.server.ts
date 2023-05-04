import type { Handle } from '@sveltejs/kit';
import { decodeToken } from '$lib/firebase/firebase.server';

export const handle = (async ({ event, resolve }) => {
	const token = event.cookies.get('auth_token');
	if (token) {
		const decodedToken = await decodeToken(token);
		if (decodedToken) {
			event.locals.user = decodedToken;
		} else {
			event.cookies.delete('auth_token', {
				path: '/',
				httpOnly: true,
				maxAge: -1
			});
		}
	}

	return resolve(event);
}) satisfies Handle;
