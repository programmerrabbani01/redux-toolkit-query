// create a slug

export const createSlug = (title) => {
  const cleanedTitle = title.replace(/[^\w\s]/gi, "").toLowerCase();

  const slug = cleanedTitle.replace(/\s+/g, "-");

  return slug;
};
