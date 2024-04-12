<script>
  export let tag, tagList;
  export let handleCheck;

  $: checked = tagList.includes(tag.id);
  $: tagStyling = checked
    ? "font-extrabold text-zinc-300"
    : "font-regular text-slate-500";
  $: nameStyling = checked ? "font-bold" : "text-slate-500";
</script>

<button
  on:click={handleCheck(tag.id, checked)}
  class="flex items-center gap-1 text-left w-full p-2 rounded-none"
>
  <p class={tagStyling}>#</p>
  <p class={nameStyling}>{tag.value}</p>
</button>

<style>
  button:hover {
    filter: brightness(1.2);
  }
</style>
