"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  Layers,
  Code2,
  FileDown,
  Send,
  Phone,
  Mail,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Compass,
  Globe,
  Radio,
  ExternalLink
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import CVDownloadModal from "./CVDownloadModal";

// 6 Trạm Tinh Hà tương ứng các Hành tinh & Thiên thể
export const COSMIC_STATIONS = [
  {
    id: "sun",
    index: "01",
    planetName: "Sao Thái Dương (Stellar Nexus)",
    title: "Ktee Identity",
    subtitle: "Chân Dung & Vị Trí",
    camPos: new THREE.Vector3(0, 2.2, 7.5),
    target: new THREE.Vector3(0, 0, 0),
    fov: 50,
    color: "#38bdf8",
    accent: "text-sky-400",
  },
  {
    id: "venus",
    index: "02",
    planetName: "Sao Kim (Venus)",
    title: "Học Thuật TDTU",
    subtitle: "Kỹ Sư 5 Năm",
    camPos: new THREE.Vector3(-4.8, 2.0, 5.0),
    target: new THREE.Vector3(-3.2, 0.4, 0),
    fov: 48,
    color: "#f59e0b",
    accent: "text-amber-400",
  },
  {
    id: "mars",
    index: "03",
    planetName: "Sao Hỏa (Mars)",
    title: "FPT IS & Luklak",
    subtitle: "Thực Chiến Enterprise",
    camPos: new THREE.Vector3(5.2, 1.2, 4.5),
    target: new THREE.Vector3(3.6, -0.2, 0),
    fov: 50,
    color: "#ef4444",
    accent: "text-rose-400",
  },
  {
    id: "jupiter",
    index: "04",
    planetName: "Sao Mộc (Jupiter)",
    title: "Kho 6 Dự Án",
    subtitle: "Sản Phẩm Triển Khai",
    camPos: new THREE.Vector3(-1.8, -4.2, 6.0),
    target: new THREE.Vector3(0, -3.2, 0),
    fov: 52,
    color: "#d97706",
    accent: "text-orange-400",
  },
  {
    id: "saturn",
    index: "05",
    planetName: "Sao Thổ & Vành Đai (Saturn)",
    title: "Kỹ Năng & WordPress",
    subtitle: "Full-Stack & CMS",
    camPos: new THREE.Vector3(4.2, 3.8, 5.2),
    target: new THREE.Vector3(2.8, 2.2, 0),
    fov: 48,
    color: "#10b981",
    accent: "text-emerald-400",
  },
  {
    id: "mercury",
    index: "06",
    planetName: "Sao Thủy & Cổng Warp (Mercury Nexus)",
    title: "Hợp Tác & Tuyển Dụng",
    subtitle: "Hub CTA Chuyển Đổi",
    camPos: new THREE.Vector3(0, 1.0, 9.2),
    target: new THREE.Vector3(0, 0, 0),
    fov: 46,
    color: "#a855f7",
    accent: "text-purple-400",
  },
];

// Helper: Sinh Texture Hành Tinh Procedural trong RAM (Không lo lỗi mạng, tải 0s)
function createPlanetTexture(type: "sun" | "venus" | "mars" | "jupiter" | "saturn" | "mercury"): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  if (type === "sun") {
    const grad = ctx.createLinearGradient(0, 0, 512, 256);
    grad.addColorStop(0, "#0284c7");
    grad.addColorStop(0.5, "#00f2fe");
    grad.addColorStop(1, "#38bdf8");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    // Vệt sáng năng lượng
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 40 + 10, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === "venus") {
    // Sao Kim: Tầng khí quyển ánh vàng kem
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "#fde68a");
    grad.addColorStop(0.3, "#f59e0b");
    grad.addColorStop(0.7, "#d97706");
    grad.addColorStop(1, "#78350f");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    for (let y = 0; y < 256; y += 8) {
      ctx.fillStyle = `rgba(254, 243, 199, ${Math.random() * 0.3})`;
      ctx.fillRect(0, y, 512, 4);
    }
  } else if (type === "mars") {
    // Sao Hỏa: Đỏ gạch sienna
    const grad = ctx.createLinearGradient(0, 0, 512, 256);
    grad.addColorStop(0, "#ef4444");
    grad.addColorStop(0.5, "#b91c1c");
    grad.addColorStop(1, "#7f1d1d");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = "rgba(69, 10, 10, 0.4)";
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 20 + 5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === "jupiter") {
    // Sao Mộc: Dải vân sọc khí quyển đa tầng
    for (let y = 0; y < 256; y += 12) {
      const colors = ["#fed7aa", "#f97316", "#c2410c", "#7c2d12", "#ffedd5"];
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillRect(0, y, 512, 12);
    }
    // Vết đỏ lớn (Great Red Spot)
    ctx.fillStyle = "rgba(185, 28, 28, 0.85)";
    ctx.beginPath();
    ctx.ellipse(320, 150, 45, 25, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "saturn") {
    // Sao Thổ: Màu be vàng mịn màng
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "#fef08a");
    grad.addColorStop(0.5, "#ca8a04");
    grad.addColorStop(1, "#854d0e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
  } else if (type === "mercury") {
    // Sao Thủy: Kim loại ánh tím thạch anh
    const grad = ctx.createLinearGradient(0, 0, 512, 256);
    grad.addColorStop(0, "#c084fc");
    grad.addColorStop(0.5, "#7e22ce");
    grad.addColorStop(1, "#3b0764");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export default function CosmicGalaxy4D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [coords, setCoords] = useState({ x: "0.00", y: "2.20", z: "7.50" });
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const targetCamPos = useRef(new THREE.Vector3().copy(COSMIC_STATIONS[0].camPos));
  const currentCamPos = useRef(new THREE.Vector3().copy(COSMIC_STATIONS[0].camPos));
  const targetLookAt = useRef(new THREE.Vector3().copy(COSMIC_STATIONS[0].target));
  const currentLookAt = useRef(new THREE.Vector3().copy(COSMIC_STATIONS[0].target));
  const targetFov = useRef(COSMIC_STATIONS[0].fov);

  // Lắng nghe scroll chuột (0.0 -> 1.0)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;

      const stationCount = COSMIC_STATIONS.length;
      const rawIndex = Math.min(Math.floor(progress * stationCount), stationCount - 1);
      setActiveStationIndex(rawIndex);

      const segmentProgress = (progress * (stationCount - 1)) % 1;
      const baseIndex = Math.min(Math.floor(progress * (stationCount - 1)), stationCount - 2);
      const nextIndex = Math.min(baseIndex + 1, stationCount - 1);

      const p1 = COSMIC_STATIONS[baseIndex];
      const p2 = COSMIC_STATIONS[nextIndex];

      targetCamPos.current.lerpVectors(p1.camPos, p2.camPos, segmentProgress);
      targetLookAt.current.lerpVectors(p1.target, p2.target, segmentProgress);
      targetFov.current = THREE.MathUtils.lerp(p1.fov, p2.fov, segmentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const flyToStation = (index: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = (index / (COSMIC_STATIONS.length - 1)) * maxScroll;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  // Khởi tạo Three.js Tinh Hà
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060d, 0.05);

    const isMobile = window.innerWidth < 768;
    const initialFov = isMobile ? 65 : COSMIC_STATIONS[0].fov;

    const camera = new THREE.PerspectiveCamera(
      initialFov,
      window.innerWidth / window.innerHeight,
      0.1,
      200
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
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Ánh sáng vũ trụ
    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambient);

    const sunLight = new THREE.PointLight(0x00f2fe, 4, 30);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const cosmicGlow = new THREE.DirectionalLight(0x818cf8, 1.5);
    cosmicGlow.position.set(10, 15, 10);
    scene.add(cosmicGlow);

    // ==========================================
    // 1. TINH HÀ (GALAXY & NEBULA DUST - 1,200 HẠT)
    // ==========================================
    const galaxyCount = 1200;
    const galaxyGeo = new THREE.BufferGeometry();
    const galaxyPositions = new Float32Array(galaxyCount * 3);
    const galaxyColors = new Float32Array(galaxyCount * 3);

    const color1 = new THREE.Color("#38bdf8"); // Cyan
    const color2 = new THREE.Color("#a855f7"); // Purple
    const color3 = new THREE.Color("#f59e0b"); // Gold

    for (let i = 0; i < galaxyCount; i++) {
      const radius = Math.random() * 25 + 1.5;
      const spinAngle = radius * 0.8;
      const branchAngle = ((i % 3) * (2 * Math.PI)) / 3;

      const randomX = (Math.random() - 0.5) * 1.5;
      const randomY = (Math.random() - 0.5) * 1.8;
      const randomZ = (Math.random() - 0.5) * 1.5;

      const i3 = i * 3;
      galaxyPositions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      galaxyPositions[i3 + 1] = randomY;
      galaxyPositions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Pha màu tinh hà rực rỡ
      const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      galaxyColors[i3] = mixedColor.r;
      galaxyColors[i3 + 1] = mixedColor.g;
      galaxyColors[i3 + 2] = mixedColor.b;
    }

    galaxyGeo.setAttribute("position", new THREE.BufferAttribute(galaxyPositions, 3));
    galaxyGeo.setAttribute("color", new THREE.BufferAttribute(galaxyColors, 3));

    const galaxyMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const galaxyPoints = new THREE.Points(galaxyGeo, galaxyMat);
    scene.add(galaxyPoints);

    // ==========================================
    // 2. CÁC THIÊN THỂ & HÀNH TINH (PLANETARY NODES)
    // ==========================================
    const planetsGroup = new THREE.Group();
    scene.add(planetsGroup);

    // [A] SAO THÁI DƯƠNG / STELLAR CORE (TÂM ĐIỂM)
    const sunTex = createPlanetTexture("sun");
    const sunGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const sunMat = new THREE.MeshStandardMaterial({
      map: sunTex,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.8,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    planetsGroup.add(sunMesh);

    // Vành hào quang bảo vệ sao Thái Dương
    const sunWireGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const sunWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const sunWireMesh = new THREE.Mesh(sunWireGeo, sunWireMat);
    sunMesh.add(sunWireMesh);

    // [B] SAO KIM (VENUS - TRẠM 2: HỌC THUẬT TDTU)
    const venusTex = createPlanetTexture("venus");
    const venusGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const venusMat = new THREE.MeshStandardMaterial({
      map: venusTex,
      roughness: 0.4,
      metalness: 0.3,
    });
    const venusMesh = new THREE.Mesh(venusGeo, venusMat);
    venusMesh.position.set(-3.2, 0.4, 0);
    planetsGroup.add(venusMesh);

    // [C] SAO HỎA (MARS - TRẠM 3: FPT IS & LUKLAK)
    const marsTex = createPlanetTexture("mars");
    const marsGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsTex,
      roughness: 0.8,
      metalness: 0.2,
    });
    const marsMesh = new THREE.Mesh(marsGeo, marsMat);
    marsMesh.position.set(3.6, -0.2, 0);
    planetsGroup.add(marsMesh);

    // [D] SAO MỘC (JUPITER - TRẠM 4: KHO 6 DỰ ÁN)
    const jupiterTex = createPlanetTexture("jupiter");
    const jupiterGeo = new THREE.SphereGeometry(1.3, 32, 32);
    const jupiterMat = new THREE.MeshStandardMaterial({
      map: jupiterTex,
      roughness: 0.5,
      metalness: 0.1,
    });
    const jupiterMesh = new THREE.Mesh(jupiterGeo, jupiterMat);
    jupiterMesh.position.set(0, -3.2, 0);
    planetsGroup.add(jupiterMesh);

    // [E] SAO THỔ VÀ VÀNH ĐAI RỰC RỠ (SATURN - TRẠM 5: KỸ NĂNG & WP)
    const saturnTex = createPlanetTexture("saturn");
    const saturnGeo = new THREE.SphereGeometry(0.9, 32, 32);
    const saturnMat = new THREE.MeshStandardMaterial({
      map: saturnTex,
      roughness: 0.6,
      metalness: 0.2,
    });
    const saturnMesh = new THREE.Mesh(saturnGeo, saturnMat);
    saturnMesh.position.set(2.8, 2.2, 0);
    planetsGroup.add(saturnMesh);

    // Vành đai sao Thổ (Saturn's Magnificent Ring)
    const ringGeo = new THREE.RingGeometry(1.25, 2.1, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xca8a04,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    ringMesh.rotation.y = Math.PI / 8;
    saturnMesh.add(ringMesh);

    // Đường quỹ đạo thiên thể (Orbital Pathways)
    const orbit1 = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(
        new THREE.Path().absarc(0, 0, 3.2, 0, Math.PI * 2, true).getPoints(64).map(p => new THREE.Vector3(p.x, 0, p.y))
      ),
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.18 })
    );
    scene.add(orbit1);

    const orbit2 = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(
        new THREE.Path().absarc(0, 0, 5.0, 0, Math.PI * 2, true).getPoints(64).map(p => new THREE.Vector3(p.x, 0, p.y))
      ),
      new THREE.LineBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.15 })
    );
    scene.add(orbit2);

    // Parallax chuột nhẹ nhàng
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.8;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.fov = window.innerWidth < 768 ? 65 : targetFov.current;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let lastCoordTime = 0;

    const animate = () => {
      if (isVisible) {
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        // Xoay dải tinh hà & thiên thể
        galaxyPoints.rotation.y = time * 0.025;
        sunMesh.rotation.y = time * 0.15;
        sunWireMesh.rotation.y = -time * 0.2;
        venusMesh.rotation.y = time * 0.2;
        marsMesh.rotation.y = time * 0.25;
        jupiterMesh.rotation.y = time * 0.35;
        saturnMesh.rotation.y = time * 0.28;

        // Nội suy Camera 60 FPS
        const lerpSpeed = Math.min(delta * 3.8, 0.2);
        const desiredX = targetCamPos.current.x + mouseX;
        const desiredY = targetCamPos.current.y - mouseY;
        const desiredZ = targetCamPos.current.z;

        currentCamPos.current.x += (desiredX - currentCamPos.current.x) * lerpSpeed;
        currentCamPos.current.y += (desiredY - currentCamPos.current.y) * lerpSpeed;
        currentCamPos.current.z += (desiredZ - currentCamPos.current.z) * lerpSpeed;

        currentLookAt.current.lerp(targetLookAt.current, lerpSpeed);

        camera.position.copy(currentCamPos.current);
        camera.lookAt(currentLookAt.current);

        const responsiveFov = window.innerWidth < 768 ? 65 : targetFov.current;
        if (Math.abs(camera.fov - responsiveFov) > 0.1) {
          camera.fov += (responsiveFov - camera.fov) * lerpSpeed;
          camera.updateProjectionMatrix();
        }

        if (time - lastCoordTime > 0.15) {
          lastCoordTime = time;
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
      document.removeEventListener("visibilitychange", handleVisibility);
      renderer.dispose();
      sunGeo.dispose();
      venusGeo.dispose();
      marsGeo.dispose();
      jupiterGeo.dispose();
      saturnGeo.dispose();
      ringGeo.dispose();
      galaxyGeo.dispose();
    };
  }, []);

  const activeStation = COSMIC_STATIONS[activeStationIndex];

  return (
    <div ref={containerRef} className="relative w-full text-white">
      {/* 1. THREE.JS FULLSCREEN GALAXY CANVAS */}
      <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none bg-[#04060d]">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="w-full h-full block"
          style={{ touchAction: "pan-y" }}
        />
      </div>

      {/* 2. TOP HUD STATUS STRIP */}
      <header className="fixed top-0 left-0 right-0 z-30 pointer-events-none p-3 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 pointer-events-auto shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-white tracking-wide">
            {portfolioData.personal.nickname}.dev
          </span>
          <span className="text-slate-500">•</span>
          <span className={`text-[11px] font-mono font-bold ${activeStation.accent}`}>
            {activeStation.planetName.split(" (")[0]}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 text-xs font-mono text-slate-400 shadow-lg">
          <Compass size={13} className="text-sky-400" />
          <span>TỌA ĐỘ VŨ TRỤ: <strong className="text-white">{coords.x}</strong>, <strong className="text-white">{coords.y}</strong>, <strong className="text-white">{coords.z}</strong></span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">60 FPS</span>
        </div>
      </header>

      {/* 3. RIGHT PLANETARY NAVIGATOR (BẤM ĐỂ FLY-TO HÀNH TINH) */}
      <aside
        aria-label="Thanh điều hướng hành tinh vũ trụ"
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5 pointer-events-auto"
      >
        {COSMIC_STATIONS.map((station, i) => {
          const isActive = activeStationIndex === i;
          return (
            <button
              key={station.id}
              onClick={() => flyToStation(i)}
              className={`group flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all font-mono text-xs cursor-pointer ${
                isActive
                  ? "bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/30 scale-105 border border-sky-400"
                  : "bg-slate-900/75 hover:bg-slate-800 text-slate-400 border border-slate-800 hover:border-slate-700"
              }`}
            >
              <span className="text-[10px]">{station.index}</span>
              <span className="hidden lg:inline text-xs">{station.planetName.split(" (")[0]}</span>
            </button>
          );
        })}
      </aside>

      {/* 4. VIRTUAL SCROLL TRACK (600VH ĐỂ LĂN CHUỘT DU HÀNH TINH HÀ) */}
      <div className="relative z-10 min-h-[600vh] pointer-events-none">
        <div className="fixed inset-0 z-20 flex items-center pointer-events-none p-4 sm:p-8 lg:p-12">
          <div className="w-full max-w-4xl mx-auto flex flex-col justify-center">

            {/* TRẠM 1: SAO THÁI DƯƠNG - KTEE IDENTITY */}
            {activeStationIndex === 0 && (
              <div className="pointer-events-auto card-glass bg-slate-900/85 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-sky-500/40 shadow-2xl space-y-4 max-w-2xl animate-fade-in">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-mono font-bold">
                    <Radio size={12} className="animate-pulse" />
                    TÂM ĐIỂM VŨ TRỤ • STELLAR NEXUS
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    • {portfolioData.personal.degreeLabel}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  {portfolioData.personal.name}
                  <span className="block text-base sm:text-lg font-semibold text-sky-400 mt-1">
                    Full-Stack Software Engineer • Tư Duy Nghiệp Vụ BA • Kỹ Sư Thực Chiến
                  </span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {portfolioData.personal.bio}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
                  {portfolioData.stats.map((s) => (
                    <div key={s.label} className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                      <div className="text-base sm:text-lg font-black text-sky-400 font-mono">{s.value}</div>
                      <div className="text-[10px] text-slate-400 truncate">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <button
                    onClick={() => flyToStation(1)}
                    className="touch-target px-4 py-2.5 rounded-xl text-xs font-semibold bg-sky-500 text-slate-950 font-mono flex items-center gap-1.5 shadow-md shadow-sky-500/20 hover:bg-sky-400 transition-colors"
                  >
                    <span>Lăn Chuột Đến Sao Kim (Học Thuật)</span>
                    <ChevronDown size={14} />
                  </button>
                  <button
                    onClick={() => setIsCVModalOpen(true)}
                    className="touch-target px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800/90 text-white hover:border-sky-500 flex items-center gap-1.5 transition-colors"
                  >
                    <FileDown size={14} className="text-sky-400" />
                    <span>Tải CV (5 Ngành)</span>
                  </button>
                </div>
              </div>
            )}

            {/* TRẠM 2: SAO KIM - HỌC THUẬT TDTU 5 NĂM */}
            {activeStationIndex === 1 && (
              <div className="pointer-events-auto card-glass bg-slate-900/85 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-2xl space-y-4 max-w-2xl animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
                    <GraduationCap size={16} />
                    <span>Trạm 02 • Sao Kim (Venus) • Học Thuật TDTU 5 Năm</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">2021 – 2026</span>
                </div>

                <h2 className="text-lg sm:text-2xl font-bold text-white">
                  Cử Nhân / Kỹ Sư Công Nghệ Thông Tin (Hệ 5 Năm Toàn Thời Gian)
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Nền tảng hơn 150+ tín chỉ: Cấu trúc dữ liệu & Giải thuật, Hệ thống phân tán, An toàn thông tin và Kiểm thử phần mềm.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {portfolioData.education[0].coursework.map((c) => (
                    <div key={c.name} className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 text-center">
                      <div className="text-sm font-black text-amber-400 font-mono">{c.score}</div>
                      <div className="text-[11px] text-slate-300 font-semibold truncate mt-0.5">{c.name.split(" (")[0]}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <Link
                    href="/education"
                    className="text-xs font-semibold text-amber-400 flex items-center gap-1 hover:underline"
                  >
                    <span>Xem bảng điểm chi tiết & chương trình đào tạo</span>
                    <ArrowRight size={13} />
                  </Link>
                  <button
                    onClick={() => flyToStation(2)}
                    className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <span>Đến Sao Hỏa →</span>
                  </button>
                </div>
              </div>
            )}

            {/* TRẠM 3: SAO HỎA - FPT IS & LUKLAK */}
            {activeStationIndex === 2 && (
              <div className="pointer-events-auto card-glass bg-slate-900/85 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-rose-500/40 shadow-2xl space-y-4 max-w-2xl animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase">
                    <Briefcase size={16} />
                    <span>Trạm 03 • Sao Hỏa (Mars) • Thực Chiến FPT IS & Luklak</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">Trọng Điểm</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>FPT IS (12/2025 - 01/2026)</span>
                      <span className="font-mono text-emerald-400">230 Cán Bộ • 60 Bugs Xử Lý</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Trưởng nhóm triển khai hệ thống Thi Hành Án Dân Sự; tổ chức 15 buổi đào tạo, nghiệm thu đúng hạn.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>Luklak Freelance (05/2026)</span>
                      <span className="font-mono text-sky-400">7 Trang Web • Lenis Scroll</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Lập trình Front-End 17 components tái sử dụng, hiệu ứng điện ảnh Cinematic Scroll, cấu hình VPS Linux.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <Link
                    href="/experience"
                    className="text-xs font-semibold text-rose-400 flex items-center gap-1 hover:underline"
                  >
                    <span>Xem chi tiết vai trò & số liệu thực tế tại FPT IS / Luklak</span>
                    <ArrowRight size={13} />
                  </Link>
                  <button
                    onClick={() => flyToStation(3)}
                    className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <span>Đến Sao Mộc →</span>
                  </button>
                </div>
              </div>
            )}

            {/* TRẠM 4: SAO MỘC - KHO 6 DỰ ÁN */}
            {activeStationIndex === 3 && (
              <div className="pointer-events-auto card-glass bg-slate-900/85 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-orange-500/40 shadow-2xl space-y-4 max-w-3xl animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 uppercase">
                    <Layers size={16} />
                    <span>Trạm 04 • Sao Mộc (Jupiter) • Kho 6 Dự Án Kỹ Thuật</span>
                  </div>
                  <Link
                    href="/projects"
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-600 text-white hover:bg-orange-500 transition-colors"
                  >
                    Xem Cả 6 Dự Án →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {portfolioData.projects.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
                          {p.category}
                        </span>
                        <h3 className="text-xs font-bold text-white mt-2 leading-snug line-clamp-1">
                          {p.title}
                        </h3>
                        <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">
                          {p.description}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px]">
                        <span className="font-mono text-emerald-400 font-bold">
                          {p.metrics[0].value} {p.metrics[0].label}
                        </span>
                        <span className="text-orange-400 font-semibold text-[10px]">
                          Chi tiết →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-800">
                  <button
                    onClick={() => flyToStation(4)}
                    className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <span>Đến Sao Thổ & Vành Đai →</span>
                  </button>
                </div>
              </div>
            )}

            {/* TRẠM 5: SAO THỔ VÀ VÀNH ĐAI - KỸ NĂNG & WORDPRESS */}
            {activeStationIndex === 4 && (
              <div className="pointer-events-auto card-glass bg-slate-900/85 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-4 max-w-2xl animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
                    <Code2 size={16} />
                    <span>Trạm 05 • Sao Thổ (Saturn) • Kỹ Năng & WordPress CMS</span>
                  </div>
                  <Link href="/skills" className="text-xs text-emerald-400 font-semibold hover:underline">
                    Xem tất cả kỹ năng →
                  </Link>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    "ReactJS (v18+)", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis Scroll",
                    "Node.js (8.3/10)", "Express", "ASP.NET Core", "Redis Caching", "MongoDB", "MS SQL Server",
                    "Phân Tích Nghiệp Vụ BA (8.1/10)", "UAT Testing (Jira)", "WordPress CMS & SEO", "VPS Linux & SSL", "AI Agents"
                  ].map((s) => (
                    <span
                      key={s}
                      className={`text-xs font-mono px-3 py-1.5 rounded-xl border ${
                        s.includes("WordPress")
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold"
                          : "bg-slate-800/80 text-slate-200 border-slate-700"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-mono">
                    <Sparkles size={14} />
                    <span>Kinh Nghiệm WordPress & Headless Migration</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tùy biến theme WordPress, tối ưu hóa On-page SEO, cấu hình RankMath/Schema. Tái cấu trúc thành công website năng lượng cũ từ WordPress bị giật khung hình (CLS 0.38) sang Next.js 15 App Router đạt điểm Core Web Vitals tối đa.
                  </p>
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-800">
                  <button
                    onClick={() => flyToStation(5)}
                    className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>Đến Cổng Tuyển Dụng & CTA →</span>
                  </button>
                </div>
              </div>
            )}

            {/* TRẠM 6: CỔNG WARP SAO THỦY - HUB CTA CHUYỂN ĐỔI CAO */}
            {activeStationIndex === 5 && (
              <div className="pointer-events-auto card-glass bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-purple-500/50 shadow-[0_0_60px_rgba(168,85,247,0.25)] space-y-5 max-w-2xl animate-fade-in text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-mono font-bold mx-auto sm:mx-0">
                  <Sparkles size={14} />
                  <span>TRẠM ĐÍCH • SẴN SÀNG NHẬN DỰ ÁN & VỊ TRÍ SENIOR</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  Khởi Động Hợp Tác & Tuyển Dụng Cùng Kỹ Sư Ktee
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  Sẵn sàng trao đổi về các vị trí Software Engineer (Full-Stack, Front-End, Back-End), dự án chuyển đổi số hoặc vai trò Business Analyst. Hãy chọn kênh kết nối thuận tiện nhất:
                </p>

                {/* 4 Nút CTA Chuyển Đổi Cao (Touch Target >= 50px) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setIsCVModalOpen(true)}
                    className="touch-target min-h-[50px] px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all cursor-pointer active:scale-95"
                  >
                    <FileDown size={18} />
                    <span>Tải CV (5 Bản Chuyên Ngành)</span>
                  </button>

                  <a
                    href="https://t.me/kteenguyen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target min-h-[50px] px-4 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/30 transition-all cursor-pointer active:scale-95"
                  >
                    <Send size={18} />
                    <span>Nhắn Tin Telegram Trực Tiếp</span>
                  </a>

                  <a
                    href={`tel:${portfolioData.personal.phone}`}
                    className="touch-target min-h-[50px] px-4 py-3 rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                  >
                    <Phone size={17} className="text-emerald-400" />
                    <span>Gọi Ngay: {portfolioData.personal.phone}</span>
                  </a>

                  <Link
                    href="/contact"
                    className="touch-target min-h-[50px] px-4 py-3 rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                  >
                    <Mail size={17} className="text-sky-400" />
                    <span>Gửi Lời Mời Phỏng Vấn</span>
                  </Link>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Email: {portfolioData.personal.email}</span>
                  <button
                    onClick={() => flyToStation(0)}
                    className="text-sky-400 hover:underline"
                  >
                    ↑ Về Trạm Thái Dương
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <CVDownloadModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </div>
  );
}
