import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  Sun, 
  Moon, 
  Sparkles, 
  Maximize2, 
  ShieldCheck, 
  Zap, 
  Layers,
  ZoomIn,
  ZoomOut,
  Crosshair
} from 'lucide-react';

interface Interactive3DCordViewerProps {
  cordColor?: string;
  patternType?: 'braided' | 'reflective' | 'herringbone' | 'waxed';
  agletFinish?: 'gunmetal' | 'gold' | 'silver' | 'matte-black' | 'neon';
  agletEngraving?: string;
  onCustomizationChange?: (specs: { color: string; aglet: string; pattern: string }) => void;
}

export const Interactive3DCordViewer: React.FC<Interactive3DCordViewerProps> = ({
  cordColor = '#059669',
  patternType = 'braided',
  agletFinish = 'gunmetal',
  agletEngraving = 'LIÊN CHÂU',
  onCustomizationChange
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentColor, setCurrentColor] = useState<string>(cordColor);
  const [currentAglet, setCurrentAglet] = useState<'gunmetal' | 'gold' | 'silver' | 'matte-black' | 'neon'>(agletFinish);
  const [currentPattern, setCurrentPattern] = useState<'braided' | 'reflective' | 'herringbone' | 'waxed'>(patternType);
  const [lightMode, setLightMode] = useState<'studio' | 'uv' | 'reflective'>('studio');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cordGroupRef = useRef<THREE.Group | null>(null);
  const agletMeshRef = useRef<THREE.Mesh | null>(null);
  const strandMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const spotLightRef = useRef<THREE.SpotLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);

  // Interaction tracking
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update color palette presets
  const COLOR_PRESETS = [
    { name: 'Xanh Emerald GRS', hex: '#059669', desc: 'Sợi Eco Recycled 100%' },
    { name: 'Đen Carbon Matte', hex: '#18181b', desc: 'Nhuộm hoạt tính chống bay màu' },
    { name: 'Trắng Sữa Sneaker', hex: '#f4f4f5', desc: 'Độ trắng quang học ISO 105' },
    { name: 'Cam Cảnh Báo An Toàn', hex: '#ea580c', desc: 'Hi-Vis tiêu chuẩn EN ISO 20471' },
    { name: 'Xanh Cobalt Sport', hex: '#2563eb', desc: 'DTY 300D thể thao cao cấp' },
    { name: 'Nâu Cà Phê Da Sáp', hex: '#522b13', desc: 'Cotton phủ sáp ong tự nhiên' },
  ];

  const AGLET_OPTIONS: { id: 'gunmetal' | 'gold' | 'silver' | 'matte-black' | 'neon'; name: string; hex: string; metalness: number; roughness: number }[] = [
    { id: 'gunmetal', name: 'Gunmetal PVD Mờ', hex: '#404044', metalness: 0.85, roughness: 0.35 },
    { id: 'gold', name: 'Mạ Vàng 18K Luxury', hex: '#f59e0b', metalness: 0.95, roughness: 0.2 },
    { id: 'silver', name: 'Chrome Bạc Khắc Laser', hex: '#e2e8f0', metalness: 0.9, roughness: 0.15 },
    { id: 'matte-black', name: 'Đen Tuyển Tĩnh Điện', hex: '#111113', metalness: 0.4, roughness: 0.6 },
    { id: 'neon', name: 'Nhúng Silicon Dạ Quang', hex: '#10b981', metalness: 0.1, roughness: 0.4 },
  ];

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a0a0c');
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight('#ffffff', 1.2);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const mainKeyLight = new THREE.DirectionalLight('#ffffff', 2.0);
    mainKeyLight.position.set(4, 6, 5);
    scene.add(mainKeyLight);

    const rimLight = new THREE.DirectionalLight('#10b981', 1.0);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const spotLight = new THREE.SpotLight('#ffffff', 4, 15, Math.PI / 4, 0.4, 1);
    spotLight.position.set(0, 3, 4);
    scene.add(spotLight);
    spotLightRef.current = spotLight;

    // 5. Construct 3D Braided Cord & Aglet Cap
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    cordGroupRef.current = rootGroup;

    // Create Braided Rope Geometry with procedural multi-strand twist
    const strandCount = 8;
    const pointsCount = 140;
    const cordLength = 4.2;
    const cordRadius = 0.22;
    const braidPitch = 6.0;

    const strandMaterials: THREE.MeshStandardMaterial[] = [];
    strandMaterialsRef.current = strandMaterials;

    const baseCol = new THREE.Color(currentColor);

    for (let s = 0; s < strandCount; s++) {
      const strandAngleOffset = (s / strandCount) * Math.PI * 2;
      const isReverse = s % 2 === 1;
      const points: THREE.Vector3[] = [];

      for (let i = 0; i < pointsCount; i++) {
        const t = (i / pointsCount) * cordLength - (cordLength / 2);
        // Cord curve slight organic S-shape
        const spineX = Math.sin(t * 0.7) * 0.15;
        const spineY = t;
        const spineZ = Math.cos(t * 0.7) * 0.12;

        // Helical strand offset
        const theta = (t * braidPitch * (isReverse ? -1 : 1)) + strandAngleOffset;
        const strandX = spineX + Math.cos(theta) * cordRadius;
        const strandY = spineY;
        const strandZ = spineZ + Math.sin(theta) * cordRadius;

        points.push(new THREE.Vector3(strandX, strandY, strandZ));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeometry = new THREE.TubeGeometry(curve, 90, 0.048, 8, false);

      // Give alternating strands slight tone variations or reflective highlights
      let strandColor = baseCol.clone();
      if (s % 3 === 0) {
        strandColor = strandColor.clone().offsetHSL(0, -0.1, 0.08);
      } else if (s % 2 === 0) {
        strandColor = strandColor.clone().offsetHSL(0, 0.05, -0.05);
      }

      const mat = new THREE.MeshStandardMaterial({
        color: strandColor,
        roughness: 0.75,
        metalness: 0.05,
        bumpScale: 0.02
      });

      strandMaterials.push(mat);
      const strandMesh = new THREE.Mesh(tubeGeometry, mat);
      rootGroup.add(strandMesh);
    }

    // 6. Add Inner Core Rod for high density solid feel
    const corePoints: THREE.Vector3[] = [];
    for (let i = 0; i < 40; i++) {
      const t = (i / 40) * cordLength - (cordLength / 2);
      corePoints.push(new THREE.Vector3(Math.sin(t * 0.7) * 0.15, t, Math.cos(t * 0.7) * 0.12));
    }
    const coreCurve = new THREE.CatmullRomCurve3(corePoints);
    const coreGeo = new THREE.TubeGeometry(coreCurve, 40, cordRadius * 0.75, 8, false);
    const coreMat = new THREE.MeshStandardMaterial({ color: '#111113', roughness: 0.9 });
    rootGroup.add(new THREE.Mesh(coreGeo, coreMat));

    // 7. Add High-Precision Aglet Tipping Metal Cap at one end
    const agletGroup = new THREE.Group();
    const agletGeo = new THREE.CylinderGeometry(0.24, 0.22, 1.1, 32, 1, true);
    
    const agletConfig = AGLET_OPTIONS.find(a => a.id === currentAglet) || AGLET_OPTIONS[0];
    const agletMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(agletConfig.hex),
      metalness: agletConfig.metalness,
      roughness: agletConfig.roughness,
      envMapIntensity: 1.5
    });

    const agletMesh = new THREE.Mesh(agletGeo, agletMat);
    agletMeshRef.current = agletMesh;
    agletGroup.add(agletMesh);

    // Aglet Tip Rounded Cap Ring
    const tipRingGeo = new THREE.TorusGeometry(0.21, 0.03, 16, 32);
    tipRingGeo.rotateX(Math.PI / 2);
    const tipRing = new THREE.Mesh(tipRingGeo, agletMat);
    tipRing.position.y = 0.55;
    agletGroup.add(tipRing);

    // Crimp Indentation Rings (Dấu ép nhiệt công nghiệp)
    const crimpRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.235, 0.015, 12, 32), new THREE.MeshStandardMaterial({ color: '#18181b', metalness: 0.8, roughness: 0.4 }));
    crimpRing1.rotateX(Math.PI / 2);
    crimpRing1.position.y = 0.15;
    agletGroup.add(crimpRing1);

    const crimpRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.235, 0.015, 12, 32), new THREE.MeshStandardMaterial({ color: '#18181b', metalness: 0.8, roughness: 0.4 }));
    crimpRing2.rotateX(Math.PI / 2);
    crimpRing2.position.y = -0.25;
    agletGroup.add(crimpRing2);

    // Position Aglet at the top end of the cord
    const topPoint = corePoints[corePoints.length - 1];
    agletGroup.position.copy(topPoint);
    agletGroup.position.y -= 0.35;
    rootGroup.add(agletGroup);

    // Initial slight rotation
    rootGroup.rotation.x = 0.2;
    rootGroup.rotation.z = -0.15;

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isAutoRotating && cordGroupRef.current) {
        cordGroupRef.current.rotation.y += delta * 0.4;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling with ResizeObserver
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Cord Colors & Patterns dynamically
  useEffect(() => {
    if (!strandMaterialsRef.current.length) return;

    const base = new THREE.Color(currentColor);

    strandMaterialsRef.current.forEach((mat, idx) => {
      let col = base.clone();

      if (currentPattern === 'reflective') {
        // Interspersed silver reflective 3M threads
        if (idx % 2 === 0) {
          col = new THREE.Color(lightMode === 'reflective' ? '#ffffff' : '#cbd5e1');
          mat.roughness = 0.2;
          mat.metalness = lightMode === 'reflective' ? 0.95 : 0.4;
        } else {
          mat.roughness = 0.7;
          mat.metalness = 0.05;
        }
      } else if (currentPattern === 'herringbone') {
        if (idx % 2 === 0) {
          col.offsetHSL(0, -0.08, 0.08);
        }
        mat.roughness = 0.8;
        mat.metalness = 0.02;
      } else if (currentPattern === 'waxed') {
        mat.roughness = 0.25;
        mat.metalness = 0.15;
      } else {
        // Braided standard
        if (idx % 3 === 0) col.offsetHSL(0, -0.05, 0.06);
        mat.roughness = 0.75;
        mat.metalness = 0.05;
      }

      mat.color.copy(col);
    });
  }, [currentColor, currentPattern, lightMode]);

  // Update Aglet Finish dynamically
  useEffect(() => {
    if (!agletMeshRef.current) return;
    const agletConfig = AGLET_OPTIONS.find(a => a.id === currentAglet) || AGLET_OPTIONS[0];
    const mat = agletMeshRef.current.material as THREE.MeshStandardMaterial;
    mat.color.set(agletConfig.hex);
    mat.metalness = agletConfig.metalness;
    mat.roughness = agletConfig.roughness;
  }, [currentAglet]);

  // Update Lighting Modes (Studio / UV / Reflective Night Flashlight)
  useEffect(() => {
    if (!sceneRef.current || !ambientLightRef.current || !spotLightRef.current) return;

    if (lightMode === 'uv') {
      sceneRef.current.background = new THREE.Color('#050510');
      ambientLightRef.current.color.set('#3b0764');
      ambientLightRef.current.intensity = 1.8;
      spotLightRef.current.color.set('#a855f7');
      spotLightRef.current.intensity = 6;
    } else if (lightMode === 'reflective') {
      sceneRef.current.background = new THREE.Color('#020202');
      ambientLightRef.current.color.set('#1e293b');
      ambientLightRef.current.intensity = 0.6;
      spotLightRef.current.color.set('#ffffff');
      spotLightRef.current.intensity = 8;
    } else {
      // Studio
      sceneRef.current.background = new THREE.Color('#0a0a0c');
      ambientLightRef.current.color.set('#ffffff');
      ambientLightRef.current.intensity = 1.2;
      spotLightRef.current.color.set('#ffffff');
      spotLightRef.current.intensity = 4;
    }
  }, [lightMode]);

  // Mouse drag to rotate cord
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current && cordGroupRef.current) {
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      cordGroupRef.current.rotation.y += deltaX * 0.01;
      cordGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Zoom control
  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const step = 0.6;
    if (direction === 'in' && cameraRef.current.position.z > 2.5) {
      cameraRef.current.position.z -= step;
      setZoomLevel(prev => Math.min(prev + 0.25, 2));
    } else if (direction === 'out' && cameraRef.current.position.z < 8.0) {
      cameraRef.current.position.z += step;
      setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
    }
  };

  // Notify parent of customizations
  const handleSelection = (colorHex: string, agletId: typeof currentAglet, pattern: typeof currentPattern) => {
    setCurrentColor(colorHex);
    setCurrentAglet(agletId);
    setCurrentPattern(pattern);

    if (onCustomizationChange) {
      onCustomizationChange({
        color: colorHex,
        aglet: agletId,
        pattern
      });
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-sm text-white overflow-hidden shadow-2xl">
      
      {/* 3D Viewport Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 bg-zinc-900 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/50 rounded-xs text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>WebGL 3D CORD LAB</span>
          </div>
          <span className="text-zinc-500 hidden sm:inline">•</span>
          <span className="text-zinc-400 hidden sm:inline">Tương tác xoay 360° &amp; Chiếu sáng quang học</span>
        </div>

        {/* Lighting Mode Selector */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xs border border-zinc-800">
          <button
            onClick={() => setLightMode('studio')}
            className={`px-2.5 py-1 rounded-xs flex items-center gap-1 transition-all cursor-pointer ${
              lightMode === 'studio' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
            title="Ánh sáng Studio ban ngày"
          >
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Studio</span>
          </button>
          
          <button
            onClick={() => setLightMode('reflective')}
            className={`px-2.5 py-1 rounded-xs flex items-center gap-1 transition-all cursor-pointer ${
              lightMode === 'reflective' ? 'bg-zinc-800 text-emerald-400 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
            title="Mô phỏng đèn pha ban đêm - Kích hoạt phản quang 3M"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Đèn Pha 3M</span>
          </button>

          <button
            onClick={() => setLightMode('uv')}
            className={`px-2.5 py-1 rounded-xs flex items-center gap-1 transition-all cursor-pointer ${
              lightMode === 'uv' ? 'bg-purple-950 text-purple-300 font-bold border border-purple-800' : 'text-zinc-400 hover:text-white'
            }`}
            title="Đèn UV kiểm định sợi nhuộm huỳnh quang"
          >
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">Tia UV</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Viewport */}
      <div 
        className="relative w-full h-80 sm:h-96 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
      >
        <div ref={mountRef} className="w-full h-full" />

        {/* HUD Overlay Indicators */}
        <div className="absolute top-3 left-3 pointer-events-none flex flex-col gap-1.5 font-mono text-[10px]">
          <div className="bg-zinc-900/90 backdrop-blur-md px-2 py-1 rounded-xs border border-zinc-800 text-zinc-300">
            CẤU TRÚC: <strong className="text-emerald-400">32-THOI BỆN KIM CƯƠNG</strong>
          </div>
          <div className="bg-zinc-900/90 backdrop-blur-md px-2 py-1 rounded-xs border border-zinc-800 text-zinc-300">
            ĐẦU BỌC: <strong className="text-white">{AGLET_OPTIONS.find(a => a.id === currentAglet)?.name}</strong>
          </div>
          {lightMode === 'reflective' && (
            <div className="bg-emerald-950/90 text-emerald-300 px-2 py-1 rounded-xs border border-emerald-500/50 animate-pulse">
              ĐÈN PHA: 3M MICRO-GLASS REFLECTIVE ACTIVE
            </div>
          )}
        </div>

        {/* Viewport Floating Controls */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-zinc-900/90 backdrop-blur-md p-1.5 rounded-xs border border-zinc-800">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-1.5 rounded-xs text-xs transition-colors cursor-pointer ${
              isAutoRotating ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
            title={isAutoRotating ? 'Tắt xoay tự động' : 'Bật xoay tự động 360°'}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          
          <div className="w-[1px] h-4 bg-zinc-700 mx-0.5"></div>

          <button
            onClick={() => handleZoom('in')}
            className="p-1.5 text-zinc-400 hover:text-white rounded-xs transition-colors cursor-pointer"
            title="Phóng to"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => handleZoom('out')}
            className="p-1.5 text-zinc-400 hover:text-white rounded-xs transition-colors cursor-pointer"
            title="Thu nhỏ"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-4 bg-zinc-700 mx-0.5"></div>

          <button
            onClick={() => {
              if (cordGroupRef.current) {
                cordGroupRef.current.rotation.set(0.2, 0, -0.15);
              }
              if (cameraRef.current) {
                cameraRef.current.position.set(0, 1.2, 5.5);
              }
            }}
            className="p-1.5 text-zinc-400 hover:text-white rounded-xs transition-colors cursor-pointer"
            title="Căn giữa lại góc nhìn"
          >
            <Crosshair className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Interaction Hint */}
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-zinc-500 pointer-events-none hidden sm:block">
          Kéo chuột để xoay 360° tự do • Cuộn phóng to chi tiết sợi
        </div>
      </div>

      {/* Real-time Customization Control Deck */}
      <div className="p-4 sm:p-5 bg-zinc-900 border-t border-zinc-800 space-y-4 text-left">
        
        {/* Row 1: Weave Pattern Toggle */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
            <span className="font-bold text-zinc-300 uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              1. Kiểu Cấu Trúc Dệt (Weave Pattern)
            </span>
            <span className="text-emerald-400 font-bold uppercase">{currentPattern}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'braided', label: 'Bện Kim Cương 32 Thoi' },
              { id: 'reflective', label: 'Phản Quang Dạ Quang 3M' },
              { id: 'herringbone', label: 'Dệt Xương Cá Mịn' },
              { id: 'waxed', label: 'Phủ Sáp Ong Kháng Nước' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelection(currentColor, currentAglet, p.id as any)}
                className={`py-2 px-2.5 text-xs font-mono text-left rounded-xs border transition-all cursor-pointer ${
                  currentPattern === p.id
                    ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300 font-bold'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Yarn Color Selection */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
            <span className="font-bold text-zinc-300 uppercase">
              2. Sắc Tộc Sợi Nhuộm (Yarn Pantone Color)
            </span>
            <span className="text-zinc-400 text-[11px]">
              {COLOR_PRESETS.find(c => c.hex === currentColor)?.name || 'Custom Hex'}
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {COLOR_PRESETS.map((col) => {
              const isSelected = currentColor === col.hex;
              return (
                <button
                  key={col.hex}
                  onClick={() => handleSelection(col.hex, currentAglet, currentPattern)}
                  className={`p-2 rounded-xs border text-left transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'border-emerald-500 bg-zinc-800 ring-1 ring-emerald-500'
                      : 'border-zinc-800 bg-zinc-950 hover:bg-zinc-800/80'
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: col.hex }}
                  />
                  <div className="truncate text-[11px] font-mono text-zinc-300">
                    {col.name.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Aglet Tipping Finish */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
            <span className="font-bold text-zinc-300 uppercase">
              3. Hoàn Thiện Đầu Bọc Aglet (Laser Engraved Tipping)
            </span>
            <span className="text-emerald-400 font-bold">
              {AGLET_OPTIONS.find(a => a.id === currentAglet)?.name}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {AGLET_OPTIONS.map((agl) => {
              const isSelected = currentAglet === agl.id;
              return (
                <button
                  key={agl.id}
                  onClick={() => handleSelection(currentColor, agl.id, currentPattern)}
                  className={`p-2 text-xs font-mono text-left rounded-xs border transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-950/40 text-white font-bold'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div 
                    className="w-3.5 h-3.5 rounded-xs border border-white/20 shrink-0" 
                    style={{ backgroundColor: agl.hex }} 
                  />
                  <span className="truncate text-[11px]">{agl.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
