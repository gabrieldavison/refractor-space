AFRAME.registerComponent('modal', {
  init: function () {
    const modal = document.createElement("div");
    modal.id = "play-modal"
    modal.innerHTML = `<div id="play-button" class="play-button">start sound</div>`
    console.log('modal')
    document.body.appendChild(modal)

    const playModal = document.getElementById("play-modal");
    const playButton = document.getElementById("play-button");
    playButton.addEventListener("click", () => {
    playModal.classList.add("hidden");
});
  }
});

AFRAME.registerComponent('soundcontroller', {
  started: false,
  init: function () {
    window.addEventListener('click', () => {

      if (!this.started) {
        document.querySelectorAll("[sound]").forEach(val => {
          val.components.sound.playSound()
        })
        this.started = true;
      }
    } )
  }
})

const sketch = () => {
  osc(5,.1).modulate(noise(6),.22).diff(o0)
  	.modulateScrollY(osc(2).modulate(osc().rotate(),.11))
	.scale(.72).color(0.99,1.014,1)
	.contrast(5)
  	.out()
}

const sketch2 = () => {
noise(10)
.diff(o0)
.diff(o0)
.diff(o0)
.diff(o0)
.diff(o0)
.diff(o0)
.diff(o0)
.diff(o0)
.invert()
.contrast(2)
.pixelate(300,300)
.out()
}

AFRAME.registerComponent('hydra', {
  started: false,
  init: function () {
    const hydraCanvas = document.getElementById('hydra-canvas')

    console.log(hydraCanvas)

    const hydra = new Hydra({
      canvas: hydraCanvas,
      detectAudio: false,
    enableStreamCapture: false
    })
    hydra.setResolution(1920, 1080);


    sketch2();
  },

  tick: function () {
    var el = this.el;
    var material;

    material = el.getObject3D('mesh').material;
    if (!material.map) { return; }
    material.map.needsUpdate = true;
  }
})

