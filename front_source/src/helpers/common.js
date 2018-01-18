// Only returns true if item is neither null or undefined
export function exists(item) {
  return item !== null && item !== undefined
}

// Take a base structure, patch it and return duplicate
export function baseObject(base, obj) {
  return Object.assign(Object.assign({}, base), obj)
}
