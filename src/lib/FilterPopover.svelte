<script>
  import { tagData } from "../stores/tasks";
  import { taskFilters } from "../stores/filters";
  import TagItem from "./TagItem.svelte";
  import { onDestroy, onMount } from "svelte";
  import { clearTagFilters, toggleFilterTags } from "../utils/filterManager";

  $: sortedTags = $tagData.sort((a, b) => a.value.localeCompare(b.value));
  $: position = {
    top: "auto",
    left: "auto",
  };

  const reverseTag = {
    id: "noTag",
    value: "No Tags",
  };

  function calculatePosition() {
    const filterBtn = document.getElementById("filter-button");
    const element = document.getElementById("filter-popover");
    if (filterBtn) {
      const btnRect = filterBtn.getBoundingClientRect();
      position.top = `${btnRect.y + btnRect.height + 12}px`;
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
    <TagItem
      handleCheck={onCheck}
      tag={reverseTag}
      tagList={$taskFilters.tags}
    />
    {#each sortedTags as tag (tag.id)}
      <TagItem handleCheck={onCheck} {tag} tagList={$taskFilters.tags} />
    {/each}
  </ul>
  <button
    on:click={clearTagFilters}
    class="clear-button w-full bg-transparent rounded-md text-zinc-300 font-bold"
    disabled={!$taskFilters.tags.length}>Remove Filters</button
  >
</div>

<style>
  div[popover] {
    backdrop-filter: blur(5px);
  }

  .clear-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>
