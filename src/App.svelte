<script>
  import TaskList from "./lib/TaskList.svelte";
</script>

<main class="w-screen h-screen p-6 bg-zinc-800">
  <TaskList />
</main>

<style>
  @media (max-width: 480px) {
    main {
      padding: 16px 8px;
    }
  }
</style>
