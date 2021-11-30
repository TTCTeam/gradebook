export function sortByField(arr, fieldName) {
  return arr.sort((prev, current) => prev[fieldName] - current[fieldName]);
}

export function pass() {
  return 1;
}
