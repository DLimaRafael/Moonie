<script>
  import { CheckOutline } from "flowbite-svelte-icons";

  export let isChecked = false;
  export let progress = null;
  export let total = 0;

  $: background = isChecked ? "bg-zinc-400" : "bg-transparent";
  $: iconBackground = isChecked ? "text-zinc-800" : "text-transparent";
  $: fontBackground = isChecked ? "text-zinc-800" : "text-zinc-400";
  $: size = total ? "min-w-8 h-6" : "w-6 h-6";
</script>

<button
  type="button"
  class="flex items-center select-none justify-center {size} rounded-sm p-0 border border-zinc-400 {background}"
  on:click
>
  {#if !total}
    <CheckOutline class={iconBackground} />
  {:else}
    <span class="text-xs p-1 {fontBackground}">{progress}/{total}</span>
  {/if}
</button>
