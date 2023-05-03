<script>
	import { initFirebase } from '$lib/firebase/firebase.client';
	import { onMount } from 'svelte';
	import Header from './Header.svelte';

	onMount(initFirebase);
</script>

<div class="app">
	<Header />

	<main class="container py-4">
		<slot />
	</main>
</div>
