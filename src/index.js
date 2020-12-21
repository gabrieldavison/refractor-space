import Hydra from "hydra-synth";
import { initialScene, scene1 } from "./hydra";

//Set up Hydra
const hydraCanvas = document.getElementById("hydra-canvas");
const hydra = new Hydra({
  canvas: hydraCanvas,
  detectAudio: false,
});
hydra.setResolution(1280, 720);

window.onload = () => {
  initialScene();
};
