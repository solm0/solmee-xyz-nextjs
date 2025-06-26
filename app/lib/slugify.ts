export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')     // remove special chars
    .replace(/\s+/g, '-')         // replace spaces with -
}