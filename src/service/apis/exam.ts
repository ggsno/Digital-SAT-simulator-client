import {
  GetAllExamResultsResponse,
  GetAllExamsResponse,
  GetExamResponse,
  GetExamResultsResponse,
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

export const fetchPostExamResults = (props: {
  exam_id: number;
  answers: string[];
}) => {
  return serverApiInstanceWithAuth.post(`/exam-results`, props);
};

export const fetchGetExamResults = ({ resultId }: { resultId: number }) => {
  return serverApiInstanceWithAuth.get<GetExamResultsResponse>(
    `/exam-results/${resultId}`
  );
};

export const fetchGetAllExamResults = ({ userId }: { userId: string }) => {
  return serverApiInstanceWithAuth.get<GetAllExamResultsResponse>(
    `/exam-results/users/${userId}`
  );
};
