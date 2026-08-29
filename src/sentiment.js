// Lightweight local sentiment analysis — no external API needed.
const POSITIVE = ["good","great","happy","love","awesome","excited","win","amazing","fun","best","nice","cool","banana","yay","joy","glad","success","proud","fantastic","superb"];
const NEGATIVE = ["sad","bad","angry","hate","tired","fail","worried","stressed","upset","cry","annoyed","terrible","awful","depressed","frustrated","lonely","exam","worry","pain","hurt"];
const QUESTION_WORDS = ["what","why","how","when","where","who","can","should","is","are","do","does"];

export function analyzeSentiment(text) {
  const words = text.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).filter(Boolean);
  let score = 0;
  words.forEach((w) => {
    if (POSITIVE.includes(w)) score += 1;
    if (NEGATIVE.includes(w)) score -= 1;
  });

  const isQuestion = text.trim().endsWith("?") || QUESTION_WORDS.includes(words[0]);

  let mood = "neutral";
  if (score > 0) mood = "happy";
  else if (score < 0) mood = "sad";
  if (words.some((w) => ["angry", "hate", "furious", "mad"].includes(w))) mood = "angry";

  return { mood, isQuestion, score };
}
