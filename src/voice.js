export function speakMinion(text) {
  if (!("speechSynthesis" in window)) {
    console.log("Speech synthesis is not supported.");
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = "en-US";
  speech.rate = 1.15;
  speech.pitch = 1.7;
  speech.volume = 1;

  const voices = window.speechSynthesis.getVoices();

  const englishVoice =
    voices.find((voice) => voice.lang === "en-US") ||
    voices.find((voice) => voice.lang.startsWith("en")) ||
    voices[0];

  if (englishVoice) {
    speech.voice = englishVoice;
  }

  window.speechSynthesis.speak(speech);
}