<script>
  import { tagData } from "../stores/tasks";
  import { taskFilters } from "../stores/filters";
  import TagItem from "./TagItem.svelte";
  import { onDestroy, onMount } from "svelte";
  import { clearTagFilters, toggleFilterTags } from "../utils/filterManager";
  import IconButton from "./IconButton.svelte";
  import { TagOutline, TrashBinSolid } from "flowbite-svelte-icons";

  $: sortedTags = $tagData.sort((a, b) => a.value.localeCompare(b.value));
  $: untaggedFilter = $taskFilters.tags.includes("none");
  $: untaggedStyle = untaggedFilter
    ? "bg-zinc-400 text-zinc-700"
    : "text-zinc-300";
  $: position = {
    top: "auto",
    left: "auto",
  };

  function calculatePosition() {
    const filterBtn = document.getElementById("filter-button");
    if (filterBtn) {
      const btnRect = filterBtn.getBoundingClientRect();
      position.top = `${btnRect.y + btnRect.height + 10}px`;
      position.left = `${btnRect.x + btnRect.width - 288}px`;
    }
  }

  function onCheck(tagId, isAssigned) {
    toggleFilterTags(tagId, isAssigned);
  }

  onMount(() => {
    calculatePosition();
    window.addEventListener("resize", calculatePosition);
  });

  onDestroy(() => {
    window.removeEventListener("resize", calculatePosition);
  });
</script>

<div
  id="filter-popover"
  popover="auto"
  class="m-0 w-72 p-2 bg-zinc-700 bg-opacity-50 shadow-xl rounded-md overflow-hidden"
  style="top: {position.top}; left: {position.left}"
>
  <ul class="max-h-72 overflow-y-auto">
    {#each sortedTags as tag (tag.id)}
      <TagItem
        handleCheck={onCheck}
        {tag}
        tagList={$taskFilters.tags}
        canDelete
        canEdit
      />
    {/each}
  </ul>
  {#if $tagData.length}
    <div class="flex gap-1 mt-2">
      <IconButton
        on:click={() => onCheck("none", untaggedFilter)}
        class="flex-grow {untaggedStyle}"
      >
        <TagOutline />
        <span>Untagged</span>
      </IconButton>
      <IconButton
        on:click={clearTagFilters}
        class="flex-grow text-zinc-300"
        disabled={!$taskFilters.tags.length}
      >
        <TrashBinSolid />
        Clear Filters
      </IconButton>
    </div>
  {:else}
    <span
      class="w-full text-zinc-500 select-none flex justify-center font-bold"
    >
      No Tags to filter
    </span>
  {/if}
</div>

<style>
  div[popover] {
    backdrop-filter: blur(5px);
  }
</style>
