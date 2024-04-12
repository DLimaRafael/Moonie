<script>
  import { createTag, serializeTag } from "../utils/tagManager";
  import { tagData } from "../stores/tasks";
  import { assignTag, removeTag } from "../utils/taskManager";
  import TagItem from "./TagItem.svelte";

  export let taskId = "";
  export let tagList = [];

  let tagValue = "";

  $: sortedTags = $tagData.sort((a, b) => a.value.localeCompare(b.value));

  function onSubmit(event) {
    event.preventDefault();
    const newTag = serializeTag();
    newTag.value = tagValue;
    createTag(newTag);
  }

  function onCheck(event, tagId) {
    if (event.target.checked) {
      assignTag(taskId, tagId);
    } else {
      removeTag(taskId, tagId);
    }
  }

  function isTagAssigned(tagId) {
    return tagList.includes(tagId);
  }
</script>

<div
  class="absolute z-10 right-4 mt-2 w-52 max-h-40 bg-zinc-700 rounded-md shadow-xl overflow-hidden"
>
  <ul class="flex flex-col p-2 overflow-y-auto">
    {#if sortedTags.length}
      {#each sortedTags as tag (tag.id)}
        <li>
          <TagItem {tag} checked={isTagAssigned(tag.id)} />
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
</div>
