import Hydra from "hydra-synth";
import { initialScene } from "./hydra";

window.onload = () => {
  const hydra = new Hydra({
    canvas: document.getElementById("hydra-canvas"),
    detectAudio: false,
  });
  hydra.setResolution(1280, 720);
  initialScene();
};
