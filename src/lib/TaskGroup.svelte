<script>
  import { AngleDownOutline, AngleRightOutline } from "flowbite-svelte-icons";
  import TaskItem from "./TaskItem.svelte";

  export let task;
  export let getTaskChildren = (taskId) => [];
  export let getTaskProgress = (taskId) => {};
  export let handleAddTask = (data, parentId) => {};
  export let handleDialog = () => {};
  export let saveTask = (data) => {};
  export let deleteTask = (taskId) => {};

  $: isCollapsed = false;
</script>

<div class="w-full flex flex-1 items-center gap-1">
  <div class="w-3">
    {#if task.children.length}
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
  <ul class="ml-7">
    {#each getTaskChildren(task.id) as child (child.id)}
      <TaskItem
        task={child}
        {handleAddTask}
        {handleDialog}
        handleDelete={deleteTask}
        handleSave={saveTask}
      />
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
