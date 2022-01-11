<script>
  import {Toasts} from "$lib";
</script>

<main>
	<slot />
</main>

<Toasts/>

<style>
	main {
		max-width: 75ch;
		margin: auto;
	}
</style>
