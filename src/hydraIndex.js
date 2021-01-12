function hydraIndex() {
  shape(1, 1)
    .mult(voronoi(1000, 2).blend(o0).luma())
    .add(noise(1000).thresh(0.8))

    .scrollY([0.1, -0.0625, 0.005, 0.00001], 0)
    .out();
}

export default hydraIndex;
