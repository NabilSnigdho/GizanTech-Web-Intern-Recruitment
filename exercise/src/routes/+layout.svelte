<script lang="ts" context="module">
	export type User = {
		uid: string;
		email: string | null;
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { initFirebase } from '$lib/firebase/firebase.client';
	import type { DecodedIdToken } from 'firebase-admin/auth';
	import { onMount, setContext } from 'svelte';
	import { derived } from 'svelte/store';
	import Header from './Header.svelte';

	const authStore = derived<typeof page, DecodedIdToken | null>(
		page,
		($page, set) => {
			const { user } = $page.data;
			if (!user) {
				set(null);
				return;
			}
			set(user);
		},
		null
	);
	setContext('auth', authStore);

	onMount(initFirebase);
</script>

<div class="app">
	<Header />

	<main class="container py-4">
		<slot />
	</main>
</div>
