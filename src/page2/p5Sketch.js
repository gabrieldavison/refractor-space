import hydraSketch from "./hydraSketch";

let maskUrl = require("../assets/mask1-hp.obj");

const p5Sketch = (p) => {
  let canvas;
  let mask;
  let cam;
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

  p.preload = function () {
    mask = p.loadModel(maskUrl);
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
  };

  p.draw = function () {
    hydraContext2d.drawImage(hydraCanvas, 0, 0);
    hydraImageData = hydraContext2d.getImageData(
      0,
      0,
      hydraCanvas2d.width,
      hydraCanvas2d.height
    );

    p.background(100);

    camX = p.map(p.mouseX, 0, p.width, 500, -500);
    camY = p.map(p.mouseY, 0, p.height, 500, -500);
    p.camera(camX, camY, camZ, camCenterX, camCenterY, camCenterZ, 0, 1, 0);
    p.push();
    p.rotateX(p.HALF_PI);
    p.translate(0, -150, -250);
    p.noFill();

    p.normalMaterial();
    p.texture(hydraImageData);
    p.plane(1000, 1000);

    p.pop();

    p.push();

    p.scale(50);
    p.rotateZ(p.PI);
    p.noFill();
    p.normalMaterial();

    p.model(mask);
    p.pop();
  };
};

export default p5Sketch;
