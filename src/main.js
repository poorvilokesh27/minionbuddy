import { speakMinion } from "./voice.js";
import { askMinionBuddy } from "./ai.js";

// ===============================
// MINION ASSETS
// ===============================

const minionReactions = {
  happy: "/assets/minion/happy.jpg",
  sad: "/assets/minion/sad.jpg",
  angry: "/assets/minion/angry.jpg",
  surprised: "/assets/minion/surprised.jpg",
  neutral: "/assets/minion/idle.jpg"
};

const loadingAnimations = [
  "/assets/minion/animations/banana.gif",
  "/assets/minion/animations/bumping.gif",
  "/assets/minion/animations/dancing.gif",
  "/assets/minion/animations/falling.gif",
  "/assets/minion/animations/waiting.gif"
];

const memes = {
  happy: [
    "/assets/memes/happy/happy.gif",
    "/assets/memes/happy/happy1.gif",
    "/assets/memes/happy/happy2.gif",
    "/assets/memes/happy/happy3.gif",
    "/assets/memes/happy/happy4.webp"
  ],

  sad: [
    "/assets/memes/sad/sad.gif",
    "/assets/memes/sad/sad1.gif",
    "/assets/memes/sad/sad2.gif",
    "/assets/memes/sad/sad3.gif"
  ],

  angry: [
    "/assets/memes/angry/angry.gif",
    "/assets/memes/angry/angry1.gif",
    "/assets/memes/angry/angry2.gif",
    "/assets/memes/angry/angry3.gif",
    "/assets/memes/angry/angry4.gif"
  ],

  surprised: [
    "/assets/memes/surprised/surprised.gif",
    "/assets/memes/surprised/surprised1.gif",
    "/assets/memes/surprised/surprised2.gif"
  ],

  neutral: [
    "/assets/memes/neutral/neutral.gif",
    "/assets/memes/neutral/neutral1.gif",
    "/assets/memes/neutral/neutral2.gif",
    "/assets/memes/neutral/neutral3.gif"
  ]
};

// ===============================
// GET HTML ELEMENTS
// ===============================

const textInput = document.querySelector("#textInput");
const sendButton = document.querySelector("#sendButton");
const chat = document.querySelector("#chat");

const characterImage = document.querySelector("#characterImage");
const thinkingAnimation = document.querySelector("#thinkingAnimation");

const introScreen = document.querySelector("#introScreen");
const introVideo = document.querySelector("#introVideo");

const setupScreen = document.querySelector("#setupScreen");
const sweetieName = document.querySelector("#sweetieName");
const userAge = document.querySelector("#userAge");
const startButton = document.querySelector("#startButton");
const setupError = document.querySelector("#setupError");

const app = document.querySelector("#app");

const welcomeText = document.querySelector("#welcomeText");
const moodLabel = document.querySelector("#moodLabel");
const statusText = document.querySelector("#statusText");

const memeSection = document.querySelector("#memeSection");
const memeImage = document.querySelector("#memeImage");

const skipIntro = document.querySelector("#skipIntro");

// ===============================
// HELPER
// ===============================

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

// ===============================
// CHAT MESSAGE
// ===============================

function showMessage(text, sender) {
  if (!chat) return;

  const message = document.createElement("div");

  message.className =
    sender === "user"
      ? "message user-message"
      : "message bot-message";

  if (sender === "bot") {
    message.innerHTML = `
      <strong>MinionBuddy:</strong>
      <span>${text}</span>
    `;
  } else {
    message.textContent = text;
  }

  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

// ===============================
// SHOW MOOD
// ===============================

function showMood(mood) {
  if (characterImage && minionReactions[mood]) {
    characterImage.src = minionReactions[mood];
  }

  if (moodLabel) {
    moodLabel.textContent =
      `MOOD: ${mood.toUpperCase()}`;
  }

  if (statusText) {
    statusText.textContent =
      `Feeling ${mood} 🍌`;
  }

  if (memeImage) {
    const moodMemes =
      memes[mood] || memes.neutral;

    memeImage.src = randomItem(moodMemes);

    if (memeSection) {
      memeSection.classList.remove("hidden");
    }
  }
}

// ===============================
// THINKING ANIMATION
// ===============================

function showLoadingAnimation() {
  if (thinkingAnimation && characterImage) {
    thinkingAnimation.src =
      randomItem(loadingAnimations);

    thinkingAnimation.classList.remove("hidden");
    characterImage.classList.add("hidden");
  }

  if (statusText) {
    statusText.textContent =
      "MinionBuddy is thinking... 🍌";
  }
}

function stopLoadingAnimation() {
  if (thinkingAnimation && characterImage) {
    thinkingAnimation.classList.add("hidden");
    characterImage.classList.remove("hidden");
  }
}

// ===============================
// SEND MESSAGE
// ===============================

async function handleSend() {
  if (!textInput) return;

  const text = textInput.value.trim();

  if (!text) return;

  showMessage(text, "user");

  textInput.value = "";

  showLoadingAnimation();

 

  const name =
    localStorage.getItem("minionBuddyName") || "Sweetie";

  try {
    const result =
      await askMinionBuddy(text, name);

    const reply =
      result.reply ||
      "Bello! Try asking me again! 🍌";

    const mood =
      result.mood ||
      "neutral";

    stopLoadingAnimation();

    showMood(mood);

    showMessage(reply, "bot");

    speakMinion(reply);

  } catch (error) {
    console.error("AI ERROR:", error);

    stopLoadingAnimation();

    showMood("neutral");

    const reply =
      "Banana emergency! My AI brain is temporarily sleeping! 🍌😴";

    showMessage(reply, "bot");

    speakMinion(reply);
  }
}

// ===============================
// SEND BUTTON
// ===============================

if (sendButton) {
  sendButton.addEventListener(
    "click",
    handleSend
  );
}

// ===============================
// ENTER KEY
// ===============================

if (textInput) {
  textInput.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {
        event.preventDefault();
        handleSend();
      }
    }
  );
}

// ===============================
// START APP
// ===============================

if (startButton) {
  startButton.addEventListener(
    "click",
    () => {
      const name =
        sweetieName?.value.trim();

      const age =
        userAge?.value.trim();

      if (!name) {
        if (setupError) {
          setupError.textContent =
            "Please enter your name 🍌";
        }
        return;
      }

      if (!age) {
        if (setupError) {
          setupError.textContent =
            "Please enter your age 🍌";
        }
        return;
      }

      localStorage.setItem(
        "minionBuddyName",
        name
      );

      if (setupScreen) {
        setupScreen.classList.add("hidden");
      }

      if (app) {
        app.classList.remove("hidden");
      }

      if (welcomeText) {
        welcomeText.textContent =
          `Hello ${name}! Your silly little AI buddy is ready 🍌`;
      }

      showMessage(
        `Bello ${name}! MinionBuddy is ready! 🍌`,
        "bot"
      );

      speakMinion(
        `Bello ${name}! MinionBuddy is ready!`
      );
    }
  );
}

// ===============================
// INTRO VIDEO
// ===============================

function finishIntro() {
  if (introScreen) {
    introScreen.classList.add("hidden");
  }

  if (setupScreen) {
    setupScreen.classList.remove("hidden");
  }
}

if (introVideo) {
  introVideo.addEventListener(
    "ended",
    finishIntro
  );

  introVideo.addEventListener(
    "error",
    finishIntro
  );
}

// ===============================
// SKIP INTRO
// ===============================

if (skipIntro) {
  skipIntro.addEventListener(
    "click",
    finishIntro
  );
}

// ===============================
// INITIAL STATE
// ===============================

if (introScreen) {
  introScreen.classList.remove("hidden");
}

if (setupScreen) {
  setupScreen.classList.add("hidden");
}

if (app) {
  app.classList.add("hidden");
}

if (memeSection) {
  memeSection.classList.add("hidden");
}