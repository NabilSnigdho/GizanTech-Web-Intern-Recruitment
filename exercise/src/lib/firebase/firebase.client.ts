import memoize from 'lodash.memoize';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA_NjovpBL--rgYGoLIdDZKf_zJfAzqSSE',
	authDomain: 'exercisedb-bc7e0.firebaseapp.com',
	projectId: 'exercisedb-bc7e0',
	storageBucket: 'exercisedb-bc7e0.appspot.com',
	messagingSenderId: '632437879316',
	appId: '1:632437879316:web:d599f8112ef2c078d7ad01'
};

// Initialize Firebase
export const initFirebase = memoize(() => {
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	return { app, db };
});
