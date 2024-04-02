<script>
  export let isChecked = false;
  export let handleClick = () => {};

  $: background = isChecked ? "bg-zinc-400" : "none";
  $: size = "w-6 h-6";
</script>

<button
  class="{size} rounded-sm border-2 border-zinc-400 p-0 {background}"
  on:click={handleClick}
/>
