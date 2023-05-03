import * as db from '$lib/server/database.js';
import { fail, redirect } from '@sveltejs/kit';
import { object, string } from 'yup';

const formSchema = object({
	name: string().required(),
	bodyPart: string().required(),
	target: string().required(),
	equipment: string().required(),
	gifUrl: string().required()
});

export const actions = {
	default: async ({ request }) => {
		try {
			const data = await request.formData();
			db.createExercise(
				formSchema.validateSync({
					name: data.get('name'),
					bodyPart: data.get('bodyPart'),
					target: data.get('target'),
					equipment: data.get('equipment'),
					gifUrl: data.get('gifUrl')
				})
			);
		} catch {
			return fail(422, {
				error: 'An error occurred!'
			});
		}
		throw redirect(303, '/');
	}
};
