export type Restaurant = {
  id: string;
  name: string;
  address: string;
  updatedAt: string;
  createdAt: string;
};

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
  tenantId: string;
  categoryId: string;
  image: string;
  isPublished?: boolean;
}
