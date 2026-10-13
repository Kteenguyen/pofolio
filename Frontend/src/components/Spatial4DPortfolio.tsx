"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
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
  CheckCircle2,
  ExternalLink,
  Laptop,
  Check
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import CVDownloadModal from "./CVDownloadModal";

// 6 Trạm không gian 4D tương ứng 6 module
export const SPATIAL_STATIONS = [
  {
    id: "hero",
    index: "01",
    title: "Ktee Identity",
    subtitle: "Chân Dung & Vị Trí",
    camPos: new THREE.Vector3(0, 1.6, 6.2),
    target: new THREE.Vector3(0, 0, 0),
    fov: 48,
  },
  {
    id: "education",
    index: "02",
    title: "Học Thuật TDTU",
    subtitle: "Kỹ Sư 5 Năm",
    camPos: new THREE.Vector3(-3.4, 2.8, 4.4),
    target: new THREE.Vector3(-0.4, 0.4, 0),
    fov: 52,
  },
  {
    id: "experience",
    index: "03",
    title: "FPT IS & Luklak",
    subtitle: "Thực Chiến Enterprise",
    camPos: new THREE.Vector3(3.6, 1.2, 3.8),
    target: new THREE.Vector3(0.4, 0.2, 0),
    fov: 50,
  },
  {
    id: "projects",
    index: "04",
    title: "Kho 6 Dự Án",
    subtitle: "Sản Phẩm Triển Khai",
    camPos: new THREE.Vector3(0, -2.4, 4.8),
    target: new THREE.Vector3(0, 0.2, 0),
    fov: 54,
  },
  {
    id: "skills",
    index: "05",
    title: "Kỹ Năng & WordPress",
    subtitle: "Full-Stack & CMS",
    camPos: new THREE.Vector3(2.6, 2.8, 3.6),
    target: new THREE.Vector3(0, 0.4, 0),
    fov: 50,
  },
  {
    id: "cta",
    index: "06",
    title: "Hợp Tác & Tuyển Dụng",
    subtitle: "Hành Động CTA",
    camPos: new THREE.Vector3(0, 0.6, 7.8),
    target: new THREE.Vector3(0, 0, 0),
    fov: 46,
  },
];

export default function Spatial4DPortfolio() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [coords, setCoords] = useState({ x: "0.00", y: "1.60", z: "6.20" });
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  // Three.js target camera refs
  const targetCamPos = useRef(new THREE.Vector3().copy(SPATIAL_STATIONS[0].camPos));
  const currentCamPos = useRef(new THREE.Vector3().copy(SPATIAL_STATIONS[0].camPos));
  const targetLookAt = useRef(new THREE.Vector3().copy(SPATIAL_STATIONS[0].target));
  const currentLookAt = useRef(new THREE.Vector3().copy(SPATIAL_STATIONS[0].target));
  const targetFov = useRef(SPATIAL_STATIONS[0].fov);

  // 1. Lắng nghe cuộn chuột điều khiển tiến trình 4D (0.0 -> 1.0)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      setScrollProgress(progress);

      // Tính trạm không gian hiện tại
      const stationCount = SPATIAL_STATIONS.length;
      const rawIndex = Math.min(Math.floor(progress * stationCount), stationCount - 1);
      setActiveStationIndex(rawIndex);

      // Nội suy vị trí camera trên đường cong Spline theo progress
      const segmentProgress = (progress * (stationCount - 1)) % 1;
      const baseIndex = Math.min(Math.floor(progress * (stationCount - 1)), stationCount - 2);
      const nextIndex = Math.min(baseIndex + 1, stationCount - 1);

      const p1 = SPATIAL_STATIONS[baseIndex];
      const p2 = SPATIAL_STATIONS[nextIndex];

      targetCamPos.current.lerpVectors(p1.camPos, p2.camPos, segmentProgress);
      targetLookAt.current.lerpVectors(p1.target, p2.target, segmentProgress);
      targetFov.current = THREE.MathUtils.lerp(p1.fov, p2.fov, segmentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Chuyển trạm trực tiếp khi click (Smooth Fly-to Station)
  const flyToStation = (index: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = (index / (SPATIAL_STATIONS.length - 1)) * maxScroll;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  // 3. Khởi tạo Không Gian Three.js Toàn Cảnh
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.07);

    const isMobile = window.innerWidth < 768;
    const initialFov = isMobile ? 65 : SPATIAL_STATIONS[0].fov;

    const camera = new THREE.PerspectiveCamera(
      initialFov,
      window.innerWidth / window.innerHeight,
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
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Ánh sáng không gian đa sắc
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    cyanLight.position.set(6, 8, 6);
    scene.add(cyanLight);

    const indigoLight = new THREE.DirectionalLight(0x818cf8, 2.0);
    indigoLight.position.set(-6, -4, -4);
    scene.add(indigoLight);

    const coreLight = new THREE.PointLight(0x00f2fe, 3, 12);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // Cỗ máy trung tâm
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Khối đa giác Titanium lõi
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.92,
      roughness: 0.15,
      reflectivity: 0.9,
      clearcoat: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // Khung viền Wireframe xanh Cyan
    const wireGeo = new THREE.IcosahedronGeometry(1.605, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireMesh);

    // Khung lăng trụ xoay ngoài (Octahedron Cage)
    const cageGeo = new THREE.OctahedronGeometry(2.35, 0);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    masterGroup.add(cageMesh);

    // Vành đai hạt vệ tinh xoay quanh (Orbiting Ring)
    const ringGeo = new THREE.TorusGeometry(3.2, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.5;
    masterGroup.add(ringMesh);

    // Quầng hạt không gian (Constellation Field)
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 16;
      particlePos[i + 1] = (Math.random() - 0.5) * 16;
      particlePos[i + 2] = (Math.random() - 0.5) * 16;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // Lưới sàn 3D
    const gridHelper = new THREE.GridHelper(24, 24, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -2.8;
    scene.add(gridHelper);

    // Parallax chuột trên Desktop
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.8;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.fov = window.innerWidth < 768 ? 65 : targetFov.current;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Loop
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

        // Xoay nhẹ nhàng các khối
        masterGroup.rotation.y = time * 0.22;
        cageMesh.rotation.y = -time * 0.3;
        ringMesh.rotation.z = time * 0.15;
        particlePoints.rotation.y = time * 0.04;

        // Nội suy Camera 60 FPS
        const lerpSpeed = Math.min(delta * 4.0, 0.2);
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

        // Cập nhật tọa độ HUD
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
      coreGeo.dispose();
      wireGeo.dispose();
      cageGeo.dispose();
      ringGeo.dispose();
      particleGeo.dispose();
    };
  }, []);

  const activeStation = SPATIAL_STATIONS[activeStationIndex];

  return (
    <div ref={containerRef} className="relative w-full text-white">
      {/* 1. THREE.JS FULLSCREEN CANVAS (FIXED 100VW x 100VH) */}
      <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none bg-[#060913]">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="w-full h-full block"
          style={{ touchAction: "pan-y" }}
        />
      </div>

      {/* 2. TOP HUD STATUS STRIP */}
      <header className="fixed top-0 left-0 right-0 z-30 pointer-events-none p-3 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-slate-200">
            {portfolioData.personal.nickname}.dev
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-[11px] font-mono text-sky-400 font-bold">
            TRẠM {activeStation.index}/06
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 text-xs font-mono text-slate-400">
          <Compass size={13} className="text-sky-400" />
          <span>CAM: <strong className="text-white">{coords.x}</strong>, <strong className="text-white">{coords.y}</strong>, <strong className="text-white">{coords.z}</strong></span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">60 FPS</span>
        </div>
      </header>

      {/* 3. RIGHT STATION NAVIGATOR (BẤM VÀO ĐỂ FLY-TO TRẠM) */}
      <aside
        aria-label="Thanh điều hướng trạm không gian 4D"
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5 pointer-events-auto"
      >
        {SPATIAL_STATIONS.map((station, i) => {
          const isActive = activeStationIndex === i;
          return (
            <button
              key={station.id}
              onClick={() => flyToStation(i)}
              className={`group flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all font-mono text-xs cursor-pointer ${
                isActive
                  ? "bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/30 scale-105 border border-sky-400"
                  : "bg-slate-900/70 hover:bg-slate-800 text-slate-400 border border-slate-800 hover:border-slate-700"
              }`}
            >
              <span className="text-[10px]">{station.index}</span>
              <span className="hidden lg:inline text-xs">{station.title}</span>
            </button>
          );
        })}
      </aside>

      {/* 4. VIRTUAL SCROLL TRACK (600VH ĐỂ LĂN CHUỘT DU HÀNH XUYÊN KHÔNG GIAN) */}
      <div className="relative z-10 min-h-[600vh] pointer-events-none">
        {/* VÙNG HIỂN THỊ NỘI DUNG NỔI (FIXED OVERLAY THEO TRẠM HIỆN TẠI) */}
        <div className="fixed inset-0 z-20 flex items-center pointer-events-none p-4 sm:p-8 lg:p-12">
          <div className="w-full max-w-4xl mx-auto flex flex-col justify-center">

            {/* STATION 1: HERO & IDENTITY */}
            {activeStationIndex === 0 && (
              <div className="pointer-events-auto card-glass bg-slate-900/85 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-4 max-w-2xl animate-fade-in">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Sẵn sàng đón nhận cơ hội mới
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

                {/* 4 Verified Stats */}
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
                    <span>Lăn Chuột Hoặc Khám Phá Trạm Tiếp Theo</span>
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

            {/* STATION 2: ACADEMIC RIGOR TDTU */}
            {activeStationIndex === 1 && (
              <div className="pointer-events-auto card-glass bg-slate-900/85 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-blue-500/30 shadow-2xl space-y-4 max-w-2xl animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400 uppercase">
                    <GraduationCap size={16} />
                    <span>Trạm 02 • Học Thuật 5 Năm ĐH Tôn Đức Thắng</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">2021 – 2026</span>
                </div>

                <h2 className="text-lg sm:text-2xl font-bold text-white">
                  Cử Nhân Chuyên Ngành Kỹ Thuật Phần Mềm (ĐH Tôn Đức Thắng)
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Nền tảng hơn 150+ tín chỉ: Cấu trúc dữ liệu & Giải thuật, Hệ thống phân tán, An toàn thông tin và Kiểm thử phần mềm.
                </p>

                {/* 4 Môn học điểm cao */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {portfolioData.education[0].coursework.map((c) => (
                    <div key={c.name} className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 text-center">
                      <div className="text-sm font-black text-sky-400 font-mono">{c.score}</div>
                      <div className="text-[11px] text-slate-300 font-semibold truncate mt-0.5">{c.name.split(" (")[0]}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <Link
                    href="/education"
                    className="text-xs font-semibold text-sky-400 flex items-center gap-1 hover:underline"
                  >
                    <span>Xem bảng điểm chi tiết & chương trình đào tạo</span>
                    <ArrowRight size={13} />
                  </Link>
                  <button
                    onClick={() => flyToStation(2)}
                    className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <span>Trạm sau →</span>
                  </button>
                </div>
              </div>
            )}

            {/* STATION 3: ENTERPRISE BATTLE-TESTED (FPT IS & LUKLAK) */}
            {activeStationIndex === 2 && (
              <div className="pointer-events-auto card-glass bg-slate-900/85 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-2xl space-y-4 max-w-2xl animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase">
                    <Briefcase size={16} />
                    <span>Trạm 03 • Thực Chiến Doanh Nghiệp FPT IS & Luklak</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">Dự Án Trọng Điểm</span>
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
                    className="text-xs font-semibold text-indigo-400 flex items-center gap-1 hover:underline"
                  >
                    <span>Xem chi tiết vai trò & số liệu thực tế tại FPT IS / Luklak</span>
                    <ArrowRight size={13} />
                  </Link>
                  <button
                    onClick={() => flyToStation(3)}
                    className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <span>Trạm sau →</span>
                  </button>
                </div>
              </div>
            )}

            {/* STATION 4: KHO 6 DỰ ÁN */}
            {activeStationIndex === 3 && (
              <div className="pointer-events-auto card-glass bg-slate-900/85 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-4 max-w-3xl animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400 uppercase">
                    <Layers size={16} />
                    <span>Trạm 04 • Kho 6 Dự Án Kỹ Thuật Đã Triển Khai</span>
                  </div>
                  <Link
                    href="/projects"
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
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
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
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
                        <span className="text-sky-400 font-semibold text-[10px]">
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
                    <span>Trạm sau →</span>
                  </button>
                </div>
              </div>
            )}

            {/* STATION 5: KỸ NĂNG & WORDPRESS */}
            {activeStationIndex === 4 && (
              <div className="pointer-events-auto card-glass bg-slate-900/85 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-4 max-w-2xl animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400 uppercase">
                    <Code2 size={16} />
                    <span>Trạm 05 • Khung Kỹ Năng & WordPress CMS</span>
                  </div>
                  <Link href="/skills" className="text-xs text-sky-400 font-semibold hover:underline">
                    Xem tất cả kỹ năng →
                  </Link>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    "ReactJS (v18+)", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis Scroll",
                    "Node.js Distributed APIs", "Express", "ASP.NET Core", "Redis Caching <50ms", "MongoDB", "PostgreSQL 3NF",
                    "Phân Tích Nghiệp Vụ BA (BRD/UML)", "UAT Testing (Jira)", "WordPress CMS & SEO", "VPS Linux & Docker", "AI Agents"
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
                    <Laptop size={14} />
                    <span>Kinh Nghiệm WordPress & Headless Migration</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tùy biến theme WordPress, tối ưu hóa On-page SEO, cấu hình RankMath/Schema. Tái cấu trúc thành công website năng lượng cũ từ WordPress bị giật khung hình (CLS 0.38) sang Next.js 15 App Router đạt điểm Core Web Vitals tối đa.
                  </p>
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-800">
                  <button
                    onClick={() => flyToStation(5)}
                    className="text-xs font-mono text-sky-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>Đến Trạm Tuyển Dụng & CTA →</span>
                  </button>
                </div>
              </div>
            )}

            {/* STATION 6: HIGH-CONVERSION CTA & TUYỂN DỤNG (BỎ HOÀN TOÀN TERMINAL) */}
            {activeStationIndex === 5 && (
              <div className="pointer-events-auto card-glass bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-sky-500/40 shadow-[0_0_50px_rgba(56,189,248,0.2)] space-y-5 max-w-2xl animate-fade-in text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold mx-auto sm:mx-0">
                  <Sparkles size={14} />
                  <span>SẴN SÀNG NHẬN DỰ ÁN & VỊ TRÍ SENIOR</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  Khởi Động Hợp Tác & Tuyển Dụng Cùng Kỹ Sư Ktee
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  Sẵn sàng trao đổi về các vị trí Software Engineer (Full-Stack, Front-End, Back-End), dự án chuyển đổi số hoặc vai trò Business Analyst. Hãy chọn kênh kết nối thuận tiện nhất cho bạn:
                </p>

                {/* 4 Nút CTA Chuyển Đổi Cao (Touch Target 48px - 52px) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* CTA 1: Tải CV 5 Bản */}
                  <button
                    onClick={() => setIsCVModalOpen(true)}
                    className="touch-target min-h-[50px] px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all cursor-pointer active:scale-95"
                  >
                    <FileDown size={18} />
                    <span>Tải CV (5 Bản Chuyên Ngành)</span>
                  </button>

                  {/* CTA 2: Telegram Trực Tiếp */}
                  <a
                    href="https://t.me/kteenguyen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target min-h-[50px] px-4 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/30 transition-all cursor-pointer active:scale-95"
                  >
                    <Send size={18} />
                    <span>Nhắn Tin Telegram Trực Tiếp</span>
                  </a>

                  {/* CTA 3: Gọi Điện Thoại */}
                  <a
                    href={`tel:${portfolioData.personal.phone}`}
                    className="touch-target min-h-[50px] px-4 py-3 rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                  >
                    <Phone size={17} className="text-emerald-400" />
                    <span>Gọi Ngay: {portfolioData.personal.phone}</span>
                  </a>

                  {/* CTA 4: Form Lời Mời Phỏng Vấn */}
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
                    ↑ Về Trạm Đầu
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* 5. MODAL TẢI 5 BẢN CV PDF */}
      <CVDownloadModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </div>
  );
}
