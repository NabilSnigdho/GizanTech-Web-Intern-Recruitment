<script>
	import Header from './Header.svelte';
</script>

<div class="app">
	<Header />

	<main class="container py-4">
		<slot />
	</main>
</div>
