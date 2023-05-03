import { useNavigate } from "react-router-dom";
import { Urls } from "../pages/router";
import { useEffect, useState } from "react";
import {
  fetchGetAllUsers,
  fetchPostUser,
  fetchPatchAllocateExamToUser,
  fetchDeleteUser,
} from "../service/user";
import { fetchGetAllExams, fetchGetExamResults } from "../service/exam";
import { toast } from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { toastError } from "../utils/toastError";

export default function TeacherHome() {
  const navigator = useNavigate();
  const queryClient = useQueryClient();

  const { data: students } = useQuery(["students"], fetchGetAllUsers, {
    select: ({ data: { data } }) => data.filter((user) => !user.is_teacher),
  });

  const { data: exams } = useQuery(["exams"], fetchGetAllExams, {
    select: ({ data: { data } }) => data,
  });

  const [submissions, setSubmissions] = useState<
    { id: string; isSubmitted: boolean }[]
  >([]);

  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const [newStudentId, setNewStudentId] = useState("");
  const [newStudentPassword, setNewStudentPassword] = useState("");
  const [newStudentName, setNewStudentName] = useState("");

  const handleAllocateExamToStudent = async () => {
    try {
      if (selectedStudents.length === 0) {
        toast.error("학생을 선택해주세요.");
        return;
      }
      if (!selectedExam) {
        toast.error("배정할 시험을 선택해주세요.");
        return;
      }
      if (!exams) throw new Error("no exams");
      selectedStudents.forEach(async (student) => {
        const examId = exams.find((exam) => {
          console.log(exam.name, selectedExam);
          return exam.name === selectedExam;
        })?.id;
        console.log(examId);
        if (!examId) throw new Error("no exam id");
        await fetchPatchAllocateExamToUser({
          user_id: student,
          exam_id: examId,
        });
      });
      queryClient.invalidateQueries(["students"]);
      toast.success("배정 완료");
    } catch (err) {
      toastError(err);
    }
  };

  const handleCreateStudentAccount = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!newStudentId || !newStudentName || !newStudentPassword) {
      toast.error("정보를 입력해주세요");
      return;
    }
    await fetchPostUser({
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

  const deleteUser = async () => {
    if (selectedStudents.length === 0) {
      toast.error("삭제할 학생 계정을 선택해주세요.");
      return;
    }
    if (confirm(`선택된 학생 계정을 삭제하시겠습니까?`)) {
      selectedStudents.forEach(async (student) => {
        await fetchDeleteUser({ id: student });
      });

      toast.success("삭제 완료");
      queryClient.invalidateQueries(["students"]);
    }
  };

  useEffect(() => {
    (async () => {
      if (students && students.length > 0) {
        students.forEach(async (student) => {
          const {
            data: { data },
          } = await fetchGetExamResults({ userId: student.id });
          if (data) {
            const newElement = { id: student.id, isSubmitted: true };
            const index = submissions.findIndex(({ id }) => id === student.id);
            if (index !== -1) {
              submissions.splice(index, 1, newElement);
              setSubmissions(submissions.slice());
            } else {
              setSubmissions([...submissions, newElement]);
            }
          } else {
            const newElement = { id: student.id, isSubmitted: false };
            const index = submissions.findIndex(({ id }) => id === student.id);
            if (index !== -1) {
              submissions.splice(index, 1, newElement);
              setSubmissions(submissions.slice());
            } else {
              setSubmissions([...submissions, newElement]);
            }
          }
        });
      }
    })();
  }, [students]);

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
        <form
          onSubmit={handleCreateStudentAccount}
          className="bg-white shadow-md rounded-md w-min py-3 px-5 mb-5"
        >
          <div className="flex justify-between mb-3">
            <div>
              <h3 className="inline-block font-bold">Exam Title : </h3>
              <select
                onChange={(e) => setSelectedExam(e.target.value)}
                value={selectedExam ?? "선택해주세요"}
                className="border-b ml-2 w-32"
              >
                <option disabled>선택해주세요</option>
                {exams?.map((exam) => (
                  <option key={exam.name}>{exam.name}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAllocateExamToStudent}
                className=" rounded-md py-2 px-4  bg-violet-blue text-white text-sm mx-3"
              >
                시험 배정
              </button>
            </div>
            <button
              type="button"
              onClick={deleteUser}
              className=" rounded-md py-2 px-4  bg-red-700 text-white text-sm mx-3"
            >
              계정 삭제
            </button>
          </div>
          <table className="w-[40rem] text-center [&_td]:p-2 [&_tr]:border-b [&_tr]:border-b-gray">
            <thead className="[&_th]:border-b">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === students?.length}
                    onChange={() => {
                      if (selectedStudents.length === students?.length)
                        setSelectedStudents([]);
                      else if (students)
                        setSelectedStudents([
                          ...students.map((student) => student.id),
                        ]);
                    }}
                    className="accent-violet-blue"
                  />
                </th>
                <th>ID</th>
                <th>Student Name</th>
                <th>Exam Title</th>
                <th>Submission</th>
              </tr>
            </thead>
            <tbody>
              {!students
                ? null
                : students.map((student) => (
                    <tr key={"student" + student.id}>
                      <td>
                        <input
                          type="checkbox"
                          id={student.id}
                          checked={selectedStudents.some(
                            (selected) => selected === student.id
                          )}
                          onChange={() => {
                            if (
                              selectedStudents.some(
                                (selected) => selected === student.id
                              )
                            )
                              setSelectedStudents(
                                selectedStudents.filter((e) => e !== student.id)
                              );
                            else
                              setSelectedStudents([
                                ...selectedStudents,
                                student.id,
                              ]);
                          }}
                          className="accent-violet-blue"
                        />
                      </td>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>
                        {exams?.find((exam) => student.exam_id === exam.id)
                          ?.name ?? "-"}
                      </td>
                      <td>
                        {exams?.find((exam) => student.exam_id === exam.id)
                          ?.name === undefined
                          ? "-"
                          : submissions.find((e) => e.id === student.id)
                              ?.isSubmitted
                          ? "✅"
                          : "❌"}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </form>
        <form
          onSubmit={handleCreateStudentAccount}
          className="bg-white shadow-md rounded-md w-80 py-3 px-5"
        >
          <h3 className="font-bold text-lg mb-3">계정 추가</h3>
          <label className="flex mb-3">
            <span className="basis-1/4 font-bold">이름</span>
            <input
              type="text"
              onChange={(e) => setNewStudentName(e.target.value)}
              value={newStudentName}
              className="border-b px-2"
            />
          </label>
          <label className="flex mb-3">
            <span className="basis-1/4 font-bold">아이디</span>
            <input
              type="text"
              onChange={(e) => setNewStudentId(e.target.value)}
              value={newStudentId}
              className="border-b px-2"
            />
          </label>
          <label className="flex mb-3">
            <span className="basis-1/4 font-bold">비밀번호</span>
            <input
              type="text"
              onChange={(e) => setNewStudentPassword(e.target.value)}
              value={newStudentPassword}
              className="border-b px-2"
            />
          </label>
          <button
            type="submit"
            className="rounded-md mt-3 py-2 w-full bg-violet-blue text-white"
          >
            학생 계정 추가하기
          </button>
        </form>
      </div>
    </>
  );
}
