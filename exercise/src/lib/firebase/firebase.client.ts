import memoize from 'lodash.memoize';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBxXTN4S1q7liikBEW0ZN0XFwbpmJvATj4',
	authDomain: 'temp-12baf.firebaseapp.com',
	projectId: 'temp-12baf',
	storageBucket: 'temp-12baf.appspot.com',
	messagingSenderId: '398211955521',
	appId: '1:398211955521:web:ff6f9b0151137c4044ffc0'
};

// Initialize Firebase
export const initFirebase = memoize(() => {
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	return { app, db };
});
