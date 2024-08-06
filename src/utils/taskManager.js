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

export function deleteTask(id, parentId) {
  taskData.update((tasks) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    const deletedTask = tasks.find((task) => task.id === id);

    if (parentId) {
      const parentTask = tasks.find((task) => task.id === parentId);
      if (parentTask) {
        parentTask.children = parentTask.children.filter(
          (child) => child !== id
        );
      }
    }

    if (deletedTask?.children?.length) {
      getTaskChildren(id).forEach((childTask) => {
        childTask.parentId = "";
        saveTask(childTask);
      });
    }

    return filteredTasks;
  });
}

export function getTaskChildren(id) {
  const tasks = get(taskData);
  const parentTask = tasks.find((task) => task.id === id);

  if (!parentTask || !parentTask.children) {
    return [];
  }

  return parentTask.children
    .map((childId) => tasks.find((task) => task.id === childId))
    .filter(Boolean);
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
  const newTask = data.find((task) => !task.parentId);
  if (newTask) {
    saveTask(newTask, parent.id);
  }
  parent.children = data.map((task) => task.id);
  saveTask(parent);
}
