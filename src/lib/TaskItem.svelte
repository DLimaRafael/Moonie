<script>
  import Checkbox from "./Checkbox.svelte";

  export let task = {
    value: "",
    isDone: false,
  };
  export let index;
  export let handleCheckTask = (index) => {};
  export let handleEditTask = (value, index) => {};
  export let handleDeleteTask = (index) => {};

  $: fontStyling = task.isDone ? "text-slate-500" : "";
  let inputValue = task.value;
  let inputLock = true;

  function toggleLock() {
    inputLock = !inputLock;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const value = inputValue.trim();
    if (!value) {
      handleDeleteTask(index);
      return;
    }
    if (value !== task.value) {
      handleEditTask(value, index);
      toggleLock();
    }
  }
</script>

<li>
  <form
    on:submit={handleSubmit}
    class="flex items-center rounded-md gap-2 h-10 p-2 hover:bg-zinc-700"
  >
    <Checkbox
      isChecked={task.isDone}
      handleClick={() => handleCheckTask(index)}
    />
    <input
      class="{fontStyling} bg-transparent w-11/12"
      bind:value={inputValue}
      readonly={inputLock}
    />
  </form>
</li>
