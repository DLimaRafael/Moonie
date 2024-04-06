<script>
  import MainInput from "./MainInput.svelte";
  import TaskItem from "./TaskItem.svelte";

  // Task -> id, value, isDone
  // ID is added after task creation, and is based on the array length.
  // Pretty lazy, I know.
  let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

  $: parentTasks = tasks.filter((task) => {
    return !tasks.some((parent) => parent.children.includes(task.id));
  });

  // Whenever there's a change in tasks, save it to the local storage.
  $: {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

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

  function handleCheckTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    tasks[index].isDone = !tasks[index].isDone;
  }

  function handleDeleteTask(id, parentId = "") {
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);

    if (parentId) {
      const parentIndex = tasks.findIndex((task) => task.id === parentId);
      tasks[parentIndex].children = tasks[parentIndex].children.filter(
        (child) => child !== id
      );
    }

    tasks = tasks;
  }

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(1, 7);
  }

  function handleAddTask(value) {
    let newTask = serializeTask();
    newTask = {
      ...newTask,
      id: generateUniqueId(),
      value: value,
    };
    tasks.push(newTask);
    tasks = tasks;
    return newTask;
  }

  function handleAddChild(id) {
    const childTask = handleAddTask("");

    let index = tasks.findIndex((task) => task.id === id);
    tasks[index].children.push(childTask.id);
    tasks = tasks;
  }

  function getChildren(children) {
    return tasks.filter((task) => children.includes(task.id));
  }
</script>

{@debug tasks}

<div class="m-auto h-full flex flex-col gap-6 p-8 max-w-screen-md">
  <MainInput onAdd={handleAddTask} />
  <ul class="flex flex-col h-full">
    {#each parentTasks as task (task.id)}
      <TaskItem
        {task}
        {handleAddChild}
        {handleCheckTask}
        {handleDeleteTask}
        {handleEditTask}
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
