<script>
  import { createTag, serializeTag } from "../utils/tagManager";
  import { dialogTask, tagData } from "../stores/tasks";
  import { assignTag, removeTag, serializeTask } from "../utils/taskManager";
  import TagItem from "./TagItem.svelte";
  import { onMount } from "svelte";

  let tagValue = "";
  let element;

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
      removeTag($dialogTask.id, tagId);
    } else {
      assignTag($dialogTask.id, tagId);
    }
  }

  onMount(() => {
    element.addEventListener("click", (event) => {
      const dialog = document.querySelector("#tag-dialog");
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
  bind:this={element}
  id="tag-dialog"
  class="bg-opacity-50 min-w-52 max-w-72 mt-20 bg-zinc-700 rounded-md overflow-hidden
  drop-shadow-2xl"
>
  <ul class="flex flex-col p-2 max-h-72 overflow-y-auto">
    {#if sortedTags.length}
      {#each sortedTags as tag (tag.id)}
        <li>
          <TagItem {tag} tagList={$dialogTask.tags} handleCheck={onCheck} />
        </li>
      {/each}
    {:else}
      <p class="select-none text-zinc-500">No Tags Here...</p>
    {/if}
  </ul>
  <form on:submit={onSubmit}>
    <hr class="ml-4 mr-4 mt-4 mb-2 border-zinc-600" />
    <input
      bind:value={tagValue}
      class="bg-inherit w-full h-10 mb-2"
      placeholder="New Tag..."
    />
  </form>
</dialog>

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
      transform: translateY(20%);
      opacity: 0;
    }
  }
</style>
