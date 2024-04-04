<script>
  import { CheckOutline } from "flowbite-svelte-icons";

  export let isChecked = false;
  export let handleClick = () => {};

  $: background = isChecked
    ? "bg-green-400 border-none"
    : "bg-transparent border border-green-400";
  $: iconBackground = isChecked ? "text-zinc-800" : "text-transparent";
  $: size = "w-6 h-6";
</script>

<button
  type="button"
  class="flex items-center justify-center {size} rounded-lg p-0 {background}"
  on:click={handleClick}
>
  <CheckOutline class={iconBackground} />
</button>
