import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@/styles/ux-desktop.css";
import "@/styles/ux-tablet.css";
import "@/styles/ux-mobile.css";
import "@/styles/copilot.css";
import FloatingThumbDock from "@/components/FloatingThumbDock";

export const metadata: Metadata = {
  title: "Nguyễn Khoa Tài (Ktee) | Cử Nhân Chuyên Ngành Kỹ Thuật Phần Mềm • ĐH Tôn Đức Thắng",
  description:
    "Hồ sơ năng lực kỹ thuật của Cử nhân chuyên ngành Kỹ Thuật Phần Mềm tốt nghiệp Đại học Tôn Đức Thắng (GPA: 3.0 / 4.0). Kinh nghiệm thực chiến Full-Stack React/Next.js 15, AI Agent Workflow, Node.js, tư duy BA sắc bén và trực tiếp triển khai hệ thống cho 230 người dùng tại FPT IS.",
  keywords: [
    "Nguyễn Khoa Tài",
    "Ktee",
    "Kteenguyen",
    "Software Engineer",
    "Full-Stack Developer",
    "Đại học Tôn Đức Thắng",
    "FPT IS",
    "Luklak",
    "ReactJS",
    "Next.js 15",
    "TypeScript",
    "Node.js",
    "ASP.NET Core",
    "Business Analyst",
  ],
  authors: [{ name: "Nguyễn Khoa Tài (Ktee)", url: "mailto:nguyenkhoatai2003@email.com" }],
  creator: "Nguyễn Khoa Tài (Ktee)",
  openGraph: {
    title: "Nguyễn Khoa Tài (Ktee) | Full-Stack Software Engineer • ĐH Tôn Đức Thắng",
    description: "Nền tảng Kỹ thuật 5 năm bài bản kết hợp năng lực thực chiến FPT IS & Luklak.",
    type: "website",
    locale: "vi_VN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="antialiased selection:bg-blue-600 selection:text-white bg-[var(--background)] text-[var(--foreground)] pb-20 md:pb-0">
        {children}
        <FloatingThumbDock />
      </body>
    </html>
  );
}
