import { useRecoilValue } from "recoil";
import Question from "./Simulator.Question";
import Footer from "./Simulator.Footer";
import Header from "./Simulator.Header";
import Review from "./Simulator.Review";
import { userState } from "../atoms/user";
import Breaktime from "./Simulator.Breaktime";
import { ExamProps } from "../service/convertDataFunctions";
import { useIndexControl, useModule } from "./Simulator.hooks";

export default function Simulator({ exam }: { exam: ExamProps }) {
  const user = useRecoilValue(userState);
  const { index } = useIndexControl();
  const { module } = useModule(exam);

  return (
    <>
      {!module ? (
        "no module"
      ) : index.module === -1 ? (
        <Breaktime />
      ) : (
        <>
          <Header
            title={`Section ${index.section + 1}, Module ${index.module + 1}: ${
              exam.sections[index.section].title
            }`}
          />
          <hr className="border-dashed border-t-2 border-gray mb-2" />
          {index.question < module.length ? (
            <Question
              passage={module[index.question].passage}
              question={module[index.question].question}
              choices={module[index.question].choices}
            />
          ) : (
            <Review title={exam.sections[index.section].title} />
          )}
          <Footer userName={user!.name} totalQuestionCount={module.length} />
        </>
      )}
    </>
  );
}
