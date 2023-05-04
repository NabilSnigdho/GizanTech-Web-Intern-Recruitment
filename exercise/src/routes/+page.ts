import type { Exercise } from '$lib/data/schema';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, depends }) => {
	const exerciseList = (await (await fetch(`/api`)).json()) as Exercise[];
	const bodyPartList = (await (await fetch('/api/bodyPartList')).json()) as string[];
	const targetList = (await (await fetch('/api/targetList')).json()) as string[];
	const equipmentList = (await (await fetch('/api/equipmentList')).json()) as string[];

	depends('app:exercises');

	return { exerciseList, bodyPartList, targetList, equipmentList };
}) satisfies PageLoad;
