import type { Exercise } from '$lib/data/schema';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, depends }) => {
	const [exerciseList, bodyPartList, targetList, equipmentList] = (await Promise.all(
		[
			fetch(`/api`),
			fetch('/api/bodyPartList'),
			fetch('/api/targetList'),
			fetch('/api/equipmentList')
		].map((item) => item.then((res) => res.json()))
	)) as [Exercise[], string[], string[], string[]];

	depends('app:exercises');

	return { exerciseList, bodyPartList, targetList, equipmentList };
}) satisfies PageLoad;
