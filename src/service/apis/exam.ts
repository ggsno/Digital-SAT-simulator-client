import {
  GetAllExamsResponse,
  GetExamResponse,
  GetExamAnswersResponse,
  PutExamRequest,
} from "./exam.type";

import { serverApiInstanceWithAuth } from "../axiosInstances";

export const fetchPostExam = ({ title }: { title: string }) => {
  return serverApiInstanceWithAuth.post(`/exams`, { name: title });
};

export const fetchGetAllExams = () => {
  return serverApiInstanceWithAuth.get<GetAllExamsResponse>(`/exams`);
};

export const fetchGetExam = ({ examId }: { examId: string }) => {
  return serverApiInstanceWithAuth.get<GetExamResponse>(`/exams/${examId}`);
};

export const fetchDeleteExam = ({ examId }: { examId: string }) => {
  return serverApiInstanceWithAuth.delete(`/exams/${examId}`);
};

export const fetchPutQuestion = (props: PutExamRequest) => {
  const { examId, sectionTitle, moduleNumber, questionNumber, body } = props;
  return serverApiInstanceWithAuth.put(
    `/exam/${examId}/${sectionTitle}/${moduleNumber}/${questionNumber}`,
    body
  );
};

export const fetchPostExamResults = (props: { answers: string[] }) => {
  return serverApiInstanceWithAuth.post(`/exam-results`, props);
};

export const fetchGetExamResults = ({ userId }: { userId: string }) => {
  return serverApiInstanceWithAuth.get<GetExamAnswersResponse>(
    `/exam-results/${userId}`
  );
};
