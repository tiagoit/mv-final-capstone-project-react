export function prettifySlug(category) {
  return category.replace('-', ' ').replace(/^\w|\s\w/g, c => c.toUpperCase());
}

export function add(a, b) {
  return a + b;
}
