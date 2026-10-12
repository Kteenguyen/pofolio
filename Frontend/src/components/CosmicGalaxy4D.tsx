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
  Radio,
  Rocket,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import CVDownloadModal from "./CVDownloadModal";
import TechLogo from "./TechLogo";

// 6 Trạm Tinh Hà được mở rộng khoảng cách trong không gian 3D sâu rộng (Cosmic Scale 18–57 units)
export const COSMIC_STATIONS = [
  {
    id: "sun",
    index: "01",
    planetName: "Sao Thái Dương (Stellar Nexus)",
    title: "Ktee Identity",
    subtitle: "Chân Dung & Vị Trí",
    meshPos: new THREE.Vector3(0, 0, 0),
    camPos: new THREE.Vector3(0, 3.8, 12.5),
    target: new THREE.Vector3(0, 0, 0),
    fov: 48,
    color: "#38bdf8",
    accent: "text-sky-400",
    glowColor: 0x0284c7,
    haloColor: 0x38bdf8,
    radius: 2.2,
  },
  {
    id: "venus",
    index: "02",
    planetName: "Sao Kim (Venus)",
    title: "Học Thuật TDTU",
    subtitle: "Kỹ Sư 5 Năm",
    meshPos: new THREE.Vector3(-16.0, 3.5, -8.0),
    camPos: new THREE.Vector3(-19.5, 5.0, -3.5),
    target: new THREE.Vector3(-16.0, 3.5, -8.0),
    fov: 46,
    color: "#f59e0b",
    accent: "text-amber-400",
    glowColor: 0xd97706,
    haloColor: 0xfbbf24,
    radius: 1.25,
  },
  {
    id: "mars",
    index: "03",
    planetName: "Sao Hỏa (Mars)",
    title: "FPT IS & Luklak",
    subtitle: "Thực Chiến Enterprise",
    meshPos: new THREE.Vector3(18.0, -3.0, 10.0),
    camPos: new THREE.Vector3(21.5, -1.5, 14.5),
    target: new THREE.Vector3(18.0, -3.0, 10.0),
    fov: 48,
    color: "#ef4444",
    accent: "text-rose-400",
    glowColor: 0xb91c1c,
    haloColor: 0xf87171,
    radius: 1.05,
  },
  {
    id: "jupiter",
    index: "04",
    planetName: "Sao Mộc (Jupiter)",
    title: "Kho 6 Dự Án",
    subtitle: "Sản Phẩm Triển Khai",
    meshPos: new THREE.Vector3(-14.0, -12.0, 20.0),
    camPos: new THREE.Vector3(-19.0, -9.5, 27.5),
    target: new THREE.Vector3(-14.0, -12.0, 20.0),
    fov: 52,
    color: "#d97706",
    accent: "text-orange-400",
    glowColor: 0xc2410c,
    haloColor: 0xfb923c,
    radius: 2.6,
  },
  {
    id: "saturn",
    index: "05",
    planetName: "Sao Thổ & Vành Đai (Saturn)",
    title: "Kỹ Năng & WordPress",
    subtitle: "Full-Stack & CMS",
    meshPos: new THREE.Vector3(22.0, 14.0, -16.0),
    camPos: new THREE.Vector3(27.5, 18.0, -9.0),
    target: new THREE.Vector3(22.0, 14.0, -16.0),
    fov: 48,
    color: "#10b981",
    accent: "text-emerald-400",
    glowColor: 0x854d0e,
    haloColor: 0xfacc15,
    radius: 1.65,
  },
  {
    id: "mercury",
    index: "06",
    planetName: "Sao Thủy & Cổng Warp (Mercury Nexus)",
    title: "Hợp Tác & Tuyển Dụng",
    subtitle: "Hub CTA Chuyển Đổi",
    meshPos: new THREE.Vector3(0, -4.0, 32.0),
    camPos: new THREE.Vector3(0, -1.8, 41.5),
    target: new THREE.Vector3(0, -4.0, 32.0),
    fov: 46,
    color: "#a855f7",
    accent: "text-purple-400",
    glowColor: 0x6b21a8,
    haloColor: 0xc084fc,
    radius: 1.25,
  },
];

// Helper: Sinh Texture Hành Tinh Procedural Độ Phân Giải Cao (1024x512) trong RAM
function createPlanetTexture(type: "sun" | "venus" | "mars" | "jupiter" | "saturn" | "mercury"): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  if (type === "sun") {
    const grad = ctx.createLinearGradient(0, 0, 1024, 512);
    grad.addColorStop(0, "#0369a1");
    grad.addColorStop(0.3, "#0284c7");
    grad.addColorStop(0.6, "#38bdf8");
    grad.addColorStop(0.85, "#7dd3fc");
    grad.addColorStop(1, "#bae6fd");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    for (let i = 0; i < 70; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`;
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 60 + 15, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === "venus") {
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, "#fef3c7");
    grad.addColorStop(0.25, "#fde68a");
    grad.addColorStop(0.55, "#f59e0b");
    grad.addColorStop(0.8, "#d97706");
    grad.addColorStop(1, "#78350f");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    for (let y = 0; y < 512; y += 6) {
      ctx.fillStyle = `rgba(254, 243, 199, ${Math.random() * 0.35})`;
      ctx.fillRect(0, y, 1024, 3);
    }
  } else if (type === "mars") {
    const grad = ctx.createLinearGradient(0, 0, 1024, 512);
    grad.addColorStop(0, "#dc2626");
    grad.addColorStop(0.4, "#b91c1c");
    grad.addColorStop(0.7, "#991b1b");
    grad.addColorStop(1, "#450a0a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    for (let i = 0; i < 90; i++) {
      ctx.fillStyle = "rgba(40, 5, 5, 0.45)";
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 30 + 8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.fillRect(0, 0, 1024, 28);
    ctx.fillRect(0, 484, 1024, 28);
  } else if (type === "jupiter") {
    for (let y = 0; y < 512; y += 16) {
      const colors = ["#ffedd5", "#fed7aa", "#f97316", "#ea580c", "#c2410c", "#9a3412", "#7c2d12"];
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillRect(0, y, 1024, 16);
    }
    ctx.fillStyle = "rgba(153, 27, 27, 0.9)";
    ctx.beginPath();
    ctx.ellipse(650, 310, 85, 48, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(254, 215, 170, 0.6)";
    ctx.beginPath();
    ctx.ellipse(650, 310, 50, 26, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "saturn") {
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, "#fef9c3");
    grad.addColorStop(0.3, "#fef08a");
    grad.addColorStop(0.6, "#eab308");
    grad.addColorStop(0.85, "#ca8a04");
    grad.addColorStop(1, "#713f12");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    for (let y = 0; y < 512; y += 12) {
      ctx.fillStyle = `rgba(254, 240, 138, ${Math.random() * 0.25})`;
      ctx.fillRect(0, y, 1024, 6);
    }
  } else if (type === "mercury") {
    const grad = ctx.createLinearGradient(0, 0, 1024, 512);
    grad.addColorStop(0, "#e9d5ff");
    grad.addColorStop(0.3, "#c084fc");
    grad.addColorStop(0.6, "#9333ea");
    grad.addColorStop(0.85, "#6b21a8");
    grad.addColorStop(1, "#3b0764");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 25 + 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export default function CosmicGalaxy4D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trạng thái trạm & cơ chế Docking Arrival
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [isDocked, setIsDocked] = useState(true);
  const [approachingStation, setApproachingStation] = useState(COSMIC_STATIONS[0]);
  const [voyagePercent, setVoyagePercent] = useState(100);
  const [coords, setCoords] = useState({ x: "0.00", y: "3.80", z: "12.50" });
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const targetCamPos = useRef(new THREE.Vector3().copy(COSMIC_STATIONS[0].camPos));
  const currentCamPos = useRef(new THREE.Vector3().copy(COSMIC_STATIONS[0].camPos));
  const targetLookAt = useRef(new THREE.Vector3().copy(COSMIC_STATIONS[0].target));
  const currentLookAt = useRef(new THREE.Vector3().copy(COSMIC_STATIONS[0].target));
  const targetFov = useRef(COSMIC_STATIONS[0].fov);

  // Lắng nghe scroll chuột & Tính toán khoảng cách Docking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;

      const stationCount = COSMIC_STATIONS.length;
      const continuousIndex = progress * (stationCount - 1);
      const baseIndex = Math.min(Math.floor(continuousIndex), stationCount - 2);
      const nextIndex = Math.min(baseIndex + 1, stationCount - 1);
      const segmentProgress = continuousIndex - baseIndex;

      const p1 = COSMIC_STATIONS[baseIndex];
      const p2 = COSMIC_STATIONS[nextIndex];

      // Nội suy tọa độ camera và điểm nhìn
      targetCamPos.current.lerpVectors(p1.camPos, p2.camPos, segmentProgress);
      targetLookAt.current.lerpVectors(p1.target, p2.target, segmentProgress);
      targetFov.current = THREE.MathUtils.lerp(p1.fov, p2.fov, segmentProgress);

      // Điểm trạm gần nhất
      const nearestStationIndex = Math.round(continuousIndex);
      const distToNearest = Math.abs(continuousIndex - nearestStationIndex);

      // THUẬT TOÁN DOCKING ARRIVAL: Chỉ cập bến (isDocked = true) khi camera cách trạm <= 0.12 đơn vị tiến trình
      const arrived = distToNearest <= 0.12;
      setIsDocked(arrived);
      setActiveStationIndex(nearestStationIndex);

      // Đích đến khi đang bay
      const dest = segmentProgress < 0.5 ? COSMIC_STATIONS[baseIndex] : COSMIC_STATIONS[nextIndex];
      setApproachingStation(dest);

      // Tính phần trăm tiến trình hành trình du hành tới trạm đích
      const pct = segmentProgress < 0.5
        ? Math.round((1 - segmentProgress * 2) * 100)
        : Math.round(((segmentProgress - 0.5) * 2) * 100);
      setVoyagePercent(Math.min(Math.max(pct, 0), 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const flyToStation = (index: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = (index / (COSMIC_STATIONS.length - 1)) * maxScroll;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  // Khởi tạo Three.js Không Gian Vũ Trụ 4D
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060d, 0.012);

    const isMobile = window.innerWidth < 768;
    const initialFov = isMobile ? 65 : COSMIC_STATIONS[0].fov;

    const camera = new THREE.PerspectiveCamera(
      initialFov,
      window.innerWidth / window.innerHeight,
      0.1,
      1000 // Nâng Far Plane lên 1000 để chiêm ngưỡng không gian sâu
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

    // ==========================================
    // ÁNH SÁNG VŨ TRỤ (COSMIC LIGHTING)
    // ==========================================
    const ambient = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambient);

    // Nguồn sáng từ Sao Thái Dương tỏa sáng khắp hệ thiên hà
    const sunLight = new THREE.PointLight(0x38bdf8, 6.0, 160);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const cosmicRimLight = new THREE.DirectionalLight(0x818cf8, 1.6);
    cosmicRimLight.position.set(30, 45, 30);
    scene.add(cosmicRimLight);

    // ==========================================
    // 1. DẢI TINH HÀ SÂU & HẠT BỤI VŨ TRỤ (3,500 HẠT)
    // ==========================================
    // [A] Dải sao sâu vô tận (Distant Deep Starfield - 1,500 hạt)
    const deepStarCount = 1500;
    const deepStarGeo = new THREE.BufferGeometry();
    const deepStarPos = new Float32Array(deepStarCount * 3);
    for (let i = 0; i < deepStarCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 260 + 80;
      const sinPhi = Math.sin(phi);

      deepStarPos[i * 3] = r * sinPhi * Math.cos(theta);
      deepStarPos[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      deepStarPos[i * 3 + 2] = r * Math.cos(phi);
    }
    deepStarGeo.setAttribute("position", new THREE.BufferAttribute(deepStarPos, 3));
    const deepStarMat = new THREE.PointsMaterial({
      size: 0.8,
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
    });
    const deepStars = new THREE.Points(deepStarGeo, deepStarMat);
    scene.add(deepStars);

    // [B] Dải xoắn ốc tinh hà (Spiral Nebula Dust - 2,000 hạt)
    const galaxyCount = 2000;
    const galaxyGeo = new THREE.BufferGeometry();
    const galaxyPositions = new Float32Array(galaxyCount * 3);
    const galaxyColors = new Float32Array(galaxyCount * 3);

    const colCyan = new THREE.Color("#38bdf8");
    const colPurple = new THREE.Color("#a855f7");
    const colAmber = new THREE.Color("#f59e0b");

    for (let i = 0; i < galaxyCount; i++) {
      const radius = Math.random() * 85 + 2.0;
      const spinAngle = radius * 0.65;
      const branchAngle = ((i % 3) * (2 * Math.PI)) / 3;

      const randomX = (Math.random() - 0.5) * 4.5;
      const randomY = (Math.random() - 0.5) * 5.0;
      const randomZ = (Math.random() - 0.5) * 4.5;

      const i3 = i * 3;
      galaxyPositions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      galaxyPositions[i3 + 1] = randomY;
      galaxyPositions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = i % 3 === 0 ? colCyan : i % 3 === 1 ? colPurple : colAmber;
      galaxyColors[i3] = mixedColor.r;
      galaxyColors[i3 + 1] = mixedColor.g;
      galaxyColors[i3 + 2] = mixedColor.b;
    }

    galaxyGeo.setAttribute("position", new THREE.BufferAttribute(galaxyPositions, 3));
    galaxyGeo.setAttribute("color", new THREE.BufferAttribute(galaxyColors, 3));

    const galaxyMat = new THREE.PointsMaterial({
      size: 0.12,
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

    // Helper tạo hào quang khí quyển Fresnel Additive Blending
    const createAtmosphereHalo = (radius: number, colorHex: number, opacity: number = 0.35) => {
      const haloGeo = new THREE.SphereGeometry(radius * 1.18, 32, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      });
      return new THREE.Mesh(haloGeo, haloMat);
    };

    // [A] SAO THÁI DƯƠNG / STELLAR CORE (Tâm điểm: 0, 0, 0)
    const sunTex = createPlanetTexture("sun");
    const sunGeo = new THREE.SphereGeometry(2.2, 48, 48);
    const sunMat = new THREE.MeshStandardMaterial({
      map: sunTex,
      emissive: 0x0284c7,
      emissiveIntensity: 0.85,
      roughness: 0.15,
      metalness: 0.75,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.copy(COSMIC_STATIONS[0].meshPos);
    planetsGroup.add(sunMesh);

    // 2 Vành hào quang năng lượng đan chéo xoay ngược chiều
    const sunWireGeo1 = new THREE.IcosahedronGeometry(2.55, 2);
    const sunWireMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const sunWireMesh1 = new THREE.Mesh(sunWireGeo1, sunWireMat1);
    sunMesh.add(sunWireMesh1);

    const sunWireGeo2 = new THREE.IcosahedronGeometry(2.85, 1);
    const sunWireMat2 = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const sunWireMesh2 = new THREE.Mesh(sunWireGeo2, sunWireMat2);
    sunMesh.add(sunWireMesh2);

    const sunHalo = createAtmosphereHalo(2.2, 0x38bdf8, 0.45);
    sunMesh.add(sunHalo);

    // [B] SAO KIM (VENUS - Tọa độ: -16.0, 3.5, -8.0)
    const venusTex = createPlanetTexture("venus");
    const venusGeo = new THREE.SphereGeometry(1.25, 36, 36);
    const venusMat = new THREE.MeshStandardMaterial({
      map: venusTex,
      roughness: 0.45,
      metalness: 0.25,
    });
    const venusMesh = new THREE.Mesh(venusGeo, venusMat);
    venusMesh.position.copy(COSMIC_STATIONS[1].meshPos);
    planetsGroup.add(venusMesh);
    const venusHalo = createAtmosphereHalo(1.25, 0xfbbf24, 0.38);
    venusMesh.add(venusHalo);

    // [C] SAO HỎA (MARS - Tọa độ: 18.0, -3.0, 10.0)
    const marsTex = createPlanetTexture("mars");
    const marsGeo = new THREE.SphereGeometry(1.05, 36, 36);
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsTex,
      roughness: 0.75,
      metalness: 0.2,
    });
    const marsMesh = new THREE.Mesh(marsGeo, marsMat);
    marsMesh.position.copy(COSMIC_STATIONS[2].meshPos);
    planetsGroup.add(marsMesh);
    const marsHalo = createAtmosphereHalo(1.05, 0xf87171, 0.35);
    marsMesh.add(marsHalo);

    // Mặt trăng Phobos quay quanh Sao Hỏa
    const phobosGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const phobosMat = new THREE.MeshStandardMaterial({ color: 0xa8a29e, roughness: 0.9 });
    const phobosMesh = new THREE.Mesh(phobosGeo, phobosMat);
    marsMesh.add(phobosMesh);

    // [D] SAO MỘC (JUPITER - Tọa độ: -14.0, -12.0, 20.0)
    const jupiterTex = createPlanetTexture("jupiter");
    const jupiterGeo = new THREE.SphereGeometry(2.6, 48, 48);
    const jupiterMat = new THREE.MeshStandardMaterial({
      map: jupiterTex,
      roughness: 0.5,
      metalness: 0.15,
    });
    const jupiterMesh = new THREE.Mesh(jupiterGeo, jupiterMat);
    jupiterMesh.position.copy(COSMIC_STATIONS[3].meshPos);
    planetsGroup.add(jupiterMesh);
    const jupiterHalo = createAtmosphereHalo(2.6, 0xfb923c, 0.32);
    jupiterMesh.add(jupiterHalo);

    // Mặt trăng băng giá Europa quay quanh Sao Mộc
    const europaGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const europaMat = new THREE.MeshStandardMaterial({ color: 0xe0f2fe, roughness: 0.3 });
    const europaMesh = new THREE.Mesh(europaGeo, europaMat);
    jupiterMesh.add(europaMesh);

    // [E] SAO THỔ VÀ VÀNH ĐAI CASSINI (SATURN - Tọa độ: 22.0, 14.0, -16.0)
    const saturnTex = createPlanetTexture("saturn");
    const saturnGeo = new THREE.SphereGeometry(1.65, 40, 40);
    const saturnMat = new THREE.MeshStandardMaterial({
      map: saturnTex,
      roughness: 0.6,
      metalness: 0.2,
    });
    const saturnMesh = new THREE.Mesh(saturnGeo, saturnMat);
    saturnMesh.position.copy(COSMIC_STATIONS[4].meshPos);
    planetsGroup.add(saturnMesh);
    const saturnHalo = createAtmosphereHalo(1.65, 0xfacc15, 0.3);
    saturnMesh.add(saturnHalo);

    // Vành đai đôi phân cách rãnh Cassini
    const ringGroup = new THREE.Group();
    const ringGeoA = new THREE.RingGeometry(2.2, 3.2, 64);
    const ringMatA = new THREE.MeshBasicMaterial({
      color: 0xca8a04,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const ringMeshA = new THREE.Mesh(ringGeoA, ringMatA);
    ringGroup.add(ringMeshA);

    const ringGeoB = new THREE.RingGeometry(3.4, 4.4, 64);
    const ringMatB = new THREE.MeshBasicMaterial({
      color: 0xeab308,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55,
    });
    const ringMeshB = new THREE.Mesh(ringGeoB, ringMatB);
    ringGroup.add(ringMeshB);

    ringGroup.rotation.x = Math.PI / 2.3;
    ringGroup.rotation.y = Math.PI / 7;
    saturnMesh.add(ringGroup);

    // Mặt trăng Titan quay quanh Sao Thổ
    const titanGeo = new THREE.SphereGeometry(0.38, 16, 16);
    const titanMat = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.6 });
    const titanMesh = new THREE.Mesh(titanGeo, titanMat);
    saturnMesh.add(titanMesh);

    // [F] SAO THỦY & CỔNG WARP NEXUS (Tọa độ: 0, -4.0, 32.0)
    const mercuryTex = createPlanetTexture("mercury");
    const mercuryGeo = new THREE.SphereGeometry(1.25, 36, 36);
    const mercuryMat = new THREE.MeshStandardMaterial({
      map: mercuryTex,
      emissive: 0x6b21a8,
      emissiveIntensity: 0.65,
      roughness: 0.3,
      metalness: 0.8,
    });
    const mercuryMesh = new THREE.Mesh(mercuryGeo, mercuryMat);
    mercuryMesh.position.copy(COSMIC_STATIONS[5].meshPos);
    planetsGroup.add(mercuryMesh);
    const mercuryHalo = createAtmosphereHalo(1.25, 0xc084fc, 0.45);
    mercuryMesh.add(mercuryHalo);

    // 2 Vòng cổng Warp lượng tử xoay tròn
    const warpRingGeo1 = new THREE.TorusGeometry(2.1, 0.04, 16, 64);
    const warpRingMat1 = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.75 });
    const warpRing1 = new THREE.Mesh(warpRingGeo1, warpRingMat1);
    mercuryMesh.add(warpRing1);

    const warpRingGeo2 = new THREE.TorusGeometry(2.7, 0.035, 16, 64);
    const warpRingMat2 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const warpRing2 = new THREE.Mesh(warpRingGeo2, warpRingMat2);
    mercuryMesh.add(warpRing2);

    // ==========================================
    // 3. ĐƯỜNG BAY QUỸ ĐẠO KHÔNG GIAN (CATMULL-ROM FLIGHT PATH)
    // ==========================================
    const splinePoints = COSMIC_STATIONS.map((s) => s.meshPos);
    const flightCurve = new THREE.CatmullRomCurve3(splinePoints, false);
    const pathGeo = new THREE.BufferGeometry().setFromPoints(flightCurve.getPoints(240));
    const pathMat = new THREE.LineDashedMaterial({
      color: 0x38bdf8,
      dashSize: 1.5,
      gapSize: 0.8,
      transparent: true,
      opacity: 0.22,
    });
    const flightPathLine = new THREE.Line(pathGeo, pathMat);
    flightPathLine.computeLineDistances();
    scene.add(flightPathLine);

    // Parallax chuột nhẹ nhàng
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.7;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.7;
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
        galaxyPoints.rotation.y = time * 0.02;
        deepStars.rotation.y = -time * 0.005;

        sunMesh.rotation.y = time * 0.12;
        sunWireMesh1.rotation.y = -time * 0.18;
        sunWireMesh2.rotation.x = time * 0.15;

        venusMesh.rotation.y = time * 0.18;
        marsMesh.rotation.y = time * 0.22;
        jupiterMesh.rotation.y = time * 0.3;
        saturnMesh.rotation.y = time * 0.25;
        mercuryMesh.rotation.y = time * 0.2;

        warpRing1.rotation.x = time * 0.8;
        warpRing1.rotation.y = time * 0.5;
        warpRing2.rotation.y = -time * 0.7;
        warpRing2.rotation.z = time * 0.6;

        // Quỹ đạo của các mặt trăng vệ tinh
        phobosMesh.position.set(Math.cos(time * 0.9) * 2.0, Math.sin(time * 0.5) * 0.4, Math.sin(time * 0.9) * 2.0);
        europaMesh.position.set(Math.cos(time * 0.6) * 4.6, Math.cos(time * 0.4) * 0.8, Math.sin(time * 0.6) * 4.6);
        titanMesh.position.set(Math.cos(time * 0.45) * 5.8, Math.sin(time * 0.3) * 1.0, Math.sin(time * 0.45) * 5.8);

        // Nội suy Camera 60 FPS
        const lerpSpeed = Math.min(delta * 3.6, 0.18);
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

      // Giải phóng toàn diện Geometries & Materials & Textures
      sunGeo.dispose();
      sunMat.dispose();
      sunTex.dispose();
      sunWireGeo1.dispose();
      sunWireMat1.dispose();
      sunWireGeo2.dispose();
      sunWireMat2.dispose();

      venusGeo.dispose();
      venusMat.dispose();
      venusTex.dispose();

      marsGeo.dispose();
      marsMat.dispose();
      marsTex.dispose();
      phobosGeo.dispose();
      phobosMat.dispose();

      jupiterGeo.dispose();
      jupiterMat.dispose();
      jupiterTex.dispose();
      europaGeo.dispose();
      europaMat.dispose();

      saturnGeo.dispose();
      saturnMat.dispose();
      saturnTex.dispose();
      ringGeoA.dispose();
      ringMatA.dispose();
      ringGeoB.dispose();
      ringMatB.dispose();
      titanGeo.dispose();
      titanMat.dispose();

      mercuryGeo.dispose();
      mercuryMat.dispose();
      mercuryTex.dispose();
      warpRingGeo1.dispose();
      warpRingMat1.dispose();
      warpRingGeo2.dispose();
      warpRingMat2.dispose();

      galaxyGeo.dispose();
      galaxyMat.dispose();
      deepStarGeo.dispose();
      deepStarMat.dispose();
      pathGeo.dispose();
      pathMat.dispose();
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
          <span className={`w-2.5 h-2.5 rounded-full ${isDocked ? "bg-emerald-400 animate-ping" : "bg-sky-400 animate-pulse"}`} />
          <span className="text-xs font-mono font-bold text-white tracking-wide">
            {portfolioData.personal.nickname}.dev
          </span>
          <span className="text-slate-500">•</span>
          <span className={`text-[11px] font-mono font-bold ${activeStation.accent}`}>
            {isDocked ? `Đã Cập Bến: ${activeStation.planetName.split(" (")[0]}` : `Warp: ${approachingStation.planetName.split(" (")[0]}`}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 text-xs font-mono text-slate-400 shadow-lg">
          <Compass size={13} className="text-sky-400" />
          <span>TỌA ĐỘ VŨ TRỤ: <strong className="text-white">{coords.x}</strong>, <strong className="text-white">{coords.y}</strong>, <strong className="text-white">{coords.z}</strong></span>
          <span>•</span>
          <span className={isDocked ? "text-emerald-400 font-bold" : "text-sky-400 font-bold animate-pulse"}>
            {isDocked ? "ORBIT DOCKED" : "WARP SPEED 0.92c"}
          </span>
        </div>
      </header>

      {/* 3. RIGHT PLANETARY NAVIGATOR (BẤM ĐỂ FLY-TO HÀNH TINH) */}
      <aside
        aria-label="Thanh điều hướng hành tinh vũ trụ"
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5 pointer-events-auto"
      >
        {COSMIC_STATIONS.map((station, i) => {
          const isActive = activeStationIndex === i && isDocked;
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
        <div className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none p-4 sm:p-8 lg:p-12">
          <div className="w-full max-w-4xl mx-auto flex flex-col justify-center items-center">

            {/* [A] HUD DU HÀNH VŨ TRỤ (HIỂN THỊ KHI ĐANG BAY GIỮA CÁC HÀNH TINH) */}
            {!isDocked && (
              <div className="pointer-events-auto flex flex-col items-center justify-center text-center space-y-3.5 p-6 sm:p-8 rounded-3xl bg-slate-950/85 backdrop-blur-2xl border border-sky-500/40 shadow-[0_0_60px_rgba(56,189,248,0.25)] animate-fade-in max-w-md w-full">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-mono font-bold">
                  <Rocket size={13} className="animate-bounce" />
                  <span>WARP SPEED FLIGHT • 0.92c</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">Đang Du Hành Đến:</span>
                  <h3 className={`text-xl sm:text-2xl font-black font-mono ${approachingStation.accent}`}>
                    {approachingStation.planetName.split(" (")[0]}
                  </h3>
                  <p className="text-xs text-slate-300 font-mono">
                    {approachingStation.title} • {approachingStation.subtitle}
                  </p>
                </div>

                {/* Thanh tiến trình tiếp cận hành tinh */}
                <div className="w-full space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Tiến trình tiếp cận:</span>
                    <span className="text-sky-400 font-bold">{voyagePercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden border border-slate-700/50">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 via-indigo-400 to-purple-500 transition-all duration-150"
                      style={{ width: `${voyagePercent}%` }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  Lăn chuột chậm lại để camera cập bến quỹ đạo và mở thẻ nội dung
                </p>

                <button
                  onClick={() => flyToStation(Number(approachingStation.index) - 1)}
                  className="px-4 py-1.5 rounded-xl text-xs font-mono font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors shadow-md shadow-sky-500/20 cursor-pointer"
                >
                  Cập Bến Ngay Vào Quỹ Đạo →
                </button>
              </div>
            )}

            {/* [B] BẢNG NỘI DUNG CHI TIẾT (CHỈ HIỂN THỊ KHI ĐÃ CẬP BẾN - isDocked === true) */}
            {isDocked && (
              <div className="w-full max-w-4xl transition-all duration-500 ease-out transform scale-100 opacity-100">

                {/* TRẠM 1: SAO THÁI DƯƠNG - KTEE IDENTITY */}
                {activeStationIndex === 0 && (
                  <div className="pointer-events-auto card-glass bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-sky-500/40 shadow-2xl space-y-4 max-w-2xl mx-auto animate-fade-in">
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
                        {portfolioData.personal.title}
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
                  <div className="pointer-events-auto card-glass bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-2xl space-y-4 max-w-2xl mx-auto animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
                        <GraduationCap size={16} />
                        <span>Trạm 02 • Sao Kim (Venus) • {portfolioData.education[0].institution}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">{portfolioData.education[0].period}</span>
                    </div>

                    <h2 className="text-lg sm:text-2xl font-bold text-white">
                      {portfolioData.education[0].degree} ({portfolioData.education[0].duration})
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
                  <div className="pointer-events-auto card-glass bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-rose-500/40 shadow-2xl space-y-4 max-w-2xl mx-auto animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase">
                        <Briefcase size={16} />
                        <span>Trạm 03 • Sao Hỏa (Mars) • Thực Chiến FPT IS & Luklak</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400">Trọng Điểm</span>
                    </div>

                    <div className="space-y-3">
                      {portfolioData.experience.slice(0, 2).map((exp) => (
                        <div key={exp.id} className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                          <div className="flex items-center justify-between text-xs font-bold text-white">
                            <span>{exp.company} ({exp.period})</span>
                            <span className="font-mono text-emerald-400">{exp.role}</span>
                          </div>
                          <p className="text-xs text-slate-300">
                            {exp.description}
                          </p>
                        </div>
                      ))}
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

                {/* TRẠM 4: SAO MỘC - KHO 6 DỰ ÁN CÓ LOGO CÔNG NGHỆ */}
                {activeStationIndex === 3 && (
                  <div className="pointer-events-auto card-glass bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-orange-500/40 shadow-2xl space-y-4 max-w-3xl mx-auto animate-fade-in">
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

                            {/* Tags Công Nghệ Kèm Logo Rõ Ràng */}
                            <div className="flex flex-wrap gap-1.5 mt-2.5">
                              {p.techStack.slice(0, 3).map((t) => (
                                <span
                                  key={t}
                                  className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 border border-slate-700/70"
                                >
                                  <TechLogo name={t} size={12} />
                                  <span>{t}</span>
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px]">
                            <span className="font-mono text-emerald-400 font-bold">
                              {p.metrics[0]?.value} {p.metrics[0]?.label}
                            </span>
                            <Link href="/projects" className="text-orange-400 font-semibold text-[10px] hover:underline">
                              Chi tiết →
                            </Link>
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

                {/* TRẠM 5: SAO THỔ VÀ VÀNH ĐAI - KỸ NĂNG VỚI LOGO CÔNG NGHỆ VECTOR CHÍNH HÃNG */}
                {activeStationIndex === 4 && (
                  <div className="pointer-events-auto card-glass bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-4 max-w-2xl mx-auto animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
                        <Code2 size={16} />
                        <span>Trạm 05 • Sao Thổ (Saturn) • Kỹ Năng & Logo Công Nghệ</span>
                      </div>
                      <Link href="/skills" className="text-xs text-emerald-400 font-semibold hover:underline">
                        Xem tất cả kỹ năng →
                      </Link>
                    </div>

                    {/* Dải Tags Kỹ Năng Có Logo Chuẩn Sắc Nét */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        "ReactJS", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js",
                        "Node.js", "Express", "ASP.NET Core", "Supabase", "Redis Caching", "MongoDB", "MS SQL Server",
                        "Phân Tích Nghiệp Vụ BA", "UAT Testing (Jira)", "WordPress CMS", "VPS Linux & SSL", "AI Agents"
                      ].map((s) => (
                        <span
                          key={s}
                          className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-xl border transition-transform hover:scale-105 ${
                            s.includes("WordPress")
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold"
                              : "bg-slate-800/80 text-slate-200 border-slate-700/80"
                          }`}
                        >
                          <TechLogo name={s} size={15} />
                          <span>{s}</span>
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
                  <div className="pointer-events-auto card-glass bg-slate-900/95 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-purple-500/50 shadow-[0_0_60px_rgba(168,85,247,0.25)] space-y-5 max-w-2xl mx-auto animate-fade-in text-center sm:text-left">
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
                        href={portfolioData.personal.telegram || "https://t.me/kteenguyen"}
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
            )}

          </div>
        </div>
      </div>

      <CVDownloadModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </div>
  );
}
