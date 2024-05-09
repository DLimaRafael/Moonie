import { get } from "svelte/store";
import { taskData } from "../stores/tasks";

export function serializeTask() {
  return {
    id: "",
    value: "",
    isDone: "",
    tags: [],
    children: [],
    parentId: "",
  };
}

export function createTask(data, parentId = "") {
  taskData.update((tasks) => {
    tasks.push({
      ...data,
      parentId,
    });

    if (parentId) {
      const parentTask = tasks.find((task) => task.id === parentId);
      if (parentTask) {
        if (!parentTask.children) {
          parentTask.children = [];
        }
        parentTask.children.push(data.id);
      }
    }

    return tasks;
  });
}

export function saveTask(data, parentId = "") {
  taskData.update((tasks) => {
    const index = tasks.findIndex((task) => task.id === data.id);
    if (index === -1) return;

    tasks[index] = data;

    if (parentId) {
      const parentTask = tasks.find((task) => task.id === parentId);
      if (parentTask) {
        parentTask.isDone =
          parentTask.children.length === getTaskProgress(parentTask.id);
      }
    }

    return tasks;
  });
}

export function deleteTask(id, parentId) {
  taskData.update((tasks) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    const deletedTask = tasks.find((task) => task.id === id);

    // if task is a child
    if (parentId) {
      const parentTask = tasks.find((task) => task.id === parentId);
      if (parentTask && parentTask.children) {
        parentTask.children = parentTask.children.filter(
          (child) => child !== id
        );
      }
    }

    // if task is a parent
    if (deletedTask.children.length) {
      getTaskChildren(id).forEach((task) => {
        saveTask({
          ...task,
          parentId: "",
        });
      });
    }
    return filteredTasks;
  });
}

export function getTaskChildren(id) {
  const tasks = get(taskData);
  const taskMap = new Map(tasks.map((task) => [task.id, task]));

  const parentTask = taskMap.get(id);

  if (!parentTask || !parentTask.children) {
    return []; // Return an empty array if the parent task doesn't exist or has no children
  }

  const children = [];

  for (const childId of parentTask.children) {
    const childTask = taskMap.get(childId);
    if (childTask) {
      children.push(childTask);
    }
  }

  return children;
}

export function getTaskProgress(id) {
  const children = getTaskChildren(id);
  let doneCount = 0;

  for (const child of children) {
    if (child.isDone) {
      doneCount++;
    }
  }

  return doneCount;
}

export function assignTag(taskId, tagId) {
  taskData.update((tasks) => {
    const task = tasks.find((task) => task.id === taskId);

    task.tags.push(tagId);

    return tasks;
  });
}

export function removeTag(taskIds, tagId) {
  taskData.update((tasks) => {
    taskIds.forEach((taskId) => {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        task.tags = task.tags.filter((tag) => tag !== tagId);
      }
    });

    return tasks;
  });
}

export function orderTasks(data) {
  // console.log(data);
  taskData.set(data);
}

export function orderChildren(data, parent) {
  const orderedIds = data.map((task) => task.id);
  // console.log(orderedIds);
  parent.children = orderedIds;
  saveTask(parent);
}
