<button type="button" on:click {...$$restProps}>
  <slot />
</button>

<style>
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    min-width: 2rem;
    transition: background-color 200ms;
    &:hover {
      filter: brightness(1.15);
    }
  }
</style>
