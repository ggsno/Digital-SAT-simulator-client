type ResponseProps<Data> = {
  result: boolean;
  message: string;
  data: Data;
};

export type QuestionProps = {
  id: number;
  section: string;
  module: number;
  number: number;
  exam_id: number;
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
  questions: Array<QuestionProps>;
}>;

export type GetExamResultsResponse = ResponseProps<{
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

export type GetAllExamResultsResponse = ResponseProps<
  Array<{
    id: number;
    user_id: string;
    exam_id: number;
    exam_name: string;
  }>
>;

export type PutExamRequest = {
  examId: number;
  sectionTitle: string;
  moduleNumber: number;
  questionNumber: number;
  body: Pick<
    QuestionProps,
    | "passage"
    | "content"
    | "choice_A"
    | "choice_B"
    | "choice_C"
    | "choice_D"
    | "correct_answer"
  >;
};
