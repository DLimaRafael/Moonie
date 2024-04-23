<script>
  export let onConfirm = (newData) => {};
  export let onClose = () => {};
  export let tag;

  let value = tag?.value;

  function onSubmit(e) {
    e.preventDefault();
    if (!value || value === tag.value) onClose();
    onConfirm({
      ...tag,
      value: value,
    });
  }
</script>

<dialog
  id="edit-tag-dialog"
  class="w-5/12 bg-zinc-700 bg-opacity-50 shadow-2xl text-center p-8 rounded-md"
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
