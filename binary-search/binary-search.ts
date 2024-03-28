export const find = (haystack: number[], needle: number) => {
  return findRecursively(haystack, needle, 0, haystack.length - 1);
};

const findRecursively = (
  haystack: number[],
  needle: number,
  left: number,
  right: number
): number => {
  if (left > right) {
    throw new Error("Value not in array");
  }

  let mid = Math.round((left + right) / 2);

  if (haystack[mid] > needle) {
    right = mid - 1;
    return findRecursively(haystack, needle, left, right);
  }

  if (haystack[mid] < needle) {
    left = mid + 1;
    return findRecursively(haystack, needle, left, right);
  }

  return mid;
};
