import * as Tone from "tone";
import Player from "./modules/Player";
import Loop from "./modules/Loop";
import randomValueSwitcher from "./modules/randomValueSwitcher";
import Conductor from "./modules/Conductor";

export default class SoundEngine {
  constructor() {
    this.playbackRate = Math.floor(Math.random() * (100 - 75) + 80) / 100;
    // this.FFT = new Tone.FFT({ size: 16, normalRange: true }).toDestination();'
    this.FFT = new Tone.DCMeter().toDestination();
    this.master = new Tone.Gain().connect(this.FFT);
    this.reverb = new Tone.Reverb(3).connect(this.master);
    this.delay = new Tone.FeedbackDelay(0.5, 0.6).connect(this.reverb);

    this.dronePlayer = new Player({
      url: require("./audio/verse/DroneVerse.wav"),
      fadeIn: 0.1,
      fadeOut: 0.2,
      volume: -18,
      playbackRate: this.playbackRate,
      destination: this.reverb,
    });

    this.droneLoop = new Loop({
      length: 1.5,
      filePosition: 1,
      startCallback: this.dronePlayer.start,
      stopCallback: this.dronePlayer.stop,
    });

    this.chordsPlayer = new Player({
      url: require("./audio/verse/Synth Chords Verse.wav"),
      fadeIn: 0.2,
      fadeOut: 0.2,
      volume: -10,
      playbackRate: this.playbackRate,
      destination: this.reverb,
    });

    this.chordsLoop = new Loop({
      length: 7,
      filePosition: 1,
      startCallback: this.chordsPlayer.start,
      stopCallback: this.chordsPlayer.stop,
    });

    this.hannahPlayer = new Player({
      url: require("./audio/verse/Hannah Vocals Verse.wav"),
      fadeIn: 0.1,
      fadeOut: 0,
      volume: 0,
      playbackRate: this.playbackRate,
      destination: this.delay,
    });

    this.hannahLoop = new Loop({
      length: 0.5,
      filePosition: 1,
      startCallback: this.hannahPlayer.start,
      stopCallback: this.hannahPlayer.stop,
      randomFilePosition: { max: 6, min: 0 },
      insertCallbacks: [
        () =>
          randomValueSwitcher({
            low: -100,
            high: -5,
            probability: 0.8,
            callback: this.hannahPlayer.setVolume,
          }),
      ],
    });

    this.laracroftPlayer = new Player({
      url: require("./audio/verse/Lara croft Verse.wav"),
      fadeIn: 0.1,
      fadeOut: 0,
      volume: 0,
      playbackRate: this.playbackRate,
      destination: this.delay,
    });

    this.laracroftLoop = new Loop({
      length: 1,
      filePosition: 1,
      startCallback: this.laracroftPlayer.start,
      stopCallback: this.laracroftPlayer.stop,
      randomFilePosition: { max: 6, min: 0 },
      insertCallbacks: [
        () =>
          randomValueSwitcher({
            low: -100,
            high: -15,
            probability: 0.9,
            callback: this.laracroftPlayer.setVolume,
          }),
      ],
    });

    this.conductor = new Conductor([
      this.droneLoop,
      this.chordsLoop,
      this.hannahLoop,
      this.laracroftLoop,
    ]);
  }
}
