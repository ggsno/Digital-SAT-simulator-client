import { useEffect, useState } from "react";
import {
  fetchGetAllUsers,
  fetchPatchAllocateExamToUser,
  fetchDeleteUser,
} from "../service/apis/user";
import { fetchGetAllExams } from "../service/apis/exam";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { toastError } from "../utils/toastError";
import { queryClient } from "../main";

export default function StudentTable() {
  const { data: students } = useQuery(["students"], fetchGetAllUsers, {
    select: ({ data: { data } }) => data.filter((user) => !user.is_teacher),
  });

  const { data: exams } = useQuery(["exams"], fetchGetAllExams, {
    select: ({ data: { data } }) => data,
  });

  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

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
      await Promise.all(
        selectedStudents.map(async (student) => {
          const examId = exams.find((exam) => exam.name === selectedExam)?.id;
          if (!examId) throw new Error("no exam id");
          await fetchPatchAllocateExamToUser({
            user_id: student,
            exam_id: examId,
          });
        })
      );
      queryClient.invalidateQueries("students");
      toast.success("배정 완료");
    } catch (err) {
      toastError(err);
    }
  };

  const deleteUser = async () => {
    if (selectedStudents.length === 0) {
      toast.error("삭제할 학생 계정을 선택해주세요.");
      return;
    }
    if (confirm(`선택된 학생 계정을 삭제하시겠습니까?`)) {
      await Promise.all(
        selectedStudents.map(async (student) => {
          await fetchDeleteUser({ id: student });
        })
      );

      toast.success("삭제 완료");
      queryClient.invalidateQueries("students");
    }
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-md w-min py-3 px-5 mb-5">
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
              <th>Allocated Exams</th>
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
                    <td
                      className={`${
                        !student.exams || student.exams.length <= 0
                          ? "text-gray"
                          : null
                      }`}
                    >
                      {!student.exams || student.exams.length <= 0
                        ? "no exams"
                        : student.exams.map((exam) => <div>{exam.name}</div>)}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
