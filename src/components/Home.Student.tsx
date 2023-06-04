import { useNavigate } from "react-router-dom";
import { Urls } from "../pages/router";
import { UserProps } from "../service/apis/user.type";
import { GetAllExamResultsResponse } from "../service/apis/exam.type";

export default function StudentHome(props: {
  exams: UserProps["exams"];
  examResults: GetAllExamResultsResponse["data"];
}) {
  const { exams, examResults } = props;
  const navigator = useNavigate();

  const startExam = (examId: number) => {
    if (confirm("시험을 시작하시겠습니까?")) {
      navigator(Urls.exam + `?id=${examId}`);
    }
  };

  const goReview = (resultId: number) => {
    navigator(Urls.review + `?result-id=${resultId}`);
  };

  return (
    <>
      <div className="mb-10">
        <h2 className="mb-2">Your Tests</h2>
        {!exams || exams.length <= 0 ? (
          <div className="text-xl">no tests</div>
        ) : (
          exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => startExam(exam.id)}
              className="bg-white rounded-md shadow-md"
            >
              <h3 className="bg-[#f5f7fc] font-bold w-40 p-3 text-left">
                {exam.name}
              </h3>
              <div>click to take an exam</div>
            </button>
          ))
        )}
      </div>
      <div className="mb-4">
        <h2 className="mb-2">Test Results</h2>
        {!examResults || examResults.length <= 0 ? (
          <div className="text-xl">no results</div>
        ) : (
          examResults.map((examResult) => (
            <button
              onClick={() => goReview(examResult.id)}
              className="bg-white rounded-md shadow-md"
            >
              <h3 className="bg-[#f5f7fc] font-bold w-40 p-3 text-left">
                {examResult.exam_name}
              </h3>
              <div>View My Responses</div>
            </button>
          ))
        )}
      </div>
    </>
  );
}
