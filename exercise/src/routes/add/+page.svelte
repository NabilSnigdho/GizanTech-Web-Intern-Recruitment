<script>
	import { enhance } from '$app/forms';
	import placeholderImage from '$lib/assets/placeholder.gif';
</script>

<h1>Add Exercise</h1>

<form method="POST" use:enhance>
	<div class="mb-3">
		<label for="exercise-name" class="form-label">Name</label>
		<input class="form-control" name="name" id="exercise-name" required />
	</div>
	<div class="mb-3">
		<label for="exercise-body-part" class="form-label">Body Part</label>
		<input class="form-control" name="bodyPart" id="exercise-body-part" required />
	</div>
	<div class="mb-3">
		<label for="exercise-target" class="form-label">Target muscles</label>
		<input class="form-control" name="target" id="exercise-target" required />
	</div>
	<div class="mb-3">
		<label for="exercise-equipment" class="form-label">Equipment</label>
		<input class="form-control" name="equipment" id="exercise-equipment" required />
	</div>
	<div class="mb-3">
		<label for="exercise-gif-link" class="form-label">GIF link</label>
		<input
			class="form-control"
			name="gifUrl"
			id="exercise-gif-link"
			value={placeholderImage}
			readonly
		/>
	</div>

	<button type="submit" class="btn btn-primary">Submit</button>
</form>
