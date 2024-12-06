<script>
  import { dialogTask, taskData } from "../stores/tasks";
  import { dragHandleZone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { flipDurationMs } from "../utils/defaults";
  import { orderTasks } from "../utils/taskManager";
  import { filterData } from "../utils/filterManager";
  import { handleAddTask } from "../utils/dataManager";
  import MainInput from "./MainInput.svelte";
  import TagDialog from "./TagDialog.svelte";
  import FilterPopover from "./FilterPopover.svelte";
  import TaskGroup from "./TaskGroup.svelte";
  import OptionsPopover from "./OptionsPopover.svelte";

  // Task -> id, value, isDone, children

  $: tasks = filterData($taskData);
  $: parentTasks = tasks.filter((task) => !task.parentId);

  let tagDialog;

  function handleDialog(task) {
    dialogTask.set(task);
    tagDialog.showModal();
  }

  function handleSearch() {
    tasks = filterData($taskData);
  }

  function handleConsider(e) {
    parentTasks = e.detail.items;
  }

  function handleFinalize(e) {
    let data = e.detail.items;

    data.forEach((task) => {
      if (task.parentId) {
        task.parentId = "";
      }
    });

    if (e.detail.info.trigger === "droppedIntoAnother") {
      data = data.filter((task) => task.id !== e.detail.info.id);
    }

    data.push(...tasks.filter((task) => task.parentId));

    orderTasks(data);
  }
</script>

<div class="list-container m-auto h-full flex flex-col max-w-screen-md">
  <MainInput onAdd={handleAddTask} onSearch={handleSearch} />
  <div class="h-full overflow-y-auto mt-4 pr-3">
    <ul
      id="mainGroup"
      class="h-full"
      tabindex="-1"
      use:dragHandleZone={{
        items: parentTasks,
        flipDurationMs,
        dropTargetStyle: {},
      }}
      on:consider={handleConsider}
      on:finalize={handleFinalize}
    >
      {#each parentTasks as task (task.id)}
        <div animate:flip={{ duration: flipDurationMs }}>
          <TaskGroup {task} {handleAddTask} {handleDialog} />
        </div>
      {/each}
    </ul>
  </div>
  <FilterPopover />
  <OptionsPopover />
  <TagDialog bind:dialog={tagDialog} />
</div>

<style>
  ul {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  }
  ul:focus {
    border: none;
  }
</style>
