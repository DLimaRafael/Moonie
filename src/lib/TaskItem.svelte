<script>
  import { CheckPlusCircleOutline, TrashBinSolid } from "flowbite-svelte-icons";
  import Checkbox from "./Checkbox.svelte";
  import IconButton from "./IconButton.svelte";

  export let task = {
    id: "",
    value: "",
    isDone: false,
    children: [],
  };
  export let handleCheckTask;
  export let handleEditTask;
  export let handleDeleteTask;
  export let handleAddChild;
  export let parentId = "";

  let inputLock = true;
  let btnShow = false;
  let inputValue = task.value;

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

  function onDelete() {
    handleDeleteTask(task.id, parentId);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const value = inputValue.trim();
    if (!value) {
      onDelete();
      return;
    }
    if (value !== task.value) {
      handleEditTask(value, task.id);
      toggleLock();
    }
  }
</script>

<li>
  <form
    on:submit={handleSubmit}
    on:mouseenter={toggleBtnShow}
    on:mouseleave={toggleBtnShow}
    class="flex items-center transition-all rounded-md gap-2 min-h-10 pl-2 hover:bg-zinc-700 overflow-hidden {itemStyling}"
  >
    <Checkbox
      isChecked={task.isDone}
      handleClick={() => handleCheckTask(task.id)}
    />
    <input
      class="{fontStyling} {inputStyling} bg-transparent flex-1 border-none"
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
        {#if !parentId}
          <IconButton
            on:click={() => handleAddChild(task.id)}
            class="rounded-none"
          >
            <CheckPlusCircleOutline class="text-zinc-300" />
          </IconButton>
        {/if}
        <IconButton on:click={onDelete} class="rounded-none">
          <TrashBinSolid class="text-red-400" />
        </IconButton>
      {/if}
    </div>
  </form>
</li>
