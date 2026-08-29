import "./style.css";
import { generateReply } from "./replies.js";
import { speakMinion } from "./voice.js";
import { generateMeme } from "./meme.js";
import { createStageController } from "./stage.js";

const stageEl = document.getElementById("stage");
const stageLabel = document.getElementById("stageLabel");
const textInput = document.getElementById("textInput");
const sendBtn = document.getElementById("sendBtn");
const chat = document.getElementById("chat");
const voiceToggle = document.getElementById("voiceToggle");
const memeToggle = document.getElementById("memeToggle");

const { setStage } = createStageController(stageEl, stageLabel);

let pauseTimer = null;

textInput.addEventListener("focus", () => setStage("idle", "peeking..."));

textInput.addEventListener("input", () => {
  setStage("typing", "typing! typing!");
  clearTimeout(pauseTimer);
  pauseTimer = setTimeout(() => {
    if (textInput.value.trim().length > 0) setStage("paused", "tap tap tap...");
  }, 1400);
});

textInput.addEventListener("blur", () => {
  if (!textInput.value.trim()) setStage("idle", "waiting...");
});

function addUserMsg(text) {
  const div = document.createElement("div");
  div.className = "msg user";
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function addBotMsg(text, mood) {
  const div = document.createElement("div");
  div.className = "msg bot";
  div.innerHTML = `${text}<span class="mood-tag">detected mood: ${mood}</span>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function addMemeMsg(canvas) {
  const wrap = document.createElement("div");
  wrap.className = "meme-card";
  wrap.appendChild(canvas);

  const link = document.createElement("a");
  link.textContent = "Download meme";
  link.href = canvas.toDataURL("image/png");
  link.download = "minion-meme.png";
  wrap.appendChild(link);

  chat.appendChild(wrap);
  chat.scrollTop = chat.scrollHeight;
}

function handleSend() {
  const text = textInput.value.trim();
  if (!text) return;

  addUserMsg(text);
  textInput.value = "";
  setStage("sent", "sending!!");

  setTimeout(() => {
    const { text: reply, mood } = generateReply(text);
    addBotMsg(reply, mood);
    speakMinion(reply.replace(/\{tag\}/, ""), voiceToggle.checked);
    setStage("celebrate", "yay!");

    if (memeToggle.checked) {
      const caption = text.length > 60 ? text.slice(0, 60) + "..." : text;
      const canvas = generateMeme(caption, mood);
      addMemeMsg(canvas);
    }

    setTimeout(() => setStage("idle", "waiting..."), 1600);
  }, 700);
}

sendBtn.addEventListener("click", handleSend);
textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSend();
});
