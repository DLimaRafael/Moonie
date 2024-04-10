import { writable } from "svelte/store";

// Load tasks from localStorage or initialize an empty array
const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Create a writable store with the initial value from localStorage
export const taskData = writable(storedTasks);

// Subscribe to changes in the taskData store
taskData.subscribe((newValue) => {
  // Update localStorage whenever taskData changes
  localStorage.setItem("tasks", JSON.stringify(newValue));
});
