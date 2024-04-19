<script>
  export let title = "Confirmation";
  export let msg = "";
  export let onConfirm = () => {};
  export let onClose = () => {};
</script>

<dialog
  id="confirm-dialog"
  class="w-8/12 bg-zinc-700 bg-opacity-50 shadow-2xl text-center p-8 rounded-md"
>
  <div class="flex flex-col gap-8">
    <h2 class="select-none">{title}</h2>
    <span class="leading-5 select-none">{msg}</span>
  </div>
  <div class="w-full flex gap-10 justify-center mt-7">
    <button class="flex-1 bg-slate-600" on:click={onClose}>Cancel</button>
    <button
      class="flex-1 bg-zinc-400 text-zinc-800"
      on:click={() => onConfirm()}>Confirm</button
    >
  </div>
</dialog>

<style>
  dialog {
    backdrop-filter: blur(5px);
  }
</style>
