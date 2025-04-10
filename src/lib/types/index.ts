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
export interface ProductPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: {
      [key: string]: number;
    };
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
  priceConfiguration: ProductPriceConfiguration;
  attributes: Attribute[];
  tenantId: string;
  categoryId: string;
  image: string;
  isPublished?: boolean;
}

export type Topping = {
  _id: string;
  name: string;
  image: string;
  price: number;
  isAvailable: boolean;
};
