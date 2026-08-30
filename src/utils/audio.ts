// Simple Web Audio API Synthesizer for 432Hz Ethereal Ambient Frequency Soundscape

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let oscillator1: OscillatorNode | null = null;
let oscillator2: OscillatorNode | null = null;
let isPlaying = false;

export function toggleAmbientSoundscape(enable?: boolean): boolean {
  if (typeof window === 'undefined') return false;

  const targetState = enable !== undefined ? enable : !isPlaying;

  if (targetState) {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Master Gain
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 3); // Soft fade-in

    // 432Hz Base Root Drone
    oscillator1 = audioCtx.createOscillator();
    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(432, audioCtx.currentTime); // 432Hz Miracle frequency

    // 108Hz Sub Harmonic (432 / 4 = 108)
    oscillator2 = audioCtx.createOscillator();
    oscillator2.type = 'triangle';
    oscillator2.frequency.setValueAtTime(108, audioCtx.currentTime);

    // Filter to soften harmonics
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, audioCtx.currentTime);

    oscillator1.connect(filter);
    oscillator2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    oscillator1.start();
    oscillator2.start();
    isPlaying = true;
  } else {
    if (masterGain && audioCtx) {
      masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
      setTimeout(() => {
        try {
          oscillator1?.stop();
          oscillator2?.stop();
          oscillator1?.disconnect();
          oscillator2?.disconnect();
        } catch {
          // ignore cleanup errors
        }
        isPlaying = false;
      }, 1000);
    } else {
      isPlaying = false;
    }
  }

  return isPlaying;
}

export function getAudioState(): boolean {
  return isPlaying;
}
