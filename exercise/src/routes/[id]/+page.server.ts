import type { Exercise } from '$lib/data/schema';
import * as db from '$lib/server/database.js';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const res = await fetch(`/api/${params.id}`);
	if (res.status === 404)
		throw error(404, {
			message: 'Not found'
		});
	const exercise = (await res.json()) as Exercise;

	return { exercise };
}) satisfies PageServerLoad;

export const actions = {
	delete: async ({ params }) => {
		try {
			db.deleteExercise(params.id);
		} catch {
			return fail(422, {
				error: 'An error occurred!'
			});
		}
		throw redirect(303, '/');
	}
};
