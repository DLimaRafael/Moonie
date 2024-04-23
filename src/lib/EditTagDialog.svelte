<script>
  import { onMount } from "svelte";

  export let onConfirm = (newData) => {};
  export let onClose = () => {};
  export let tag;

  let value = tag?.value;
  let dialog;

  function onSubmit(e) {
    e.preventDefault();
    if (!value || value === tag.value) {
      onClose();
      return;
    }
    onConfirm({
      ...tag,
      value: value,
    });
  }

  onMount(() => {
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= event?.clientY &&
        event?.clientY <= rect.top + rect.height &&
        rect.left <= event?.clientX &&
        event?.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        onClose();
      }
    });
  });
</script>

<dialog
  bind:this={dialog}
  id="edit-tag-dialog"
  class=" bg-zinc-700 bg-opacity-50 shadow-2xl text-center p-8 rounded-md"
  on:close={onClose}
>
  <div class="flex flex-col gap-8 text-zinc-300">
    <h2>Tag Editing</h2>
    <h3>Type a new name for {tag?.value}</h3>
  </div>
  <form class="mt-4" on:submit={onSubmit}>
    <input
      bind:value
      class="bg-zinc-800 bg-opacity-50 rounded-md border border-zinc-600"
      type="text"
      placeholder={tag?.value}
    />
  </form>
</dialog>

<style>
  dialog {
    backdrop-filter: blur(5px);
    max-width: 500px;
  }
</style>
