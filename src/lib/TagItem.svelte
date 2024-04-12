<script>
  export let tag, checked;

  $: boxStyling = checked ? "bg-zinc-300" : "bg-inherit border border-zinc-300";
</script>

<button
  on:click
  class="flex items-center gap-2 text-left w-full p-2 rounded-none"
>
  <div class="w-4 h-4 rounded-sm {boxStyling}" />
  <p>{tag.value}</p>
</button>

<style>
  button:hover {
    filter: brightness(1.2);
  }
</style>
