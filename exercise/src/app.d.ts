// See https://kit.svelte.dev/docs/types#app

import type { DecodedIdToken } from 'firebase-admin/auth';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: null | DecodedIdToken;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
