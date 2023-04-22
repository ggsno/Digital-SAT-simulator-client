import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";
import TeacherLobby from "./Lobby.Teacher";
import StudentLobby from "./Lobby.Student";
import { storage } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { Urls } from "../pages/router";

export default function Lobby() {
  const user = useRecoilValue(userState);
  if (!user) throw new Error("no user state");
  const navigator = useNavigate();
  const handleLogout = () => {
    storage.remove("ACCESS_TOKEN");
    storage.remove("USER_ID");
    navigator(Urls.login);
  };

  return (
    <div className="bg-gray-light min-h-screen">
      <div className="flex justify-center bg-[#e6edf8] text-violet-blue p-10">
        <header className="max-w-[60rem] grow">
          <div className="flex justify-end">
            <button
              onClick={handleLogout}
              className="border py-1 px-3 rounded-md mb-5"
            >
              logout
            </button>
          </div>
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
