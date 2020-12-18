export function initialScene() {
  noise(10, 0.1, 7)
    .rotate(3, 0.1)
    .colorama(8)
    .modulate(osc(1000, 10))
    .contrast(10)
    .out();
}

export function scene1() {
  s2.init({ src: document.getElementById("p5-canvas") });

  src(s2).out(o2);

  shape(1, 1)
    .mult(
      noise(() => mouse.x / 100, 0.5)
        .blend(o0, 0.6)
        .luma()
    )
    .add(
      shape(2, 0.005)
        .rotate(1, 1) //Adjust rotation value to get flashing
        .scrollX([0.2, 501, 0.8])
        .scrollY([0.1, -1, 0.3])
    )

    .diff(o2)

    .pixelate(
      () => mouse.y * 2,
      () => mouse.y * 2
    )

    .out();
}
