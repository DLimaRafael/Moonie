import { get, writable } from "svelte/store";
import { serializeTask } from "../utils/taskManager";

// Function to get stored data or initialize an empty array
const getStoredData = (key) => JSON.parse(localStorage.getItem(key)) || [];

// Create writable stores with initial values from localStorage
export const taskData = writable(getStoredData("tasks"));
export const tagData = writable(getStoredData("tags"));

// Current Task for Tag Dialog
export const dialogTask = writable(serializeTask());

// Function to update localStorage
const updateLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

// Subscribe to changes in the taskData store
taskData.subscribe((newTasks) => {
  updateLocalStorage("tasks", newTasks);

  const currentDialogTaskId = get(dialogTask).id;
  const updatedDialogTask = newTasks.find((t) => t.id === currentDialogTaskId);

  if (updatedDialogTask) {
    dialogTask.set(updatedDialogTask);
  }
});

// Subscribe to changes in the tagData store
tagData.subscribe((newTags) => {
  updateLocalStorage("tags", newTags);
});
