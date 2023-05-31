import type { Meta, StoryObj } from "@storybook/react";
import Simulator from "../components/Simulator";
import { convertExam } from "../service/convertDataFunctions";
import { exams } from "../../mocks/mockDB/exams";
import { useSetRecoilState } from "recoil";
import { userState } from "../atoms/user";

const MockSimulator = () => {
  const setUser = useSetRecoilState(userState);
  setUser({
    id: "temp",
    name: "temp",
    isTeacher: false,
    examId: 14,
  });

  return <Simulator exam={convertExam(exams[0])} />;
};

const meta = {
  title: "Exam/Simulator",
  component: MockSimulator,
} satisfies Meta<typeof MockSimulator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Exam: Story = {};
