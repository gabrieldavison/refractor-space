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
    p.background(255);

    p.fill(100);
    p.push();
    p.translate((p.windowWidth / 4) * -1, 0);
    p.rotateY(p.millis() / 1000);
    p.rotateX(p.millis() / 3000);
    p.scale(50);
    p.model(mask);
    p.pop();
  };
};

export const p5Sketch = new p5(sketch, "p5-wrapper", { mode: "WEBGL" });
