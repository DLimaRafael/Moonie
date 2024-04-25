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
  import TaskItem from "./TaskItem.svelte";
  import FilterPopover from "./FilterPopover.svelte";
  import { filterData } from "../utils/filterManager";

  // Task -> id, value, isDone, children

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
  <div class="h-full overflow-y-auto mt-4">
    <ul class="flex flex-col flex-1 gap-1">
      {#each parentTasks as task (task.id)}
        <TaskItem
          {task}
          {handleAddTask}
          {handleDialog}
          handleDelete={deleteTask}
          handleSave={saveTask}
          childrenProgress={getTaskProgress(task.id)}
        />
        {#each getTaskChildren(task.id) as child (child.id)}
          <ul class="ml-7">
            <TaskItem
              task={child}
              {handleAddTask}
              {handleDialog}
              handleDelete={deleteTask}
              handleSave={saveTask}
              parentId={task.id}
            />
          </ul>
        {/each}
      {/each}
    </ul>
  </div>
  <FilterPopover />
  <TagDialog />
</div>
