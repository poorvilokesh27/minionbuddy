export function detectMood(text) {
  const message = text.toLowerCase();

  const moods = {
    happy: [
      "happy",
      "excited",
      "great",
      "awesome",
      "amazing",
      "good",
      "yay",
      "love",
      "fun",
      "wonderful",
      "best",
      "haha",
      "lol",
      "😂",
      "❤️",
      "😍"
    ],

    sad: [
      "sad",
      "cry",
      "crying",
      "upset",
      "lonely",
      "hurt",
      "bad",
      "depressed",
      "miss",
      "lost",
      "tired",
      "😢",
      "😭",
      "💔"
    ],

    angry: [
      "angry",
      "mad",
      "hate",
      "annoyed",
      "furious",
      "irritated",
      "stupid",
      "worst",
      "😡",
      "🤬"
    ],

    surprised: [
      "wow",
      "omg",
      "really",
      "what",
      "surprise",
      "surprised",
      "unbelievable",
      "seriously",
      "😮",
      "😲"
    ]
  };

  for (const mood in moods) {
    for (const word of moods[mood]) {
      if (message.includes(word)) {
        return mood;
      }
    }
  }

  return "neutral";
}