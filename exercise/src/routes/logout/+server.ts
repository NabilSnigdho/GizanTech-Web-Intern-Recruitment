import type { RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ cookies }) => {
	return new Response('', {
		headers: {
			'set-cookie': cookies.serialize('auth_token', '', {
				path: '/',
				httpOnly: true,
				maxAge: -1
			})
		}
	});
}) satisfies RequestHandler;
