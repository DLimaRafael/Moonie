<script>
  import { dialogTask, tagData } from "../stores/tasks";
  import { assignTag, removeTag, serializeTask } from "../utils/taskManager";
  import TagItem from "./TagItem.svelte";
  import { onMount } from "svelte";

  export let dialog;

  $: sortedTags = $tagData.sort((a, b) => a.value.localeCompare(b.value));

  function onCheck(tagId, isAssigned) {
    if (isAssigned) {
      removeTag([$dialogTask.id], tagId);
    } else {
      assignTag($dialogTask.id, tagId);
    }
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
  class="bg-opacity-50 min-w-52 w-80 mt-24 min-h-fit bg-zinc-700 rounded-md
  drop-shadow-2xl"
>
  <div class="min-h-12 pl-2 pr-2 pt-2 pb-2 h-fit overflow-hidden">
    <ul class="flex flex-col gap-1 max-h-60 overflow-y-auto">
      {#if sortedTags.length}
        {#each sortedTags as tag (tag.id)}
          <li>
            <TagItem {tag} tagList={$dialogTask.tags} handleCheck={onCheck} />
          </li>
        {/each}
      {:else}
        <p class="m-3 select-none text-zinc-500">No Tags Here...</p>
      {/if}
    </ul>
  </div>
</dialog>

<style>
  @media (max-height: 500px) {
    dialog {
      margin: auto;
      max-height: 90vh;
    }
  }
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
