import { createTask, serializeTask } from "./taskManager";

export function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(3, 5);
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
