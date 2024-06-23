export const formattedDate = (date) => {
  return new Date(date).toLocaleTimeString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function createFormData(values) {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("content", values.content);
  formData.append("published", values.published || false);
  if (values.coverImage) {
    formData.append("coverImage", values.coverImage);
  }
  const tagsString = values.tags.join(","); // Convert array to comma-separated string
  formData.append("tags", tagsString);
  return formData;
}