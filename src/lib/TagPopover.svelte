<script>
  import { createTag, serializeTag } from "../utils/tagManager";
  import { dialogTask, tagData } from "../stores/tasks";
  import { assignTag, removeTag } from "../utils/taskManager";
  import TagItem from "./TagItem.svelte";

  let tagValue = "";
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
</script>

<dialog
  id="tag-dialog"
  class="min-w-52 max-w-72 bg-zinc-700 rounded-md overflow-hidden drop-shadow-2xl"
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
    <input
      bind:value={tagValue}
      class="bg-inherit w-full h-10"
      placeholder="New Tag..."
    />
  </form>
</dialog>
