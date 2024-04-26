<script>
  import {
    CheckPlusCircleOutline,
    TagSolid,
    TrashBinSolid,
  } from "flowbite-svelte-icons";
  import Checkbox from "./Checkbox.svelte";
  import IconButton from "./IconButton.svelte";
  import { dialogTask } from "../stores/tasks";
  import { onMount } from "svelte";

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
  let textarea;

  const hasChildren = !!task.children.length;

  $: isTagOpen = $dialogTask.id === task.id;
  $: complete = task.isDone;
  $: btnShow = !inputLock || isMouseOver || isTagOpen;
  $: fontStyling = complete ? "text-slate-500" : "text-slate-300";
  $: inputStyling = inputLock ? "cursor-pointer select-none" : "";
  $: itemStyling = !inputLock || isTagOpen ? "shadow-lg bg-zinc-700" : "";
  $: btnDivStyling = btnShow ? "opacity-100" : "opacity-0";

  function toggleLock(value = !inputLock) {
    inputLock = value;
  }

  function toggleMouseOver(value = !isMouseOver) {
    isMouseOver = value;
  }

  function handleKey(event) {
    if (event.key === "Escape") handleBlur();
    if (event.key === "Enter" && !event.shiftKey) handleSubmit();
    if (event.ctrlKey && event.key === "Enter") {
      handleAddTask("");
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

  function adjustTextareaHeight() {
    textarea.style.height = "auto";
    textarea.style.height = `${Math.max(textarea.scrollHeight, calculateTextareaHeight())}px`;
  }

  function calculateTextareaHeight() {
    const clone = textarea.cloneNode(true);
    clone.style.visibility = "hidden";
    clone.style.position = "absolute";
    clone.style.height = "auto";
    clone.style.width = `${textarea.offsetWidth}px`;
    clone.value = textarea.placeholder;
    document.body.appendChild(clone);
    const height = clone.scrollHeight;
    document.body.removeChild(clone);
    return height;
  }

  function handleTextareaResize(entries) {
    for (const entry of entries) {
      if (entry.target === textarea) {
        adjustTextareaHeight();
        break;
      }
    }
  }

  onMount(() => {
    textarea = document.getElementById(`${task.id}-textarea`);

    textarea.addEventListener("input", () => {
      if (textarea.value.trim() !== "") {
        textarea.style.height = `${textarea.scrollHeight}px`;
      } else {
        adjustTextareaHeight();
      }
    });

    const resizeObserver = new ResizeObserver(handleTextareaResize);
    resizeObserver.observe(textarea);
  });
</script>

<li
  id="{task.id}-item"
  class="rounded-md hover:bg-zinc-700 transition-all overflow-hidden {itemStyling}"
>
  <form
    on:submit={handleSubmit}
    on:mouseenter={() => toggleMouseOver(true)}
    on:mouseleave={() => toggleMouseOver(false)}
    class="flex items-center gap-1 min-h-10 h-fit pl-2"
  >
    <Checkbox
      isChecked={complete}
      on:click={onCheck}
      progress={childrenProgress}
      total={task.children.length}
    />
    <textarea
      id={`${task.id}-textarea`}
      class="{fontStyling} {inputStyling} bg-transparent flex-1 border-none resize-none overflow-hidden"
      bind:value={inputValue}
      on:click={handleFocus}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:keydown={handleKey}
      rows="1"
      readonly={inputLock}
      placeholder={task.value || "..."}
    />
    <div class="h-full flex {btnDivStyling} transition-all">
      {#if btnShow}
        {#if !parentId}
          <IconButton on:click={onAddChild} class="rounded-none bg-transparent">
            <CheckPlusCircleOutline class="text-zinc-300" />
          </IconButton>
        {/if}
        <IconButton
          on:click={(e) => handleDialog(task)}
          class="rounded-none bg-transparent"
        >
          <TagSolid class="text-zinc-300" />
        </IconButton>
        <IconButton on:click={onDelete} class="rounded-none bg-transparent">
          <TrashBinSolid class="text-red-400" />
        </IconButton>
      {/if}
    </div>
  </form>
</li>
