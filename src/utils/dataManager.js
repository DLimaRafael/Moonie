import { taskData } from "../stores/tasks";

let newData = [];

export function saveTask(data, parentId) {
  taskData.update((tasks) => {
    const index = tasks.findIndex((task) => task.id === data.id);
    if (index !== -1) {
      tasks[index] = data;
    } else {
      tasks.push(data);
    }

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

  return data;
}

export function deleteTask(id, parentId) {
  taskData.update((tasks) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    if (parentId) {
      const parentTask = tasks.find((task) => task.id === parentId);
      if (parentTask && parentTask.children) {
        parentTask.children = parentTask.children.filter(
          (child) => child !== id
        );
      }
    }

    return filteredTasks;
  });
}
