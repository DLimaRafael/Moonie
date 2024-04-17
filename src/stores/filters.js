import { writable } from "svelte/store";

export const taskFilters = writable({
  text: "",
  tags: [],
});
