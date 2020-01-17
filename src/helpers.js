export const prettifySlug = (category) => (
  category.replace('-', ' ').replace(/^\w|\s\w/g, c => c.toUpperCase())
);
