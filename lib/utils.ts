import { MenuItem } from "@/types";

/**
 * Finds menu item by path (supports nested menus)
 */
export function findMenuItemByPath(
  items: MenuItem[],
  path: string
): MenuItem | undefined {
  for (const item of items) {
    if (item.path === path) return item;
    if (item.children) {
      const found = findMenuItemByPath(item.children, path);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Gets breadcrumb items for current path
 */
export function getBreadcrumbItems(pathname: string, menuItems: MenuItem[]) {
  const items: { label: string; path: string; show: boolean }[] = [];
  const paths = pathname.split("/").filter(Boolean);
  let currentPath = "";

  paths.forEach((segment) => {
    currentPath += `/${segment}`;
    const menuItem = findMenuItemByPath(menuItems, currentPath);

    if (menuItem) {
      items.push({
        label: menuItem.label,
        path: currentPath,
        show: menuItem.showInBreadcrumbs !== false,
      });
    }
  });

  return items.filter((item) => item.show);
}

/**
 * Gets page title for current path
 */
export function getPageTitle(
  pathname: string,
  menuItems: MenuItem[]
): string | undefined {
  const items = getBreadcrumbItems(pathname, menuItems);
  return items.length > 0 ? items[items.length - 1].label : undefined;
}

export function isNullOrEmpty(value: unknown): boolean {
  return value === null || value === "";
}

export function isObjectValueNullOrEmpty(
  obj: Record<string, unknown>
): boolean {
  const allNullOrEmpty = Object.values(obj).every(isNullOrEmpty);
  return allNullOrEmpty;
}

export function filterEmptyValues<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  const result: Partial<T> = {};

  for (const key in obj) {
    const value = obj[key];
    if (value !== null && value !== undefined && value !== "") {
      result[key] = value;
    }
  }

  return result;
}
