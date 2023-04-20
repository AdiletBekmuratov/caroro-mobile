export const mergeArrays = (...arrays) => {
  const merged = {};

  arrays.forEach(data =>
    data.forEach(o => Object.assign((merged[o.name] ??= {}), o)),
  );

  return Object.values(merged);
};
