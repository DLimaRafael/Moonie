import { taskFilters } from "../stores/filters";
import { get } from "svelte/store";
import { tagData } from "../stores/tasks";

export function toggleFilterTags(tagId, isAssigned) {
  taskFilters.update((value) => {
    const updatedTags = isAssigned
      ? value.tags.filter((tag) => tag !== tagId)
      : [...value.tags, tagId];

    return {
      ...value,
      tags: updatedTags,
    };
  });
}

export function filterData(data) {
  const filters = get(taskFilters);
  const filterText = filters.text.toLowerCase();
  const childrenList = [];

  if (!filterText && !filters.tags.length) return data;

  const filteredData = data.filter((task) => {
    const isChild = task.parentId;
    const textMatch =
      !filterText || task.value.toLowerCase().includes(filterText);
    const tagMatch =
      !filters.tags.length ||
      (filters.tags.includes("none")
        ? !task.tags.length
        : task.tags.some((tag) => filters.tags.includes(tag)));

    // check if task is a child of another task and matches filters, so it can show
    // parentTask instead.
    if (textMatch && tagMatch && isChild) {
      childrenList.push(task.id);
      return false;
    }

    return textMatch && tagMatch;
  });

  childrenList.length &&
    data.forEach((task) => {
      if (childrenList.some((child) => task.children.includes(child))) {
        !filteredData.some((ftask) => ftask.children.includes(task.id)) &&
          !filteredData.includes(task) &&
          filteredData.push(task);
      }
    });

  return filteredData;
}

export function getFilterTagNames(ids) {
  const tags = get(tagData);
  return tags.filter((tag) => ids.includes(tag.id));
}

export function clearTagFilters() {
  taskFilters.update((value) => ({ ...value, tags: [] }));
}
