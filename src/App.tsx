import { useSetRecoilState } from "recoil";
import Simulator from "./components/Simulator";
import { examState, timerState } from "./components/Simulator.atoms";

const TEMP = {
  id: "0",
  title: "Section 1, Module 1: Reading and Writing",
  module: [
    {
      passage: `In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.`,
      question: `Which choice <b>completes</b> the text with the most logical and precise
    word or phrase?`,
      choices: ["scholary", "melodic", "jarring", "personal"],
    },
    {
      passage: `when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.`,
      question: `The most logical and precise Which choice <b>completes</b> the text with 
    word or phrase?`,
      choices: [
        `In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.`,
        `oted that <ins>pieces by the spoken-word poet</ins> don't lose the
        oted that <ins>pieces by the spoken-word poet</ins> don't lose the
        oted that <ins>pieces by the spoken-word poet</ins> don't lose the
        oted that <ins>pieces by the spoken-word poet</ins> don't lose the
        oted that <ins>pieces by the spoken-word poet</ins> don't lose the`,
        `a librarian noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.`,
        `musical qualiry on the page as it does when performed by Phi.
        In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.`,
      ],
    },
    {
      passage: `i's collection <i>Song I Sing</i> , a librarian
      noted thatwhen printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.`,
      question: `The most logical and precise Which choice <b>completes</b> the text with 
    word or phrase?`,
      choices: ["ppap", "214", "afwefew", "qjwdqw", "wef"],
    },
    {
      question: `The most logical and precise Which choice <b>completes</b> the text with 
    word or phrase?`,
      choices: ["ppap", "214", "afwefew", "qjwdqw"],
    },
    {
      passage: `when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.`,
      question: `The most logical and precise Which choice <b>completes</b> the text with 
    word or phrase?`,
    },
    {
      passage: `when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.
    In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.`,
      question: `The most logical and precise Which choice <b>completes</b> the text with 
    word or phrase?`,
      choices: ["ppap", "214", "afwefew", "qjwdqw"],
    },
  ],
};

function App() {
  const setQuestions = useSetRecoilState(examState);
  setQuestions(TEMP);
  const setTimer = useSetRecoilState(timerState);
  setTimer(Date.now());
  return (
    <>
      <Simulator />
    </>
  );
}

export default App;
