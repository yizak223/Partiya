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
          "Generate a list of items needed for a provided activity. The list should not have numbers and it will contain only one item per list item.",
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

  const list = response.choices[0];


  
  return list;
};

export { callOpenAIAPI, openai };
