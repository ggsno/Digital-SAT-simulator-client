import { useNavigate } from "react-router-dom";
import { storage } from "../utils/storage";
import { Urls } from "../pages/Urls";

export default function Header() {
  const navigator = useNavigate();

  const goHome = () => {
    navigator(Urls.home);
  };

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      storage.remove("ACCESS_TOKEN");
      storage.remove("USER_ID");
      navigator(Urls.login);
    }
  };

  return (
    <>
      <header className="flex justify-center bg-[#e6edf8] text-violet-blue py-5 px-10">
        <div className="max-w-[60rem] grow">
          <div className="flex justify-between">
            <button onClick={goHome}>
              <img
                src="/image/home.png"
                alt="home"
                className="h-8 w-8 inline-block mr-2"
              />
              <span className="font-bold text-lg">Home</span>
            </button>
            <button
              onClick={handleLogout}
              className="border py-1 px-3 rounded-md"
            >
              logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
