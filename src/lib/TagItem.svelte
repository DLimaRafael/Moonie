<script>
  import { TrashBinSolid } from "flowbite-svelte-icons";
  import IconButton from "./IconButton.svelte";
  import { deleteTag } from "../utils/tagManager";

  export let tag, tagList;
  export let canDelete = false;
  export let handleCheck = (tagId, isAssigned) => {};
  export let handleDelete = (tag) => {};

  let showBtn;

  $: checked = tagList.includes(tag.id);
  $: tagStyling = checked
    ? "font-extrabold text-zinc-300 bg-zinc-300 text-zinc-700"
    : "font-regular text-slate-500 bg-zinc-700";
  $: nameStyling = checked ? "font-bold" : "text-slate-500";

  function toggleBtn(value = !showBtn) {
    showBtn = value;
  }
</script>

<div
  role="region"
  on:mouseenter={() => toggleBtn(true)}
  on:mouseleave={() => toggleBtn(false)}
  class="flex gap-1"
>
  <button
    on:click={() => handleCheck(tag.id, checked)}
    class="flex items-center gap-1 text-left w-full p-2 rounded-md bg-inherit"
  >
    <span class="{tagStyling} p-1 w-6 rounded-md text-center">#</span>
    <p class={nameStyling}>{tag.value}</p>
  </button>
  {#if showBtn && canDelete}
    <IconButton on:click={() => handleDelete(tag)} class="bg-inherit">
      <TrashBinSolid class="text-red-400" />
    </IconButton>
  {/if}
</div>

<style>
  button:hover {
    background-color: rgba(255, 255, 255, 0.05);
    filter: brightness(1.2);
  }
</style>
