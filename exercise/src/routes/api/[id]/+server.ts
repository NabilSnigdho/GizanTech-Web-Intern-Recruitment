import { json } from '@sveltejs/kit';
import * as database from '$lib/server/database.js';

export async function GET({ params }) {
	const exercise = await database.exerciseById(params.id);
	return exercise ? json(exercise) : json({ error: 'not found' }, { status: 404 });
}
