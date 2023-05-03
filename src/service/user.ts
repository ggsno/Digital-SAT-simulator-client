import { serverApiInstance, serverApiInstanceWithAuth } from "./axiosInstances";

type ResponseProps<Data> = {
  result: boolean;
  message: string;
  data: Data;
};

type User = {
  id: string;
  password: string;
  name: string;
  phone: string;
  is_teacher: boolean;
};

export type GetAllUsersResponse = ResponseProps<
  Array<User & { exam_id: number }>
> & { count: number };

export type GetUserResponse = ResponseProps<
  User & {
    exam_id: number | null;
    exam: {
      id: number;
      name: string;
    } | null;
  }
>;

export const fetchPostLogin = (props: { id: string; password: string }) => {
  return serverApiInstance.post(`/auth/login`, props);
};

export const fetchPostUser = (props: User) => {
  return serverApiInstanceWithAuth.post(`/users`, props);
};

export const fetchGetAllUsers = () => {
  return serverApiInstanceWithAuth.get<GetAllUsersResponse>(`/users`);
};

export const fetchGetUser = ({ id }: { id: string }) => {
  return serverApiInstanceWithAuth.get<GetUserResponse>(`/users/${id}`);
};

export const fetchDeleteUser = ({ id }: { id: string }) => {
  return serverApiInstanceWithAuth.delete(`/users/${id}`);
};

export const fetchPatchAllocateExamToUser = (props: {
  user_id: string;
  exam_id: number;
}) => {
  return serverApiInstanceWithAuth.patch(`/users/allocate`, props);
};
