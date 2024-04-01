<script>
  import Checkbox from "./Checkbox.svelte";

  export let task = {}
  export let index = 0
  export let handleTaskCheck = index => {}

  $: fontStyling = task.isDone ? "text-slate-500" : ""
</script>

<li class="flex items-center gap-4">
    <Checkbox
      isChecked={task.isDone}
      handleClick={() => handleTaskCheck(index)}
    />
    <p class="{fontStyling} select-none w-10/12">{task.value}</p>
    <button>Editar</button>
  </li>