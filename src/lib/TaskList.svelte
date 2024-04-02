<script>
  import MainInput from "./MainInput.svelte";
  import TaskItem from "./TaskItem.svelte";

  // Task -> id, value, isDone
  export let tasks = [];

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
