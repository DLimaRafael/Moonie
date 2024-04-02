<script>
  import TaskItem from "./TaskItem.svelte";

  // Task -> id, value, isDone
  export let tasks = [];

  function handleEditTask(value, index) {
    tasks[index].value = value;
    console.log("ay", tasks);
  }

  function handleTaskCheck(index) {
    tasks[index].isDone = !tasks[index].isDone;
  }

  function handleTaskDelete(index) {
    tasks.splice(index, 1);
    tasks = tasks;
  }

  function handleTaskAdd(task = { value: "", isDone: false }) {
    tasks = [...tasks, task];
  }
</script>

{@debug tasks}

<div class="h-full p-8">
  <ul>
    {#each tasks as task, index}
      <TaskItem {index} {task} {handleTaskCheck} {handleEditTask} />
    {/each}
  </ul>
</div>
