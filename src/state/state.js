export const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = deepClone(obj[key]);
    return acc;
  }, {});
};

export const mergeState = (state, updates) => {
  if (typeof state !== "object" || state === null) {
    throw new Error("State must be an object");
  }
  if (typeof updates !== "object" || updates === null) {
    throw new Error("Updates must be an object");
  }
  return { ...state, ...updates };
};
