import { useNavigate } from "react-router-dom";
import { Urls } from "../pages/router";
import { useEffect, useState } from "react";
import {
  fetchGetAllUsers,
  fetchPostUser,
  fetchPatchAllocateExamToUser,
  GetAllUsersResponse,
} from "../service/user";
import { fetchGetAllExams } from "../service/exam";
import { toast } from "react-hot-toast";
import { QueryClient, useQuery, useQueryClient } from "react-query";

export default function TeacherHome() {
  const navigator = useNavigate();
  const queryClient = useQueryClient();

  const { data: students } = useQuery(["students"], fetchGetAllUsers, {
    select: ({ data: { data } }) => data.filter((user) => !user.is_teacher),
  });

  const { data: exams } = useQuery(["exams"], fetchGetAllExams, {
    select: ({ data: { data } }) => data,
  });

  const [selectedExam, setSelectedExam] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const [newStudentId, setNewStudentId] = useState("");
  const [newStudentPassword, setNewStudentPassword] = useState("");
  const [newStudentName, setNewStudentName] = useState("");

  const handleAllocateExamToStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    selectedStudents.forEach((student) => {
      fetchPatchAllocateExamToUser({
        user_id: student,
        exam_id: Number(selectedExam),
      });
    });
    toast.success("등록 완료");
  };

  const handleCreateStudentAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchPostUser({
      id: newStudentId,
      password: newStudentPassword,
      name: newStudentName,
      phone: "",
      is_teacher: false,
    });
    toast.success("생성 완료");
    setNewStudentId("");
    setNewStudentName("");
    setNewStudentPassword("");
    queryClient.invalidateQueries(["students"]);
  };

  useEffect(() => {
    if (students) {
      const allocatedStudents = students
        .filter((student) => student.exam_id === Number(selectedExam))
        .map((e) => e.name);
      setSelectedStudents(allocatedStudents);
    }
  }, [selectedExam]);

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
        <form onSubmit={handleAllocateExamToStudent}>
          <select
            onChange={(e) => setSelectedExam(e.target.value)}
            value={selectedExam}
            className="mr-4"
          >
            {exams?.map((exam) => (
              <option key={exam.name}>{exam.name}</option>
            ))}
          </select>
          {students?.map((student) => (
            <label htmlFor={student.id} key={"student" + student.id}>
              <input type="checkbox" id={student.id} />
              {student.name}
            </label>
          ))}
          <button type="submit" className="border rounded-md py-2 px-3 ml-4">
            배정하기
          </button>
        </form>
      </div>
      <div className="mb-10">
        <h2>학생 추가</h2>
        <form onSubmit={handleCreateStudentAccount}>
          <div>
            <label htmlFor="">
              이름
              <input
                type="text"
                onChange={(e) => setNewStudentName(e.target.value)}
                value={newStudentName}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              아이디
              <input
                type="text"
                onChange={(e) => setNewStudentId(e.target.value)}
                value={newStudentId}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              비밀번호
              <input
                type="text"
                onChange={(e) => setNewStudentPassword(e.target.value)}
                value={newStudentPassword}
              />
            </label>
          </div>
          <button type="submit" className="border rounded-md py-2 px-3 ml-4">
            추가하기
          </button>
        </form>
      </div>
    </>
  );
}
