<script>
  import {
    CheckPlusCircleOutline,
    CheckPlusCircleSolid,
    PlusOutline,
    TrashBinSolid,
  } from "flowbite-svelte-icons";
  import Checkbox from "./Checkbox.svelte";
  import IconButton from "./IconButton.svelte";

  export let task = {
    value: "",
    isDone: false,
  };
  export let index;
  export let handleCheckTask = (index) => {};
  export let handleEditTask = (value, index) => {};
  export let handleDeleteTask = (index) => {};
  let inputValue = task.value;
  let inputLock = true;
  let btnShow = false;

  $: fontStyling = task.isDone ? "text-slate-500" : "";
  $: inputStyling = inputLock ? "cursor-pointer select-none" : "";
  $: itemStyling = inputLock ? "" : "shadow-lg bg-zinc-700";

  function toggleBtnShow() {
    btnShow = !btnShow;
  }

  function toggleLock(value = !inputLock) {
    inputLock = value;
  }

  function handleKey(event) {
    if (event.key === "Escape") handleBlur();
  }

  function handleBlur(event) {
    if (!inputValue.trim()) {
      inputValue = task.value;
    }
    toggleLock(true);
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
    on:mouseenter={toggleBtnShow}
    on:mouseleave={toggleBtnShow}
    class="flex items-center transition-all rounded-md gap-2 h-10 pl-2 hover:bg-zinc-700 overflow-hidden {itemStyling}"
  >
    <Checkbox
      isChecked={task.isDone}
      handleClick={() => handleCheckTask(index)}
    />
    <input
      class="{fontStyling} {inputStyling} bg-transparent flex-1"
      bind:value={inputValue}
      on:click={() => toggleLock(false)}
      on:focus={() => toggleLock(false)}
      on:blur={handleBlur}
      on:keydown={handleKey}
      readonly={inputLock}
      placeholder="Enter to delete // Esc to undo changes."
    />
    <div class="h-full flex">
      {#if btnShow}
        <IconButton class="rounded-none">
          <CheckPlusCircleSolid class="text-zinc-300" />
        </IconButton>
        <IconButton
          onClick={() => handleDeleteTask(index)}
          class="rounded-none"
        >
          <TrashBinSolid class="text-red-400" />
        </IconButton>
      {/if}
    </div>
  </form>
</li>
