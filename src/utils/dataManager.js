export const defaultData = JSON.parse(localStorage.getItem("tasks")) ?? [];

export function saveTask(data, parentId) {
  let newData = defaultData;
  const index = defaultData.findIndex((task) => task.id === data.id);

  if (index !== -1) {
    newData[index] = data;
  } else {
    newData.push(data);
  }

  if (parentId) {
    newData.find((task) => task.id === parentId)?.children.push(data.id);
  }

  localStorage.setItem("tasks", JSON.stringify(newData));

  return data;
}

export function deleteTask(data, parentId) {
  let newData = defaultData.filter((task) => task.id !== data.id);

  if (parentId) {
    const parentIndex = newData.findIndex((task) => task.id === parentId);
    newData[parentIndex].children = newData[parentIndex].children.filter(
      (child) => child !== data.id
    );
  }

  localStorage.setItem("tasks", JSON.stringify(newData));
}
