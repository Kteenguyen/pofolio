import type { Metadata } from "next";

// Cấu hình SEO: Khóa chỉ mục search engine (noindex, nofollow) cho route nội bộ Copilot
export const metadata: Metadata = {
  title: "Ktee Workspace • AI Career Copilot (Nội Bộ)",
  description: "Không gian tác nghiệp tuyển dụng nội bộ: Quét JD Realtime, So khớp CV, Gap Analysis và Proof-of-Work.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CopilotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
