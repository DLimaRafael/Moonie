<script>
  import { dialogTask, taskData } from "../stores/tasks";
  import { generateUniqueId } from "../utils/dataManager";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { flipDurationMs } from "../utils/defaults";
  import {
    createTask,
    orderTasks,
    saveTask,
    serializeTask,
  } from "../utils/taskManager";
  import MainInput from "./MainInput.svelte";
  import TagDialog from "./TagDialog.svelte";
  import FilterPopover from "./FilterPopover.svelte";
  import { filterData } from "../utils/filterManager";
  import TaskGroup from "./TaskGroup.svelte";
  import OptionsPopover from "./OptionsPopover.svelte";

  // Task -> id, value, isDone, children

  $: tasks = filterData($taskData);
  $: parentTasks = tasks.filter((task) => !task.parentId);

  function handleDialog(task) {
    const dialog = document.querySelector("dialog");
    dialogTask.set(task);
    dialog.showModal();
  }

  function handleAddTask(value, parentId = "") {
    let newTask = serializeTask();
    newTask = {
      ...newTask,
      id: generateUniqueId(),
      value: value,
    };

    createTask(newTask, parentId);
  }

  function handleSearch() {
    tasks = filterData($taskData);
  }

  function handleConsider(e) {
    parentTasks = e.detail.items;
  }

  function handleFinalize(e) {
    for (let i = 0; i < e.detail.items.length; i++) {
      if (e.detail.items[i].parentId) {
        e.detail.items[i].parentId = "";
        saveTask(e.detail.items[i]);
      }
    }
    const children = tasks.filter((task) => task.parentId);
    const ordered = e.detail.items;
    ordered.push(...children);
    orderTasks(ordered);
  }
</script>

<div class="list-container m-auto h-full flex flex-col max-w-screen-md">
  <MainInput onAdd={handleAddTask} onSearch={handleSearch} />
  <div class="h-full overflow-y-auto mt-4 pr-3">
    <ul
      class="h-full"
      use:dndzone={{
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
  <TagDialog />
</div>
