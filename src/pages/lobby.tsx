import { useSetRecoilState } from "recoil";
import { userState } from "../atoms/user";
import { useEffect } from "react";
import { storage } from "../utils/storage";
import { redirect } from "react-router-dom";
import Lobby from "../components/Lobby";
import { fetchGetUser } from "../service/apis";

export default function lobby() {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const userId = storage.get("USER_ID");
    if (!userId) {
      redirect("/login");
      return;
    }

    (async () => {
      const {
        data: { data: user },
      } = await fetchGetUser({ id: userId });

      setUser({
        id: userId,
        name: user.name,
        isTeacher: user.is_teacher,
        examId: user.exam_id,
      });
    })();
  }, []);

  return (
    <>
      <Lobby />
    </>
  );
}
