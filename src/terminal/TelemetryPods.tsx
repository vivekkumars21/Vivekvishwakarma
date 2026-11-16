import { FC } from 'react';

interface TelemetryPodsProps {
  mouseX: number;
  mouseY: number;
}

export const TelemetryPods: FC<TelemetryPodsProps> = ({ mouseX, mouseY }) => {
  return (
    <>
      {/* ─── Top Left: GPU Telemetry Pod ─── */}
      <div
        className="hidden lg:flex fixed top-24 left-8 z-20 flex-col gap-1.5 p-3.5 rounded-xl border border-[#1a2a40] bg-[#071227]/75 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-transform duration-200 ease-out pointer-events-auto"
        style={{
          transform: `perspective(1000px) translate3d(${mouseX * -14}px, ${mouseY * -10}px, 20px) rotateX(${mouseY * 8}deg) rotateY(${mouseX * -8}deg)`,
        }}
      >
        <div className="flex items-center justify-between gap-3 text-[11px] font-mono border-b border-white/10 pb-1.5">
          <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            GPU-01: NVIDIA RTX
          </span>
          <span className="text-white/40">CUDA 12.1</span>
        </div>
        
        <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
          <span>VRAM ALLOC</span>
          <span className="text-cyan-300 font-medium">21.8 GB / 24.0 GB</span>
        </div>
        <div className="w-44 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 w-[91%]" />
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-white/50 pt-0.5">
          <span>TEMP: 62°C</span>
          <span>FAN: 78%</span>
          <span>TENSOR: ACTIVE</span>
        </div>
      </div>

      {/* ─── Top Right: Training Loss Curve ─── */}
      <div
        className="hidden lg:flex fixed top-24 right-8 z-20 flex-col gap-1.5 p-3.5 rounded-xl border border-[#1a2a40] bg-[#071227]/75 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-transform duration-200 ease-out pointer-events-auto"
        style={{
          transform: `perspective(1000px) translate3d(${mouseX * 14}px, ${mouseY * -10}px, 20px) rotateX(${mouseY * 8}deg) rotateY(${mouseX * -8}deg)`,
        }}
      >
        <div className="flex items-center justify-between gap-3 text-[11px] font-mono border-b border-white/10 pb-1.5">
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span>📉</span> LOSS CONVERGENCE
          </span>
          <span className="text-white/40">EPOCH 420/500</span>
        </div>

        {/* Mini SVG Loss Curve */}
        <div className="w-44 h-12 flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 160 48">
            <defs>
              <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            <line x1="0" y1="12" x2="160" y2="12" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
            <line x1="0" y1="28" x2="160" y2="28" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
            <line x1="0" y1="44" x2="160" y2="44" stroke="rgba(255,255,255,0.12)" />
            {/* Loss Area & Line */}
            <path
              d="M 0,6 Q 30,18 60,32 T 120,40 T 160,43 L 160,48 L 0,48 Z"
              fill="url(#lossGrad)"
            />
            <path
              d="M 0,6 Q 30,18 60,32 T 120,40 T 160,43"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
            {/* Current point */}
            <circle cx="160" cy="43" r="3" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
          </svg>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
          <span>VAL LOSS: 0.00078</span>
          <span className="text-emerald-400">OPTIMAL</span>
        </div>
      </div>

      {/* ─── Bottom Left: Orbital Coordinates ─── */}
      <div
        className="hidden md:flex fixed bottom-8 left-8 z-20 items-center gap-2.5 px-3.5 py-2 rounded-xl border border-[#1a2a40] bg-[#071227]/75 backdrop-blur-md text-[11px] font-mono text-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) translate3d(${mouseX * -10}px, ${mouseY * 10}px, 15px)`,
        }}
      >
        <span className="text-base">🛰️</span>
        <div className="flex flex-col">
          <span className="text-white font-medium">Ahmedabad, India &middot; Earth</span>
          <span className="text-[10px] text-white/40">23.0225° N, 72.5714° E &bull; Available for Roles</span>
        </div>
      </div>

      {/* ─── Bottom Right: Model Architecture Pulse ─── */}
      <div
        className="hidden md:flex fixed bottom-8 right-8 z-20 items-center gap-3 px-3.5 py-2 rounded-xl border border-[#1a2a40] bg-[#071227]/75 backdrop-blur-md text-[11px] font-mono text-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) translate3d(${mouseX * 10}px, ${mouseY * 10}px, 15px)`,
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-300 font-semibold">NEURAL STACK</span>
        </div>
        <span className="text-white/30">|</span>
        <span className="text-white/80">PyTorch &bull; LangChain &bull; FastAPI</span>
      </div>
    </>
  );
};
