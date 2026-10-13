import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] px-4 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-semibold mb-4">
        <span>404 • Trang Không Tìm Thấy</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-3">
        Không tìm thấy nội dung
      </h1>
      <p className="text-slate-600 text-sm md:text-base max-w-md mb-8">
        Trang bạn đang truy cập có thể đã được chuyển dời hoặc không tồn tại trong hệ thống Portfolio của Ktee.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Về Trang Chủ</span>
        </Link>
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Xem Kinh Nghiệm</span>
        </Link>
      </div>
    </div>
  );
}
