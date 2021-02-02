import * as Tone from "tone";
import Player from "./modules/Player";
import Loop from "./modules/Loop";
import randomValueSwitcher from "./modules/randomValueSwitcher";
import Conductor from "./modules/Conductor";

export default class SoundEngineGOML {
  constructor() {
    const MinPlaybackRate = 55;
    const MaxPlaybackRate = 60;

    this.playbackRate =
      Math.floor(Math.random() * (100 - MinPlaybackRate) + MaxPlaybackRate) /
      100;

    this.limiter = new Tone.Limiter(-3).toDestination();
    this.hpFilter = new Tone.Filter(0, "highpass").connect(this.limiter);
    this.lpFilter = new Tone.Filter(20000, "lowpass").connect(this.hpFilter);
    this.master = new Tone.Gain().connect(this.lpFilter);
    this.reverb = new Tone.Reverb(6).connect(this.master);
    this.delay = new Tone.FeedbackDelay(0.5, 0.6).connect(this.reverb);

    this.vocoderPlayer = new Player({
      url: require("./audio/GOML/vocoderChorusConverted.m4a"),
      fadeIn: 0.8,
      fadeOut: 0.8,
      volume: -8,
      playbackRate: this.playbackRate,
      destination: this.delay,
      onload: this.attemptStart,
    });

    this.vocoderLoop = new Loop({
      length: 30,
      filePosition: 0,
      startCallback: this.vocoderPlayer.start,
      stopCallback: this.vocoderPlayer.stop,
    });

    this.ensemblePlayer = new Player({
      url: require("./audio/GOML/ensembleChorusConverted.m4a"),
      fadeIn: 3.5,
      fadeOut: 2,
      volume: -20,
      playbackRate: this.playbackRate,
      destination: this.reverb,
      onload: this.attemptStart,
    });

    this.ensembleLoop = new Loop({
      length: 25,
      filePosition: 0,
      startCallback: this.ensemblePlayer.start,
      stopCallback: this.ensemblePlayer.stop,
    });

    this.drumsPlayer = new Player({
      url: require("./audio/GOML/drumsConverted.m4a"),
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
            high: -15,
            probability: 0.85,
            callback: this.drumsPlayer.setVolume,
          }),
      ],
    });

    this.players = [this.ensemblePlayer, this.vocoderPlayer, this.drumsPlayer];

    this.conductor = new Conductor([
      this.ensembleLoop,
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
  setHpCutoff(val) {
    this.hpFilter.set({ frequency: val });
  }
  setLpCutoff(val) {
    this.lpFilter.set({ frequency: val });
  }
  setDelayFeedback(val) {
    this.delay.set({ feedback: val });
  }
}
