<script>
  import { createTag, serializeTag } from "../utils/tagManager";
  import { tagData } from "../stores/tasks";
  import { assignTag, removeTag } from "../utils/taskManager";
  import TagItem from "./TagItem.svelte";

  export let taskId = "";
  export let tagList = [];

  let tagValue = "";
  let el;

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
      removeTag(taskId, tagId);
    } else {
      assignTag(taskId, tagId);
    }
  }
</script>

<div
  id="tag-popover"
  popover="auto"
  class="min-w-52 max-w-72 bg-zinc-700 rounded-md overflow-hidden drop-shadow-2xl"
>
  <ul class="flex flex-col p-2 max-h-52 overflow-y-auto">
    {#if sortedTags.length}
      {#each sortedTags as tag (tag.id)}
        <li>
          <TagItem {tag} {tagList} handleCheck={onCheck} />
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
