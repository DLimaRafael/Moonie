<script>
  import { AngleDownOutline, AngleRightOutline } from "flowbite-svelte-icons";
  import TaskItem from "./TaskItem.svelte";
  import { dndzone } from "svelte-dnd-action";
  import {
    deleteTask,
    getTaskChildren,
    getTaskProgress,
    orderChildren,
    saveTask,
  } from "../utils/taskManager";
  import { flipDurationMs } from "../utils/defaults";
  import { flip } from "svelte/animate";

  export let task;
  export let handleAddTask = (data, parentId) => {};
  export let handleDialog = () => {};

  $: isCollapsed = false;
  $: children = getTaskChildren(task.id);

  function onConsider(e) {
    children = e.detail.items;
  }

  function onFinalize(e) {
    orderChildren(e.detail.items, task);
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
<ul
  class="ml-7"
  use:dndzone={{
    items: children,
    flipDurationMs,
    dropFromOthersDisabled: isCollapsed,
  }}
  on:consider={onConsider}
  on:finalize={onFinalize}
>
  {#if !isCollapsed}
    {#each children as child (child.id)}
      <div animate:flip={{ duration: flipDurationMs }}>
        <TaskItem
          task={child}
          {handleAddTask}
          {handleDialog}
          handleDelete={deleteTask}
          handleSave={saveTask}
        />
      </div>
    {/each}
  {/if}
</ul>

<style>
  .expand-btn {
    &:focus {
      box-shadow: none;
    }
  }
</style>
