import { dialogTask } from "../stores/tasks";
import { createTask, serializeTask } from "./taskManager";

export function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(3, 5);
}

export function handleDialog(task) {
  const dialog = document.querySelector("dialog");
  dialogTask.set(task);
  dialog.showModal();
}

export function handleAddTask(value, parentId = "") {
  let newTask = serializeTask();
  newTask = {
    ...newTask,
    id: generateUniqueId(),
    value: value,
  };

  createTask(newTask, parentId);
}
