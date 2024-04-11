<script>
  import { taskData } from "../stores/tasks";
  import {
    createTask,
    deleteTask,
    getTaskChildren,
    getTaskProgress,
    saveTask,
  } from "../utils/dataManager";
  import MainInput from "./MainInput.svelte";
  import TaskItem from "./TaskItem.svelte";

  // Task -> id, value, isDone, children

  let isSearch = false;

  $: tasks = $taskData;
  $: parentTasks = tasks.filter((task) => {
    return !tasks.some((parent) => parent.children.includes(task.id));
  });

  function serializeTask() {
    return {
      id: "",
      value: "",
      isDone: "",
      children: [],
    };
  }

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(3, 5);
  }

  function handleAddTask(value, parentId = "") {
    isSearch = false;
    let newTask = serializeTask();
    newTask = {
      ...newTask,
      id: generateUniqueId(),
      value: value,
    };

    createTask(newTask, parentId);
  }

  function handleSearch(value) {
    isSearch = !isSearch;
  }
</script>

<div class="m-auto h-full flex flex-col gap-6 pl-8 pr-8 max-w-screen-md">
  <MainInput onAdd={handleAddTask} onSearch={handleSearch} />
  <ul class="flex flex-col flex-1 overflow-y-auto">
    {#each parentTasks as task (task.id)}
      <TaskItem
        {task}
        {handleAddTask}
        handleDelete={deleteTask}
        handleSave={saveTask}
        childrenProgress={getTaskProgress(task.id)}
      />
      {#each getTaskChildren(task.id) as child (child.id)}
        <ul class="ml-7">
          <TaskItem
            task={child}
            {handleAddTask}
            handleDelete={deleteTask}
            handleSave={saveTask}
            parentId={task.id}
          />
        </ul>
      {/each}
    {/each}
  </ul>
</div>
