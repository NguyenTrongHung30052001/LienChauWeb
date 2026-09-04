import React, { useEffect, useRef, useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sliders, 
  Activity, 
  Cpu, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Gauge,
  Sparkles,
  Info
} from 'lucide-react';

interface InteractiveLoomSimulatorProps {
  onPatternCreated?: (patternInfo: string) => void;
}

export const InteractiveLoomSimulator: React.FC<InteractiveLoomSimulatorProps> = ({ onPatternCreated }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [spindleCount, setSpindleCount] = useState<16 | 24 | 32>(32);
  const [rpm, setRpm] = useState<number>(480);
  const [yarnColorA, setYarnColorA] = useState<string>('#10b981'); // Emerald
  const [yarnColorB, setYarnColorB] = useState<string>('#38bdf8'); // Sky
  const [picksPerInch, setPicksPerInch] = useState<number>(28);
  const [currentMetersWoven, setCurrentMetersWoven] = useState<number>(1420.5);

  const animationFrameRef = useRef<number | null>(null);
  const angleRef = useRef<number>(0);

  // Canvas drawing loop for planetary track braiding machine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isRunning) {
        // Speed scaling based on RPM
        const angularSpeed = (rpm / 60) * Math.PI * 2 * 0.15;
        angleRef.current += angularSpeed * delta;
        setCurrentMetersWoven(prev => +(prev + (rpm * 0.00012)).toFixed(2));
      }

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.38;
      const innerAperture = 32;

      // 1. Clear background
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, width, height);

      // 2. Draw mechanical guide tracks (Horngear circles)
      ctx.strokeStyle = 'rgba(39, 39, 42, 0.8)';
      ctx.lineWidth = 1.5;

      // Draw planetary serpentine track ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 0.65, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(39, 39, 42, 0.4)';
      ctx.stroke();

      // Mandrel central aperture ring (Lỗ ra dây dệt)
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerAperture, 0, Math.PI * 2);
      ctx.fillStyle = '#18181b';
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Central core woven cord graphic
      const cordPulse = 1 + Math.sin(angleRef.current * 4) * 0.05;
      ctx.beginPath();
      ctx.arc(centerX, centerY, (innerAperture - 6) * cordPulse, 0, Math.PI * 2);
      ctx.fillStyle = '#047857';
      ctx.fill();

      // 3. Draw interweaving thread lines from bobbins to central aperture
      const bobbins: { x: number; y: number; isClockwise: boolean; color: string; index: number }[] = [];

      for (let i = 0; i < spindleCount; i++) {
        const isClockwise = i % 2 === 0;
        const phaseOffset = (i / spindleCount) * Math.PI * 2;
        
        // Serpentine undulating radial movement (horn gear wave)
        const waveFrequency = spindleCount / 2;
        const currentPhase = isClockwise 
          ? angleRef.current + phaseOffset 
          : -angleRef.current + phaseOffset;
        
        // Radial undulating path
        const rOffset = Math.sin(currentPhase * waveFrequency) * (baseRadius * 0.16);
        const r = baseRadius + rOffset;

        const bx = centerX + Math.cos(currentPhase) * r;
        const by = centerY + Math.sin(currentPhase) * r;

        // Color alternation
        const bobbinColor = i % 4 < 2 ? yarnColorA : yarnColorB;

        bobbins.push({
          x: bx,
          y: by,
          isClockwise,
          color: bobbinColor,
          index: i
        });
      }

      // Draw threads with high-density glowing paths
      bobbins.forEach((bobbin) => {
        ctx.beginPath();
        ctx.moveTo(bobbin.x, bobbin.y);

        // Bezier curve towards center simulating physical thread tension under take-up pull
        const midX = (bobbin.x + centerX) / 2;
        const midY = (bobbin.y + centerY) / 2;
        ctx.quadraticCurveTo(midX, midY, centerX, centerY);

        ctx.strokeStyle = bobbin.color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.65;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });

      // 4. Draw Bobbin Spindles (Thoi dệt có lõi cuộn sợi)
      bobbins.forEach((bobbin) => {
        // Shadow/glow
        ctx.beginPath();
        ctx.arc(bobbin.x, bobbin.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.strokeStyle = bobbin.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Bobbin core pin
        ctx.beginPath();
        ctx.arc(bobbin.x, bobbin.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Direction indicator dot
        const dirOffsetAngle = bobbin.isClockwise 
          ? (bobbin.index / spindleCount) * Math.PI * 2 + Math.PI / 2
          : (bobbin.index / spindleCount) * Math.PI * 2 - Math.PI / 2;
        const indX = bobbin.x + Math.cos(dirOffsetAngle) * 5;
        const indY = bobbin.y + Math.sin(dirOffsetAngle) * 5;

        ctx.beginPath();
        ctx.arc(indX, indY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = bobbin.isClockwise ? '#10b981' : '#38bdf8';
        ctx.fill();
      });

      // 5. Central Text HUD in canvas
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px SF Pro Text, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`MÁY DỆT ${spindleCount} THOI`, centerX, centerY - innerAperture - 12);
      ctx.font = '10px monospace';
      ctx.fillStyle = '#10b981';
      ctx.fillText(`${rpm} RPM`, centerX, centerY + innerAperture + 18);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, spindleCount, rpm, yarnColorA, yarnColorB, picksPerInch]);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-sm text-white overflow-hidden shadow-2xl text-left">
      
      {/* Header telemetry console */}
      <div className="p-4 sm:p-5 bg-zinc-900 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Mô Phỏng Máy Dệt Bện Tốc Độ Cao (32-Bobbin Braider)
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Trực quan hóa quỹ đạo chuyển động bánh xe hành tinh (Horn Gear) đan chéo các sợi dọc &amp; sợi ngang.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3.5 py-1.5 rounded-xs text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              isRunning 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30' 
                : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Tạm Dừng</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Khởi Động</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setCurrentMetersWoven(0);
              angleRef.current = 0;
            }}
            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xs transition-colors cursor-pointer"
            title="Reset mét dệt"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas + Live Telemetry Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
        
        {/* Left: Canvas graphic */}
        <div className="lg:col-span-7 p-4 sm:p-6 flex items-center justify-center bg-zinc-950 relative border-b lg:border-b-0 lg:border-r border-zinc-800">
          <canvas
            ref={canvasRef}
            width={480}
            height={420}
            className="w-full max-w-[420px] aspect-square rounded-sm shadow-inner"
          />

          {/* Floating live sensors */}
          <div className="absolute top-4 left-4 font-mono text-[10px] space-y-1 pointer-events-none">
            <div className="bg-zinc-900/90 backdrop-blur-md px-2 py-1 rounded-xs border border-zinc-800 text-zinc-300">
              CÔNG NGHỆ: <strong>MAYPOLE BRAIDER 2026</strong>
            </div>
            <div className="bg-zinc-900/90 backdrop-blur-md px-2 py-1 rounded-xs border border-zinc-800 text-emerald-400 font-bold">
              ĐÃ DỆT: {currentMetersWoven.toLocaleString('vi-VN')} m
            </div>
          </div>
        </div>

        {/* Right: Operational Controls Deck */}
        <div className="lg:col-span-5 p-5 sm:p-6 space-y-5 bg-zinc-900/70">
          
          {/* Spindle Selection */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="font-bold text-zinc-300 uppercase flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                Cấu Hình Cụm Thoi Dệt:
              </span>
              <span className="text-emerald-400 font-bold">{spindleCount} Thoi (Spindles)</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {([16, 24, 32] as const).map((count) => (
                <button
                  key={count}
                  onClick={() => setSpindleCount(count)}
                  className={`py-2 px-3 text-xs font-mono rounded-xs border transition-all cursor-pointer ${
                    spindleCount === count
                      ? 'border-emerald-500 bg-emerald-950 text-emerald-300 font-bold'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {count} Thoi
                </button>
              ))}
            </div>
          </div>

          {/* RPM Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="font-bold text-zinc-300 uppercase flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                Tốc Độ Trục Quay (RPM):
              </span>
              <span className="text-emerald-400 font-bold">{rpm} Vòng / Phút</span>
            </div>
            <input
              type="range"
              min="60"
              max="1200"
              step="30"
              value={rpm}
              onChange={(e) => setRpm(Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>60 RPM (Slow-Mo)</span>
              <span>480 RPM (Tiêu Chuẩn)</span>
              <span>1,200 RPM (High-Speed)</span>
            </div>
          </div>

          {/* Thread Color Selection */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-zinc-300 uppercase block">
              Phối Màu Hai Hệ Sợi (Warp &amp; Weft):
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block mb-1">Sợi Hệ A:</span>
                <div className="flex items-center gap-1.5">
                  {['#10b981', '#ffffff', '#e11d48', '#f59e0b'].map(c => (
                    <button
                      key={c}
                      onClick={() => setYarnColorA(c)}
                      className={`w-6 h-6 rounded-full border cursor-pointer transition-transform ${
                        yarnColorA === c ? 'scale-110 ring-2 ring-emerald-400 border-white' : 'border-zinc-700'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-400 block mb-1">Sợi Hệ B:</span>
                <div className="flex items-center gap-1.5">
                  {['#38bdf8', '#18181b', '#8b5cf6', '#ea580c'].map(c => (
                    <button
                      key={c}
                      onClick={() => setYarnColorB(c)}
                      className={`w-6 h-6 rounded-full border cursor-pointer transition-transform ${
                        yarnColorB === c ? 'scale-110 ring-2 ring-sky-400 border-white' : 'border-zinc-700'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Engineering Telemetry Spec */}
          <div className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xs space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-zinc-400">Góc bện xoắn (Braid Angle):</span>
              <span className="text-white font-bold">54° 44&apos; (Góc lý tưởng chống đứt)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Lực căng thoi (Bobbin Tension):</span>
              <span className="text-emerald-400 font-bold">120 cN ± 5% ổn định</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Mật độ mũi (Picks/inch):</span>
              <span className="text-white font-bold">{picksPerInch} PPI</span>
            </div>
          </div>

          {/* Quick trigger action */}
          <button
            onClick={() => {
              if (onPatternCreated) {
                onPatternCreated(`Cấu hình dệt: ${spindleCount} Thoi Bện, Tốc độ ${rpm} RPM, Phối màu Hệ A ${yarnColorA} / Hệ B ${yarnColorB}`);
              }
            }}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Lấy Mẫu Cấu Trúc Dệt Này</span>
          </button>

        </div>

      </div>

    </div>
  );
};
