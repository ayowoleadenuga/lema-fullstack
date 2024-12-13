export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
}
