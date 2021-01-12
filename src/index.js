import Hydra from "hydra-synth";
import hydraIndex from "./hydraIndex";

window.onload = () => {
  const hydra = new Hydra({
    canvas: document.getElementById("hydra-canvas"),
    detectAudio: false,
    enableStreamCapture: false,
  });
  hydra.setResolution(854, 480);
  hydraIndex();
};
