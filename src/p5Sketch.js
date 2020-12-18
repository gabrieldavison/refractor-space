import p5 from "p5";

let maskUrl = require("./assets/mask2.obj");

const sketch = function (p) {
  let mask;

  p.preload = function () {
    mask = p.loadModel(maskUrl);
  };

  p.setup = function () {
    let cnv = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    cnv.id("p5-canvas");
  };

  p.draw = function () {
    // p.ambientLight(60, 60, 50);
    p.pointLight(200, 200, 200, p.windowWidth / 4, p.windowHeight / 2, 50);
    p.background(0);

    p.fill(255);
    p.push();
    p.translate((p.windowWidth / 4) * -1, 0);
    p.rotateY(p.millis() / 1000);
    p.rotateX(p.millis() / 3000);
    p.scale(50);
    p.specularMaterial(250);
    p.model(mask);
    p.pop();
  };
};

export const p5Sketch = new p5(sketch, "p5-wrapper", { mode: "WEBGL" });
