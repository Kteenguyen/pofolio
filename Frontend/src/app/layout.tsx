import type { Metadata, Viewport } from "next";
import "./globals.css";
import FloatingThumbDock from "@/components/FloatingThumbDock";

export const metadata: Metadata = {
  title: "Nguyễn Khoa Tài (Ktee) | Full-Stack Software Engineer • ĐH Tôn Đức Thắng (2021 – 2026)",
  description:
    "Hồ sơ năng lực kỹ thuật của Kỹ sư Công nghệ Thông tin tốt nghiệp 5 năm tại Đại học Tôn Đức Thắng. Kinh nghiệm thực chiến Full-Stack React/Next.js, Node.js, ASP.NET Core, tư duy BA sắc bén và trực tiếp triển khai hệ thống cho 230 người dùng tại FPT IS.",
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
