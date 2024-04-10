<button type="button" on:click {...$$restProps}>
  <slot />
</button>

<style>
  button {
    padding: 0.5rem;
    width: 2.5rem;
    transition: background-color 200ms;
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
</style>
