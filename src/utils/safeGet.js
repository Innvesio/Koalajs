/**
 * A null-safe utility to safely access nested properties in an object.
 * @param {object} obj - The object to access.
 * @param {string[]} path - An array representing the path of keys.
 * @param {*} defaultValue - The value to return if the path does not exist.
 * @returns {*} - The value at the specified path or the default value.
 */
export function safeGet(obj, path, defaultValue = null) {
  return path.reduce((acc, key) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
      return acc[key];
    }
    return defaultValue;
  }, obj);
}
