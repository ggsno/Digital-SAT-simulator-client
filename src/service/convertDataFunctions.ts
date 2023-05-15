import {
  QUESTION_COUNT_PER_MATH,
  QUESTION_COUNT_PER_READING_AND_WRITING,
  SECTION_TITLES,
} from "../utils/constants";
import { GetExamResponse } from "./exam";

export type ExamProps = {
  id: number;
  title: string;
  sections: {
    title: string;
    modules: {
      questions: {
        passage: string | null;
        question: string;
        choices: string[] | null;
      }[];
    }[];
  }[];
};

export const convertExam = (origin: GetExamResponse["data"]): ExamProps => {
  const boundary = [
    [
      [0, QUESTION_COUNT_PER_READING_AND_WRITING / 2],
      [
        QUESTION_COUNT_PER_READING_AND_WRITING / 2,
        QUESTION_COUNT_PER_READING_AND_WRITING,
      ],
    ],
    [
      [
        QUESTION_COUNT_PER_READING_AND_WRITING,
        QUESTION_COUNT_PER_READING_AND_WRITING + QUESTION_COUNT_PER_MATH / 2,
      ],
      [
        QUESTION_COUNT_PER_READING_AND_WRITING + QUESTION_COUNT_PER_MATH / 2,
        QUESTION_COUNT_PER_READING_AND_WRITING + QUESTION_COUNT_PER_MATH,
      ],
    ],
  ];

  return {
    id: origin.id,
    title: origin.name,
    sections: SECTION_TITLES.map((title, i) => ({
      title,
      modules: [1, 2].map((_, j) => ({
        questions: origin.questions
          .slice(boundary[i][j][0], boundary[i][j][1])
          .map((e) => ({
            passage: e.passage,
            choices: e.choice_A
              ? [e.choice_A, e.choice_B!, e.choice_C!, e.choice_D!]
              : null,
            question: e.content,
          })),
      })),
    })),
  };
};
