import * as Tone from "tone";

export default class Loop {
  constructor({
    length,
    filePosition = undefined,
    startCallback,
    stopCallback = undefined,
    insertCallbacks,
    randomFilePosition = undefined,
  }) {
    this.length = length;
    this.isPlaying = false;
    this.startCallback = startCallback;
    this.stopCallback = stopCallback;
    this.filePosition = filePosition;
    this.insertCallbacks = insertCallbacks;
    this.randomFilePosition = randomFilePosition;
    this.toneLoop = this.createLoop({ length: this.length });
  }

  stopEvent() {
    if (this.stopCallback && this.isPlaying) {
      stopCallback();
    }
  }

  startEvent() {
    if (this.randomFilePosition != undefined) {
      this.randomInteger({
        max: this.randomFilePosition.max,
        min: this.randomFilePosition.min,
      });
      this.startCallback(this.filePosition);
    } else if (this.filePosition != undefined) {
      this.startCallback(this.filePosition);
    } else {
      this.startCallback();
    }
  }

  createLoop({ length, filePosition }) {
    return new Tone.Loop(() => {
      this.executeCallbacks();
      this.stopEvent();

      this.startEvent();
      this.playing = true;
    }, length);
  }

  start(time) {
    this.toneLoop.start(time);
    console.log("starting part");
  }
  stop(time) {
    //this.toneLoop.cancel(time);
    this.toneLoop.stop(time);
    this.playing = false;
    console.log("stopping part");
  }

  executeCallbacks() {
    if (this.insertCallbacks) {
      this.insertCallbacks.forEach((callback) => callback());
    }
  }

  randomInteger({ max, min = 0 }) {
    const val = Number((Math.random() * max + min).toFixed(1));
    this.filePosition = val;
  }
}
