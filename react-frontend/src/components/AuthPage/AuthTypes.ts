export enum AuthTypes {
  SIGN_UP = "SIGN_UP",
  SIGN_IN = "SIGN_IN",
}

export type AuthFormik = {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
};
