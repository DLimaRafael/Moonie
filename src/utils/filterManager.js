import { taskFilters } from "../stores/filters";

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
