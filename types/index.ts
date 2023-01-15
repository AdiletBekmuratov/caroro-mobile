export interface IUser {
  access_token: string;
}

export interface IAuth {
  user?: IUser;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
}
