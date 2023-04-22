import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";
import TeacherLobby from "./Lobby.Teacher";
import StudentLobby from "./Lobby.Student";

export default function Lobby() {
  const user = useRecoilValue(userState);
  if (!user) throw new Error("no user state");

  return (
    <div className="bg-gray-light min-h-screen">
      <div className="flex justify-center bg-[#e6edf8] text-violet-blue p-10">
        <header className="max-w-[60rem] grow">
          <h1 className="text-4xl font-light">
            Welcome, {user?.name}! Take a practice test and get ready for test
            day.
          </h1>
        </header>
      </div>
      <div className="[&_h2]:text-3xl [&_h2]:font-bold p-10">
        <div className="flex justify-center">
          <div className="max-w-[60rem] grow">
            {user.isTeacher ? <TeacherLobby /> : <StudentLobby />}
          </div>
        </div>
      </div>
    </div>
  );
}
