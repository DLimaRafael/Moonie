import { taskFilters } from "../stores/filters";
import { get } from "svelte/store";
import { tagData } from "../stores/tasks";

export function toggleFilterTags(tagId, isAssigned) {
  taskFilters.update((value) => {
    let tags = value.tags;

    if (isAssigned) {
      tags = tags.filter((tag) => tag !== tagId);
    } else {
      tags.push(tagId);
    }

    return {
      text: value.text,
      tags: tags,
    };
  });
}

export function filterData(data) {
  const filters = get(taskFilters);

  return data.filter((task) => {
    const textMatch =
      !filters.text ||
      task.value.toLowerCase().includes(filters.text.toLowerCase());
    const tagMatch =
      filters.tags.length === 0 ||
      task.tags.some((tag) => filters.tags.includes(tag));

    return textMatch && tagMatch;
  });
}

export function getFilterTagNames(ids) {
  const tags = get(tagData);

  const filtered = tags.filter((tag) => ids.includes(tag.id));
  return filtered;
}

export function clearTagFilters() {
  taskFilters.update((value) => {
    return {
      text: value.text,
      tags: [],
    };
  });
}
