import { useNavigate } from "react-router-dom";
import { Urls } from "../pages/Urls";
import AddStudentForm from "./Home.Teacher.AddStudentForm";
import StudentTable from "./Home.Teacher.StudentTable";

export default function TeacherHome() {
  const navigator = useNavigate();

  return (
    <>
      <div className="mb-10">
        <h2>시험 관리</h2>
        <button
          type="button"
          onClick={() => navigator(Urls.editor)}
          className="border rounded-md py-2 px-5 text-violet-blue border-violet-blue mb-3"
        >
          시험 추가, 수정, 삭제 페이지로 이동
        </button>
      </div>
      <div className="mb-10">
        <h2>학생 관리</h2>
        <StudentTable />
        <AddStudentForm />
      </div>
    </>
  );
}
