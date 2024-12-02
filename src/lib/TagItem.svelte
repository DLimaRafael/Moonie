<script>
  import {
    CheckOutline,
    CloseOutline,
    EditSolid,
    TrashBinSolid,
  } from "flowbite-svelte-icons";
  import IconButton from "./IconButton.svelte";
  import { saveTag } from "../utils/tagManager";

  export let tag, tagList;
  export let canDelete = false;
  export let canEdit = false;
  export let handleCheck = (tagId, isAssigned) => {};
  export let handleDelete = (tag) => {};

  let showBtn;
  let tagValue = tag.value;
  let isEditing = false;

  $: checked = tagList.includes(tag.id);
  $: buttonStyling = isEditing ? "border border-zinc-400" : "";
  $: tagStyling = checked
    ? "bg-zinc-300 text-zinc-700"
    : "text-slate-500 bg-zinc-700";
  $: nameStyling = checked ? "font-bold text-slate-300" : "text-slate-500";

  function toggleBtn(value = !showBtn) {
    showBtn = value;
  }

  function toggleEditTag(value = !isEditing) {
    tagValue = tag.value;
    isEditing = value;
  }

  function onClick() {
    !isEditing && handleCheck(tag.id, checked);
  }

  function onSubmit(e) {
    e?.preventDefault();
    saveTag({ ...tag, value: tagValue });
    toggleEditTag();
  }
</script>

<div
  role="region"
  on:mouseenter={() => toggleBtn(true)}
  on:mouseleave={() => toggleBtn(false)}
  class="tag-item-container flex gap-1 rounded-md justify-start items-center"
>
  <button
    on:click={onClick}
    class="flex flex-1 gap-2 text-left items-center p-2 bg-transparent {buttonStyling}"
  >
    <span class="{tagStyling} p-1 min-w-6 w-6 rounded-md text-center">#</span>
    {#if !isEditing}
      <p class="select-none {nameStyling} text-ellipsis text-nowrap">
        {tag.value}
      </p>
    {:else}
      <form on:submit={onSubmit}>
        <!-- svelte-ignore a11y-autofocus -->
        <input
          autofocus
          class="bg-transparent {nameStyling} p-0"
          bind:value={tagValue}
          on:blur={() => toggleEditTag()}
        />
      </form>
    {/if}
  </button>
  {#if showBtn}
    <div class="flex">
      {#if isEditing}
        <IconButton on:click={() => toggleEditTag()}>
          <CloseOutline class="text-zinc-300" />
        </IconButton>
        <IconButton on:click={() => onSubmit()}>
          <CheckOutline class="text-zinc-300" />
        </IconButton>
      {:else}
        {#if canEdit}
          <IconButton on:click={() => toggleEditTag()}>
            <EditSolid class="text-zinc-400" />
          </IconButton>
        {/if}
        {#if canDelete}
          <IconButton on:click={() => handleDelete(tag)}>
            <TrashBinSolid class="text-red-400" />
          </IconButton>
        {/if}
      {/if}
    </div>
  {/if}
</div>

<style>
  .tag-item-container:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
</style>
