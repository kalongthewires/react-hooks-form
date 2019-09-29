import { isEmpty, reduceRight, split } from "lodash";

export const set = (obj, path, value) => {
  const keys = split(path, ".");
  const next = reduceRight(
    keys,
    (nextValues, key) => {
      if (isEmpty(nextValues)) {
        return { [key]: value };
      }

      return {
        [key]: { ...obj[key], ...nextValues }
      };
    },
    {}
  );

  return { ...obj, ...next };
};
