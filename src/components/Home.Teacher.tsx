import { useNavigate } from "react-router-dom";
import { Urls } from "../pages/router";
import { fetchGetAllExams, fetchGetAllUsers } from "../service/apis";
import { useEffect, useState } from "react";

export default function TeacherHome() {
  const navigator = useNavigate();
  const [students, setStudents] = useState<{ name: string; id: string }[]>([]);
  const [exams, setExams] = useState<{ name: string }[]>([]);

  useEffect(() => {
    (async () => {
      const {
        data: { data: usersResponse },
      } = await fetchGetAllUsers();
      const {
        data: { data: examsResponse },
      } = await fetchGetAllExams();
      setStudents(usersResponse.filter((user) => !user.is_teacher));
      setExams(examsResponse);
    })();
  });

  return (
    <>
      <div className="mb-10">
        <h2>시험 추가</h2>
        <button
          type="button"
          onClick={() => navigator(Urls.editor)}
          className="border rounded-md py-2 px-3"
        >
          시험 추가 페이지로 이동
        </button>
      </div>
      <div className="mb-10">
        <h2>시험 배정</h2>
        <form action="">
          <select className="mr-4">
            {exams.map((exam) => (
              <option key={exam.name}>{exam.name}</option>
            ))}
          </select>
          {students.map((student) => (
            <label htmlFor={student.id} key={"student" + student.id}>
              <input type="checkbox" id={student.id} />
              {student.name}
            </label>
          ))}
          <button type="button" className="border rounded-md py-2 px-3 ml-4">
            배정하기
          </button>
        </form>
      </div>
      <div className="mb-10">
        <h2>학생 추가</h2>
        <form action="">
          <div>
            <label htmlFor="">
              이름
              <input type="text" />
            </label>
          </div>
          <div>
            <label htmlFor="">
              아이디
              <input type="text" />
            </label>
          </div>
          <div>
            <label htmlFor="">
              비밀번호
              <input type="text" />
            </label>
          </div>
          <button type="button" className="border rounded-md py-2 px-3 ml-4">
            추가하기
          </button>
        </form>
      </div>
    </>
  );
}
