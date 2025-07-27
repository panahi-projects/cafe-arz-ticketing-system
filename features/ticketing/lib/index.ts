import { FilterMap } from "../constants";

//This function is for our test, and for the production we don't need it
export const randomSelect = (options: unknown[]) => {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

export const generateFilterObject = (
  filters: Record<string, string | number | (string | number)[]>
) => {
  const finalObject = Object.entries(filters).map(([key, value]) => ({
    key: key as keyof typeof FilterMap,
    label: FilterMap[key as keyof typeof FilterMap],
    value,
  }));

  return finalObject;
};
