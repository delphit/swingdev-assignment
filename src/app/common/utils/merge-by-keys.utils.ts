/**
 * Merge objects via fields iteration
 */
export const mergeByKeys = (target, source) => {
  Object.keys(source).map(key => (target[key] = source[key]));
  return target;
};
