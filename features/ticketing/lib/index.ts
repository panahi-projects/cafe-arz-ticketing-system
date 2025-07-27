import { FilterMap } from "../constants";
import { AppliedFilterItem } from "../infrastructure/stores/ticketFilterStore";

//This function is for our test, and for the production we don't need it
export const randomSelect = (options: unknown[]) => {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

interface Mapper {
  key: string;
  values: Record<string | number, string | number | boolean>;
}

export const generateFilterObject = (
  filters: Record<string, unknown>,
  mappers?: Mapper[]
) => {
  const finalObject = Object.entries(filters).map(([key, value]) => {
    let items: AppliedFilterItem[] = [];
    let val = value;

    if (mappers?.length) {
      const mapperObj = mappers?.find((m) => m.key === key);
      if (mapperObj) {
        val = mapperObj.values[value as string | number];
      }
    }
    if (
      (typeof val === "string" && val.trim().length) ||
      typeof val === "number"
    ) {
      items = [
        {
          key: val.toString(),
          label: val,
        },
      ];
    } else if (Array.isArray(val)) {
      items = val.map((v) => ({ key: v, label: v }));
    }

    return {
      key: key as keyof typeof FilterMap,
      label: FilterMap[key as keyof typeof FilterMap],
      items: items,
    };
  });

  return finalObject;
};
