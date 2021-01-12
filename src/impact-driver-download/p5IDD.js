let maskUrl = require("../assets/mask2.obj");
import hydraIDD from "./hydraIDD";

const p5IDD = function (p) {
  let mask;
  const screenMultiplier = p.windowWidth < 750 ? 0.6 : 1;
  p.preload = function () {
    mask = p.loadModel(maskUrl);
  };

  p.setup = function () {
    let cnv = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    cnv.id("p5-canvas");
    hydraIDD();
  };

  p.draw = function () {
    // p.ambientLight(60, 60, 50);
    p.pointLight(200, 200, 200, p.windowWidth / 4, p.windowHeight / 2, 50);
    p.background(0);

    p.fill(255);

    renderMask((p.windowWidth / 4) * -1, 0.3, 70 * screenMultiplier);
    if (window.scrollY > 3000) {
      renderMask(p.windowWidth / 4, 0.1, 30 * screenMultiplier);
    }

    if (window.scrollY > 6000) {
      renderMask(p.windowWidth / 7, 0.08, 10 * screenMultiplier);
    }

    if (window.scrollY > 9000) {
      renderMask(p.windowWidth / 10, 0.2, 100 * screenMultiplier);
    }
  };

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

export default p5IDD;
