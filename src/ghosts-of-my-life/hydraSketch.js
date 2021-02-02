export default function hydraSketch() {
  // osc().modulateRotate(o0, 0.3).out();
  // osc(33, 0.3, 0.3).diff(o3, 3).out(o1);
  // osc(3, 0.3, 33).modulateKaleid(o3, 3).diff(o0).out(o2);
  // src(o0, 3).mult(o1, 3).kaleid(3).out(o3);
  // render(o2);

  osc()
    .modulateRotate(o0, () => mouse.x / 7000)
    .out();
  osc(33, 0.6, 0.3).diff(o3, 3).out(o1);
  osc(3, 0.3, 33)
    .modulateKaleid(o3, 20)
    .diff(o0)
    .colorama()
    .saturate(0.5)
    .out(o2);
  src(o0, 100)
    .mult(o1, () => mouse.y / 10)
    .kaleid(3)
    .out(o3);
  render(o2);
}
