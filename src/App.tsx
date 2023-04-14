import { useSetRecoilState } from "recoil";
import Simulator from "./components/Simulator";
import { examState, timerState } from "./components/Simulator.atoms";

const TEMP = {
  id: "0",
  title: "Section 1, Module 1: Reading and Writing",
  modules: [
    {
      passage: `The <u>　　　　</u> of Maria Irene Fornes' play Mud—a realistic room perched on a dirt pile—challenges conventional interpretations of stage scenery.`,
      question: `Which choice completes the text with the most logical and precise word or phrase?`,
      choices: ["appeal", "plot", "mood", "setting"],
    },
    {
      passage: `Because of the <u>　　　　</u> effects of the hot springs, tourists suffering from various ailments flocked to the village's thermal pools.`,
      question: `Which choice completes the text with the most logical and precise word or  phrase?`,
      choices: ["succulent", "redolent", "cerebral", "therapeutic"],
    },
    {
      passage: `Most of us probably know the concept of diversification from the perspective of finance. Savvy investors usually don’t put all their eggs into the basket. Diversification also occurs when we buy consumer goods. In that domain, however, diversification isn’t always the most advantageous strategy. Have you ever opted for variety in purchasing a month’s supply of breakfast cereal, only to later regret not having chosen more boxes of your favorite cereal?`,
      question: `Which choice best describes the function of the question at the end of the paragraph?`,
      choices: [
        "offer advice to consumers about the benefits and pitfalls of diversifying their choices.",
        "challenge the idea that consumers do not need to diversify their choices.",
        "emphasize the anxiety that consumers feel when faced with the concept of diversification",
        "provide a relatable example of a negative result of diversification for consumers.",
      ],
    },
    {
      passage: `<p>It is naive to assume that any culture’s history is perceived without subjective prejudice. Every modern observer, whether he or she was schooled in the traditions of the South Pacific or Zaire of Hanover, New Hampshire,or Vienna, Austria, was exposed at an early age to one or another form of folklore about Native Americans.</p>
      <p>For some, the very impressions about Native American tribes that initially attracted them to the field of American history are aspects most firmly rooted in popular myths and stereotypes</p>
      `,
      question: `Which choice best describes the function of the geographical references in the second sentence in the overall structure of the text?`,
      choices: [
        "They underscore the influence Native American culture has had outside the United States.",
        "They underscore academic training is undergoing increasing homogenization.",
        "They underscore the universality of certain notions about Native American peoples.",
        "They underscore the idea that Native Americans have more in common with other peoples that is acknowledged.",
      ],
    },
    {
      passage: `<h2>Text 1</h2>
      <p>The intelligence of dolphins is well documented by science. Studies show that dolphins are able to understand sign language, solve puzzles, and use objects in their environment as tools. Scientists also believe that dolphins possess a sophisticated language : numerous instances have been recorded in which dolphins transmitted information from one individual to another. A recent experiment proved that dolphins can even recognize themselves in a mirror- something achieved by very few animals. This behavior demonstrates that dolphins are aware of their own individuality, indicating a level of intelligence that may be very near our own.</p>
      <br/>
      <h2>Text 2</h2>
      <p>Are dolphins usually intelligent? Dolphins have large brains, but we know that brain size alone does not determine either the nature or extent of intelligence. Some researchers have suggested that dolphins have big brains because they need them- for sonar and sound processing and for social interactions. Others have argued that regardless of brain size, dolphins have an intelligence level somewhere between that of a dog and a chimpanzee. The fact is, we don’t know, and comparisons may not be especially helpful. Just as human intelligence is right for the dolphin's way of life. Until we know more all we can say is that dolphin intelligence is different.</p>
      `,
      question: `Based on the text, how would text 2 most likely respond to the last sentence of text 1?`,
      choices: [
        "suggesting that intelligence in animals is virtually impossible to measure",
        "questioning the objectivity of the studies already conducted",
        "observing that intelligence does not mean the same implicattion  for every species",
        "arguing that little is actually known about dolphin social behavior",
      ],
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
