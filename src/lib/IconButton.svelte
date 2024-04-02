<button {...$$restProps}>
  <slot />
</button>

<style>
  button {
    background-color: transparent;
    transition: background-color 200ms;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
</style>
