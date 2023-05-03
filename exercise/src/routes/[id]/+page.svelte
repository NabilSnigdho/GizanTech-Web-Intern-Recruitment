<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{data.exercise.name} - ExerciseDB</title>
	<meta name="description" content="A database of exercise data." />
</svelte:head>

<h1>{data.exercise.name}</h1>

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
