export const pick: (object: any, keys: string[]) => any = (object, keys) => {
  return keys.reduce((acc, key) => {
    if (object.hasOwnProperty(key)) {
      acc[key] = object[key];
    }
    return acc;
  }, {});
};

export const omit: (object: any, keys: string[]) => any = (object, keys) => {
  return Object.keys(object).reduce((acc, key) => {
    if (!keys.includes(key)) {
      acc[key] = object[key];
    }
    return acc;
  }, {});
};
