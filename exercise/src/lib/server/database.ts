import type { Exercise } from './../data/schema';
import { initFirebase } from '$lib/firebase/firebase.client';
import {
	QuerySnapshot,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	type DocumentData,
	where
} from 'firebase/firestore';
import { adminFirestore } from '$lib/firebase/firebase.server';

const { db } = initFirebase();

const unwrap = (querySnapshot: QuerySnapshot<DocumentData>) =>
	querySnapshot.docs.map((item) => item.data());
const select = (property: keyof Exercise) =>
	getDocs(collection(db, 'exercises')).then((querySnapshot: QuerySnapshot<DocumentData>) =>
		Array.from(new Set(querySnapshot.docs.map((item) => item.data()[property])))
	);
const filter = (property: keyof Exercise, value: string) =>
	query(collection(db, 'exercises'), where(property, '==', value));

export function exerciseList() {
	return getDocs(collection(db, 'exercises')).then(unwrap);
}

export function exerciseById(id: string) {
	return getDoc(doc(db, 'exercises', id)).then((docSnap) =>
		docSnap.exists() ? docSnap.data() : null
	);
}

export function bodyPartList() {
	return select('bodyPart');
}

export function targetList() {
	return select('target');
}

export function equipmentList() {
	return select('equipment');
}

export function exerciseListByBodyPart(value: string) {
	return getDocs(filter('bodyPart', value)).then(unwrap);
}

export function exerciseListByTarget(value: string) {
	return getDocs(filter('target', value)).then(unwrap);
}

export function exerciseListByEquipment(value: string) {
	return getDocs(filter('equipment', value)).then(unwrap);
}

export function exerciseListByName(value: string) {
	return getDocs(filter('name', value)).then(unwrap);
}

export function createExercise(exercise: Omit<Exercise, 'id'>) {
	const documentRef = adminFirestore.collection('exercises').doc();
	return documentRef.create({ id: documentRef.id, ...exercise });
}

export function updateExercise(id: string, exercise: Omit<Exercise, 'id'>) {
	const documentRef = adminFirestore.collection('exercises').doc(id);
	return documentRef.update(exercise);
}

export function deleteExercise(id: string) {
	const documentRef = adminFirestore.collection('exercises').doc(id);
	return documentRef.delete();
}
