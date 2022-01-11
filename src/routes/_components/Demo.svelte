<script>
	import Modal from '$lib/Modal.svelte';

	let deleteModalOpen = false;

	function deleteEntry() {
		deleteModalOpen = false;
		alert('call delete function');
	}

	let ndOpen = false;
</script>

<h2 id="demo">Demo</h2>

<Modal triggerLabel="Super Simple" triggerClass="btn">
	<h2>Hello World!</h2>
	<p>
		By default, the modal comes with it's own trigger so you don't have to worry about the opening
		logic.
	</p>
	<p>
		It also comes with a close button at the top-right and the ability to close it with <kbd
			>ESC</kbd
		> by default.
	</p>
</Modal>

<Modal bind:open={ndOpen} dismissable={false} triggerLabel="Non-Dismissable" triggerClass="btn">
	<h2>Hello World!</h2>
	<p>
		Can't close this one with <kbd>ESC</kbd> and the top-right close button is missing, because we
		set the <code>dismissable</code> prop to <code>false</code>.
	</p>
	<p>
		To close a non-dismissable Modal you have to provide your own close button like below. Bind the <code
			>open</code
		> prop to control the opening state.
	</p>
	<button
		class="btn"
		slot="modalActions"
		on:click={() => {
			ndOpen = false;
		}}
	>
		Close Modal
	</button>
</Modal>

<br />

<Modal bind:open={deleteModalOpen} triggerLabel="Delete Confirmation Dialog" triggerClass="btn">
	<h2>Are you sure you want to delete the entry?</h2>
	<p>This action can not be reversed.</p>

	<svelte:fragment slot="modalActions">
		<button class="btn" on:click={() => (deleteModalOpen = false)}> No </button>
		<button class="btn" on:click={deleteEntry}>Yes </button>
	</svelte:fragment>
</Modal>

<br />

<a
	class="btn"
	href="https://github.com/SarcevicAntonio/as-modal/blob/main/src/routes/_components/Demo.svelte"
>
	View Demo Example Sourcecode
</a>
