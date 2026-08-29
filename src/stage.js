// Controls the idle/typing/paused/sent/celebrate animation states of the 3 minions.
export function createStageController(stageEl, labelEl) {
  function setStage(state, label) {
    stageEl.setAttribute("data-state", state);
    labelEl.textContent = label;
  }
  return { setStage };
}
