let maskUrl = require("./assets/mask2.obj");
import { scene1 } from "./hydra";

export const IDD = function (p) {
  let mask;

  p.preload = function () {
    mask = p.loadModel(maskUrl);
  };

  p.setup = function () {
    let cnv = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    cnv.id("p5-canvas");
    scene1();
  };

  p.draw = function () {
    // p.ambientLight(60, 60, 50);
    p.pointLight(200, 200, 200, p.windowWidth / 4, p.windowHeight / 2, 50);
    p.background(0);

    p.fill(255);
    renderMask1();
    if (window.scrollY > 3000) {
      renderMask(p.windowWidth / 4, 0.3, 50);
    }

    if (window.scrollY > 6000) {
      renderMask(p.windowWidth / 7, 0.6, 20);
    }
  };

  function renderMask1() {
    p.push();
    p.translate(
      (p.windowWidth / 4) * -1,

      wrapScroll(0.6)
    );
    p.rotateX(90);
    p.rotateY(p.millis() / 500);

    p.scale(70);
    p.specularMaterial(250);
    p.model(mask);
    p.pop();
  }

  function renderMask(x, yMultiplier, scale) {
    p.push();
    p.translate(x, wrapScroll(yMultiplier));
    p.rotateY(p.millis() / 1000);
    p.rotateX(p.millis() / 3000);
    p.scale(scale);
    p.specularMaterial(250);
    p.model(mask);
    p.pop();
  }

  function wrapScroll(multiplier) {
    return p.map(
      ((multiplier * window.scrollY) % p.windowHeight) - p.windowHeight / 2,
      -p.windowHeight / 2,
      p.windowHeight / 2,
      p.windowHeight / 2,
      -p.windowHeight / 2
    );
  }
};
