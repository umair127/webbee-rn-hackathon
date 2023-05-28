export interface Field {
  id: string;
  name: string;
  type: string;
  isTitle: boolean;
}

export interface Machine {
  id: string;
  [key: string]: any;
}

export interface Category {
  id: string;
  name: string;
  fields: Array<Field>;
  machines: Array<Machine>;
}

export interface Machines {
  categories: Array<Category>;
}
