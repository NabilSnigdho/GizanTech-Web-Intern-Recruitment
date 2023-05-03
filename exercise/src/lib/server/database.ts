import exercise from '$lib/data/exercise.json';

export function exerciseList() {
	return exercise;
}

export function exerciseById(value: string) {
	return exercise.find(({ id }) => id === value);
}

export function bodyPartList() {
	return Array.from(new Set(exercise.map(({ bodyPart }) => bodyPart)));
}

export function targetList() {
	return Array.from(new Set(exercise.map(({ target }) => target)));
}

export function equipmentList() {
	return Array.from(new Set(exercise.map(({ equipment }) => equipment)));
}

export function exerciseListByBodyPart(value: string) {
	return exercise.filter(({ bodyPart }) => bodyPart === value);
}

export function exerciseListByTarget(value: string) {
	return exercise.filter(({ target }) => target === value);
}

export function exerciseListByEquipment(value: string) {
	return exercise.filter(({ equipment }) => equipment === value);
}

export function exerciseListByName(value: string) {
	return exercise.filter(({ name }) => name === value);
}
