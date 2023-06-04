import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../utils/storage";
import { toastError } from "../utils/toastError";
import { Urls } from "../pages/router";
import { fetchPostLogin } from "../service/apis/user";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {
        data: {
          data: { access_token },
        },
      } = await fetchPostLogin({ id, password });

      storage.set("ACCESS_TOKEN", access_token);
      storage.set("USER_ID", id);

      navigator(Urls.home);
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <div className="flex flex-col items-center bg-violet-blue min-h-screen">
      <h1 className="font-bold text-4xl text-white mt-12">
        Digital SAT Simulator
      </h1>
      <div className="bg-white rounded-md mt-3 p-4 w-96">
        <h2 className="flex flex-col items-center font-bold text-2xl my-5">
          Sign-In
        </h2>
        <form onSubmit={handleLogin} className="[&_*]:block">
          <label className="mb-2 font-bold">
            ID
            <input
              className="border border-gray rounded-md w-full h-10 p-3 font-normal"
              onChange={(e) => setId(e.target.value)}
              required
            />
          </label>
          <label className="mb-2 font-bold">
            Password
            <input
              className="border border-gray rounded-md w-full h-10 p-3 font-normal"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </label>
          <button
            type="submit"
            disabled={id.length <= 0 || password.length <= 0}
            className="block my-0 mx-auto w-40 h-10 rounded-full border bg-yellow-dark font-bold mt-5
            disabled:border-0 disabled:bg-gray-light disabled:text-gray"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="mt-2 text-sm text-gray">
        Last updated 2023.06.05 04:16
      </div>
    </div>
  );
}
