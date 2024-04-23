<script>
  import { onMount } from "svelte";
  import { serializeTag } from "../utils/tagManager";

  export let onConfirm = (newData) => {};
  export let onClose = () => {};
  export let tag = serializeTag();

  let dialog;
  $: tagValue = tag.value;

  function onSubmit(e) {
    e.preventDefault();
    const newValue = tagValue.trim();
    if (!newValue || newValue === tag.value) {
      onClose();
      return;
    }
    onConfirm({
      ...tag,
      value: newValue,
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
>
  <div class="flex flex-col gap-8 text-zinc-300">
    <h2>Tag Editing</h2>
    <h3>Type a new name for {tag.value}</h3>
  </div>
  <form class="mt-4" on:submit={onSubmit}>
    <input
      on:input={(e) => (tagValue = e.currentTarget.value)}
      class="bg-zinc-800 bg-opacity-50 rounded-md border border-zinc-600"
      type="text"
      placeholder={tag.value}
      value={tag.value}
    />
  </form>
</dialog>

<style>
  dialog {
    backdrop-filter: blur(5px);
    max-width: 500px;
  }
</style>
