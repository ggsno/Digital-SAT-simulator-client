import { serverApiInstanceWithAuth } from "./axiosInstances";

type ResponseProps<Data> = {
  result: boolean;
  message: string;
  data: Data;
};

export type Question = {
  passage: string | null;
  content: string;
  choice_A: string | null;
  choice_B: string | null;
  choice_C: string | null;
  choice_D: string | null;
  correct_answer: string;
};

export type GetAllExamsResponse = ResponseProps<
  Array<{
    id: number;
    name: string;
  }>
> & { count: number };

export type GetExamResponse = ResponseProps<{
  id: number;
  name: string;
  questions: Array<
    {
      id: number;
      section: string;
      module: number;
      number: number;
      exam_id: number;
    } & Question
  >;
}>;

export type GetExamAnswersResponse = ResponseProps<{
  id: number;
  user_id: string;
  exam_id: number;
  question_results: Array<{
    id: number;
    number: number;
    your_answer: string;
    exam_result_id: number;
  }>;
} | null>;

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

export const fetchPutQuestion = (props: {
  examId: number;
  sectionTitle: string;
  moduleNumber: number;
  questionNumber: number;
  body: Question;
}) => {
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
