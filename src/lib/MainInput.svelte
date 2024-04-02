<script>
  import { PlusOutline } from "flowbite-svelte-icons";

  export let onAdd = (value) => {};
  let taskValue = "";

  function handleSubmit(event) {
    event.preventDefault();
    if (!taskValue.trim()) return;

    onAdd(taskValue.trim());
    taskValue = "";
  }
</script>

<form
  on:submit={handleSubmit}
  class="flex w-11/12 h-10 ml-auto mr-auto bg-zinc-900 rounded-sm border border-zinc-500"
>
  <input
    bind:value={taskValue}
    placeholder="..."
    class="w-11/12 h-full bg-transparent"
  />
  <button type="submit" class="bg-zinc-900 w-1/12 h-full flex items-center">
    <PlusOutline class="text-zinc-300" />
  </button>
</form>
