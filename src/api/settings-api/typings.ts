export type UserProfile = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
};

export type UserProfileAvatar = {
  file: FormData
};

export type UserPassword = {
  oldPassword: string,
  newPassword: string
};
