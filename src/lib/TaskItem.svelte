<script>
  import Checkbox from "./Checkbox.svelte";

  export let task = {
    value: "",
    isDone: false,
  };
  export let index = 0;
  export let handleTaskCheck = (index) => {};
  export let handleEditTask = (value, index) => {};

  $: fontStyling = task.isDone ? "text-slate-500" : "";
  let inputValue = task.value;

  function handleBlur(event) {
    const value = event.target.value;

    if (value !== task.value) {
      handleEditTask(value, index);
    }
  }
</script>

{@debug task}

<li class="flex items-center gap-4 h-10">
  <Checkbox
    isChecked={task.isDone}
    handleClick={() => handleTaskCheck(index)}
  />
  <input
    id={String(index)}
    class="{fontStyling} p-2 bg-transparent w-10/12 resize-none"
    on:blur={handleBlur}
    bind:value={inputValue}
  />
  <div class="flex gap-4 items-center">
    <button>Deletar</button>
  </div>
</li>

<style>
  input:focus {
    border-bottom: 2px solid theme("colors.zinc.700");
  }
</style>
