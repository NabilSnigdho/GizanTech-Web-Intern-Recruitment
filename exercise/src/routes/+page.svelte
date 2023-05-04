<script lang="ts">
	import type { Exercise } from '$lib/data/schema';
	import type { PageData } from './$types';

	export let data: PageData;

	const filterOptions = [
		{ name: 'bodyPart', label: 'Body Part' },
		{ name: 'target', label: 'Target muscles' },
		{ name: 'equipment', label: 'Equipment' },
		{ name: 'name', label: 'Name' }
	] as const;

	let filterBy: 'none' | (typeof filterOptions)[number]['name'] = 'none';
	let filterValue = 'any';
	let filterValues: string[] = [];
	$: if (filterBy !== 'none' && filterBy !== 'name') {
		filterValues = data[`${filterBy}List`];
	}

	let exercises: Exercise[] = [];
	$: if (filterBy === 'none' || filterValue === 'any' || filterValue === '') {
		exercises = data.exerciseList;
	} else {
		fetch(`/api/${filterBy}/${filterValue}`).then(async (res) => {
			exercises = await res.json();
		});
	}
</script>

<svelte:head>
	<title>ExerciseDB</title>
	<meta name="description" content="A database of exercise data." />
</svelte:head>

<h1>Exercises</h1>

<div class="row g-3 mb-3">
	<div class="col-md-6">
		<label for="filter-by" class="form-label">Filter by</label>
		<select
			class="form-select"
			bind:value={filterBy}
			id="filter-by"
			on:change={() => (filterValue = filterBy === 'name' ? '' : 'any')}
		>
			<option value="none" selected>None</option>
			{#each filterOptions as item}
				<option value={item.name}>{item.label}</option>
			{/each}
		</select>
	</div>
	{#if filterBy !== 'none'}
		<div class="col-md-6">
			<label for="filter-value" class="form-label"
				>{filterOptions.find(({ name }) => name === filterBy)?.label}</label
			>
			{#if filterBy === 'name'}
				<input class="form-control" bind:value={filterValue} id="filter-value" />
			{:else}
				<select class="form-select" bind:value={filterValue} id="filter-value">
					<option value="any" selected>Any</option>
					{#each filterValues as item}
						<option value={item}>{item}</option>
					{/each}
				</select>
			{/if}
		</div>
	{/if}
</div>

<div class="d-grid gap-2" style="grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));">
	{#each exercises as exercise}
		<div class="card">
			<img src={exercise.gifUrl} class="card-img-top" loading="lazy" alt="..." />
			<div class="card-body">
				<div class="h5 card-title">{exercise.name}</div>
				<p class="card-text">
					<a href={`/${exercise.id}`} class="card-link">View</a>
					<a href={`/${exercise.id}/update`} class="card-link">Update</a>
				</p>
			</div>
			<ul class="list-group list-group-flush">
				<li class="list-group-item">Body Part: {exercise.bodyPart}</li>
				<li class="list-group-item">Target muscles: {exercise.target}</li>
				<li class="list-group-item">Equipment: {exercise.equipment}</li>
			</ul>
		</div>
	{/each}
</div>
