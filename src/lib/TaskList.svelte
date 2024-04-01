<script>
  import Checkbox from "./Checkbox.svelte";

  // Task -> id, value, isDone
  export let tasks = [];

  function handleTaskEdit(value, index) {
    tasks[index].value = value;
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

<div class="h-screen p-8 bg-zinc-950">
  <ul>
    {#each tasks as task, index}
      <li class="flex items-center gap-4">
        <Checkbox
          isChecked={task.isDone}
          handleClick={() => handleTaskCheck(index)}
        />
        <p>{task.value}</p>
        <button>Editar</button>
      </li>
    {/each}
  </ul>
</div>
