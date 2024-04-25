<script>
  import {
    createTag,
    deleteTag,
    saveTag,
    serializeTag,
  } from "../utils/tagManager";
  import { dialogTask, tagData } from "../stores/tasks";
  import { assignTag, removeTag, serializeTask } from "../utils/taskManager";
  import TagItem from "./TagItem.svelte";
  import { onMount } from "svelte";
  import ConfirmDialog from "./ConfirmDialog.svelte";
  import EditTagDialog from "./EditTagDialog.svelte";

  let tagValue = "";
  let dialog;

  let confirmDialog, confirmMsg, confirmTitle, editDialog;

  $: targetTag = undefined;
  $: sortedTags = $tagData.sort((a, b) => a.value.localeCompare(b.value));

  function onSubmit(event) {
    event.preventDefault();
    if (!tagValue) return;
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
    targetTag = tag;
    // @ts-ignore
    confirmDialog.showModal();
  }

  function onEdit(tag) {
    editDialog = document.querySelector("dialog#edit-tag-dialog");
    targetTag = tag;
    // @ts-ignore
    editDialog.showModal();
  }

  function onCloseConfirm() {
    confirmDialog.close();
    targetTag = serializeTag();
  }

  function onDeleteConfirm() {
    deleteTag(targetTag.id);
    onCloseConfirm();
  }

  function onCloseEdit() {
    editDialog.close();
    targetTag = serializeTag();
  }

  function onConfirmEdit(newData) {
    saveTag(newData);
    onCloseEdit();
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
  class="bg-opacity-50 min-w-52 w-80 mt-24 h-fit bg-zinc-700 rounded-md overflow-hidden
  drop-shadow-2xl"
>
  <ul class="flex flex-col p-3 h-fit max-h-60 overflow-y-auto">
    {#if sortedTags.length}
      {#each sortedTags as tag (tag.id)}
        <li>
          <TagItem
            {tag}
            tagList={$dialogTask.tags}
            handleCheck={onCheck}
            handleDelete={onDelete}
            handleEdit={onEdit}
            canDelete
            canEdit
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
      class="bg-transparent h-14 ml-4 mr-4 p-0"
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
<EditTagDialog
  tag={targetTag}
  onClose={onCloseEdit}
  onConfirm={onConfirmEdit}
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
