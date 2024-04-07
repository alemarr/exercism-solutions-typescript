export function flatten(list: unknown[]) {
  let result: unknown[] = [];

  for (const item of list) {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else if (typeof item !== "undefined" && item !== null) {
      result.push(item);
    }
  }

  return result;
}
