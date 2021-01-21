import p5 from "p5";
import p5Sketch from "./p5Sketch";
import Hydra from "hydra-synth";
import hydraSketch from "./hydraSketch";

const hydraCanvas = document.getElementById("hydra-canvas");

window.onload = () => {
  console.log(hydraCanvas);
  const sketch = new p5(p5Sketch);
  const hydra = new Hydra({
    canvas: hydraCanvas,
    detectAudio: false,
    enableStreamCapture: false,
  });
  hydra.setResolution(500, 500);
};
