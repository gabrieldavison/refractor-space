import shuffleArray from "./shuffleArray";
import * as Tone from "tone";
export default class Conductor {
  constructor(parts) {
    this.parts = shuffleArray(parts);
    this.spacings = this.generateSpacings(9, 15);
    this.positionIndex = 0;
    this.spacingsIndex = 0;
    this.tonePart = new Tone.Part((time) => {
      // this.parts[this.positionIndex].start(time);
      // this.positionIndex += 1;
      this.nextEvent(time);
    }, this.spacings);
    this.tonePart.loopStart = this.spacings[0];
    this.tonePart.loopEnd = this.spacings[this.spacings.length - 1];
    this.tonePart.loop = true;
    this.tonePart.start(0);
  }

  generateSpacings(min, max) {
    const spacingsArray = [];
    for (let i = 0; i < this.parts.length * 2; i++) {
      let spacing = 0;
      if (i > 0) {
        spacing += Math.floor(Math.random() * (max - min) + min);
        console.log(spacing);
        //Makes sure all parts stay playing together for 15 seconds
        if (i === this.parts.length) {
          spacing = 15;
        }
        spacing += spacingsArray[i - 1];
      }
      spacingsArray.push(spacing);
    }
    console.log(spacingsArray);
    return spacingsArray;
  }

  nextEvent(time) {
    if (
      this.positionIndex < this.parts.length &&
      this.spacingsIndex < this.parts.length
    ) {
      console.log("case 1" + time);
      this.parts[this.positionIndex].start(time);
      this.positionIndex += 1;
      this.spacingsIndex += 1;
    } else if (this.spacingsIndex === this.parts.length) {
      console.log("case 2" + time);
      this.parts = shuffleArray(this.parts);
      this.positionIndex = 0;
      this.parts[this.positionIndex].stop(time);
      this.spacingsIndex += 1;
    } else if (this.spacingsIndex < this.spacings.length - 1) {
      console.log("case 3" + time);
      this.positionIndex += 1;
      this.spacingsIndex += 1;
      this.parts[this.positionIndex].stop(time);
      console.log(this.parts[this.positionIndex]);
    } else {
      this.positionIndex = 0;
      this.spacingsIndex = 0;
      this.nextEvent();
    }
  }
}
