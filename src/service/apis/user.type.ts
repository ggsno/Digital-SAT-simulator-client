type ResponseProps<Data> = {
  result: boolean;
  message: string;
  data: Data;
};

export type UserProps = {
  id: string;
  password: string;
  name: string;
  phone: string;
  is_teacher: boolean;
  exams: Array<{
    id: number;
    name: string;
  }> | null;
};

export type GetAllUsersResponse = ResponseProps<Array<UserProps>> & {
  count: number;
};

export type GetUserResponse = ResponseProps<UserProps>;
