<script>
  import TaskList from "./lib/TaskList.svelte";

  const tasks = [];
</script>

<main class="h-screen p-8 bg-zinc-800">
  <TaskList {tasks} />
</main>
