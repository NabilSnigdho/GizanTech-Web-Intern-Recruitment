import type { Handle } from '@sveltejs/kit';
import { decodeToken } from '$lib/firebase/firebase.server';

export const handle = (async ({ event, resolve }) => {
	const token = event.cookies.get('auth_token');
	if (token) {
		const decodedToken = await decodeToken(token);
		if (decodedToken) {
			event.locals.user = decodedToken;
		}
	}

	return resolve(event);
}) satisfies Handle;
