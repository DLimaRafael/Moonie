<script>
  import {
    CheckPlusCircleOutline,
    RefreshOutline,
    TagSolid,
    TrashBinSolid,
  } from "flowbite-svelte-icons";
  import Checkbox from "./Checkbox.svelte";
  import IconButton from "./IconButton.svelte";
  import { dialogTask } from "../stores/tasks";

  export let task = {
    id: "",
    value: "",
    isDone: false,
    children: [],
  };
  export let handleSave = (value, parentId) => {};
  export let handleDelete = (id, parentId) => {};
  export let handleAddTask = (value, parentId) => {};
  export let handleDialog = (value) => {};
  export let childrenProgress = null;
  export let parentId = "";

  let inputLock = true;
  let inputValue = task.value;
  let isMouseOver = false;

  const hasChildren = !!task.children.length;

  $: isTagOpen = $dialogTask.id === task.id;
  $: complete = task.isDone;
  $: btnShow = !inputLock || isMouseOver || isTagOpen;
  $: fontStyling = complete ? "text-slate-500" : "text-slate-400";
  $: inputStyling = inputLock ? "cursor-pointer select-none" : "";
  $: itemStyling = !inputLock || isTagOpen ? "shadow-lg bg-zinc-700" : "";

  function toggleLock(value = !inputLock) {
    inputLock = value;
  }

  function toggleMouseOver(value = !isMouseOver) {
    isMouseOver = value;
  }

  function handleKey(event) {
    if (event.key === "Escape") handleBlur();
    if (event.ctrlKey && event.key === "Enter") {
      handleAddTask("");
    }
    if (event.shiftKey && event.key === "Enter") {
      handleAddTask("", parentId || task.id);
    }
  }

  function handleFocus(event) {
    toggleLock(false);
  }

  function handleBlur(event) {
    if (!inputValue) {
      inputValue = task.value;
    } else {
      handleSubmit();
    }
    toggleLock(true);
  }

  function onDelete() {
    handleDelete(task.id, parentId);
  }

  function onAddChild() {
    handleAddTask("", task.id);
  }

  function onCheck() {
    if (hasChildren && childrenProgress === task.children.length) return;
    const newData = {
      ...task,
      isDone: !task.isDone,
    };
    handleSave(newData, parentId);
  }

  function handleSubmit(event) {
    toggleLock(true);
    event?.preventDefault();
    const value = inputValue.trim();
    if (!value) {
      onDelete();
      return;
    }
    if (value !== task.value) {
      handleSave({
        ...task,
        value: value,
      });
    }
  }
</script>

<li id="{task.id}-item" class="relative">
  <form
    on:submit={handleSubmit}
    on:mouseenter={() => toggleMouseOver(true)}
    on:mouseleave={() => toggleMouseOver(false)}
    class="flex items-center transition-all rounded-md gap-1 h-10 pl-2 hover:bg-zinc-700 overflow-hidden {itemStyling}"
  >
    <Checkbox
      isChecked={complete}
      on:click={onCheck}
      progress={childrenProgress}
      total={task.children.length}
    />
    <input
      class="{fontStyling} {inputStyling} bg-transparent flex-1 border-none"
      bind:value={inputValue}
      on:click={handleFocus}
      on:focus={handleFocus}
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
        <IconButton on:click={(e) => handleDialog(task)} class="rounded-none">
          <TagSolid class="text-zinc-300" />
        </IconButton>
        <IconButton on:click={onDelete} class="rounded-none">
          <TrashBinSolid class="text-red-400" />
        </IconButton>
      {/if}
    </div>
  </form>
</li>
