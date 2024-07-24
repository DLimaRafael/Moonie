<script>
  import {
    DotsHorizontalOutline,
    FilterSolid,
    SearchOutline,
    SearchSolid,
  } from "flowbite-svelte-icons";
  import IconButton from "./IconButton.svelte";
  import { taskFilters } from "../stores/filters";
  import { getFilterTagNames } from "../utils/filterManager";

  export let onAdd = (value) => {};
  export let onSearch = () => {};
  let taskValue = "";
  let inputFocus = false;
  let isSearching = false;

  $: formStyling = inputFocus && "shadow-lg";
  $: searchStyling = isSearching
    ? "border border-zinc-400 bg-zinc-700"
    : "border border-transparent bg-zinc-700";
  $: filterStyling = $taskFilters.tags.length ? "bg-zinc-400" : "bg-zinc-700";
  $: filterIconStyling = $taskFilters.tags.length
    ? "text-zinc-700"
    : "text-zinc-300";

  $: if (isSearching) {
    taskFilters.update((value) => {
      return { text: taskValue, tags: value.tags };
    });
  }
  $: $taskFilters.tags, onSearch();

  function toggleFocus() {
    inputFocus = !inputFocus;
  }

  function toggleSearch() {
    isSearching = !isSearching;
    if (!isSearching) {
      taskFilters.update((value) => {
        return { text: "", tags: value.tags };
      });
    }
    onSearch();
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!taskValue.trim()) return;

    onAdd(taskValue.trim());
    taskValue = "";
  }
</script>

<div id="main-input-div" class="flex gap-2 h-10">
  <IconButton
    type="button"
    id="options-button"
    popovertarget="options-popover"
    class="rounded-md flex w-14 items-center"
  >
    <DotsHorizontalOutline class="text-zinc-300" />
  </IconButton>
  <form
    on:submit={handleSubmit}
    class="flex w-11/12 h-full ml-auto mr-auto rounded-md overflow-hidden transition-all {formStyling} {searchStyling}"
  >
    <input
      bind:value={taskValue}
      on:focus={toggleFocus}
      on:blur={toggleFocus}
      placeholder={isSearching
        ? "Something to search..."
        : "Something to do..."}
      class="w-full h-full bg-transparent text-sm"
    />
    <div class="flex flex-1">
      <IconButton
        on:click={toggleSearch}
        type="button"
        class="rounded-none bg-transparent"
      >
        {#if isSearching}
          <SearchSolid class="text-zinc-300" />
        {:else}
          <SearchOutline class="text-zinc-400" />
        {/if}
      </IconButton>
    </div>
  </form>
  <IconButton
    type="button"
    id="filter-button"
    popovertarget="filter-popover"
    class="rounded-md {filterStyling} flex w-14 items-center"
  >
    <FilterSolid class={filterIconStyling} />
    <span class="w-5 {filterIconStyling}">{$taskFilters.tags.length}</span>
  </IconButton>
</div>
{#if $taskFilters.tags.length}
  <div id="search-tags-div" class="w-full flex flex-wrap gap-1 h-fit mt-2">
    {#each getFilterTagNames($taskFilters.tags) as tag (tag.id)}
      <span
        class="select-none bg-zinc-700 h-fit pl-2 pr-2 rounded-sm text-xs flex-wrap"
      >
        {tag.value}
      </span>
    {/each}
  </div>
{/if}
