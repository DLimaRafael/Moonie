<script>
  import { defaultData, deleteTask, saveTask } from "../utils/dataManager";
  import MainInput from "./MainInput.svelte";
  import TaskItem from "./TaskItem.svelte";

  // Task -> id, value, isDone
  // ID is added after task creation, and is based on the array length.
  // Pretty lazy, I know.

  let isSearch = false;

  $: tasks = defaultData;
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

  function handleEditTask(value, id) {
    const index = tasks.findIndex((task) => task.id === id);
    tasks[index].value = value;
  }

  function handleCheckTask(data) {
    saveTask({
      ...data,
      isDone: !data.isDone,
    });
  }

  function handleDeleteTask(id, parentId = "") {
    deleteTask(id, parentId);
  }

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(1, 7);
  }

  function handleAddTask(value, parentId = "") {
    isSearch = false;
    let newTask = serializeTask();
    newTask = {
      ...newTask,
      id: generateUniqueId(),
      value: value,
    };
    return saveTask(newTask, parentId);
  }

  function handleAddChild(id) {
    handleAddTask("", id);
  }

  function getChildren(children) {
    return tasks.filter((task) => children.includes(task.id));
  }

  function getCompletedChildren(children) {
    return getChildren(children).filter((child) => child.isDone);
  }

  function handleSearch(value) {
    isSearch = !isSearch;
  }
</script>

{@debug tasks}

<div class="m-auto h-full flex flex-col gap-6 p-8 max-w-screen-md">
  <MainInput onAdd={handleAddTask} onSearch={handleSearch} />
  <ul class="flex flex-col h-full">
    {#each parentTasks as task (task.id)}
      <TaskItem
        {task}
        {handleAddChild}
        {handleCheckTask}
        {handleDeleteTask}
        {handleEditTask}
        childrenProgress={getCompletedChildren(task.children).length}
      />
      {#each getChildren(task.children) as child (child.id)}
        <ul class="ml-7">
          <TaskItem
            task={child}
            {handleAddChild}
            {handleCheckTask}
            {handleDeleteTask}
            {handleEditTask}
            parentId={task.id}
          />
        </ul>
      {/each}
    {/each}
  </ul>
</div>
