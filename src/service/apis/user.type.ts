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
};

export type GetAllUsersResponse = ResponseProps<
  Array<UserProps & { exam_id: number }>
> & { count: number };

export type GetUserResponse = ResponseProps<
  UserProps & {
    exam_id: number | null;
    exam: {
      id: number;
      name: string;
    } | null;
  }
>;
