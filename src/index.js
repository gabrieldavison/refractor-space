import Hydra from "hydra-synth";
import { initialScene } from "./hydra";
import iOS from "./utils/iOS";

window.onload = () => {
  if (!iOS()) {
    const hydra = new Hydra({
      canvas: document.getElementById("hydra-canvas"),
      detectAudio: false,
      enableStreamCapture: false,
    });
    hydra.setResolution(854, 480);
    initialScene();
  }
};
