<script>
  import MainInput from "./MainInput.svelte";
  import TaskItem from "./TaskItem.svelte";

  // Task -> id, value, isDone
  // ID is added after task creation, and is based on the array length.
  // Pretty lazy, I know.
  let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

  // Whenever there's a change in tasks, save it to the local storage.
  $: {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function handleEditTask(value, index) {
    tasks[index].value = value;
  }

  function handleCheckTask(index) {
    tasks[index].isDone = !tasks[index].isDone;
  }

  function handleDeleteTask(index) {
    tasks.splice(index, 1);
    tasks = tasks;
  }

  function handleAddTask(value) {
    // Defining Task ID, what could go wrong?
    tasks.unshift({
      id: tasks.length + 1,
      value: value,
      isDone: false,
    });
    tasks = tasks;
  }
</script>

<div class="m-auto h-full flex flex-col gap-6 p-8 max-w-screen-md">
  <MainInput onAdd={handleAddTask} />
  <ul class="flex flex-col">
    {#each tasks as task, index (task.id)}
      <TaskItem
        {index}
        {task}
        {handleCheckTask}
        {handleEditTask}
        {handleDeleteTask}
      />
    {/each}
  </ul>
</div>
