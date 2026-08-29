// Minion-style voice using the browser's built-in SpeechSynthesis API.
// No API key or network request needed.
export function speakMinion(text, enabled) {
  if (!enabled) return;
  if (!("speechSynthesis" in window)) return;

  const clean = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "");
  const utter = new SpeechSynthesisUtterance(clean);
  utter.pitch = 1.9; // higher pitch = squeaky minion voice
  utter.rate = 1.15; // slightly faster
  utter.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}
