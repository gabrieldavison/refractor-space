let maskUrl = require("./assets/mask2.obj");
import { scene1 } from "./hydra";

export const Home = function (p) {
  let cols;
  let rows;
  let current;
  let previous;

  let dampening = 0.99;

  p.preload = function () {};

  p.setup = function () {
    let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
    cnv.id("p5-canvas-home");

    p.pixelDensity(1);

    cols = p.width;
    rows = p.height;
    console.log(cols, rows);
    // The following line initializes a 2D cols-by-rows array with zeroes
    // in every array cell, and is equivalent to this Processing line:
    // current = new float[cols][rows];
    current = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));
    previous = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));
    // p.frameRate(30);
  };

  p.mouseMoved = function () {
    previous[p.mouseX][p.mouseY] = 500;
  };

  p.draw = function () {
    p.background(0);

    p.loadPixels();
    for (let i = 1; i < cols - 1; i += 1) {
      for (let j = 1; j < rows - 1; j += 1) {
        current[i][j] =
          (previous[i - 1][j] +
            previous[i + 1][j] +
            previous[i][j - 1] +
            previous[i][j + 1]) /
            2 -
          current[i][j];
        current[i][j] = current[i][j] * dampening;
        // Unlike in Processing, the pixels array in p5.js has 4 entries
        // for each pixel, so we have to multiply the index by 4 and then
        // set the entries for each color component separately.
        let index = (i + j * cols) * 4;
        p.pixels[index + 0] = current[i][j];
        p.pixels[index + 1] = current[i][j];
        p.pixels[index + 2] = current[i][j];
      }
    }
    p.updatePixels();

    let temp = previous;
    previous = current;
    current = temp;
  };
};

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
