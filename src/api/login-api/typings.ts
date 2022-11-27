export type RegisterPostRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type AuthPostRequest = {
  login: string;
  password: string;
};
