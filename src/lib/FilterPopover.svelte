<script>
  import { tagData } from "../stores/tasks";
  import { taskFilters } from "../stores/filters";
  import TagItem from "./TagItem.svelte";
  import { onDestroy, onMount } from "svelte";
  import { clearTagFilters, toggleFilterTags } from "../utils/filterManager";
  import IconButton from "./IconButton.svelte";
  import { TagOutline, TrashBinSolid } from "flowbite-svelte-icons";
  import ConfirmDialog from "./ConfirmDialog.svelte";
  import { createTag, deleteTag, serializeTag } from "../utils/tagManager";

  $: sortedTags = $tagData.sort((a, b) => a.value.localeCompare(b.value));
  $: untaggedFilter = $taskFilters.tags.includes("none");
  $: untaggedStyle = untaggedFilter
    ? "bg-zinc-400 text-zinc-700"
    : "text-zinc-300";
  $: position = {
    top: "auto",
    left: "auto",
  };

  let confirmDialog;
  let confirmTitle;
  let confirmMsg;
  let targetTag = serializeTag();
  let tagValue;

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

  function onDeleteTag(tag) {
    confirmTitle = "Delete Tag";
    confirmMsg = `"${tag.value}" will be removed from all the tasks assigned, are you sure?`;
    targetTag = tag;
    confirmDialog.showModal();
  }

  function onConfirmDelete() {
    deleteTag(targetTag.id);
    onCloseConfirm();
  }

  function onCloseConfirm() {
    confirmDialog.close();
    targetTag = serializeTag();
  }

  function onSubmit(event) {
    event.preventDefault();
    if (!tagValue) return;
    const newTag = serializeTag();
    newTag.value = tagValue;
    createTag(newTag);
    tagValue = "";
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
  <ul class="max-h-64 overflow-y-auto">
    {#each sortedTags as tag (tag.id)}
      <TagItem
        handleCheck={onCheck}
        handleDelete={onDeleteTag}
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
  <form on:submit={onSubmit}>
    <input
      bind:value={tagValue}
      class="bg-zinc-800 text-zinc-300 w-full p-2 mt-2 rounded-md bg-opacity-60"
      placeholder="New Tag..."
    />
  </form>
</div>
<ConfirmDialog
  bind:dialog={confirmDialog}
  title={confirmTitle}
  msg={confirmMsg}
  onConfirm={onConfirmDelete}
  onClose={onCloseConfirm}
/>

<style>
  div[popover] {
    backdrop-filter: blur(5px);
  }
</style>
