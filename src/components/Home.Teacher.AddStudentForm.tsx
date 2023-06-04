import { useState } from "react";
import { fetchPostUser } from "../service/apis/user";
import { toast } from "react-hot-toast";
import { queryClient } from "../main";

export default function AddStudentForm() {
  const [newStudentId, setNewStudentId] = useState("");
  const [newStudentPassword, setNewStudentPassword] = useState("");
  const [newStudentName, setNewStudentName] = useState("");

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
    queryClient.invalidateQueries("students");
  };

  return (
    <>
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
    </>
  );
}
