<script lang="ts">
	import { enhance } from '$app/forms';
	import type { DecodedIdToken } from 'firebase-admin/auth';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const auth = getContext<Readable<DecodedIdToken | null>>('auth');
</script>

<svelte:head>
	<title>{data.exercise.name} - ExerciseDB</title>
	<meta name="description" content="A database of exercise data." />
</svelte:head>

<h1>{data.exercise.name}</h1>

{#if !!$auth}
	<form method="POST" action="?/delete" use:enhance>
		<button class="btn btn-danger" type="submit">Delete</button>
	</form>
{/if}

<div class="row g-3 mb-3">
	<div class="col-md-6">
		<img src={data.exercise.gifUrl} class="image-fluid" loading="lazy" alt="..." />
	</div>

	<div class="col-md-6">
		<table class="table">
			<tbody>
				<tr>
					<th>Body Part</th>
					<td>{data.exercise.bodyPart}</td>
				</tr>
				<tr>
					<th>Target muscles</th>
					<td>{data.exercise.target}</td>
				</tr>
				<tr>
					<th>Equipment</th>
					<td>{data.exercise.equipment}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
