import { throttle } from "lodash";

function hydraIDD() {
  let scrollPixelate = 50;
  document.addEventListener(
    "scroll",
    throttle((e) => incrementScroll(e), 50)
  );

  function incrementScroll(e) {
    scrollPixelate = window.scrollY / 10;
  }

  const lfo = () => Math.sin((time / 2) * Math.PI) * 0.3 + 0.3;
  s2.init({ src: document.getElementById("p5-canvas") });

  src(s2).out(o2);

  shape(1, 1)
    .mult(
      //prettier-ignore
      solid([0, 0, 0])
        .pixelate(100, 100)
        .blend(o0, 0.3)
        .luma()
    )
    .add(
      shape(2, 0.005)
        .rotate(1, 1) //Adjust rotation value to get flashing
        .scrollX([0.2, 501, 0.8])
        .scrollY([0.1, -1, 0.3])
    )

    .blend(src(o0).contrast(2), lfo)
    .diff(o2)
    .contrast(3)
    .pixelate(
      () => scrollPixelate,
      () => scrollPixelate
    )

    .out();
}

export default hydraIDD;
