<script>
  export let isChecked = false;
  export let handleClick = () => {};

  $: background = isChecked ? "bg-zinc-400" : "none";
</script>

<button
  class="w-6 h-6 rounded-full overflow-hidden border-2 border-zinc-400 p-0 {background}"
  on:click={handleClick}
/>
