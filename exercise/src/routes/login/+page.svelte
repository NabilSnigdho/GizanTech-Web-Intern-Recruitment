<script lang="ts">
	import FirebaseUiAuth from './FirebaseUiAuth.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { deserialize } from '$app/forms';
	import type { DecodedIdToken } from 'firebase-admin/auth';

	const auth = getContext<Readable<DecodedIdToken | null>>('auth');

	onMount(() => {
		return auth.subscribe((user) => {
			if (user) {
				goto('/');
			}
		});
	});
</script>

<FirebaseUiAuth
	signInWith={{ emailPassword: true }}
	on:authresult={async (e) => {
		const formData = new FormData();
		formData.set('token', await e.detail.user.getIdToken());

		const response = await fetch('/login', {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
		}
	}}
/>
