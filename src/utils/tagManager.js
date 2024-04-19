import { get } from "svelte/store";
import { tagData, taskData } from "../stores/tasks";
import { generateUniqueId } from "./dataManager";
import { removeTag } from "./taskManager";
import { taskFilters } from "../stores/filters";

export function serializeTag() {
  return {
    id: generateUniqueId(),
    value: "",
  };
}

export function createTag(data) {
  tagData.update((tags) => {
    tags.push(data);

    return tags;
  });
}

export function saveTag(data) {
  tagData.update((tags) => {
    const tagMap = new Map(tags.map((tag) => [tag.id, tag]));

    tagMap.set(data.id, data);

    return Array.from(tagMap.values());
  });
}

export function deleteTag(id) {
  // get all tasks with this tag
  const tasksToUpdate = get(taskData)
    .filter((task) => task.tags.includes(id))
    .map((task) => task.id);
  removeTag(tasksToUpdate, id);
  tagData.update((tags) => {
    const tagMap = new Map(tags.map((tag) => [tag.id, tag]));

    tagMap.delete(id);

    return Array.from(tagMap.values());
  });
  // Remove tag from filter
  taskFilters.update((value) => {
    return {
      text: value.text,
      tags: value.tags.filter((tag) => tag !== id),
    };
  });
}

export function getTags(ids) {
  const tags = get(tagData);
  return tags.filter((tag) => ids.includes(tag.id));
}
