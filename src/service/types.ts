type AuthLoginRequest = {
  id: string;
  password: string;
};

type AuthLoginResponse = {
  result: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
};
