export interface ITaxType {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaxTypeCreate {
  name: string;
}

export interface ITaxTypeUpdate {
  name?: string;
}

export interface IMinimalTaxType {
  name: string;
}
