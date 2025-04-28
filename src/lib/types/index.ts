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

export type searchType = {
  restaurantId: string;
};

export type AccessTokenType = {
  accessToken: string;
  expires: string;
  httpOnly: boolean;
  Path: string;
  Domain: string;
  SameSite: string;
  "Max-age": string;
};

export type RefreshTokenType = Omit<AccessTokenType, "accessToken"> & {
  refreshToken: string;
};
interface Address {
  text: string;
  isDefault: boolean;
}

export interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
}

export type CouponTypeData = {
  code: string;
  tenantId: string;
};

export type CouponResponseType = {
  valid: boolean;
  discount: string;
};

type CustomError = {
  ref: string;
  type: string;
  msg: string;
};

type ErrorResponse = {
  data: {
    errors: CustomError[];
  };
};

export type ServerErrorType = {
  code: string;
  message: string;
  name: string;
  stack?: string;
  response: ErrorResponse;
};
