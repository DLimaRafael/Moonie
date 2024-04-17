<script>
  import { tagData } from "../stores/tasks";
  import { taskFilters } from "../stores/filters";
  import TagItem from "./TagItem.svelte";
  import { onDestroy, onMount } from "svelte";
  import { toggleFilterTags } from "../utils/filterManager";

  $: sortedTags = $tagData.sort((a, b) => a.value.localeCompare(b.value));
  $: position = {
    top: "auto",
    left: "auto",
  };

  function calculatePosition() {
    const filterBtn = document.getElementById("filter-button");
    const element = document.getElementById("filter-popover");
    if (filterBtn) {
      const btnRect = filterBtn.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      console.log(elementRect);
      position.top = `${btnRect.y + btnRect.height + 12}px`;
      position.left = `${btnRect.x + btnRect.width - 288}px`;
    }
  }

  function onCheck(tagId, isAssigned) {
    toggleFilterTags(tagId, isAssigned)
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
  class="m-0 w-72 h-fit max-h-80 p-2 bg-zinc-700 bg-opacity-50 shadow-xl rounded-md"
  style="top: {position.top}; left: {position.left}"
>
  <ul>
    {#each sortedTags as tag (tag.id)}
      <TagItem handleCheck={onCheck} {tag} tagList={$taskFilters.tags} />
    {/each}
  </ul>
</div>

<style>
  div[popover] {
    backdrop-filter: blur(5px);
  }
</style>
