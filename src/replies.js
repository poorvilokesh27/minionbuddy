import { analyzeSentiment } from "./sentiment.js";

const MINIONESE_TAGS = ["Poopaye!", "Bello!", "Tank yu!", "Para tú!", "Underwear!", "Baboi!", "Tulaliloo!"];

function randomTag() {
  return MINIONESE_TAGS[Math.floor(Math.random() * MINIONESE_TAGS.length)];
}

const REPLY_BANK = {
  happy: [
    "Hehe that's making us do a happy wiggle right now! {tag}",
    "Yesss! Banana energy detected. Keep going! {tag}",
    "We are literally jumping over here. Love this for you. {tag}",
  ],
  sad: [
    "Aww, no no. Bring the banana closer, we sit with you. {tag}",
    "That sounds heavy. Stuart says take a breath, we're not going anywhere. {tag}",
    "Okay okay, group hug protocol activated. {tag}",
  ],
  angry: [
    "WHOA. Okay. Kevin says punch a pillow, not us please. {tag}",
    "Big feelings detected! Let it out, we'll just duck. {tag}",
    "That's frustrating fr. Want to vent more or distract you? {tag}",
  ],
  neutral: [
    "Noted! Tell us more, we're curious little yellow guys. {tag}",
    "Okay okay, going on the list of things we now know about you. {tag}",
    "Interesting! Bob wants details though. {tag}",
  ],
  question: [
    "Ooooh good question. Honestly? We're just minions, but here's our guess: think it through step by step and trust yourself. {tag}",
    "Hmm we scratched our heads on that one. What does your gut say? {tag}",
    "Big question! We'd say: try it and see what happens. {tag}",
  ],
};

export function generateReply(text) {
  const { mood, isQuestion } = analyzeSentiment(text);
  const bankKey = isQuestion ? "question" : mood;
  const bank = REPLY_BANK[bankKey] || REPLY_BANK.neutral;
  const template = bank[Math.floor(Math.random() * bank.length)];
  return {
    text: template.replace("{tag}", randomTag()),
    mood: isQuestion ? "neutral" : mood,
  };
}
