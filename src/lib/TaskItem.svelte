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

  function toggleBtnShow(value = !btnShow) {
    btnShow = !inputLock ? true : value;
  }

  function toggleLock(value = !inputLock) {
    inputLock = value;
  }

  function handleKey(event) {
    if (event.key === "Escape") handleBlur();
  }

  function handleBlur(event) {
    const value = inputValue.trim() || task.value;
    inputValue = value;

    if (value !== task.value) {
      handleEditTask(value, task.id);
    }
    toggleLock(true);
    toggleBtnShow(false);
  }

  function onDelete() {
    handleDeleteTask(task.id, parentId);
  }

  function onAddChild() {
    handleAddChild(task.id);
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
    on:mouseenter={() => toggleBtnShow(true)}
    on:mouseleave={() => toggleBtnShow(false)}
    class="flex items-center transition-all rounded-md gap-1 h-10 pl-2 hover:bg-zinc-700 overflow-hidden {itemStyling}"
  >
    <Checkbox
      isChecked={task.isDone}
      handleClick={() => handleCheckTask(task.id)}
    />
    <input
      class="{fontStyling} {inputStyling} bg-transparent flex-1 border-none"
      bind:value={inputValue}
      on:focus={() => toggleLock(false)}
      on:blur={handleBlur}
      on:keydown={handleKey}
      readonly={inputLock}
      placeholder={task.value || "..."}
    />
    <div class="h-full flex">
      {#if btnShow}
        {#if !parentId}
          <IconButton on:click={onAddChild} class="rounded-none p-20">
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
