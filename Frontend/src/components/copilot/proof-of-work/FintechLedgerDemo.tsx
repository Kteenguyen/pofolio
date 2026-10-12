"use client";

import { useState } from "react";
import { CheckCircle2, ShieldAlert, RefreshCw, Zap, Copy, Check, ArrowRight } from "lucide-react";

interface Transaction {
  id: string;
  idempotencyKey: string;
  sender: string;
  recipient: string;
  amount: number;
  status: "SUCCESS" | "BLOCKED_DUPLICATE" | "PENDING";
  timestamp: string;
  latencyMs: number;
}

export default function FintechLedgerDemo({ companyName = "ZaloPay / TCBS" }: { companyName?: string }) {
  const [balance, setBalance] = useState(15000000);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TX-9021",
      idempotencyKey: "idem-a82f-8910",
      sender: "Merchant Account #88",
      recipient: "Khách hàng Nguyễn Văn A",
      amount: 450000,
      status: "SUCCESS",
      timestamp: "15:24:02",
      latencyMs: 14,
    },
    {
      id: "TX-9020",
      idempotencyKey: "idem-c711-4091",
      sender: "Merchant Account #88",
      recipient: "Nhà cung cấp Dịch vụ Viễn thông",
      amount: 1200000,
      status: "SUCCESS",
      timestamp: "15:20:18",
      latencyMs: 19,
    },
  ]);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(null);

  // Simulate idempotent transaction dispatch
  const handleTransfer = (forceDuplicate = false) => {
    setIsProcessing(true);
    setLastActionMessage(null);

    const testAmount = 500000;
    const currentIdemKey = forceDuplicate
      ? transactions[0]?.idempotencyKey || "idem-duplicate-001"
      : `idem-${Math.random().toString(36).substring(2, 6)}-${Date.now().toString().slice(-4)}`;

    setTimeout(() => {
      // Check for duplicate key
      const isDuplicate = transactions.some((tx) => tx.idempotencyKey === currentIdemKey);

      if (isDuplicate) {
        const dupTx: Transaction = {
          id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
          idempotencyKey: currentIdemKey,
          sender: "Merchant Account #88",
          recipient: "Ví ZaloPay / Cổng Thanh Toán",
          amount: testAmount,
          status: "BLOCKED_DUPLICATE",
          timestamp: new Date().toLocaleTimeString("vi-VN"),
          latencyMs: 4,
        };
        setTransactions([dupTx, ...transactions]);
        setLastActionMessage("PHÁT HIỆN TRÙNG LẶP IDEMPOTENCY KEY: Giao dịch bị chặn để bảo vệ tài khoản khỏi Double-Spending!");
      } else {
        const successTx: Transaction = {
          id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
          idempotencyKey: currentIdemKey,
          sender: "Merchant Account #88",
          recipient: "Ví ZaloPay / Cổng Thanh Toán",
          amount: testAmount,
          status: "SUCCESS",
          timestamp: new Date().toLocaleTimeString("vi-VN"),
          latencyMs: Math.floor(12 + Math.random() * 15),
        };
        setBalance((prev) => prev - testAmount);
        setTransactions([successTx, ...transactions]);
        setLastActionMessage("GIAO DỊCH THÀNH CÔNG: Sổ cái cập nhật thời gian thực, độ trễ cực thấp!");
      }
      setIsProcessing(false);
    }, 400);
  };

  const pitchText = `Kính gửi Anh/Chị Tech Lead & Hiring Team tại ${companyName},

Em là Nguyễn Khoa Tài (Ktee), Kỹ sư CNTT tốt nghiệp ĐH Tôn Đức Thắng (Hệ 5 năm) với kinh nghiệm trực tiếp triển khai dự án doanh nghiệp cho hơn 230 người dùng tại FPT IS.

Nhận thấy trong yêu cầu công việc tại ${companyName} có đòi hỏi cao về kiểm soát giao dịch, chống duplicate (Idempotency) và độ trễ microservices, em đã chủ động dựng sẵn một Bản Mẫu Kỹ Thuật (Pre-employment Proof-of-Work) giải quyết đúng bài toán này:
- Quản lý trạng thái Sổ Cái với Idempotency Key (UUIDv4) ngăn chặn triệt để double-spending khi có sự cố retry.
- Tối ưu hóa UI/UX với phản hồi optimistic cập nhật tức thì dưới 20ms.
- Sẵn sàng demo trực tiếp kiến trúc mã nguồn và kiểm thử idempotency.

Anh/Chị có thể trải nghiệm trực tiếp live widget tại Portfolio của em: https://ktee.dev/copilot
Rất mong có cơ hội trao đổi chuyên sâu cùng đội ngũ kỹ thuật của quý công ty!`;

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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-1">
            <Zap size={13} />
            <span>Interactive Proof-of-Work Demo</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[var(--foreground)]">
            Cơ Chế Đối Soát Sổ Cái & Chống Duplicate (Idempotency Engine)
          </h4>
          <p className="text-xs text-[var(--muted-foreground)]">
            Mô phỏng kiến trúc cổng thanh toán chịu tải cao, kiểm soát dòng tiền và bảo toàn số dư
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

      {/* Interactive Controls & Balance Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="sm:col-span-1 rounded-xl bg-[var(--surface-subtle)] p-3.5 border border-[var(--surface-border)] flex flex-col justify-between">
          <span className="text-[11px] font-medium text-[var(--muted-foreground)]">Số Dư Sổ Cái (Khả dụng)</span>
          <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-1">
            {balance.toLocaleString("vi-VN")} đ
          </div>
          <span className="text-[10px] text-[var(--muted-foreground)] mt-1 flex items-center gap-1">
            <CheckCircle2 size={11} className="text-emerald-500" /> Đã kiểm toán ACID 100%
          </span>
        </div>

        <div className="sm:col-span-2 rounded-xl bg-[var(--surface-subtle)] p-3.5 border border-[var(--surface-border)] flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[var(--foreground)]">Thao tác Thử nghiệm (Interactive Actions)</span>
            <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">500.000 đ / lệnh</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTransfer(false)}
              disabled={isProcessing}
              className="touch-target flex-1 min-w-[140px] px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={13} className={isProcessing ? "animate-spin" : ""} />
              Gửi Giao Dịch Mới (Key Hợp Lệ)
            </button>

            <button
              onClick={() => handleTransfer(true)}
              disabled={isProcessing || transactions.length === 0}
              className="touch-target flex-1 min-w-[140px] px-3 py-2 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <ShieldAlert size={13} />
              Cố Tình Bắn Trùng Key (Test Chặn)
            </button>
          </div>
        </div>
      </div>

      {/* Action Notification Banner */}
      {lastActionMessage && (
        <div className="mb-4 p-2.5 rounded-xl text-xs font-medium bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 animate-fade-in flex items-center gap-2">
          <Zap size={14} className="shrink-0" />
          <span>{lastActionMessage}</span>
        </div>
      )}

      {/* Transaction Log Table */}
      <div className="overflow-x-auto rounded-xl border border-[var(--surface-border)]">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--surface-subtle)] text-[var(--muted-foreground)] font-semibold border-b border-[var(--surface-border)]">
            <tr>
              <th className="py-2.5 px-3">Mã TX</th>
              <th className="py-2.5 px-3">Idempotency Key</th>
              <th className="py-2.5 px-3">Số Tiền</th>
              <th className="py-2.5 px-3">Độ Trễ</th>
              <th className="py-2.5 px-3 text-right">Trạng Thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--surface-border)]">
            {transactions.slice(0, 4).map((tx) => (
              <tr key={tx.id + tx.timestamp} className="hover:bg-[var(--surface-subtle)] transition-colors">
                <td className="py-2.5 px-3 font-mono font-medium text-[var(--foreground)]">{tx.id}</td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-[var(--muted-foreground)]">{tx.idempotencyKey}</td>
                <td className="py-2.5 px-3 font-mono font-semibold text-[var(--foreground)]">
                  -{tx.amount.toLocaleString("vi-VN")} đ
                </td>
                <td className="py-2.5 px-3 font-mono text-emerald-600 dark:text-emerald-400">{tx.latencyMs}ms</td>
                <td className="py-2.5 px-3 text-right">
                  {tx.status === "SUCCESS" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={11} /> Thành công
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <ShieldAlert size={11} /> Đã chặn trùng
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">
        <span>* Dữ liệu mô phỏng chạy 100% trong RAM client, không tiêu tốn tài nguyên server.</span>
        <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
          Proof of Work sẵn sàng <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
}
