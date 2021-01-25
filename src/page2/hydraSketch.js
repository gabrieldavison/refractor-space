export default function hydraSketch() {
  // s2.init({ src: document.getElementById("p5-canvas") });
  // src(s2).out(o2);
  // osc(105)
  //   .color(0.5, 0.1, 0.8)
  //   .rotate(0.11, 0.1)
  //   .modulate(osc(10).rotate(0.3).add(o0, 0.1))
  //   .add(osc(20, 0.01, 1).color(0, 0.8, 1))
  //   .out(o0);
  // osc(50, 0.05, 0.7)
  //   .color(1, 0.7, 0.5)
  //   .diff(o0)
  //   .modulate(o1, 0.05)
  //   .diff(o2, 0.1)
  //   .out(o1);
  // render(o1);
  osc(20, 0.1, 0)
    .color(0, 1, 2)
    .rotate(1.57 / 2)
    .out(o1);
  osc(30, 0.01, 0)
    .color(2, 0.7, 1)
    .modulate(o1, 0)
    .add(o1, 1)
    .modulatePixelate(o1, 1, 10)
    .out(o0);
}
