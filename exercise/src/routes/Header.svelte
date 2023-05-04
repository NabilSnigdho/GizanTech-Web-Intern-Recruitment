<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { initFirebase } from '$lib/firebase/firebase.client';
	import type { DecodedIdToken } from 'firebase-admin/auth';
	import { signOut } from 'firebase/auth';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	const auth = getContext<Readable<DecodedIdToken | null>>('auth');
	const logout = async () => {
		const { auth } = initFirebase();
		await signOut(auth);
		await fetch('/logout', { method: 'POST' });
		await invalidateAll();
	};
</script>

<nav class="navbar navbar-expand-md bg-body-tertiary">
	<div class="container">
		<a class="navbar-brand" href="/">ExerciseDB</a>

		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNav"
			aria-controls="navbarNav"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav flex-fill">
				<li class="nav-item">
					<a class="nav-link" href="/api-endpoints">API endpoints</a>
				</li>
				{#if !$auth}
					<li class="nav-item">
						<a class="nav-link" href="/login">Login</a>
					</li>
				{:else}
					<li class="nav-item dropdown">
						<button
							class="nav-link dropdown-toggle"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							User
						</button>
						<ul class="dropdown-menu">
							<li><span class="dropdown-item-text">{$auth.email}</span></li>
							<li><hr class="dropdown-divider" /></li>
							<li><button type="button" class="dropdown-item" on:click={logout}>Logout</button></li>
						</ul>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>
