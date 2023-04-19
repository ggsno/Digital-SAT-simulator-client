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

type UserResponse = {
  result: boolean;
  message: string;
  data: {
    id: string;
    password: string;
    name: string;
    phone: string;
    is_teacher: boolean;
    exam_id: number;
  };
};

type ExamResponse = {
  result: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    sections: Array<{
      id: number;
      number: number;
      name: string;
      subject: string;
      exam_id: number;
      modulars: Array<{
        id: number;
        name: string;
        number: number;
        section_id: number;
        questions: Array<{
          id: number;
          number: number;
          passage: string;
          content: string;
          image_path: string;
          choice_1: string;
          choice_2: string;
          choice_3: string;
          choice_4: string;
          choice_5: string;
          correct_answer: string;
          modular_id: number;
        }>;
      }>;
    }>;
  };
};
