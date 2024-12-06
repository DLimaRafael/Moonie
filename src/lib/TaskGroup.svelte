<script>
  import { AngleDownOutline, AngleRightOutline } from "flowbite-svelte-icons";
  import TaskItem from "./TaskItem.svelte";
  import { dragHandleZone } from "svelte-dnd-action";
  import {
    deleteTask,
    getTaskChildren,
    getTaskProgress,
    orderChildren,
    saveTask,
    serializeTask,
  } from "../utils/taskManager";
  import TaskGroup from "./TaskGroup.svelte";
  import { flipDurationMs } from "../utils/defaults";
  import { flip } from "svelte/animate";

  export let task = serializeTask();
  export let handleAddTask = (data, parentId) => {};
  export let handleDialog = () => {};

  let isDragging = false;

  $: children = isDragging ? children : getTaskChildren(task.id);
  $: isCollapsed = !task.children.length;

  function onConsider(e) {
    isDragging = true;
    children = e.detail.items;
  }

  function onFinalize(e) {
    let data = e.detail.items;

    if (e.detail.info.trigger === "droppedIntoAnother") {
      data = data.filter((task) => task.id !== e.detail.info.id);
    }

    orderChildren(data, task);
    isDragging = false;
  }
</script>

<div class="w-full flex flex-1 items-center">
  <div class="w-3">
    {#if children.length}
      <button
        on:click={() => (isCollapsed = !isCollapsed)}
        type="button"
        class="expand-btn select-none bg-transparent w-full flex justify-center p-0"
      >
        {#if isCollapsed}
          <AngleRightOutline class="text-zinc-400" />
        {:else}
          <AngleDownOutline class="text-zinc-400" />
        {/if}
      </button>
    {/if}
  </div>
  <TaskItem
    {task}
    {handleAddTask}
    {handleDialog}
    handleDelete={deleteTask}
    handleSave={saveTask}
    childrenProgress={getTaskProgress(task.id)}
  />
</div>
{#if task.children.length && !isCollapsed}
  <ul
    id={`childzone-${task.id}`}
    class="ml-7"
    use:dragHandleZone={{
      items: children,
      flipDurationMs,
      dropFromOthersDisabled: isCollapsed,
    }}
    on:consider={onConsider}
    on:finalize={onFinalize}
  >
    {#each children as child (child.id)}
      <div animate:flip={{ duration: flipDurationMs }}>
        <TaskGroup task={child} {handleAddTask} {handleDialog} />
      </div>
    {/each}
  </ul>
{/if}

<style>
  .expand-btn {
    &:focus {
      box-shadow: none;
    }
  }
</style>
