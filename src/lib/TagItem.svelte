<script>
  import { EditSolid, TrashBinSolid } from "flowbite-svelte-icons";
  import IconButton from "./IconButton.svelte";

  export let tag, tagList;
  export let canDelete = false;
  export let canEdit = false;
  export let handleCheck = (tagId, isAssigned) => {};
  export let handleDelete = (tag) => {};
  export let handleEdit = (tag) => {};

  let showBtn;

  $: checked = tagList.includes(tag.id);
  $: tagStyling = checked
    ? "text-zinc-300 bg-zinc-300 text-zinc-700"
    : "text-slate-500 bg-zinc-700";
  $: nameStyling = checked ? "font-bold text-slate-300" : "text-slate-500";

  function toggleBtn(value = !showBtn) {
    showBtn = value;
  }
</script>

<div
  role="region"
  on:mouseenter={() => toggleBtn(true)}
  on:mouseleave={() => toggleBtn(false)}
  class="tag-item-container flex gap-1 rounded-md justify-start items-center"
>
  <button
    on:click={() => handleCheck(tag.id, checked)}
    class="flex flex-1 gap-2 text-left items-center p-2 bg-transparent"
  >
    <span class="{tagStyling} p-1 w-6 rounded-md text-center">#</span>
    <p class="select-none {nameStyling} text-ellipsis text-nowrap">
      {tag.value}
    </p>
  </button>
  <div class="flex">
    {#if showBtn}
      {#if canEdit}
        <IconButton on:click={() => handleEdit(tag)} class="bg-transparent">
          <EditSolid class="text-zinc-400" />
        </IconButton>
      {/if}
      {#if canDelete}
        <IconButton on:click={() => handleDelete(tag)} class="bg-transparent">
          <TrashBinSolid class="text-red-400" />
        </IconButton>
      {/if}
    {/if}
  </div>
</div>

<style>
  .tag-item-container:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
</style>
