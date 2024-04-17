<script>
  import {
    FilterSolid,
    PlusOutline,
    SearchOutline,
  } from "flowbite-svelte-icons";
  import IconButton from "./IconButton.svelte";
  import { taskFilters } from "../stores/filters";

  export let onAdd = (value) => {};
  export let onSearch = (value) => {};
  let taskValue = "";
  let inputFocus = false;
  let isSearching = false;

  $: formStyling = inputFocus && "shadow-lg";
  $: searchStyling = isSearching
    ? "border border-zinc-400 bg-zinc-700"
    : "bg-zinc-700";
  $: filterStyling = $taskFilters.tags.length ? "bg-zinc-400" : "bg-zinc-700";
  $: filterIconStyling = $taskFilters.tags.length
    ? "text-zinc-700"
    : "text-zinc-300";

  $: if (isSearching) onSearch(taskValue);
  $: $taskFilters.tags && onSearch(taskValue)

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

<div class="flex gap-2 h-12">
  <form
    on:submit={handleSubmit}
    class="flex w-11/12 h-full ml-auto mr-auto rounded-md overflow-hidden transition-allx {formStyling} {searchStyling}"
  >
    <input
      bind:value={taskValue}
      on:focus={toggleFocus}
      on:blur={toggleFocus}
      placeholder={isSearching ? "Task #Tag" : "Something to do..."}
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
  <IconButton
    id="filter-button"
    popovertarget="filter-popover"
    class="rounded-md {filterStyling} flex w-14 items-center"
  >
    <FilterSolid class={filterIconStyling} />
    <span class="w-5 {filterIconStyling}">{$taskFilters.tags.length}</span>
  </IconButton>
</div>
