<script>
  import TaskList from "./lib/TaskList.svelte";

  const tasks = [
    { value: "tarefa 1", isDone: false },
    { value: "tarefa 2", isDone: false },
    { value: "tarefa 3", isDone: false },
    { value: "tarefa 4", isDone: false },
    { value: "tarefa 5", isDone: false },
  ];
</script>

<main class="h-screen p-8 bg-zinc-950">
  <TaskList {tasks} />
</main>
