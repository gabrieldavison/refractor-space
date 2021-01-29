import p5 from "p5";
import p5Sketch from "./p5Sketch";
import Hydra from "hydra-synth";
import SoundEngineGOML from "../sound/SoundEngineGOML";
import * as Tone from "tone";

// const Sound = new SoundEngineGOML();
const hydraCanvas = document.getElementById("hydra-canvas");

window.onload = () => {
  console.log(hydraCanvas);
  const sketch = new p5(p5Sketch);
  const hydra = new Hydra({
    canvas: hydraCanvas,
    detectAudio: false,
    enableStreamCapture: false,
  });
  hydra.setResolution(1000, 1000);
  // Tone.start().then(Sound.start());
};
