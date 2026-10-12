# TÀI LIỆU PROMPT CHỤP ẢNH SHOWCASE WEBSITE 360 ĐỘ (3D ISOMETRIC ECOSYSTEM)

Tài liệu này lưu trữ nguyên văn và chuẩn hóa mẫu prompt tạo hình ảnh **Showcase 360 độ cho Website / Sản phẩm số** dùng cho các chiến dịch Marketing, Hero Visual, Pitch Deck và Portfolio của Kỹ sư Nguyễn Khoa Tài (Ktee).

---

## 1. Thông Tin Subagent & Skill Đã Đăng Ký Trong Hệ Thống

- **Subagent Name**: `web_showcase_photographer` (Sẵn sàng kích hoạt qua `invoke_subagent`)
- **Global Skill**: `web-showcase-photographer` (Lưu tại `/Users/mac/.gemini/config/skills/web-showcase-photographer/SKILL.md`)
- **Tỉ lệ khung hình (Aspect Ratio)**: `16:9` (Ultra-wide horizontal hero image)
- **Góc nhìn (Perspective)**: 3D Isometric, góc nghiêng 25° – 35°
- **Tông màu chủ đạo**: Deep navy & midnight-purple background, cyan / electric blue / violet accents, soft teal illumination.

---

## 2. Nguyên Văn Master Prompt

```text
Create a premium, ultra-realistic **360-degree website showcase presentation** for [BRAND NAME], a professional [BUSINESS INDUSTRY] company. The image should look like a high-end digital agency portfolio hero visual, showcasing the entire digital ecosystem of a modern website in an immersive 3D isometric composition.

**1. Overall Composition & Perspective**
Create a wide landscape composition with a cinematic 3D isometric perspective, viewed from an elevated diagonal angle of approximately 25–35 degrees. Present multiple floating website interface panels arranged in a carefully layered, interconnected spatial composition, creating the impression of exploring a complete website from every angle. The design should feel like a premium website ecosystem displayed in a sophisticated digital showroom, rather than a flat website screenshot.

**2. Main Website — Hero Showcase**
Position the primary desktop website interface prominently on the left side, occupying approximately 50–60% of the composition. Display a large, slightly tilted browser window with realistic browser chrome, navigation bar, logo, hero headline, supporting copy, CTA buttons, and high-quality visual content relevant to the business.

The main website must be the visual focal point, with crisp typography, sophisticated spacing, polished UI components, and realistic web design details. Use a dark premium background within the website interface, complemented by subtle gradients, elegant lighting, and restrained accent colors.

**3. Complete Website Ecosystem**
Surround the primary website with multiple floating interface panels at different depths and angles, including:
* A mobile website interface displayed on realistic smartphone mockups.
* A business dashboard with charts, analytics, statistics, and data visualization.
* A secondary light-themed website section showcasing services and product features.
* A website template gallery featuring multiple miniature website previews.
* Additional floating UI cards presenting key services, customer benefits, business metrics, or product features.
* Smaller interface panels suggesting other pages of the same website, such as services, portfolio, case studies, and contact sections.

All interface elements should visually belong to the same brand and design system, creating a cohesive, comprehensive website overview.

**4. 3D Rendering & Depth**
Use a sophisticated combination of isometric perspective, realistic screen materials, layered floating panels, subtle extrusion, soft ambient occlusion, physically plausible reflections, and cinematic depth of field. Panels should overlap naturally, with believable perspective, consistent light direction, realistic shadows, and clear foreground, midground, and background separation.

The screens should appear to float above a deep, seamless background, with subtle rim lighting and elegant luminous edges. Maintain excellent legibility and avoid excessive perspective distortion.

**5. Visual Style & Color Palette**
Premium digital agency aesthetic, modern SaaS design language, enterprise-grade UI, futuristic but professional, minimalist luxury, clean geometry, refined gradients, polished glass-like surfaces, and balanced visual hierarchy.

Use a deep navy and midnight-purple background, with subtle cyan, electric blue, and violet accents. Introduce soft teal illumination and controlled magenta highlights to add visual depth without overwhelming the interfaces.

The overall image should communicate technological expertise, reliability, creativity, product quality, and professional credibility.

**6. Realism & Brand Credibility**
Use highly realistic desktop monitors or browser frames and modern smartphone mockups. Every visible screen should contain plausible, coherent website UI rather than random abstract graphics. Include realistic interface layouts, recognizable navigation structures, properly aligned cards, meaningful dashboard visualizations, and consistent typography.

The composition should feel like a real website created by an experienced UI/UX and web development team, presented through professional 3D art direction.

**7. Lighting & Rendering Quality**
Use cinematic studio lighting, soft directional illumination, subtle cyan and violet bounce light, realistic contact shadows, global illumination, ambient occlusion, physically based materials, and premium product-rendering quality.

Ultra-detailed, sharp focus on the primary website and important secondary panels, high dynamic range, clean edges, realistic screen contrast, professional color grading, high resolution, premium commercial advertising quality.

**8. Layout & Output**
Aspect ratio 16:9, ultra-wide horizontal hero image, optimized for a modern business website hero section. Keep the primary interface concentrated on the left and center, with secondary website panels extending toward the right and background. Preserve a clear visual hierarchy and generous negative space where needed for website text overlays.

The final image should look like a premium 3D website ecosystem showcase created by a world-class digital design studio.

**Negative prompt:** flat 2D collage, ordinary website screenshot, cluttered layout, random floating objects, excessive neon, oversaturated colors, illegible text, distorted UI, broken smartphone proportions, warped browser frames, inconsistent perspective, unrealistic shadows, excessive blur, low resolution, pixelation, watermarks, unwanted logos, duplicated devices, chaotic composition, cartoon style, cheap stock graphics.
```

---

## 3. Các Biến Số Cần Thay Thế (Variables)

1. `[BRAND NAME]`: Tên thương hiệu / trang web (Ví dụ: `Ktee Portfolio`, `GlobalCode`, `Luklak Enterprise`, `ZaloPay Merchant Portal`).
2. `[BUSINESS INDUSTRY]`: Ngành nghề kinh doanh (Ví dụ: `Full-Stack Software Engineering & Next.js Architecture`, `Digital Agency & Web Development`, `B2B Enterprise SaaS`).

---

## 4. Cách Lệnh Cho Agent

Khi cần chụp/render ảnh:
> *"Hãy dùng agent chụp ảnh web để tạo ảnh showcase 360 độ cho website [Tên Website] ngành [Ngành Nghề]"*

Agent sẽ tự động điền các tham số, gọi subagent `web_showcase_photographer` hoặc công cụ `generate_image` với tỉ lệ 16:9 và trả về kết quả chuẩn studio.
