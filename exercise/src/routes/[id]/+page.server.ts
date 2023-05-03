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
