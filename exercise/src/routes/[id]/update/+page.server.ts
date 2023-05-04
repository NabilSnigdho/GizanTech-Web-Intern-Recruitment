import * as db from '$lib/server/database.js';
import { fail, redirect } from '@sveltejs/kit';
import { object, string } from 'yup';
import type { Exercise } from '$lib/data/schema';
import { error } from '@sveltejs/kit';
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

const formSchema = object({
	name: string().required(),
	bodyPart: string().required(),
	target: string().required(),
	equipment: string().required(),
	gifUrl: string().required()
});

export const actions = {
	default: async ({ params, request }) => {
		try {
			const data = await request.formData();
			await db.updateExercise(
				params.id,
				formSchema.validateSync({
					name: data.get('name'),
					bodyPart: data.get('bodyPart'),
					target: data.get('target'),
					equipment: data.get('equipment'),
					gifUrl: data.get('gifUrl')
				})
			);
		} catch (err) {
			console.log(err)
			return fail(422, {
				error: 'An error occurred!'
			});
		}
		throw redirect(303, '/');
	}
};
