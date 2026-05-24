let audioCtx: AudioContext | null = null

/**
 * Lazy loads and resumes the Web Audio API AudioContext.
 * Autoplay policies require a user interaction (like clicking Mute or any button)
 * to unlock audio synthesis.
 */
const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioCtx
}

// Default state of audio output (mute by default to align with premium web design guidelines)
let isMuted = true

export const setMuted = (muted: boolean) => {
  isMuted = muted
  if (!muted) {
    resumeAudioContext()
  }
}

export const getMuted = () => isMuted

export const resumeAudioContext = async () => {
  const ctx = getAudioContext()
  if (ctx && ctx.state === 'suspended') {
    try {
      await ctx.resume()
    } catch (e) {
      console.warn("Failed to resume AudioContext:", e)
    }
  }
}

/**
 * Helper to synthesize a tiny burst of bandpass-filtered noise.
 * This introduces real organic "friction" or a physical finger-strike transient
 * to simulate authentic physical materials (glass, wood, tactile keycaps).
 */
const playNoiseTransient = (
  ctx: AudioContext,
  destination: AudioNode,
  frequency: number,
  duration: number,
  volume: number
) => {
  const bufferSize = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  
  // Fill buffer with random noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }

  const noiseNode = ctx.createBufferSource()
  noiseNode.buffer = buffer

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(frequency, ctx.currentTime)
  filter.Q.setValueAtTime(3.5, ctx.currentTime) // High Q factor for high-resonance organic tap

  const gainNode = ctx.createGain()
  gainNode.gain.setValueAtTime(volume, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

  noiseNode.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(destination)

  noiseNode.start()
}

/**
 * Plays an ultra-premium, organic "Glassy Click" hover sound.
 * Combines high-frequency dual glassy overtones (non-harmonic ratios) with a
 * subtle 15ms noise tap, creating an incredibly satisfying soft glass tap.
 */
export const playHoverSound = () => {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx || ctx.state === 'suspended') return

  const mainGain = ctx.createGain()
  mainGain.gain.setValueAtTime(1.0, ctx.currentTime)
  mainGain.connect(ctx.destination)

  // Double layered glassy frequencies (simulates physical material resonance)
  const freqs = [1500, 3120]
  const gains = [0.004, 0.0018] // Extremely subtle and quiet

  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)

    oscGain.gain.setValueAtTime(gains[idx], ctx.currentTime)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035)

    osc.connect(oscGain)
    oscGain.connect(mainGain)

    osc.start()
    osc.stop(ctx.currentTime + 0.04)
  })

  // Add extremely subtle noise pop at the start for glassy contact transient
  playNoiseTransient(ctx, mainGain, 4000, 0.015, 0.0045)
}

/**
 * Plays a highly polished, organic "Tactile Keycap Pop" click sound.
 * Layers a low-frequency wooden body sweep, a high-frequency glassy transient ring,
 * and a bandpass-filtered pop transient, sounding like a premium physical switch.
 */
export const playClickSound = () => {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx || ctx.state === 'suspended') return

  const mainGain = ctx.createGain()
  mainGain.gain.setValueAtTime(1.0, ctx.currentTime)
  mainGain.connect(ctx.destination)

  // 1. Low-frequency wooden keycap body pop
  const bodyOsc = ctx.createOscillator()
  const bodyGain = ctx.createGain()
  bodyOsc.type = 'sine'
  bodyOsc.frequency.setValueAtTime(320, ctx.currentTime)
  bodyOsc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.065)

  bodyGain.gain.setValueAtTime(0.015, ctx.currentTime)
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.065)

  bodyOsc.connect(bodyGain)
  bodyGain.connect(mainGain)

  bodyOsc.start()
  bodyOsc.stop(ctx.currentTime + 0.07)

  // 2. High-frequency glassy transient tick
  const clickOsc = ctx.createOscillator()
  const clickGain = ctx.createGain()
  clickOsc.type = 'sine'
  clickOsc.frequency.setValueAtTime(1150, ctx.currentTime)

  clickGain.gain.setValueAtTime(0.0055, ctx.currentTime)
  clickGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025)

  clickOsc.connect(clickGain)
  clickGain.connect(mainGain)

  clickOsc.start()
  clickOsc.stop(ctx.currentTime + 0.03)

  // 3. Medium-band noise pop to fuse the acoustic body pop
  playNoiseTransient(ctx, mainGain, 3000, 0.02, 0.01)
}

/**
 * Plays an ethereal, lush cascading arpeggio in A-Major Pentatonic.
 * Layers four separate glassy sine notes in a tight timeline arpeggio (A4 -> C#5 -> E5 -> A5)
 * modulated with a slow analog pitch LFO (vibrato) for a beautiful mystical chime.
 */
export const playGhostSound = () => {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx || ctx.state === 'suspended') return

  const mainGain = ctx.createGain()
  mainGain.gain.setValueAtTime(1.0, ctx.currentTime)
  mainGain.connect(ctx.destination)

  // Gorgeous cascading A-Major Pentatonic arpeggio notes
  const notes = [440.00, 554.37, 659.25, 880.00]
  const delays = [0.0, 0.05, 0.10, 0.15]

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delays[idx])

    const startVal = 0.0065
    const playTime = ctx.currentTime + delays[idx]
    
    // Tight note attack and long, smooth decay
    oscGain.gain.setValueAtTime(0, ctx.currentTime)
    oscGain.gain.setValueAtTime(0, playTime)
    oscGain.gain.linearRampToValueAtTime(startVal, playTime + 0.015)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, playTime + 0.5)

    // Synthesize organic analog vibrato (LFO pitch modulation)
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 6.2 // 6.2Hz pleasant vibrato speed
    lfoGain.gain.value = 3.5 // pitch fluctuation width

    lfo.connect(lfoGain)
    lfoGain.connect(osc.frequency)

    osc.connect(oscGain)
    oscGain.connect(mainGain)

    lfo.start(playTime)
    osc.start(playTime)

    lfo.stop(playTime + 0.55)
    osc.stop(playTime + 0.55)
  })
}
