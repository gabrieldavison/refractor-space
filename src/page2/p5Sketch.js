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
  let camTargetX = 0;
  let camTargetY = 0;

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

  p.mouseDragged = function () {
    camTargetX = p.mouseX;
    camTargetY = p.mouseY;
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

    // camX = p.map(p.mouseX, 0, p.width, 500, -500);
    // camY = p.map(p.mouseY, 0, p.height, 500, -500);

    camX = p.map(p.lerp(p.width / 2, camTargetX, 0.4), 0, p.width, 500, -500);
    camY = p.map(p.lerp(p.height / 2, camTargetY, 0.4), 0, p.height, 500, -500);

    p.camera(camX, camY, camZ, camCenterX, camCenterY, camCenterZ, 0, 1, 0);

    //Draw plane 1
    p.push();
    p.rotateX(p.HALF_PI);
    p.translate(0, -150, -250);
    p.noFill();
    p.texture(hydraImageData);
    p.plane(800, 800);
    p.pop();

    //Draw plane 2
    p.push();
    p.translate(-600, -200, -700);
    p.rotateX(15);
    p.rotateY(15);
    p.noFill();
    p.normalMaterial(250);
    p.texture(hydraImageData);
    p.plane(800, 800);
    p.pop();

    //Draw plane 2
    p.push();
    p.translate(600, -200, -700);
    p.rotateX(345);
    p.rotateY(345);
    p.noFill();
    p.normalMaterial();
    p.texture(hydraImageData);
    p.plane(800, 800);
    p.pop();

    //Draw Mask
    p.push();
    p.translate(0, 0, -200);
    p.scale(50);
    p.rotateZ(p.PI);
    p.noFill();
    p.normalMaterial();
    p.model(mask);
    p.pop();
  };
};

export default p5Sketch;
