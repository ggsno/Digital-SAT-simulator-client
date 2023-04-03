type Props = {
  userName: string;
  questionIndex: string;
  totalQuestionCount: number;
};

export default function Footer(props: Props) {
  const { userName, questionIndex, totalQuestionCount } = props;

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full grid grid-cols-3 py-5 px-8">
        <div className="self-center text-xl">{userName}</div>
        <button
          type="button"
          className="justify-self-center self-center flex bg-black text-white py-1 pl-4 rounded-md"
        >
          Question {questionIndex} of {totalQuestionCount}
          <img
            src="/image/arrowUp.png"
            alt="arrow up"
            className=" w-3 h-full my-auto mx-2"
          />
        </button>
        <div className="justify-self-end self-center">
          <button
            type="button"
            className="bg-blue text-white rounded-full py-2 px-6 mr-3"
          >
            Back
          </button>
          <button
            type="button"
            className="bg-blue text-white rounded-full py-2 px-6"
          >
            Next
          </button>
        </div>
      </footer>
    </>
  );
}
