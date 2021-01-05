import { IDD } from "../p5Sketch";
import Hydra from "hydra-synth";
import * as Tone from "tone";
import SoundEngine from "../sound/SoundEngine";
import p5 from "p5";

//Set up Hydra
const hydraCanvas = document.getElementById("hydra-canvas");

//Set up sound engine
const Sound = new SoundEngine();

window.onload = () => {
  const hydra = new Hydra({
    canvas: hydraCanvas,
    detectAudio: false,
  });
  hydra.setResolution(1280, 720);
  const p5Sketch = new p5(IDD, "p5-wrapper", { mode: "WEBGL" });
  Tone.start();
  // Tone.Transport.start();
  Sound.start();
};

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
