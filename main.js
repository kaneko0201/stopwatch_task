const time = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let startTime;
let stopTime = 0;
let timeoutID;

function updateButtonState(startDisabled ,stopDisabled ,resetDisabled) {
  startButton.disabled = startDisabled;
  stopButton.disabled = stopDisabled;
  resetButton.disabled = resetDisabled;
}

function displayTime() {
  const elapsed = Date.now() - startTime + stopTime;
  const h = String(Math.floor(elapsed / 3600000));
  const m = String(Math.floor((elapsed % 3600000)/60000));
  const s = String(Math.floor((elapsed % 60000)/1000));
  const ms = String(elapsed % 1000);

  time.textContent = `${h}:${m}:${s}:${ms}`;
  timeoutID = setTimeout(displayTime, 10);
}

startButton.addEventListener("click" ,() => {
  updateButtonState(true, false, false);
  clearTimeout(timeoutID);
  startTime = Date.now();
  displayTime();
});

stopButton.addEventListener("click" ,() => {
  updateButtonState(false, true, false);
  clearTimeout(timeoutID);
  stopTime += (Date.now() - startTime);
});

resetButton.addEventListener("click" ,() => {
  updateButtonState(false, true, true);
  clearTimeout(timeoutID);
  time.textContent = "0:0:0:0";
  stopTime = 0;
});
