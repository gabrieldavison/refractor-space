import p5IDD from "./p5IDD";
import Hydra from "hydra-synth";
import * as Tone from "tone";
import SoundEngineIDD from "../sound/SoundEngineIDD";
import p5 from "p5";

//Set up Hydra
const hydraCanvas = document.getElementById("hydra-canvas");

//Set up sound engine
const Sound = new SoundEngineIDD();

window.onload = () => {
  const hydra = new Hydra({
    canvas: hydraCanvas,
    detectAudio: false,
    enableStreamCapture: false,
  });
  hydra.setResolution(1280, 720);
  const sketch = new p5(p5IDD, "p5-wrapper", { mode: "WEBGL" });
};
const playModal = document.getElementById("play-modal");
const playButton = document.getElementById("play-button");
playButton.addEventListener("click", () => {
  Tone.start().then(Sound.start());
  playModal.classList.add("hidden");
});

// Sets up infinite scroll

let pageHeight = 10000;
let extenderHeight = 10000;
const contentContainer = document.getElementById("content-container");
console.log(contentContainer);

document.addEventListener("scroll", () => {
  if (window.scrollY > pageHeight - 2000) {
    console.log("extend");
    const extender = document.createElement("div");
    extender.style.height = `${extenderHeight}px`;
    contentContainer.appendChild(extender);
    pageHeight += 10000;
    // extenderHeight += 10000;
  }
});
