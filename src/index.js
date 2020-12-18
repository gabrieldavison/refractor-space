import Hydra from "hydra-synth";
import { initialScene, scene1 } from "./hydra";
import { p5Sketch } from "./p5Sketch";
import * as Tone from "tone";
import SoundEngine from "./sound/SoundEngine";

//Set up Hydra
const hydraCanvas = document.getElementById("hydra-canvas");
const hydra = new Hydra({
  canvas: hydraCanvas,
  detectAudio: false,
});
hydra.setResolution(1280, 720);

//Set up sound engine
const Sound = new SoundEngine();

window.onload = () => {
  renderInitialScene();
};

function renderInitialScene() {
  toggleSceneModal();
  initialScene();
}

function renderScene1() {
  console.log("scene1");
  toggleSceneModal();
  scene1();
  Tone.start();
  Tone.Transport.start();
}

const sceneModal = document.getElementById("scene-modal");
const sceneModalWrapper = document.getElementById("scene-modal-wrapper");

sceneModal.addEventListener("click", () => {
  renderScene1();
});

function toggleSceneModal() {
  sceneModalWrapper.classList.toggle("hidden");
}
