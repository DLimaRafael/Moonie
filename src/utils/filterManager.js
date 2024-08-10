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

  return data.filter((task) => {
    const textMatch =
      !filterText || task.value.toLowerCase().includes(filterText);
    const tagMatch =
      !filters.tags.length ||
      (filters.tags.includes("none")
        ? !task.tags.length
        : task.tags.some((tag) => filters.tags.includes(tag)));

    return textMatch && tagMatch;
  });
}

export function getFilterTagNames(ids) {
  const tags = get(tagData);
  return tags.filter((tag) => ids.includes(tag.id));
}

export function clearTagFilters() {
  taskFilters.update((value) => ({ ...value, tags: [] }));
}
