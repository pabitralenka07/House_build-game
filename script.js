/**
 * Build a Lighthouse - Pure CSS Isometric Game
 * Enhanced Audio & Interaction Controller
 * 
 * Features:
 * - Procedural Web Audio API sound effects (no external audio assets needed!)
 * - Ocean ambient background soundscape
 * - Tile placement click & construction audio feedback
 * - Victory fanfare when lighthouse is activated
 * - Keyboard shortcuts (R to restart, M for audio toggle)
 */

(function () {
  'use strict';

  // Audio Context (initialized on first user interaction to comply with autoplay policy)
  let audioCtx = null;
  let isMuted = false;
  let oceanNode = null;
  let oceanGain = null;

  function initAudio() {
    if (audioCtx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();
      startAmbientOcean();
    } catch (e) {
      console.warn('Web Audio API not supported or disabled', e);
    }
  }

  // Procedural Ocean Waves Ambiance
  function startAmbientOcean() {
    if (!audioCtx || oceanNode) return;

    try {
      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, audioCtx.currentTime);

      // Low frequency oscillator for wave swells
      const lfo = audioCtx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime); // ~8 sec wave cycle

      const lfoGain = audioCtx.createGain();
      lfoGain.gain.setValueAtTime(200, audioCtx.currentTime);

      lfo.connect(filter.frequency);

      oceanGain = audioCtx.createGain();
      oceanGain.gain.setValueAtTime(isMuted ? 0 : 0.04, audioCtx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(oceanGain);
      oceanGain.connect(audioCtx.destination);

      whiteNoise.start();
      lfo.start();
      oceanNode = whiteNoise;
    } catch (err) {
      // Audio setup fallback
    }
  }

  // Play building construction "pop/snap" sound
  function playBuildSound() {
    if (!audioCtx || isMuted) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      const now = audioCtx.currentTime;
      
      // Pitch drop simulates a solid block dropping into place
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {
      // Silently ignore
    }
  }

  // Play win fanfare chime
  function playVictorySound() {
    if (!audioCtx || isMuted) return;
    try {
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const startTime = audioCtx.currentTime + index * 0.14;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch (e) {}
  }

  // Setup click listeners on all interactive building labels
  document.addEventListener('DOMContentLoaded', function () {
    console.log(
      '%c 🏝️ Build a Lighthouse %c Pure CSS Isometric Puzzle Game ',
      'background: #1a6ba8; color: #fff; font-weight: bold; padding: 6px 10px; border-radius: 4px 0 0 4px;',
      'background: #0a4a7d; color: #4bc4e8; padding: 6px 10px; border-radius: 0 4px 4px 0;'
    );
    console.log('💡 Tip: Stack the structures in column 2 before nightfall to build the lighthouse beam!');

    // User interaction bootstrap for audio
    const unlockAudio = function () {
      initAudio();
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };
    document.addEventListener('click', unlockAudio, { once: true });
    document.addEventListener('keydown', unlockAudio, { once: true });

    // Attach build sound to all labels in game
    const interactiveLabels = document.querySelectorAll('shed label, house label, hbtn label, sbtn label');
    interactiveLabels.forEach(function (label) {
      label.addEventListener('click', function () {
        initAudio();
        playBuildSound();
      });
    });

    // Detect win condition state change
    const checkWinCondition = function () {
      const welldone = document.querySelector('text welldone');
      if (welldone) {
        const computedDisplay = window.getComputedStyle(welldone).display;
        if (computedDisplay !== 'none') {
          playVictorySound();
          return;
        }
      }
      setTimeout(checkWinCondition, 600);
    };
    setTimeout(checkWinCondition, 1000);

    // Keyboard controls: 'R' to restart, 'M' to mute/unmute
    window.addEventListener('keydown', function (e) {
      if (e.key === 'r' || e.key === 'R') {
        window.location.reload();
      } else if (e.key === 'm' || e.key === 'M') {
        isMuted = !isMuted;
        if (oceanGain && audioCtx) {
          oceanGain.gain.setValueAtTime(isMuted ? 0 : 0.04, audioCtx.currentTime);
        }
        console.log(isMuted ? '🔇 Audio muted' : '🔊 Audio unmuted');
      }
    });
  });
})();
