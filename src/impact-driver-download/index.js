import { IDD, IDDIphone } from "../p5Sketch";
import Hydra from "hydra-synth";
import * as Tone from "tone";
import SoundEngine from "../sound/SoundEngine";
import p5 from "p5";
import iOS from "../utils/iOS";

//Set up Hydra
const hydraCanvas = document.getElementById("hydra-canvas");

//Set up sound engine
const Sound = new SoundEngine();

window.onload = () => {
  if (!iOS()) {
    const hydra = new Hydra({
      canvas: hydraCanvas,
      detectAudio: false,
      enableStreamCapture: false,
    });
    hydra.setResolution(1280, 720);
    const p5Sketch = new p5(IDD, "p5-wrapper", { mode: "WEBGL" });
  } else {
    console.log("iphone");
    const p5Sketch = new p5(IDDIphone, "p5-wrapper", { mode: "WEBGL" });
  }
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
