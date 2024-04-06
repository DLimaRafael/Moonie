<script>
  import { CheckOutline } from "flowbite-svelte-icons";

  export let isChecked = false;
  export let handleClick = () => {};

  $: background = isChecked
    ? "bg-zinc-400 border-none"
    : "bg-transparent border border-zinc-400";
  $: iconBackground = isChecked ? "text-zinc-800" : "text-transparent";
  $: size = "w-6 h-6";
</script>

<button
  type="button"
  class="flex items-center justify-center {size} rounded-sm p-0 {background}"
  on:click={handleClick}
>
  <CheckOutline class={iconBackground} />
</button>
