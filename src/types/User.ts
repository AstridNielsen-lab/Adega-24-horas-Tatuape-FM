export interface Address {
  street: string;
  number: string;
  neighborhood: string;
  zipCode: string;
}

export interface User {
  name: string;
  whatsapp: string;
  email: string;
  address: Address;
}