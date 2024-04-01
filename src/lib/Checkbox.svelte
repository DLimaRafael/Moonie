<script>
  export let isChecked = false;
  export let handleClick = () => {};

  $: background = isChecked ? "bg-zinc-400" : "none";
  $: size = "w-4 h-4"
</script>

<button
  class="{size} rounded-full overflow-hidden border-2 border-zinc-400 p-0 {background}"
  on:click={handleClick}
/>
