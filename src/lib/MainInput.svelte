<script>
  import { PlusOutline, SearchOutline } from "flowbite-svelte-icons";
  import IconButton from "./IconButton.svelte";

  export let onAdd = (value) => {};
  export let onSearch = (value) => {};
  let taskValue = "";
  let inputFocus = false;
  let isSearching = false;

  $: formStyling = inputFocus && "shadow-lg";
  $: searchStyling = isSearching ? "border border-zinc-400" : "bg-zinc-700";
  $: canSearch = !!taskValue;

  function toggleFocus() {
    inputFocus = !inputFocus;
  }

  function handleSearch() {
    isSearching = !isSearching;
    onSearch(taskValue);
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
    placeholder="Something to do..."
    class="flex-1 h-full bg-transparent"
  />
  {#if canSearch}
    <IconButton on:click={handleSearch} type="button" class="rounded-none">
      <SearchOutline class="text-zinc-300" />
    </IconButton>
  {/if}
  <IconButton type="submit" class="rounded-none">
    <PlusOutline class="text-zinc-300" />
  </IconButton>
</form>
