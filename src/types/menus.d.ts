export type MenuItem = {
  code: string;
  label: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
};

export type MenuChlid = Omit<MenuItem, "children">