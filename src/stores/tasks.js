import { get, writable } from "svelte/store";
import { serializeTask } from "../utils/taskManager";

// Load tasks from localStorage or initialize an empty array
const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
const storedTags = JSON.parse(localStorage.getItem("tags")) || [];

// Create a writable store with the initial value from localStorage
export const taskData = writable(storedTasks);
export const tagData = writable(storedTags);

// Current Task for Tag Dialog
export const dialogTask = writable(serializeTask());

// Subscribe to changes in the taskData store
taskData.subscribe((newValue) => {
  // Update localStorage whenever taskData changes
  localStorage.setItem("tasks", JSON.stringify(newValue));

  const currentDialogTaskId = get(dialogTask).id;

  // Find the task corresponding to the current dialog task ID
  const updatedDialogTask = newValue.find((t) => t.id === currentDialogTaskId);

  // If the dialogTask exists in the updated data, update the dialogTask store
  if (updatedDialogTask) {
    dialogTask.set(updatedDialogTask);
  }
});

tagData.subscribe((newValue) => {
  // Update localStorage whenever tagData changes
  localStorage.setItem("tags", JSON.stringify(newValue));
});
