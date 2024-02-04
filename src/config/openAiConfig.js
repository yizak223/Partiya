import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const callOpenAIAPI = async (answer) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Generate a list of items needed for a provided activity. The list should not have numbers only the item and no arrows, it will contain only one item(one word) per list item. Also take in mind the time length of activity and the season.",
      },
      {
        role: "user",
        content: answer,
      },
    ],
    temperature: 0.7,
    max_tokens: 100,
    top_p: 1,
  });

  const list = response.choices[0].message.content.split("\n");


  return list;
};

export { callOpenAIAPI, openai };
