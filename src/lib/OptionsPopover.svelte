<script>
  import { onDestroy, onMount } from "svelte";

  $: position = {
    top: "auto",
    left: "auto",
  };

  function calculatePosition() {
    const optionsBtn = document.getElementById("options-button");
    if (optionsBtn) {
      const btnRect = optionsBtn.getBoundingClientRect();
      position.top = `${btnRect.y + btnRect.height + 10}px`;
      position.left = `${btnRect.x}px`;
    }
  }

  onMount(() => {
    calculatePosition();
    window.addEventListener("resize", calculatePosition);
  });

  onDestroy(() => {
    window.removeEventListener("resize", calculatePosition);
  });
</script>

<div
  id="options-popover"
  popover="auto"
  class="m-0 p-2 bg-zinc-700 bg-opacity-50 shadow-xl rounded-md overflow-hidden"
  style="top: {position.top}; left: {position.left}"
>
  <ul class="overflow-y-auto flex flex-col gap-1">
    <button class="func-button">Import Data</button>
    <button class="func-button">Export Data</button>
  </ul>
</div>

<style>
  div[popover] {
    backdrop-filter: blur(5px);
  }

  .func-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>
