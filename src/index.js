import Hydra from "hydra-synth";
import { initialScene, scene1 } from "./hydra";
import { p5Sketch } from "./p5Sketch";
import * as Tone from "tone";
import SoundEngine from "./sound/SoundEngine";

const hydraCanvas = document.getElementById("hydra-canvas");

const hydra = new Hydra({
  canvas: hydraCanvas,
  detectAudio: false,
});
hydra.setResolution(1280, 720);
const Sound = new SoundEngine();

window.onload = () => {
  initialScene();
};

const sceneModal = document.getElementById("scene-modal");
const sceneModalWrapper = document.getElementById("scene-modal-wrapper");

sceneModal.addEventListener("click", toggleSceneModal);

function toggleSceneModal() {
  console.log("toggle");
  sceneModalWrapper.classList.toggle("hidden");
  scene1();
  Tone.start();
  Tone.Transport.start();
}
