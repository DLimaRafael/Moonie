<script>
  import { createTag, deleteTag, serializeTag } from "../utils/tagManager";
  import { dialogTask, tagData } from "../stores/tasks";
  import { assignTag, removeTag, serializeTask } from "../utils/taskManager";
  import TagItem from "./TagItem.svelte";
  import { onMount } from "svelte";
  import ConfirmDialog from "./ConfirmDialog.svelte";

  let tagValue = "";
  let dialog;

  let confirmDialog, confirmMsg, confirmTitle, confirmTag;

  $: sortedTags = $tagData.sort((a, b) => a.value.localeCompare(b.value));

  function onSubmit(event) {
    event.preventDefault();
    const newTag = serializeTag();
    newTag.value = tagValue;
    createTag(newTag);
    tagValue = "";
  }

  function onCheck(tagId, isAssigned) {
    if (isAssigned) {
      removeTag([$dialogTask.id], tagId);
    } else {
      assignTag($dialogTask.id, tagId);
    }
  }

  function onDelete(tag) {
    confirmDialog = document.querySelector("dialog#confirm-dialog");
    confirmTitle = "Delete Tag";
    confirmMsg = `The tag "${tag.value}" will be removed from all the tasks assigned, are you sure?`;
    confirmTag = tag;
    // @ts-ignore
    confirmDialog.showModal();
  }

  function onCloseConfirm() {
    confirmDialog.close();
  }

  function onDeleteConfirm() {
    deleteTag(confirmTag.id);
    confirmDialog.close();
  }

  onMount(() => {
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= event?.clientY &&
        event?.clientY <= rect.top + rect.height &&
        rect.left <= event?.clientX &&
        event?.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        dialog.close();
        dialogTask.set(serializeTask());
      }
    });
  });
</script>

<dialog
  bind:this={dialog}
  id="tag-dialog"
  class="bg-opacity-50 min-w-52 max-w-72 mt-24 bg-zinc-700 rounded-md overflow-hidden
  drop-shadow-2xl"
>
  <ul class="flex flex-col p-3 max-h-72 overflow-y-auto">
    {#if sortedTags.length}
      {#each sortedTags as tag (tag.id)}
        <li>
          <TagItem
            {tag}
            tagList={$dialogTask.tags}
            handleCheck={onCheck}
            handleDelete={onDelete}
            canDelete
          />
        </li>
      {/each}
    {:else}
      <p class="m-3 select-none text-zinc-500">No Tags Here...</p>
    {/if}
  </ul>
  <form on:submit={onSubmit}>
    <hr class="ml-4 mr-4 mt-4 mb-0 border-zinc-600" />
    <input
      bind:value={tagValue}
      class="bg-inherit h-14 ml-4 mr-4 p-0"
      placeholder="New Tag..."
    />
  </form>
</dialog>
<ConfirmDialog
  title={confirmTitle}
  msg={confirmMsg}
  onClose={onCloseConfirm}
  onConfirm={onDeleteConfirm}
/>

<style>
  dialog[open] {
    backdrop-filter: blur(5px);
    animation: show 150ms ease-out normal;
  }

  @keyframes show {
    from {
      transform: translateY(10%);
      opacity: 0;
    }
    to {
      transform: translateY(0%);
      opacity: 1;
    }
  }

  @keyframes hide {
    from {
      transform: translateY(0%);
      opacity: 1;
    }
    to {
      transform: translateY(-10%);
      opacity: 0;
    }
  }
</style>
