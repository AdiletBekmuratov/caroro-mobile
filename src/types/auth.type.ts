export interface IUser {
  accessToken: string;
}

export interface IAuth {
  user?: IUser;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
}
