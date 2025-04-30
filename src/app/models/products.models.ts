export interface ProductModel {
  idProduct: string;
  name: string;
  value: number;
  links: Link[];
}

export interface Link {
  rel: string;
  href: string;
}

export interface ProductDto {
  name: string;
  value: number;
}
