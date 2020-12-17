import * as Tone from "tone";

export default class Player {
  constructor({ url, fadeIn, fadeOut, volume, playbackRate, destination }) {
    this.tonePlayer = this.createPlayer({
      url,
      fadeIn,
      fadeOut,
      volume,
      playbackRate,
      destination,
    });
    // These need to have this bound to correct context as they are being called from other objects
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.setVolume = this.setVolume.bind(this);
  }

  start(startTime = 0) {
    this.tonePlayer.start(Tone.now(), startTime);
  }
  stop() {
    this.tonePlayer.stop();
  }
  createPlayer({ url, fadeIn, fadeOut, volume, playbackRate, destination }) {
    return new Tone.Player({
      url,
      fadeIn,
      fadeOut,
      volume,
      playbackRate,
    }).connect(destination);
  }

  setVolume(vol) {
    this.tonePlayer.volume.value = vol;
  }
}
