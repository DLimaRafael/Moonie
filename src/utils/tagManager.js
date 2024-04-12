import { get } from "svelte/store";
import { tagData } from "../stores/tasks";
import { generateUniqueId } from "./dataManager";

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
  tagData.update((tags) => {
    const tagMap = new Map(tags.map((tag) => [tag.id, tag]));

    tagMap.delete(id);

    return Array.from(tagMap.values());
  });
}

export function getTags(ids) {
  const tags = get(tagData);
  return tags.filter((tag) => ids.includes(tag.id));
}
