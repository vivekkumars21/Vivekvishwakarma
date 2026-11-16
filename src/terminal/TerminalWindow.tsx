import { FC, useState, useRef, useEffect, KeyboardEvent } from 'react';
import { BANNER_ASCII, executeCommand, COMMAND_LIST } from './commands';
import { sound } from './sound';

interface HistoryItem {
  cmd: string;
  output: string;
  type: string;
}

interface TerminalWindowProps {
  mouseX: number;
  mouseY: number;
  isMaximized: boolean;
  onToggleMaximize: () => void;
  onToggleMatrix?: () => void;
  onToggleView?: (view: string) => void;
  onToggleAudio?: () => boolean;
}

export const TerminalWindow: FC<TerminalWindowProps> = ({
  mouseX,
  mouseY,
  isMaximized,
  onToggleMaximize,
  onToggleMatrix,
  onToggleView,
  onToggleAudio,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [enteredCommands, setEnteredCommands] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus input on load
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Scroll to bottom when history updates
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleRunCommand = (commandString: string) => {
    const trimmed = commandString.trim();
    if (!trimmed) return;

    sound.playKeyClick();
    setEnteredCommands((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const result = executeCommand(trimmed, {
      toggleMatrix: onToggleMatrix,
      toggleView: onToggleView,
      toggleAudio: onToggleAudio,
    });

    if (result.action === 'clear') {
      setHistory([]);
      sound.playCommandSuccess();
      return;
    }

    if (result.type === 'error') {
      sound.playError();
    } else {
      sound.playCommandSuccess();
    }

    setHistory((prev) => [
      ...prev,
      {
        cmd: trimmed,
        output: result.content,
        type: result.type,
      },
    ]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRunCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (enteredCommands.length === 0) return;
      const nextIdx = historyIndex === -1 ? enteredCommands.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(enteredCommands[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= enteredCommands.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(enteredCommands[nextIdx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      const match = COMMAND_LIST.find((c) => c.startsWith(current));
      if (match) {
        setInputVal(match);
        sound.playKeyClick();
      }
    } else {
      sound.playKeyClick();
    }
  };

  const quickChips = [
    'help',
    'whoami',
    'skills',
    'projects',
    'fakegen',
    'rag',
    'hire',
    'vibecheck',
    'clear',
  ];

  return (
    <div
      className={`relative mx-auto transition-all duration-300 ease-out font-mono z-30 ${
        isMaximized
          ? 'w-full max-w-6xl h-[88vh]'
          : 'w-full max-w-4xl h-[620px]'
      }`}
      style={{
        transform: isMaximized
          ? 'none'
          : `perspective(1200px) rotateX(${mouseY * 4.5}deg) rotateY(${mouseX * -5.5}deg) translateZ(10px)`,
      }}
    >
      {/* ─── Main Glass Enclosure ─── */}
      <div className="relative w-full h-full rounded-2xl md:rounded-3xl border border-[#1a2a40] bg-[#071227]/90 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(121,220,232,0.12)] flex flex-col overflow-hidden">
        
        {/* Dynamic Glare Reflection Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse at ${(mouseX + 1) * 50}% ${(mouseY + 1) * 40}%, rgba(121,220,232,0.3) 0%, transparent 65%)`,
          }}
        />

        {/* ─── Window Header Bar ─── */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1a2a40] bg-[#09152a]/80 select-none">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setHistory([]);
                sound.playCommandSuccess();
              }}
              title="Reset terminal buffer"
              className="w-3 h-3 rounded-full bg-[#ef4444] hover:opacity-80 transition-opacity"
            />
            <button
              type="button"
              onClick={onToggleMaximize}
              title="Toggle size"
              className="w-3 h-3 rounded-full bg-[#f59e0b] hover:opacity-80 transition-opacity"
            />
            <button
              type="button"
              onClick={onToggleMaximize}
              title="Toggle full width"
              className="w-3 h-3 rounded-full bg-[#10b981] hover:opacity-80 transition-opacity"
            />
          </div>

          <div className="flex items-center gap-2 text-xs md:text-sm text-cyan-200/80 font-mono tracking-tight">
            <span>vivek@neural-orbit:~</span>
            <span className="text-white/40">(bash)</span>
          </div>

          <button
            type="button"
            onClick={onToggleMaximize}
            className="text-white/40 hover:text-cyan-300 transition-colors text-base font-sans leading-none p-1"
            title="Maximize / Restore window"
          >
            {isMaximized ? '⤢' : '⤡'}
          </button>
        </div>

        {/* ─── Terminal Body & Output Scroll ─── */}
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-5 md:p-6 overflow-y-auto text-xs sm:text-sm leading-relaxed text-[#79dce8] space-y-4 cursor-text selection:bg-cyan-500/30 selection:text-white"
        >
          {/* Header ASCII Banner */}
          <pre className="text-cyan-300 font-mono whitespace-pre-wrap leading-tight text-[11px] sm:text-xs text-center border border-cyan-500/30 bg-cyan-950/20 p-3 rounded-xl shadow-[inset_0_0_20px_rgba(121,220,232,0.06)]">
            {BANNER_ASCII}
          </pre>

          {/* History logs */}
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span className="text-white/40">visitor@orbit:~$</span>
                <span className="text-white">{item.cmd}</span>
              </div>
              <div
                className={`whitespace-pre-wrap pl-3 border-l-2 ${
                  item.type === 'error'
                    ? 'border-red-500/50 text-red-300'
                    : item.type === 'success'
                    ? 'border-emerald-500/50 text-emerald-200'
                    : 'border-cyan-500/30 text-cyan-100/90'
                }`}
              >
                {item.output}
              </div>
            </div>
          ))}

          {/* Active Command Input Line */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-emerald-400 font-semibold whitespace-nowrap">
              visitor@orbit:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command (e.g. 'projects', 'skills', 'hire')..."
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm placeholder:text-white/30 caret-cyan-400"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>

        {/* ─── Bottom Command Quick Chips Bar ─── */}
        <div className="p-3 border-t border-[#1a2a40] bg-[#09152a]/70 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-white/40 font-mono hidden sm:inline mr-1">QUICK CMDS:</span>
            {quickChips.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => {
                  handleRunCommand(cmd);
                  setInputVal('');
                }}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-white/70 bg-white/5 border border-white/10 hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition-all active:scale-95"
              >
                {cmd}
              </button>
            ))}
          </div>

          <div className="text-[10px] text-white/40 font-mono hidden md:flex items-center gap-2">
            <span>[TAB] Complete</span>
            <span>[&uarr;&darr;] History</span>
          </div>
        </div>
      </div>
    </div>
  );
};
