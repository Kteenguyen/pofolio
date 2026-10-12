"use client";

import React, { useEffect, useRef } from "react";

/**
 * CreativeSculpture4D
 * Khối điêu khắc hình học Titanium 4D hiệu năng cao dành cho Ktee Portfolio.
 * 
 * Tuân thủ 100% chỉ thị từ Mobile UX Architect:
 * - pointer-events: none trên Mobile (Không bao giờ bẫy ngón tay cuộn trang)
 * - Khống chế DPR <= 1.5 (Chống quá nhiệt chip & bảo vệ pin)
 * - Tự động dừng render loop khi tab ẩn hoặc ngoài viewport (Battery-conscious)
 */
export default function CreativeSculpture4D({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let angleX = 0.4;
    let angleY = 0.2;
    let targetAngleX = 0.4;
    let targetAngleY = 0.2;

    // 1. Tối ưu DPR <= 1.5 chống nóng máy
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    // 2. Định nghĩa các đỉnh 3D của khối đa giác Icosahedron / Octahedron kép
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices: [number, number, number][] = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    // Chuẩn hóa bán kính
    const vertices = rawVertices.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [x / len, y / len, z / len] as [number, number, number];
    });

    // Các cạnh nối đa giác
    const edges: [number, number][] = [
      [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
      [1, 5], [1, 7], [1, 8], [1, 9],
      [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
      [3, 4], [3, 6], [3, 8], [3, 9],
      [4, 5], [4, 9], [4, 11],
      [5, 9], [5, 11],
      [6, 7], [6, 8], [6, 10],
      [7, 8], [7, 10],
      [8, 9], [10, 11]
    ];

    // Tương tác chuột nhẹ nhàng trên Desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Không can thiệp mobile
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetAngleY = x * 1.5;
      targetAngleX = -y * 1.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 3. Tối ưu pin: Dừng render khi ngoài viewport hoặc tab ẩn
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 4. Render loop 60fps tối ưu
    const render = () => {
      if (isVisible) {
        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        ctx.clearRect(0, 0, width, height);

        // Tự xoay mượt mà
        targetAngleY += 0.004;
        targetAngleX += 0.002;
        angleX += (targetAngleX - angleX) * 0.08;
        angleY += (targetAngleY - angleY) * 0.08;

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);

        const cx = width / 2;
        const cy = height / 2;
        const scale = Math.min(width, height) * 0.38;

        // Xoay và chiếu phối cảnh (Perspective projection)
        const projected = vertices.map(([x, y, z]) => {
          // Xoay Y
          const x1 = x * cosY - z * sinY;
          const z1 = z * cosY + x * sinY;
          // Xoay X
          const y2 = y * cosX - z1 * sinX;
          const z2 = z1 * cosX + y * sinX;

          const distance = 2.8;
          const fov = 1 / (distance - z2 * 0.5);
          return {
            px: cx + x1 * scale * fov,
            py: cy + y2 * scale * fov,
            depth: z2
          };
        });

        const isDark = document.documentElement.classList.contains("dark");
        const edgeBaseColor = isDark ? "rgba(56, 189, 248, " : "rgba(37, 99, 235, ";
        const nodeColor = isDark ? "#38bdf8" : "#2563eb";

        // Vẽ các cạnh wireframe với độ sáng theo chiều sâu
        edges.forEach(([i, j]) => {
          const p1 = projected[i];
          const p2 = projected[j];
          const avgDepth = (p1.depth + p2.depth) / 2;
          const alpha = Math.max(0.12, Math.min(0.85, (avgDepth + 1) * 0.45));

          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.strokeStyle = `${edgeBaseColor}${alpha})`;
          ctx.lineWidth = avgDepth > 0 ? 1.4 : 0.8;
          ctx.stroke();
        });

        // Vẽ các nút điểm phát quang (Nodes)
        projected.forEach((p) => {
          const radius = p.depth > 0 ? 3 : 1.8;
          ctx.beginPath();
          ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.shadowColor = nodeColor;
          ctx.shadowBlur = p.depth > 0 ? 8 : 0;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full block"
        style={{ touchAction: "pan-y" }}
      />
    </div>
  );
}
