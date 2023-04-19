import { useRecoilValue } from "recoil";
import Navigator from "./Simulator.Navigator";
import { moduleState } from "./Simulator.atoms";

export default function Review() {
  const module = useRecoilValue(moduleState);
  if (!module) throw new Error("no module state : result page");

  const { title } = module;
  return (
    <div className="h-[calc(100vh_-_173px)] flex flex-col items-center">
      <h2 className="text-3xl my-5">Check Your Work</h2>
      <p className="leading-7 mb-4">
        On test day, you won't be able to move on to the next module until time
        expires.
        <br />
        For these practice questions, you can click <b>Next</b> when you're
        ready to move on.
      </p>
      <div className="bg-white shadow-[4px_4px_30px_3px_rgba(0,0,0,0.1)] rounded-lg p-5 max-w-3xl">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">{title} Questions</h3>
          <div className="flex justify-between shrink-0 ml-2 items-center">
            <img
              src="image/unanswered.png"
              alt="unanswered"
              className="w-4 h-4 mr-2"
            />
            <div className="mr-4">Unanswered</div>
            <img
              src="image/review_icon.png"
              alt="for review"
              className="w-4 h-4 mr-1"
            />
            <div>For Review</div>
          </div>
        </div>
        <hr className="border-gray mt-2" />
        <Navigator />
      </div>
    </div>
  );
}
