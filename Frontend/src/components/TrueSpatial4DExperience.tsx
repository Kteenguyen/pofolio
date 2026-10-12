"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Camera, Compass, Eye, Sparkles, Layers, Maximize2 } from "lucide-react";

// 4 Góc nhìn không gian điện ảnh (Waypoints)
const PERSPECTIVES = [
  {
    id: "overview",
    name: "01 • Toàn Cảnh",
    label: "Overview 3/4",
    desc: "Góc nhìn bao quát toàn bộ cấu trúc hình học",
    camPos: new THREE.Vector3(0, 1.8, 6.2),
    target: new THREE.Vector3(0, 0, 0),
    fov: 48,
  },
  {
    id: "core",
    name: "02 • Lõi Kỹ Thuật",
    label: "Core Architecture",
    desc: "Lao sát vào tâm điểm khối đa giác lượng tử",
    camPos: new THREE.Vector3(2.2, 0.4, 2.8),
    target: new THREE.Vector3(0, 0, 0),
    fov: 55,
  },
  {
    id: "isometric",
    name: "03 • Trục Đứng",
    label: "Top-Down Isometric",
    desc: "Góc nhìn từ trên cao phân tích kiến trúc hệ thống",
    camPos: new THREE.Vector3(-3.2, 4.2, 3.6),
    target: new THREE.Vector3(0, 0.2, 0),
    fov: 46,
  },
  {
    id: "cinematic",
    name: "04 • Góc Điện Ảnh",
    label: "Low-Angle Cinematic",
    desc: "Góc ngước từ dưới sàn tôn vinh tầm vóc giải pháp",
    camPos: new THREE.Vector3(0.5, -1.8, 4.2),
    target: new THREE.Vector3(0, 0.4, 0),
    fov: 52,
  },
];

export default function TrueSpatial4DExperience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activePerspective, setActivePerspective] = useState(PERSPECTIVES[0].id);
  const [coords, setCoords] = useState({ x: "0.00", y: "1.80", z: "6.20" });

  // Refs điều khiển Three.js loop
  const targetCamPos = useRef(new THREE.Vector3().copy(PERSPECTIVES[0].camPos));
  const currentCamPos = useRef(new THREE.Vector3().copy(PERSPECTIVES[0].camPos));
  const targetLookAt = useRef(new THREE.Vector3().copy(PERSPECTIVES[0].target));
  const currentLookAt = useRef(new THREE.Vector3().copy(PERSPECTIVES[0].target));
  const targetFov = useRef(PERSPECTIVES[0].fov);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.08);

    const isMobile = window.innerWidth < 768;
    const initialFov = isMobile ? 65 : PERSPECTIVES[0].fov;

    const camera = new THREE.PerspectiveCamera(
      initialFov,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.copy(currentCamPos.current);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5); // Cyan light
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x6366f1, 2.0); // Indigo light
    dirLight2.position.set(-6, -4, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x00f2fe, 3, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 3. Central 4D Geometric Artifact (Cỗ máy không gian)
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Khối đa giác Titanium lõi (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.15,
      reflectivity: 0.9,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // Bộ khung viền Wireframe phát sáng
    const wireGeo = new THREE.IcosahedronGeometry(1.605, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireMesh);

    // Khung lồng ngoài xoay ngược chiều (Outer Octahedron Cage)
    const outerGeo = new THREE.OctahedronGeometry(2.3, 0);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    masterGroup.add(outerMesh);

    // Khối điểm lượng tử xoay tròn bên trong (Inner Floating Core)
    const innerGeo = new THREE.DodecahedronGeometry(0.8, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.6,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerMesh);

    // 4. Quầng hạt không gian (Constellation Field)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 14;
      particlePos[i + 1] = (Math.random() - 0.5) * 14;
      particlePos[i + 2] = (Math.random() - 0.5) * 14;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // Lưới tọa độ sàn 3D (Spatial Grid)
    const gridHelper = new THREE.GridHelper(20, 20, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -2.6;
    scene.add(gridHelper);

    // 5. Parallax chuột nhẹ nhàng trên desktop
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.8;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.8;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 6. Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.fov = window.innerWidth < 768 ? 65 : targetFov.current;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 7. Animation Loop (60 FPS, Slerp/Lerp Camera Choreography)
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    let lastCoordUpdate = 0;

    const animate = () => {
      if (isVisible) {
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        // Xoay nhẹ nhàng các cụm khối 3D
        masterGroup.rotation.y = time * 0.25;
        masterGroup.rotation.x = Math.sin(time * 0.2) * 0.15;
        outerMesh.rotation.y = -time * 0.35;
        innerMesh.rotation.x = time * 0.5;
        particlePoints.rotation.y = time * 0.05;

        // Nội suy Camera di chuyển mượt mà qua các góc không gian (Camera Slerp/Lerp)
        const lerpSpeed = Math.min(delta * 4.0, 0.2);
        
        // Thêm độ nghiêng chuột nhẹ nhàng
        const desiredX = targetCamPos.current.x + mouseX;
        const desiredY = targetCamPos.current.y - mouseY;
        const desiredZ = targetCamPos.current.z;

        currentCamPos.current.x += (desiredX - currentCamPos.current.x) * lerpSpeed;
        currentCamPos.current.y += (desiredY - currentCamPos.current.y) * lerpSpeed;
        currentCamPos.current.z += (desiredZ - currentCamPos.current.z) * lerpSpeed;

        currentLookAt.current.lerp(targetLookAt.current, lerpSpeed);

        camera.position.copy(currentCamPos.current);
        camera.lookAt(currentLookAt.current);

        // Cập nhật FOV mượt
        const responsiveTargetFov = window.innerWidth < 768 ? 65 : targetFov.current;
        if (Math.abs(camera.fov - responsiveTargetFov) > 0.1) {
          camera.fov += (responsiveTargetFov - camera.fov) * lerpSpeed;
          camera.updateProjectionMatrix();
        }

        // Cập nhật tọa độ hiển thị HUD mỗi 200ms
        if (time - lastCoordUpdate > 0.2) {
          lastCoordUpdate = time;
          setCoords({
            x: camera.position.x.toFixed(2),
            y: camera.position.y.toFixed(2),
            z: camera.position.z.toFixed(2),
          });
        }

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      renderer.dispose();
      coreGeo.dispose();
      wireGeo.dispose();
      outerGeo.dispose();
      innerGeo.dispose();
      particleGeo.dispose();
    };
  }, []);

  // Hàm chuyển đổi góc nhìn khi click
  const switchPerspective = (p: (typeof PERSPECTIVES)[0]) => {
    setActivePerspective(p.id);
    targetCamPos.current.copy(p.camPos);
    targetLookAt.current.copy(p.target);
    targetFov.current = p.fov;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] sm:h-[540px] lg:h-[620px] rounded-3xl overflow-hidden bg-[#060913] border border-slate-800 shadow-2xl flex flex-col justify-between p-4 sm:p-6"
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
        style={{ touchAction: "pan-y" }}
      />

      {/* TOP HUD BAR: Realtime Coordinates & Status */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none select-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-300 font-bold">SPATIAL 4D ENGINE</span>
          <span className="text-slate-500">•</span>
          <span className="text-sky-400 font-bold">60 FPS</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-mono text-slate-300">
          <Compass size={13} className="text-sky-400" />
          <span>CAM X: <strong className="text-white">{coords.x}</strong></span>
          <span>Y: <strong className="text-white">{coords.y}</strong></span>
          <span>Z: <strong className="text-white">{coords.z}</strong></span>
        </div>
      </div>

      {/* FLOATING 3D HUD ANNOTATIONS (Trục thông tin bám không gian) */}
      <div className="relative z-10 pointer-events-none select-none my-auto space-y-2 max-w-sm sm:max-w-md">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold">
          <Sparkles size={13} />
          <span>KTEE • SENIOR CREATIVE & FULLSTACK ARCHITECT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
          Khám Phá Chiều Không Gian 4D Của Kỹ Sư Ktee
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Tương tác trực tiếp với cỗ máy không gian 3 chiều. Bấm chọn các góc máy bên dưới để camera lượn qua từng góc nhìn điện ảnh với đường cong toán học Slerp.
        </p>
      </div>

      {/* BOTTOM CONTROL DOCK: 4 Cinematic Perspectives Selector */}
      <div className="relative z-10 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
          <Camera size={14} className="text-sky-400" />
          <span>GÓC QUAY ĐIỆN ẢNH (4 PERSPECTIVES):</span>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
          {PERSPECTIVES.map((p) => {
            const isActive = activePerspective === p.id;
            return (
              <button
                key={p.id}
                onClick={() => switchPerspective(p)}
                className={`touch-target px-3.5 py-2 rounded-xl text-xs font-semibold font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] ${
                  isActive
                    ? "bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/30 scale-105 border border-sky-400"
                    : "bg-slate-900/90 text-slate-300 border border-slate-700 hover:border-sky-500/50 hover:bg-slate-800"
                }`}
              >
                <Eye size={13} className={isActive ? "text-slate-950" : "text-sky-400"} />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
