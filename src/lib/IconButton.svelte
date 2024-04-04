<script>
  export let onClick = (event = undefined) => {};
</script>

<button on:click={onClick} {...$$restProps}>
  <slot />
</button>

<style>
  button {
    padding: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
    background-color: transparent;
    transition: background-color 200ms;
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
</style>
