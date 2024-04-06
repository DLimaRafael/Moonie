<script>
  import { PlusOutline } from "flowbite-svelte-icons";
  import IconButton from "./IconButton.svelte";

  export let onAdd = (value) => {};
  let taskValue = "";
  let inputFocus = false;

  $: formStyling = inputFocus && "shadow-lg";

  function toggleFocus() {
    inputFocus = !inputFocus;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!taskValue.trim()) return;

    onAdd(taskValue.trim());
    taskValue = "";
  }
</script>

<form
  on:submit={handleSubmit}
  class="flex w-11/12 h-12 ml-auto mr-auto bg-zinc-700 rounded-md overflow-hidden transition-shadow {formStyling}"
>
  <input
    bind:value={taskValue}
    on:focus={toggleFocus}
    on:blur={toggleFocus}
    placeholder="Something to do..."
    class="flex-1 h-full bg-zinc-700"
  />
  <IconButton type="submit">
    <PlusOutline class="text-zinc-300" />
  </IconButton>
</form>
