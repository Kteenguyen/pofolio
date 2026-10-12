# QUY TẮC PHÁT TRIỂN DỰ ÁN PORTFOLIO (PROJECT-SPECIFIC DIRECTIVES)

Tài liệu quy định các nguyên tắc bất khả xâm phạm dành riêng cho dự án Portfolio & CMS của Kỹ sư Nguyễn Khoa Tài (Ktee).

---

## 1. Kiến Trúc Phải Clean (Clean Architecture & Separation of Concerns)
- **Cấu trúc Monorepo 2 tầng độc lập**:
  - `Frontend/`: Next.js 15 App Router, TypeScript Strict Mode, Tailwind CSS, Mobile First, phân routes đàng hoàng.
  - `Backend/`: Node.js / Express CMS Server, RESTful API phân tầng (Routes -> Controllers -> Services -> Storage), kèm Admin Dashboard quản trị.
- **Không trộn lẫn trách nhiệm**:
  - Giao diện và logic tách biệt.
  - Dữ liệu quản trị động (Leads, Dự án, Links, Hình ảnh) được điều khiển tập trung qua Backend CMS API.
- **Clean Code & Type Safety**:
  - `npx tsc --noEmit` đạt 0 lỗi.
  - Loại bỏ hoàn toàn inline styles cứng, quản lý styling tập trung qua CSS chuyên dụng và Design Tokens.

---

## 2. Nội Dung Phải Thuyết Phục (Compelling Content - HR / Recruiter Mindset)
- **Mật độ thông tin cao (High Information Density)**:
  - Khung nhìn 1 frame đầu tiên phải truyền tải trọn vẹn giá trị cốt lõi (Executive Bento Hub): Bằng Kỹ sư 5 năm ĐH Tôn Đức Thắng, 4 điểm môn học ấn tượng, thành tích FPT IS 230 cán bộ & sản phẩm Luklak 7 trang.
- **Tuyệt đối KHÔNG Fallback / Không Bịa Đặt (Zero Mock Fluff)**:
  - Chỉ sử dụng 100% dữ liệu có chứng cứ từ 5 bản CV gốc (`Front-end.pdf`, `BA.pdf`, `Tester_en.pdf`, `Heldesk_VI.pdf`, `SEO.pdf`).
  - Các trường dữ liệu chưa có link thật (như ảnh demo, GitHub repo cụ thể) phải gắn nhãn rõ ràng: `[Vui lòng bổ sung trong CRM]` kèm trạng thái chờ cập nhật từ Backend CMS.

---

## 3. Mobile First (Chuẩn Mực Thiết Kế Cho Thiết Bị Di Động)
- **Tối ưu hóa toàn diện cho Mobile iPhone 14 Pro Max (430x932)**:
  - Chiều rộng cuộn: `scrollWidth <= 430px`, tuyệt đối 0 phần tử tràn viền (`overflowCount = 0`).
  - Touch target tối thiểu: `>= 44px` cho tất cả nút bấm, thẻ liên kết, ô nhập liệu.
  - Spacing nhỏ gọn, không để khoảng trắng vô nghĩa (Dead space).
  - Thanh điều hướng Mobile Drawer và Tabs trượt ngang mượt mà (Swipeable / Sticky Segmented Bar).

---

## 4. Git Deployment (Cập Nhật Thẳng Lên Nhánh Main)
- **Remote Repository**: `https://github.com/Kteenguyen/pofolio.git`
- **Branch**: `main` (Cập nhật trực tiếp lên nhánh `main` theo chỉ đạo của Sếp).
- **Author**: `Ktee <nguyenkhoatai2003@gmail.com>`.
