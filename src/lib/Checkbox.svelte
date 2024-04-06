<script>
  import { CheckOutline } from "flowbite-svelte-icons";

  export let isChecked = false;
  export let progress = null;
  export let total = 0;

  $: background = isChecked
    ? "bg-zinc-400 border-none"
    : "bg-transparent border border-zinc-400";
  $: iconBackground = isChecked ? "text-zinc-800" : "text-transparent";
  $: fontBackground = isChecked ? "text-zinc-800" : "text-zinc-400";
  $: size = total ? "w-8 h-6" : "w-6 h-6";
</script>

<button
  type="button"
  class="flex items-center justify-center {size} rounded-sm p-0 {background}"
  on:click
>
  {#if !total}
    <CheckOutline class={iconBackground} />
  {:else}
    <span class="text-xs {fontBackground}">{progress}/{total}</span>
  {/if}
</button>
