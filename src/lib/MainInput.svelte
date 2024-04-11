<script>
  import { PlusOutline, SearchOutline } from "flowbite-svelte-icons";
  import IconButton from "./IconButton.svelte";

  export let onAdd = (value) => {};
  export let onSearch = (value) => {};
  let taskValue = "";
  let inputFocus = false;
  let isSearching = false;

  $: formStyling = inputFocus && "shadow-lg";
  $: searchStyling = isSearching
    ? "border border-zinc-400 bg-zinc-700"
    : "bg-zinc-700";

  $: if (isSearching) onSearch(taskValue);

  function toggleFocus() {
    inputFocus = !inputFocus;
  }

  function toggleSearch() {
    if (isSearching) onSearch("");
    isSearching = !isSearching;
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
  class="flex w-11/12 h-12 ml-auto mr-auto rounded-md overflow-hidden transition-allx {formStyling} {searchStyling}"
>
  <input
    bind:value={taskValue}
    on:focus={toggleFocus}
    on:blur={toggleFocus}
    placeholder={isSearching ? "Something to search..." : "Something to do..."}
    class="flex-1 h-full bg-transparent"
  />
  <IconButton
    on:click={toggleSearch}
    type="button"
    class="rounded-none bg-transparent"
  >
    <SearchOutline class="text-zinc-300" />
  </IconButton>
  <IconButton type="submit" class="rounded-none bg-transparent">
    <PlusOutline class="text-zinc-300" />
  </IconButton>
</form>
