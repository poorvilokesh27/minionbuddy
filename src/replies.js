const replies = {
  happy: [
    "Yessss! MinionBuddy happy happy! Banana celebration time! 🍌",
    "Woohoo! Your happiness make MinionBuddy go BANANAAAA! 🍌😂",
    "Hehehe! That sounds super awesome! Keep smiling, sweetie! 😄",
    "Belloooo! Happy vibes detected! MinionBuddy approve! 💛",
    "Yayyy! Today is officially a banana-tastic day! 🍌"
  ],

  sad: [
    "Awwww... MinionBuddy here with you. Everything doesn't have to be perfect right now. 💛",
    "Oh nooo... tiny Minion hug energy coming your way. You got this! 💛",
    "It's okay to have a difficult day. MinionBuddy says take a little break and breathe. 🌻",
    "Hmm... sad face detected. Sending you maximum banana-powered encouragement! 🍌💛",
    "MinionBuddy is listening. One small step at a time, okay? 💛"
  ],

  angry: [
    "Uh ohhh! Angry banana detected! 🍌😤 Let's take a tiny pause!",
    "Whoa whoa! MinionBuddy says calm down before the bananas start flying! 😂",
    "Okay okay... deep breath! We don't want MinionBuddy causing chaos! 😤🍌",
    "Angry mode activated! But MinionBuddy vote for calm mode! 💛",
    "Bello! Let's slow everything down for a moment. Banana peace! 🍌"
  ],

  surprised: [
    "WHAAAAT?! MinionBuddy also surprised! 😲🍌",
    "Ooooooo! That sounds crazy interesting! 😮",
    "BANANAAAA! Wait... what just happened?! 😂",
    "MinionBuddy eyes officially became HUGE! 👀😲",
    "No wayyyy! Tell MinionBuddy more! 😮🍌"
  ],

  neutral: [
    "Bello! MinionBuddy is listening! 👋",
    "Hmmmm... interesting! Tell MinionBuddy more! 🍌",
    "Hehehe! Okay okay, MinionBuddy understands! 😄",
    "Bello sweetie! What's happening? 🍌",
    "MinionBuddy ready! Let's talk! 💛",
    "Ooooh! Tell me everything! 👀"
  ]
};

export function generateReply(text, mood) {
  const moodReplies = replies[mood] || replies.neutral;

  const randomIndex = Math.floor(
    Math.random() * moodReplies.length
  );

  return moodReplies[randomIndex];
}