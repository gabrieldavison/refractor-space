import * as Tone from "tone";
import Player from "./modules/Player";
import Loop from "./modules/Loop";
import randomValueSwitcher from "./modules/randomValueSwitcher";
import Conductor from "./modules/Conductor";

export default class SoundEngineIDD {
  constructor() {
    const MinPlaybackRate = 60;
    const MaxPlaybackRate = 70;

    this.playbackRate =
      Math.floor(Math.random() * (100 - MinPlaybackRate) + MaxPlaybackRate) /
      100;
    this.limiter = new Tone.Limiter(-3).toDestination();
    this.master = new Tone.Gain().connect(this.limiter);
    this.reverb = new Tone.Reverb(3).connect(this.master);
    this.delay = new Tone.FeedbackDelay(0.5, 0.6).connect(this.reverb);

    this.dronePlayer = new Player({
      url: require("./audio/IDD/DroneVerseCompressed.m4a"),
      fadeIn: 0.1,
      fadeOut: 0.2,
      volume: -8,
      playbackRate: this.playbackRate,
      destination: this.reverb,
      onload: this.attemptStart,
    });

    this.droneLoop = new Loop({
      length: 1.5,
      filePosition: 1,
      startCallback: this.dronePlayer.start,
      stopCallback: this.dronePlayer.stop,
    });

    this.chordsPlayer = new Player({
      url: require("./audio/IDD/SynthChordsVerseCompressed.m4a"),
      fadeIn: 0.2,
      fadeOut: 0.2,
      volume: -2,
      playbackRate: this.playbackRate,
      destination: this.reverb,
      onload: this.attemptStart,
    });

    this.chordsLoop = new Loop({
      length: 7,
      filePosition: 1,
      startCallback: this.chordsPlayer.start,
      stopCallback: this.chordsPlayer.stop,
    });

    this.hannahPlayer = new Player({
      url: require("./audio/IDD/HannahVocalsVerseCompressed.m4a"),
      fadeIn: 0.1,
      fadeOut: 0,
      volume: 0,
      playbackRate: this.playbackRate,
      destination: this.delay,
      onload: this.attemptStart,
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
            high: -2,
            probability: 0.8,
            callback: this.hannahPlayer.setVolume,
          }),
      ],
    });

    this.laracroftPlayer = new Player({
      url: require("./audio/IDD/LaracroftVerseCompressed.m4a"),
      fadeIn: 0.1,
      fadeOut: 0,
      volume: 0,
      playbackRate: this.playbackRate,
      destination: this.delay,
      onload: this.attemptStart,
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
            high: -10,
            probability: 0.9,
            callback: this.laracroftPlayer.setVolume,
          }),
      ],
    });

    this.players = [
      this.dronePlayer,
      this.chordsPlayer,
      this.hannahPlayer,
      this.laracroftPlayer,
    ];

    this.conductor = new Conductor([
      this.droneLoop,
      this.chordsLoop,
      this.hannahLoop,
      this.laracroftLoop,
    ]);

    this.playing = false;
  }

  // pass callback to each player that check is playing = true and soundEngine start if it is

  attemptStart() {
    if (this.playing) {
      this.start();
    }
  }

  start(players = this.players) {
    // check if players are ready, if they are then tone.start
    const isReady = (player) => player.tonePlayer.loaded;
    this.playing = true;
    if (players.every(isReady)) {
      Tone.Transport.start();
    } else {
      setTimeout(() => this.start(players), 300);
    }

    // change started to true
  }
  mute() {
    Tone.master.mute();
  }
}
