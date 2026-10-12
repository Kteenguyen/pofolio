"use client";

import { useState } from "react";
import { ShoppingBag, Zap, Check, Copy, ArrowRight, Gauge, Tag, Plus, Minus, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  size: string;
  sku: string;
}

export default function EcommerceCheckoutDemo({ companyName = "Shopee / Coolmate" }: { companyName?: string }) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "prod-1",
      name: "Áo Polo Pima Cotton Breathable",
      price: 299000,
      qty: 2,
      size: "L (65-72kg)",
      sku: "POLO-PIMA-NAVY-L",
    },
    {
      id: "prod-2",
      name: "Quần Short Thể Thao Co Giãn 4 Chiều",
      price: 189000,
      qty: 1,
      size: "XL",
      sku: "SHORT-PRO-BLK-XL",
    },
  ]);
  const [couponCode, setCouponCode] = useState("MEGASALE20");
  const [discountApplied, setDiscountApplied] = useState(true);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const discountAmount = discountApplied ? Math.round(subtotal * 0.2) : 0;
  const shippingFee = subtotal > 300000 ? 0 : 25000;
  const total = subtotal - discountAmount + shippingFee;

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
    setActionNotice("Optimistic UI cập nhật tức thì 0ms, không re-render giật lag!");
    setTimeout(() => setActionNotice(null), 2000);
  };

  const pitchText = `Kính gửi Anh/Chị Frontend Tech Lead tại ${companyName},

Em là Nguyễn Khoa Tài (Ktee), Kỹ sư CNTT tốt nghiệp ĐH Tôn Đức Thắng (Hệ 5 năm) với chuyên môn sâu về Next.js, React 19 và tối ưu Core Web Vitals.

Đối với sản phẩm E-Commerce tại ${companyName}, trải nghiệm giỏ hàng và thanh toán đóng vai trò sống còn trong việc giảm tỷ lệ bỏ giỏ (Cart Abandonment Rate). Em đã chủ động xây dựng một Demo Mẫu (Proof of Work):
- Luồng Giỏ Hàng Cập Nhật Optimistic (Zero CLS - Cumulative Layout Shift = 0.00).
- Tốc độ phản hồi tương tác INP < 16ms, tính toán voucher và phí ship theo thời gian thực.
- Thiết kế chuẩn Responsive Mobile-First, Touch Target >= 44px không bẹp nút.

Anh/Chị có thể trải nghiệm trực tiếp live widget tại: https://ktee.dev/copilot
Em rất hào hứng được đóng góp năng lực tối ưu hóa này vào đội ngũ Core Tech của công ty!`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pitchText);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-4 sm:p-6 shadow-sm">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--surface-border)] pb-4 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-1">
            <Zap size={13} />
            <span>Interactive Proof-of-Work Demo</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[var(--foreground)]">
            Trải Nghiệm Giỏ Hàng Optimistic & Core Web Vitals HUD
          </h4>
          <p className="text-xs text-[var(--muted-foreground)]">
            Tối ưu hóa hành trình mua sắm cho E-commerce: Zero Layout Shift, phản hồi INP 14ms
          </p>
        </div>

        {/* Pitch Button */}
        <button
          onClick={copyToClipboard}
          className="touch-target px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 transition-colors shadow-sm ml-auto"
        >
          {copiedPitch ? <Check size={14} className="text-white" /> : <Copy size={14} />}
          <span>{copiedPitch ? "Đã Copy Thư Giới Thiệu!" : "Copy Thư Pitch Cho Tech Lead"}</span>
        </button>
      </div>

      {/* Core Web Vitals HUD Banner */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
        <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <span className="block text-[10px] sm:text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
            LCP (Tải khối chính)
          </span>
          <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">0.68s</span>
          <span className="block text-[9px] text-emerald-600/80">Chuẩn xanh &lt; 2.5s</span>
        </div>

        <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <span className="block text-[10px] sm:text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
            INP (Tương tác nút)
          </span>
          <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">14ms</span>
          <span className="block text-[9px] text-emerald-600/80">Chuẩn xanh &lt; 200ms</span>
        </div>

        <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <span className="block text-[10px] sm:text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
            CLS (Độ xê dịch layout)
          </span>
          <span className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">0.00</span>
          <span className="block text-[9px] text-emerald-600/80">Tuyệt đối không lệch</span>
        </div>
      </div>

      {actionNotice && (
        <div className="mb-4 p-2.5 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-2">
          <Zap size={14} className="shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Main Cart & Checkout Sandbox */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cart Item List */}
        <div className="md:col-span-2 space-y-2.5">
          <span className="text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5">
            <ShoppingBag size={14} className="text-blue-600" /> Danh sách sản phẩm trong giỏ ({items.length})
          </span>

          {items.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-[var(--surface-subtle)] border border-[var(--surface-border)] flex items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <h5 className="text-xs font-semibold text-[var(--foreground)] truncate">{item.name}</h5>
                <div className="text-[11px] text-[var(--muted-foreground)] flex items-center gap-2 mt-0.5">
                  <span>Size: {item.size}</span>
                  <span>•</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-medium">
                    {item.price.toLocaleString("vi-VN")} đ
                  </span>
                </div>
              </div>

              {/* Quantity Changer */}
              <div className="flex items-center gap-1.5 bg-[var(--surface)] border border-[var(--surface-border)] rounded-lg p-1">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="touch-target w-7 h-7 rounded flex items-center justify-center text-[var(--muted-foreground)] hover:text-red-500 transition-colors"
                  aria-label="Giảm số lượng"
                >
                  {item.qty === 1 ? <Trash2 size={13} /> : <Minus size={13} />}
                </button>
                <span className="w-6 text-center text-xs font-bold font-mono text-[var(--foreground)]">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="touch-target w-7 h-7 rounded flex items-center justify-center text-[var(--muted-foreground)] hover:text-blue-600 transition-colors"
                  aria-label="Tăng số lượng"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="p-6 text-center text-xs text-[var(--muted-foreground)] rounded-xl border border-dashed border-[var(--surface-border)]">
              Giỏ hàng trống. Bấm nút Reset để khôi phục dữ liệu mẫu!
            </div>
          )}
        </div>

        {/* Order Summary & Coupon */}
        <div className="md:col-span-1 rounded-xl bg-[var(--surface-subtle)] p-3.5 border border-[var(--surface-border)] flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[var(--foreground)] block mb-3">Tóm Tắt Đơn Hàng</span>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[var(--muted-foreground)]">
                <span>Tạm tính:</span>
                <span className="font-mono font-medium text-[var(--foreground)]">
                  {subtotal.toLocaleString("vi-VN")} đ
                </span>
              </div>

              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span className="flex items-center gap-1">
                  <Tag size={12} /> Giảm giá (20%):
                </span>
                <span className="font-mono font-semibold">-{discountAmount.toLocaleString("vi-VN")} đ</span>
              </div>

              <div className="flex justify-between text-[var(--muted-foreground)]">
                <span>Phí vận chuyển:</span>
                <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  {shippingFee === 0 ? "Freeship" : `${shippingFee.toLocaleString("vi-VN")} đ`}
                </span>
              </div>

              <div className="border-t border-[var(--surface-border)] pt-2 mt-2 flex justify-between font-bold text-sm text-[var(--foreground)]">
                <span>Tổng cộng:</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">{total.toLocaleString("vi-VN")} đ</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => {
                setActionNotice("Đặt hàng thành công với phản hồi Optimistic 0ms!");
                setTimeout(() => setActionNotice(null), 2500);
              }}
              disabled={items.length === 0}
              className="touch-target w-full py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
            >
              <span>Tiến Hành Thanh Toán</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
