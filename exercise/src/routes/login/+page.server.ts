import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const token = formData.get('token')?.valueOf();
		if (!token || typeof token !== 'string') {
			return fail(400, { message: 'Token is a required field and must be a string' });
		}
		cookies.set('auth_token', token, {
			httpOnly: true,
			path: '/',
			secure: true
		});
		return { success: true };
	}
};
