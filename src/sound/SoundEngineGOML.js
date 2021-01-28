import * as Tone from "tone";
import Player from "./modules/Player";
import Loop from "./modules/Loop";
import randomValueSwitcher from "./modules/randomValueSwitcher";
import Conductor from "./modules/Conductor";

export default class SoundEngineGOML {
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

    this.ensemblePlayer = new Player({
      url: require("./audio/GOML/ensembleChorus.wav"),
      fadeIn: 0.1,
      fadeOut: 0.2,
      volume: -8,
      playbackRate: this.playbackRate,
      destination: this.reverb,
      onload: this.attemptStart,
    });

    this.ensembleLoop = new Loop({
      length: 10,
      filePosition: 1,
      startCallback: this.ensemblePlayer.start,
      stopCallback: this.ensemblePlayer.stop,
    });

    this.growlPlayer = new Player({
      url: require("./audio/GOML/growlChorus.wav"),
      fadeIn: 0.2,
      fadeOut: 0.2,
      volume: -100,
      playbackRate: this.playbackRate,
      destination: this.reverb,
      onload: this.attemptStart,
    });

    this.growlLoop = new Loop({
      length: 7,
      filePosition: 1,
      startCallback: this.growlPlayer.start,
      stopCallback: this.growlPlayer.stop,
    });

    this.vocoderPlayer = new Player({
      url: require("./audio/GOML/vocoderChorus.wav"),
      fadeIn: 0.1,
      fadeOut: 0,
      volume: 0,
      playbackRate: this.playbackRate,
      destination: this.delay,
      onload: this.attemptStart,
    });

    this.vocoderLoop = new Loop({
      length: 0.5,
      filePosition: 1,
      startCallback: this.vocoderPlayer.start,
      stopCallback: this.vocoderPlayer.stop,
      randomFilePosition: { max: 6, min: 0 },
      insertCallbacks: [
        () =>
          randomValueSwitcher({
            low: -100,
            high: -2,
            probability: 0.3,
            callback: this.vocoderPlayer.setVolume,
          }),
      ],
    });

    this.drumsPlayer = new Player({
      url: require("./audio/GOML/phaserDrums.wav"),
      fadeIn: 0.1,
      fadeOut: 0,
      volume: 0,
      playbackRate: this.playbackRate,
      destination: this.delay,
      onload: this.attemptStart,
    });

    this.drumsLoop = new Loop({
      length: 1,
      filePosition: 1,
      startCallback: this.drumsPlayer.start,
      stopCallback: this.drumsPlayer.stop,
      randomFilePosition: { max: 6, min: 0 },
      insertCallbacks: [
        () =>
          randomValueSwitcher({
            low: -100,
            high: -100,
            probability: 0.9,
            callback: this.drumsPlayer.setVolume,
          }),
      ],
    });

    this.players = [
      this.ensemblePlayer,
      this.growlPlayer,
      this.vocoderPlayer,
      this.drumsPlayer,
    ];

    this.conductor = new Conductor([
      this.ensembleLoop,
      this.growlLoop,
      this.vocoderLoop,
      this.drumsLoop,
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
