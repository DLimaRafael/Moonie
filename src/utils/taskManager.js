import { get } from "svelte/store";
import { taskData } from "../stores/tasks";

export function serializeTask() {
  return {
    id: "",
    value: "",
    isDone: false,
    tags: [],
    children: [],
    parentId: "",
  };
}

export function createTask(data, parentId = "") {
  taskData.update((tasks) => {
    const newTask = { ...data, parentId };
    tasks.push(newTask);

    if (parentId) {
      const parentTask = tasks.find((task) => task.id === parentId);
      if (parentTask) {
        parentTask.children = parentTask.children || [];
        parentTask.children.push(newTask.id);
      }
    }

    return tasks;
  });
}

export function saveTask(data, parentId = "") {
  taskData.update((tasks) => {
    const index = tasks.findIndex((task) => task.id === data.id);
    if (index === -1) return tasks;

    // Update the task with new data
    const updatedTask = { ...tasks[index], ...data };
    tasks[index] = updatedTask;

    // Handle parentId update
    if (parentId) {
      const parentTask = tasks.find((task) => task.id === parentId);
      if (parentTask) {
        updatedTask.parentId = parentId;
        parentTask.isDone = tasks
          .filter((task) => task.parentId === parentId)
          .every((task) => task.isDone);
      }
    } else {
      updatedTask.parentId = data.parentId || "";
    }

    return tasks;
  });
}

export function deleteTask(id) {
  taskData.update((tasks) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    const deletedTask = tasks.find((task) => task.id === id);

    if (deletedTask.parentId) {
      const parentTask = tasks.find((task) => task.id === deletedTask.parentId);
      if (parentTask) {
        parentTask.children = parentTask.children.filter(
          (child) => child !== id
        );
      }
    }

    if (deletedTask?.children?.length) {
      getTaskChildren(id).forEach((childTask) => {
        childTask.parentId = "";
      });
    }

    return filteredTasks;
  });
}

export function getTaskParent(id) {
  const tasks = get(taskData);

  return tasks.find((task) => task.id === id) || {};
}

export function getTaskChildren(id) {
  const tasks = get(taskData);

  // Create a Map of tasks for fast lookups by task id
  const taskMap = new Map(tasks.map((task) => [task.id, task]));

  // Find the parent task
  const parent = taskMap.get(id);
  if (!parent) return []; // If the parent task is not found, return an empty array

  // Get children in the order specified by parent.children
  const orderedChildren = parent.children
    .map((childId) => taskMap.get(childId)) // Use the Map to quickly retrieve each child
    .filter((child) => child !== undefined); // In case any childId is invalid or doesn't exist

  return orderedChildren;
}

export function getTaskProgress(id) {
  const children = getTaskChildren(id);
  return children.filter((child) => child.isDone).length;
}

export function assignTag(taskId, tagId) {
  taskData.update((tasks) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task && !task.tags.includes(tagId)) {
      task.tags.push(tagId);
    }
    return tasks;
  });
}

export function removeTag(taskIds, tagId) {
  taskData.update((tasks) => {
    tasks.forEach((task) => {
      if (taskIds.includes(task.id)) {
        task.tags = task.tags.filter((tag) => tag !== tagId);
      }
    });
    return tasks;
  });
}

export function orderTasks(data) {
  taskData.set(data);
}

export function orderChildren(data, parent) {
  const newChild = data.find((task) => task.parentId !== parent.id);
  if (newChild) saveTask({ ...newChild, parentId: parent.id });
  parent.children = data.map((task) => task.id);
  saveTask(parent);
}
