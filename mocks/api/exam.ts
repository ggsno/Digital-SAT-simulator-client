import { rest } from "msw";

const examApi = [
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;
      const user = dummy.users.find((e) => e.id === id);
      return res(ctx.json(response(user)));
    }
  ),
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/exams/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;
      const exam = dummy.exams.find((e) => e.id === Number(id));
      return res(ctx.json(response(exam)));
    }
  ),
];

export default examApi;

const response = (data: any) => ({
  result: true,
  message: "OK",
  data: data,
});

const dummy = {
  users: [
    {
      id: "admin",
      password: "admin",
      name: "관리자",
      phone: "010-1234-5678",
      is_teacher: true,
      exam_id: null,
    },
    {
      id: "student01",
      password: "student01",
      name: "Gildong Hong",
      phone: "010-1234-5678",
      is_teacher: false,
      exam_id: 1,
    },
  ],
  exams: [
    {
      id: 1,
      name: "exam 01",
      sections: [
        {
          id: 1,
          number: 1,
          name: "Reading and Writing",
          subject: "영어",
          exam_id: 1,
          modulars: [
            {
              id: 1,
              name: "",
              number: 1,
              questions: [
                {
                  passage:
                    "The <u>　　　　</u> of Maria Irene Fornes' play Mud—a realistic room perched on a dirt pile—challenges conventional interpretations of stage scenery.",
                  content:
                    "Which choice completes the text with the most logical and precise word or phrase?",
                  choice_A: "appeal",
                  choice_B: "plot",
                  choice_C: "mood",
                  choice_D: "setting",
                },
                {
                  passage:
                    "Because of the <u>　　　　</u> effects of the hot springs, tourists suffering from various ailments flocked to the village's thermal pools.",
                  content:
                    "Which choice completes the text with the most logical and precise word or  phrase?",
                  choice_A: "succulent",
                  choice_B: "redolent",
                  choice_C: "cerebral",
                  choice_D: "therapeutic",
                },
                {
                  passage: `Most of us probably know the concept of diversification from the perspective of finance. Savvy investors usually don’t put all their eggs into the basket. Diversification also occurs when we buy consumer goods. In that domain, however, diversification isn’t always the most advantageous strategy. Have you ever opted for variety in purchasing a month’s supply of breakfast cereal, only to later regret not having chosen more boxes of your favorite cereal?`,
                  content: `Which choice best describes the function of the question at the end of the paragraph?`,
                  choice_A:
                    "offer advice to consumers about the benefits and pitfalls of diversifying their choices.",
                  choice_B:
                    "challenge the idea that consumers do not need to diversify their choices.",
                  choice_C:
                    "emphasize the anxiety that consumers feel when faced with the concept of diversification",
                  choice_D:
                    "provide a relatable example of a negative result of diversification for consumers.",
                },
                {
                  passage: `<p>It is naive to assume that any culture’s history is perceived without subjective prejudice. Every modern observer, whether he or she was schooled in the traditions of the South Pacific or Zaire of Hanover, New Hampshire,or Vienna, Austria, was exposed at an early age to one or another form of folklore about Native Americans.</p>
                  <p>For some, the very impressions about Native American tribes that initially attracted them to the field of American history are aspects most firmly rooted in popular myths and stereotypes</p>
                  `,
                  content: `Which choice best describes the function of the geographical references in the second sentence in the overall structure of the text?`,
                  choice_A:
                    "They underscore the influence Native American culture has had outside the United States.",
                  choice_B:
                    "They underscore academic training is undergoing increasing homogenization.",
                  choice_C:
                    "They underscore the universality of certain notions about Native American peoples.",
                  choice_D:
                    "They underscore the idea that Native Americans have more in common with other peoples that is acknowledged.",
                },
                {
                  passage: `<h2>Text 1</h2>
                  <p>The intelligence of dolphins is well documented by science. Studies show that dolphins are able to understand sign language, solve puzzles, and use objects in their environment as tools. Scientists also believe that dolphins possess a sophisticated language : numerous instances have been recorded in which dolphins transmitted information from one individual to another. A recent experiment proved that dolphins can even recognize themselves in a mirror- something achieved by very few animals. This behavior demonstrates that dolphins are aware of their own individuality, indicating a level of intelligence that may be very near our own.</p>
                  <br/>
                  <h2>Text 2</h2>
                  <p>Are dolphins usually intelligent? Dolphins have large brains, but we know that brain size alone does not determine either the nature or extent of intelligence. Some researchers have suggested that dolphins have big brains because they need them- for sonar and sound processing and for social interactions. Others have argued that regardless of brain size, dolphins have an intelligence level somewhere between that of a dog and a chimpanzee. The fact is, we don’t know, and comparisons may not be especially helpful. Just as human intelligence is right for the dolphin's way of life. Until we know more all we can say is that dolphin intelligence is different.</p>
                  `,
                  content: `Based on the text, how would text 2 most likely respond to the last sentence of text 1?`,
                  choice_A:
                    "suggesting that intelligence in animals is virtually impossible to measure",
                  choice_B:
                    "questioning the objectivity of the studies already conducted",
                  choice_C:
                    "observing that intelligence does not mean the same implicattion  for every species",
                  choice_D:
                    "arguing that little is actually known about dolphin social behavior",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
