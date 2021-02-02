import p5 from "p5";
import Hydra from "hydra-synth";
import SoundEngineGOML from "../sound/SoundEngineGOML";
import * as Tone from "tone";
import hydraSketch from "./hydraSketch";

let maskUrl = require("../assets/mask1-hp.obj");
let maskUrl2 = require("../assets/mask2.obj");

const soundEngine = new SoundEngineGOML();
const hydraCanvas = document.getElementById("hydra-canvas");
document.onscroll = (e) => {
  e.preventDefault();
};

const playModal = document.getElementById("play-modal");
const playButton = document.getElementById("play-button");
console.log(playButton);
playButton.addEventListener("click", () => {
  Tone.start().then(soundEngine.start());
  playModal.classList.add("hidden");
});

const p5Sketch = (p) => {
  const screenMultiplier = p.windowWidth < 750 ? 0.6 : 1;
  let canvas;
  let mask;
  let mask2;
  let hydraCanvas;
  let hydraCanvas2d;
  let hydraContext2d;
  let hydraImageData;

  let camX = 0;
  let camY = 0;
  let camZ = p.height / 2.0 / p.tan((p.PI * 30.0) / 180.0);
  let camCenterX = 0;
  let camCenterY = 0;
  let camCenterZ = 0;
  let camTargetX = 0;
  let camTargetY = 0;
  let camPosX = 0;
  let camPosY = 0;
  let hpCutoffValue = 0;
  let hpCutoffTarget = 0;
  let lpCutoffValue = 20000;
  let lpCutoffTarget = 20000;
  let decayValue = p.height / 2;
  let decayTarget = p.height / 2;

  p.preload = function () {
    mask = p.loadModel(maskUrl);
    mask2 = p.loadModel(maskUrl2);
  };

  p.setup = function () {
    hydraCanvas = document.getElementById("hydra-canvas");
    hydraCanvas2d = document.getElementById("hydra-canvas-2d");
    hydraContext2d = hydraCanvas2d.getContext("2d");

    canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    canvas.id("p5-canvas");

    let cam = p.camera();
    camZ = p.height / 2.0 / p.tan((p.PI * 30.0) / 180.0);
    hydraSketch();
    camTargetX = p.width / 2;
    camTargetY = p.height / 2;
  };

  p.mouseDragged = function () {
    camTargetX = p.mouseX;
    camTargetY = p.mouseY;
    if (p.mouseX > p.width / 2) {
      hpCutoffTarget = p.mouseX;
    } else {
      lpCutoffTarget = p.mouseX;
    }
    decayTarget = p.mouseY;
  };
  p.mouseReleased = function () {
    camTargetX = p.width / 2;
    camTargetY = p.height / 2;
    hpCutoffTarget = 0;
    lpCutoffTarget = p.width / 2;
    decayTarget = p.height / 2;
  };

  p.draw = function () {
    hydraContext2d.drawImage(hydraCanvas, 0, 0);
    hydraImageData = hydraContext2d.getImageData(
      0,
      0,
      hydraCanvas2d.width,
      hydraCanvas2d.height
    );
    p.ambientLight(250);
    p.background(0);
    //Set up camera
    camPosX = p.lerp(camPosX, camTargetX, 0.05);
    camPosY = p.lerp(camPosY, camTargetY, 0.05);
    camX = p.map(camPosX, 0, p.width, 500, -500);
    camY = p.map(camPosY, 0, p.height, 500, -500);

    p.camera(camX, camY, camZ, camCenterX, camCenterY, camCenterZ, 0, 1, 0);

    hpCutoffValue = p.lerp(hpCutoffValue, hpCutoffTarget, 0.1);
    soundEngine.setHpCutoff(
      p.map(hpCutoffValue, p.width / 2, p.width, 5, 3000, true)
    );

    lpCutoffValue = p.lerp(lpCutoffValue, lpCutoffTarget, 0.08);
    soundEngine.setLpCutoff(
      p.map(lpCutoffValue, -5, p.width / 2, 500, 15000, true)
    );

    decayValue = p.lerp(decayValue, decayTarget, 0.1);
    soundEngine.setDelayFeedback(p.map(decayValue, p.height, 0, 0, 1, true));

    //Draw plane 1
    p.push();
    p.rotateX(p.HALF_PI);
    p.translate(0, -275, -350 * screenMultiplier);
    p.noStroke();
    p.texture(hydraImageData);
    p.plane(800 * screenMultiplier, 800 * screenMultiplier);
    p.pop();

    //Draw Mask
    p.push();
    p.translate(0, 0, screenMultiplier === 1 ? -150 : -250);
    p.scale(75 * screenMultiplier);
    p.rotateZ(p.PI);
    p.noFill();
    p.model(mask2);
    p.pop();

    //Draw sphere
    p.push();
    p.texture(hydraImageData);
    p.sphere(2000 * screenMultiplier);
    p.pop();
  };
};

window.onload = () => {
  const sketch = new p5(p5Sketch);
  const hydra = new Hydra({
    canvas: hydraCanvas,
    detectAudio: false,
    enableStreamCapture: false,
  });
  hydra.setResolution(1000, 1000);
};

// document.getElementById("start-audio").addEventListener("click", () => {
//   Tone.start().then(soundEngine.start());
// });
