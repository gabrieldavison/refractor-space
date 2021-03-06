import hydraSketch from "./hydraSketch";

let maskUrl = require("../assets/mask1-hp.obj");
let maskUrl2 = require("../assets/mask2.obj");

const p5Sketch = (p) => {
  let canvas;
  let mask;
  let mask2;
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
  let camPosX = 0;
  let camPosY = 0;

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
  };
  p.mouseReleased = function () {
    camTargetX = p.width / 2;
    camTargetY = p.height / 2;
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
    p.background(200);
    //Set up camera
    camPosX = p.lerp(camPosX, camTargetX, 0.05);
    camPosY = p.lerp(camPosY, camTargetY, 0.05);

    camX = p.map(camPosX, 0, p.width, 500, -500);
    camY = p.map(camPosY, 0, p.height, 500, -500);

    p.camera(camX, camY, camZ, camCenterX, camCenterY, camCenterZ, 0, 1, 0);

    //Draw plane 1
    p.push();
    p.rotateX(p.HALF_PI);
    p.translate(0, -275, -350);
    p.noStroke();
    p.texture(hydraImageData);
    p.plane(800, 800);
    p.pop();

    // //Draw plane 2
    // p.push();
    // p.translate(-400, -200, -500);
    // p.rotateX(15);
    // p.rotateY(15);
    // p.noFill();
    // p.normalMaterial(250);
    // p.texture(hydraImageData);
    // p.plane(800, 800);
    // p.pop();

    // //Draw plane 2
    // p.push();
    // p.translate(400, -200, -500);
    // p.rotateX(345);
    // p.rotateY(345);
    // p.noFill();
    // p.normalMaterial();
    // p.texture(hydraImageData);
    // p.plane(800, 800);
    // p.pop();

    //Draw Mask

    p.push();
    p.translate(0, 0, -150);
    p.scale(75);
    p.rotateZ(p.PI);
    // p.texture(hydraImageData);
    p.noFill();
    p.model(mask2);
    p.pop();

    p.push();
    p.texture(hydraImageData);
    // p.noStroke();
    p.sphere(2000);
    p.pop();
  };
};

export default p5Sketch;
