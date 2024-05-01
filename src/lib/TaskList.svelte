<script>
  import { dialogTask, taskData } from "../stores/tasks";
  import { generateUniqueId } from "../utils/dataManager";
  import {
    createTask,
    deleteTask,
    getTaskChildren,
    getTaskProgress,
    saveTask,
    serializeTask,
  } from "../utils/taskManager";
  import MainInput from "./MainInput.svelte";
  import TagDialog from "./TagDialog.svelte";
  import FilterPopover from "./FilterPopover.svelte";
  import { filterData } from "../utils/filterManager";
  import TaskGroup from "./TaskGroup.svelte";

  // Task -> id, value, isDone, children, isCollapsed

  $: tasks = filterData($taskData);
  $: parentTasks = tasks.filter((task) => {
    return !tasks.some((parent) => parent.children.includes(task.id));
  });

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
</script>

<div class="list-container m-auto h-full flex flex-col max-w-screen-md">
  <MainInput onAdd={handleAddTask} onSearch={handleSearch} />
  <div class="h-full overflow-y-auto mt-4 pr-3">
    <ul class="flex flex-col flex-1 gap-1">
      {#each parentTasks as task (task.id)}
        <TaskGroup
          {task}
          {getTaskChildren}
          {handleAddTask}
          {getTaskProgress}
          {handleDialog}
          {saveTask}
          {deleteTask}
        />
      {/each}
    </ul>
  </div>
  <FilterPopover />
  <TagDialog />
</div>
