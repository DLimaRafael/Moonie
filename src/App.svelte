<script>
  import TaskList from "./lib/TaskList.svelte";

  const tasks = [{ value: "tarefa 1", isDone: false }];
</script>

<main class="h-screen p-8 bg-zinc-950">
  <TaskList {tasks} />
</main>
