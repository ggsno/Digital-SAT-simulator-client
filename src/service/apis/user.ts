import {
  serverApiInstance,
  serverApiInstanceWithAuth,
} from "../axiosInstances";
import { GetAllUsersResponse, GetUserResponse, UserProps } from "./user.type";

export const fetchPostLogin = (props: { id: string; password: string }) => {
  return serverApiInstance.post(`/auth/login`, props);
};

export const fetchPostUser = (props: UserProps) => {
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
