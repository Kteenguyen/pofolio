"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import {
  portfolioData,
  portfolioDataVi,
  portfolioDataEn,
  PortfolioDataStructure,
} from "@/data/portfolioData";

export type Locale = "vi" | "en";

export interface UiDictionary {
  // Navigation
  navOverview: string;
  navEducation: string;
  navExperience: string;
  navProjects: string;
  navSkills: string;
  navContact: string;

  // Header & Drawer
  inviteInterview: string;
  inviteInterview15s: string;
  downloadCv: string;
  downloadCv4Versions: string;
  leaveContact: string;
  menuOpen: string;
  menuClose: string;
  langSection: string;
  connectSection: string;

  // Hero Section
  heroBadgeDegree: string;
  heroBadgeUni: string;
  heroHeadlinePrefix: string;
  heroHeadlineSuffix: string;
  heroBadgePowertech: string;
  heroBadgeFpt: string;
  heroBadgeHomenest: string;
  heroCtaProjects: string;
  heroCtaCv: string;
  heroShortcutExp: string;
  heroShortcutEdu: string;
  heroShortcutContact: string;

  // About Section
  aboutBadge: string;
  aboutTitle: string;
  aboutDesc: string;
  aboutEvidence: string;
  aboutCommitmentTitle: string;
  aboutCommitmentDesc: string;
  aboutViewExpBtn: string;

  // Education Section
  eduBadge: string;
  eduTitle: string;
  eduDesc: string;
  eduScoreHeader: string;
  eduHighlightsHeader: string;
  eduCertHeader: string;

  // Experience Section
  expBadge: string;
  expTitle: string;
  expDesc: string;
  expViewGrid: string;
  expViewTimeline: string;
  expFilterAll: string;
  expFilterEnterprise: string;
  expFilterEducation: string;
  expOrderLabel: string;
  expOrderAsc: string;
  expOrderDesc: string;
  expTrackerTitle: string;
  expTrackerHint: string;
  expFieldEvidence: string;
  expPhotosCount: string;
  expAchievementsHeader: string;
  expSkillsHeader: string;

  // Projects Section
  projBadge: string;
  projTitle: string;
  projDesc: string;
  projCatAll: string;
  projCatWeb: string;
  projCatBackend: string;
  projCatBA: string;
  projVercelDemo: string;
  projLiveDemo: string;
  projPhotos: string;
  projBizDetails: string;
  projArchAnalysis: string;
  projCode: string;
  projCodePending: string;
  projectsBadge: string;
  projectsTitle: string;
  projectsDesc: string;
  projectsFilterAll: string;
  projectsFilterFullstack: string;
  projectsFilterBackend: string;
  projectsFilterBA: string;
  projectsLiveDemo: string;
  projectsGithubCode: string;
  projectsViewDetails: string;

  // Project Modal
  modalClose: string;
  modalContextChallenge: string;
  modalSolution: string;
  modalImpact: string;
  modalTechStack: string;
  modalLiveDemo: string;
  modalGithubCode: string;
  modalPhotoOf: string;

  // Skills Section
  skillsBadge: string;
  skillsTitle: string;
  skillsDesc: string;

  // Contact Section
  contactBadge: string;
  contactTitle: string;
  contactDesc: string;
  contactPhoneLabel: string;
  contactEmailLabel: string;
  contactLocationLabel: string;
  contactLocationType: string;
  contactStatusLabel: string;
  contactCopy: string;
  contactCopied: string;
  contactDirectPhone: string;
  contactDirectEmail: string;
  contactSuccessTitle: string;
  contactSuccessDesc: string;
  contactSendAnother: string;
  contactFormHeading: string;
  contactFormLead: string;
  contactFormName: string;
  contactFormNamePh: string;
  contactFormEmail: string;
  contactFormPhone: string;
  contactFormMsg: string;
  contactFormMsgPh: string;
  contactFormMessage: string;
  contactFormSubmit: string;
  contactFormSending: string;
  contactFormSubmitting: string;
  contactFormSuccess: string;
  contactFormSuccessDesc: string;
  contactFormAnother: string;

  // Footer & Mobile Dock
  footerEngineer: string;
  footerCrafted: string;
  footerRights: string;
  footerBackToTop: string;
  dockLeaveContact: string;
  dockInterview: string;
  dockInterviewSubtitle: string;
  dockDownloadCv: string;
  dockPhoneTitle: string;
  dockPhoneNumber: string;
  dockInterviewTitle: string;
  dockCvTooltip: string;

  // CV Download Modal
  cvModalTitle: string;
  cvModalSubtitle: string;
  closeModal: string;
  cvDownloadBtn: string;

  // Experience Modal & Lightbox
  expFptLightboxTitle: string;
  expFptCaption1: string;
  expFptCaption2: string;
  expKeyAchievements: string;

  // Interview Modal
  interviewTitle: string;
  interviewTabInterview: string;
  interviewTabPhone: string;
  interviewSubmitBtn: string;
  interviewSubmitPhoneBtn: string;
}

export const uiDictionaries: Record<Locale, UiDictionary> = {
  vi: {
    navOverview: "Tổng Quan",
    navEducation: "Học Vấn",
    navExperience: "Kinh Nghiệm",
    navProjects: "Dự Án",
    navSkills: "Kỹ Năng",
    navContact: "Liên Hệ",

    inviteInterview: "Mời Phỏng Vấn",
    inviteInterview15s: "Mời Phỏng Vấn (Form 15 Giây)",
    downloadCv: "Tải CV",
    downloadCv4Versions: "Tải Hồ Sơ CV (PDF 4 Phiên Bản)",
    leaveContact: "Để Lại Số Liên Lạc (Hotline: 0852.723.945)",
    menuOpen: "Mở menu điều hướng",
    menuClose: "Đóng menu điều hướng",
    langSection: "NGÔN NGỮ / LANGUAGE",
    connectSection: "KẾT NỐI TUYỂN DỤNG VÀ PHỎNG VẤN",

    heroBadgeDegree: "Cử Nhân Kỹ Thuật Phần Mềm",
    heroBadgeUni: "ĐH Tôn Đức Thắng",
    heroHeadlinePrefix: "Nền tảng Kỹ thuật bài bản,",
    heroHeadlineSuffix: "Kiến tạo giải pháp phần mềm thực chiến.",
    heroBadgePowertech: "PowerTech Next.js 15 (PageSpeed 96)",
    heroBadgeFpt: "FPT IS (10/25–02/26 • 230+ Cán Bộ)",
    heroBadgeHomenest: "HomeNest BA (03–06/2026)",
    heroCtaProjects: "Khám Phá Kho Dự Án",
    heroCtaCv: "Tải Hồ Sơ CV (PDF)",
    heroShortcutExp: "Line Kinh Nghiệm",
    heroShortcutEdu: "Học Vấn 5 Năm",
    heroShortcutContact: "Liên Hệ",

    aboutBadge: "// VỀ TÔI VÀ TƯ DUY NGHỀ NGHIỆP",
    aboutTitle: "Nền Tảng 5 Năm Học Thuật và Bản Lĩnh Thực Địa",
    aboutDesc: "Hành trình 5 năm đại học tại ĐH Tôn Đức Thắng đã rèn luyện cho tôi tư duy giải quyết vấn đề bằng kiến trúc khoa học máy tính chuẩn mực, kết hợp cùng trải nghiệm trực tiếp làm việc với hơn 230 người dùng cuối tại FPT IS.",
    aboutEvidence: "Năng lực thực tế có chứng cứ",
    aboutCommitmentTitle: "Cam kết chất lượng: Code chuẩn, Thấu hiểu nghiệp vụ và Triển khai bền bỉ",
    aboutCommitmentDesc: "Được chứng thực qua kết quả nghiệm thu thành công hệ thống Thi Hành Án Dân Sự tại FPT IS và sản phẩm thương hiệu Luklak với 7 trang web responsive hoàn hảo.",
    aboutViewExpBtn: "Xem Chi Tiết Kinh Nghiệm FPT và Luklak →",

    eduBadge: "// HỌC THUẬT VÀ NỀN TẢNG ĐÀO TẠO 5 NĂM",
    eduTitle: "Chương Trình Đào Tạo Kỹ Sư Tại ĐH Tôn Đức Thắng",
    eduDesc: "Hành trình 5 năm toàn thời gian (2021 – 2026) trang bị tư duy toán học, thuật toán sâu sắc và năng lực làm chủ công nghệ từ tầng gốc rễ.",
    eduScoreHeader: "// ĐIỂM SỐ CÁC MÔN CHUYÊN NGÀNH CỐT LÕI (BẢNG ĐIỂM CHỨNG THỰC):",
    eduHighlightsHeader: "// ĐẶC THÙ CHƯƠNG TRÌNH VÀ KẾT QUẢ ĐÀO TẠO:",
    eduCertHeader: "Chứng Nhận Năng Lực và Đồ Án Kỹ Thuật:",

    expBadge: "// BẢN ĐỒ KINH NGHIỆM THỰC CHIẾN MASTER CV",
    expTitle: "Hành Trình Kỹ Sư và Kinh Nghiệm Triển Khai",
    expDesc: "Đồng bộ hóa 100% từ hồ sơ CV Master: Hành trình phát triển thực chiến từ nền tảng Kỹ sư 5 năm ĐH Tôn Đức Thắng đến các hệ thống chuyển đổi số doanh nghiệp, triển khai UAT thực tế và đào tạo 230+ cán bộ.",
    expViewGrid: "Lưới 3 Cột",
    expViewTimeline: "Dòng Thời Gian",
    expFilterAll: "Tất cả",
    expFilterEnterprise: "Doanh nghiệp",
    expFilterEducation: "Học vấn",
    expOrderLabel: "Thứ tự:",
    expOrderAsc: "2021 → Nay",
    expOrderDesc: "Nay → 2021",
    expTrackerTitle: "Thanh Line Tiến Trình Kinh Nghiệm (Chronological Milestone Tracker)",
    expTrackerHint: "Nhấp mốc để chuyển tới chi tiết thẻ",
    expFieldEvidence: "Minh Chứng Hiện Trường",
    expPhotosCount: "Ảnh",
    expAchievementsHeader: "// KẾT QUẢ VÀ ĐÓNG GÓP THỰC TẾ:",
    expSkillsHeader: "// KỸ NĂNG VÀ CÔNG NGHỆ ỨNG DỤNG:",

    projBadge: "// DANH MỤC KHO DỰ ÁN THỰC CHIẾN VÀ NGHIỆP VỤ",
    projTitle: "Kho Dự Án Kỹ Thuật Đã Triển Khai",
    projDesc: "Tất cả dự án được chuẩn hóa theo mô hình CAR (Bối cảnh -> Giải pháp -> Kết quả) với kiến trúc kỹ thuật thực chiến.",
    projCatAll: "Tất cả",
    projCatWeb: "Full-Stack và Web",
    projCatBackend: "Backend và CSDL",
    projCatBA: "Phân Tích BA và Nghiệp Vụ",
    projVercelDemo: "Vercel Demo",
    projLiveDemo: "Live Web",
    projPhotos: "Ảnh",
    projBizDetails: "Nghiệp vụ chi tiết",
    projArchAnalysis: "Phân Tích Kiến Trúc",
    projCode: "Mã Nguồn",
    projCodePending: "Mã Nguồn Nội Bộ",

    projectsBadge: "// DANH MỤC KHO DỰ ÁN THỰC CHIẾN VÀ NGHIỆP VỤ",
    projectsTitle: "Kho Dự Án Kỹ Thuật Đã Triển Khai",
    projectsDesc: "Tất cả dự án được chuẩn hóa theo mô hình CAR (Bối cảnh -> Giải pháp -> Kết quả) với kiến trúc kỹ thuật thực chiến.",
    projectsFilterAll: "Tất cả",
    projectsFilterFullstack: "Full-Stack và Web",
    projectsFilterBackend: "Backend và CSDL",
    projectsFilterBA: "Phân Tích BA và Nghiệp Vụ",
    projectsLiveDemo: "Live Demo",
    projectsGithubCode: "Mã Nguồn GitHub",
    projectsViewDetails: "Xem Chi Tiết CAR",

    modalClose: "Đóng cửa sổ chi tiết dự án",
    modalContextChallenge: "Bối Cảnh và Thách Thức Nghiệp Vụ (Context và Thách Thức):",
    modalSolution: "Giải Pháp Kỹ Thuật và Kiến Trúc (Architecture Solution):",
    modalImpact: "Kết Quả và Giá Trị Thực Tế Đạt Được (Measurable Impact):",
    modalTechStack: "Công Nghệ và Kỹ Thuật Cốt Lõi Sử Dụng:",
    modalLiveDemo: "Xem Demo Trực Tiếp:",
    modalGithubCode: "Mã Nguồn GitHub:",
    modalPhotoOf: "Ảnh",

    skillsBadge: "// NĂNG LỰC KỸ THUẬT VÀ NGHIỆP VỤ",
    skillsTitle: "Khung Công Nghệ và Kỹ Năng Chuyên Môn",
    skillsDesc: "Sự phối hợp toàn diện giữa kỹ năng lập trình Full-Stack (React/Next.js, Node.js, C#), tư duy phân tích nghiệp vụ BA và năng lực triển khai thực tế.",

    contactBadge: "// THÔNG TIN LIÊN HỆ VÀ GỬI LỜI MỜI",
    contactTitle: "Kết Nối Trực Tiếp Với Kỹ Sư Ktee",
    contactDesc: "Sẵn sàng trao đổi về các vị trí Software Engineer (Full-Stack, Front-End, Back-End), dự án chuyển đổi số hoặc vai trò Business Analyst.",
    contactPhoneLabel: "// SỐ ĐIỆN THOẠI TRỰC TIẾP",
    contactEmailLabel: "// ĐỊA CHỈ EMAIL CÁ NHÂN",
    contactLocationLabel: "Địa bàn làm việc:",
    contactLocationType: "(On-site / Hybrid / Remote)",
    contactStatusLabel: "Trạng thái tuyển dụng:",
    contactCopy: "Sao Chép",
    contactCopied: "Đã Chép",
    contactDirectPhone: "// SỐ ĐIỆN THOẠI TRỰC TIẾP",
    contactDirectEmail: "// ĐỊA CHỈ EMAIL CÁ NHÂN",
    contactSuccessTitle: "Gửi tin nhắn thành công!",
    contactSuccessDesc: "Tin nhắn của bạn đã được lưu vào hệ thống CMS. Ktee sẽ liên hệ lại với bạn sớm nhất.",
    contactSendAnother: "Gửi tin nhắn khác",
    contactFormHeading: "Gửi Tin Nhắn / Lời Mời Phỏng Vấn Tới Ktee",
    contactFormLead: "Tin nhắn của bạn sẽ được chuyển trực tiếp tới hộp thư của Ktee và được phản hồi trong vòng 24 giờ.",
    contactFormName: "Họ và tên của bạn / Công ty tuyển dụng:",
    contactFormNamePh: "Nguyễn Văn A / Công ty ABC...",
    contactFormEmail: "Email nhận phản hồi:",
    contactFormPhone: "Số điện thoại (tùy chọn):",
    contactFormMsg: "Nội dung trao đổi / Lời mời phỏng vấn:",
    contactFormMsgPh: "Mô tả ngắn gọn vị trí công việc, dự án hoặc yêu cầu phỏng vấn...",
    contactFormMessage: "Nội dung trao đổi / Lời mời phỏng vấn:",
    contactFormSubmit: "Gửi Trực Tiếp Đến Ktee và Lưu Vào CMS",
    contactFormSending: "Đang gửi dữ liệu...",
    contactFormSubmitting: "Đang gửi dữ liệu...",
    contactFormSuccess: "Gửi tin nhắn thành công!",
    contactFormSuccessDesc: "Tin nhắn của bạn đã được lưu vào hệ thống CMS. Ktee sẽ liên hệ lại với bạn sớm nhất.",
    contactFormAnother: "Gửi tin nhắn khác",

    footerEngineer: "Kỹ Sư Thực Chiến",
    footerCrafted: "Kỹ Sư Thực Chiến",
    footerRights: "Bản quyền thuộc về",
    footerBackToTop: "Lên đầu trang",
    dockLeaveContact: "Để Lại Số",
    dockInterview: "Mời Phỏng Vấn",
    dockInterviewSubtitle: "Form 15s • Ưu tiên",
    dockDownloadCv: "Tải CV Kỹ Sư (PDF)",
    dockPhoneTitle: "Để Lại Số",
    dockPhoneNumber: "0852.723.945",
    dockInterviewTitle: "Mời Phỏng Vấn",
    dockCvTooltip: "Tải CV Kỹ Sư (PDF)",

    cvModalTitle: "Tải Hồ Sơ Năng Lực và CV",
    cvModalSubtitle: "Chọn phiên bản CV phù hợp với nhu cầu tuyển dụng",
    closeModal: "Đóng cửa sổ",
    cvDownloadBtn: "Tải Xuống",

    expFptLightboxTitle: "Minh Chứng Hiện Trường - Dự Án Thi Hành Án Dân Sự (FPT IS)",
    expFptCaption1: "Hình ảnh thực tế đứng lớp tổ chức 15 buổi đào tạo (Training) cho hơn 230 cán bộ và người dùng cuối tại Cơ quan Thi Hành Án Dân Sự.",
    expFptCaption2: "Hình ảnh thực tế triển khai go-live, cài đặt phần mềm, cấu hình chứng thư số và hoàn thiện biên bản nghiệm thu tại hiện trường.",
    expKeyAchievements: "// KẾT QUẢ VÀ ĐÓNG GÓP THỰC TẾ:",

    interviewTitle: "Mời Phỏng Vấn Nhanh Trong 15 Giây",
    interviewTabInterview: "Mời Phỏng Vấn (15s)",
    interviewTabPhone: "Để Lại Số Điện Thoại",
    interviewSubmitBtn: "Gửi Lời Mời Phỏng Vấn",
    interviewSubmitPhoneBtn: "Gửi Số Điện Thoại",
  },

  en: {
    navOverview: "Overview",
    navEducation: "Education",
    navExperience: "Experience",
    navProjects: "Projects",
    navSkills: "Skills",
    navContact: "Contact",

    inviteInterview: "Interview Invite",
    inviteInterview15s: "Interview Invite (15-Sec Form)",
    downloadCv: "Resume PDF",
    downloadCv4Versions: "Download Resume (PDF 4 Editions)",
    leaveContact: "Leave Contact Info (Hotline: 0852.723.945)",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    langSection: "LANGUAGE / NGÔN NGỮ",
    connectSection: "TALENT RECRUITMENT & INTERVIEW",

    heroBadgeDegree: "Software Engineering Bachelor",
    heroBadgeUni: "Ton Duc Thang Univ",
    heroHeadlinePrefix: "Rigorous Engineering Foundation,",
    heroHeadlineSuffix: "Crafting Battle-Tested Digital Solutions.",
    heroBadgePowertech: "PowerTech Next.js 15 (PageSpeed 96)",
    heroBadgeFpt: "FPT IS (10/25–02/26 • 230+ Officers)",
    heroBadgeHomenest: "HomeNest BA (03–06/2026)",
    heroCtaProjects: "Explore Projects Vault",
    heroCtaCv: "Download Resume (PDF)",
    heroShortcutExp: "Experience Line",
    heroShortcutEdu: "5-Year Degree",
    heroShortcutContact: "Contact",

    aboutBadge: "// ABOUT ME & ENGINEERING PHILOSOPHY",
    aboutTitle: "5-Year Academic Foundation & Battle-Tested Field Acumen",
    aboutDesc: "A 5-year curriculum at Ton Duc Thang University cultivated rigorous computer science architectural thinking, compounded with direct field delivery for over 230 enterprise users at FPT IS.",
    aboutEvidence: "Verifiable Empirical Evidence",
    aboutCommitmentTitle: "Quality Commitment: Clean Code, Domain Mastery & Resilient Delivery",
    aboutCommitmentDesc: "Proven through successful production go-live of the Civil Enforcement Suite at FPT IS and Luklak's 7-page responsive brand platform.",
    aboutViewExpBtn: "View FPT & Luklak Details →",

    eduBadge: "// 5-YEAR ACADEMIC RIGOR & DEGREE",
    eduTitle: "Software Engineering Degree at Ton Duc Thang University",
    eduDesc: "A 5-year full-time curriculum (2021 – 2026) cultivating deep algorithm thinking and bottom-up technology mastery.",
    eduScoreHeader: "// CORE MAJOR COURSEWORK SCORES (VERIFIED TRANSCRIPT):",
    eduHighlightsHeader: "// PROGRAM HIGHLIGHTS & DEGREE OUTCOMES:",
    eduCertHeader: "Technical Certifications & Capstone Projects:",

    expBadge: "// MASTER CV BATTLE-TESTED CAREER MAP",
    expTitle: "Engineering Journey & Implementation Track Record",
    expDesc: "100% synchronized with Master CV: Evolution from 5-year Software Engineering training to enterprise digital transformation, UAT QA testing, and training 230+ officers.",
    expViewGrid: "3-Col Grid",
    expViewTimeline: "Timeline View",
    expFilterAll: "All",
    expFilterEnterprise: "Enterprise",
    expFilterEducation: "Education",
    expOrderLabel: "Order:",
    expOrderAsc: "2021 → Present",
    expOrderDesc: "Present → 2021",
    expTrackerTitle: "Chronological Milestone Tracker Line",
    expTrackerHint: "Click milestone to jump to card details",
    expFieldEvidence: "Field Evidence",
    expPhotosCount: "Photos",
    expAchievementsHeader: "// DELIVERABLES & MEASURABLE IMPACT:",
    expSkillsHeader: "// APPLIED TECH STACK & METHODOLOGY:",

    projBadge: "// PRODUCTION & ENTERPRISE PROJECT VAULT",
    projTitle: "Deployed Technical Project Portfolio",
    projDesc: "All projects strictly adhere to the CAR framework (Context -> Action -> Result) with real-world technical architecture.",
    projCatAll: "All",
    projCatWeb: "Full-Stack & Web",
    projCatBackend: "Backend & Databases",
    projCatBA: "BA Analysis & Enterprise",
    projVercelDemo: "Vercel Live",
    projLiveDemo: "Live Demo",
    projPhotos: "Photos",
    projBizDetails: "Enterprise System",
    projArchAnalysis: "Architecture Breakdown",
    projCode: "Source Code",
    projCodePending: "Internal Enterprise Code",

    projectsBadge: "// PRODUCTION & ENTERPRISE PROJECT VAULT",
    projectsTitle: "Deployed Technical Project Portfolio",
    projectsDesc: "All projects strictly adhere to the CAR framework (Context -> Action -> Result) with real-world technical architecture.",
    projectsFilterAll: "All",
    projectsFilterFullstack: "Full-Stack & Web",
    projectsFilterBackend: "Backend & Databases",
    projectsFilterBA: "BA Analysis & Enterprise",
    projectsLiveDemo: "Live Demo",
    projectsGithubCode: "GitHub Source",
    projectsViewDetails: "View CAR Details",

    modalClose: "Close project details modal",
    modalContextChallenge: "Context & Business Challenge:",
    modalSolution: "Technical & Architectural Solution:",
    modalImpact: "Measurable Impact & Key Deliverables:",
    modalTechStack: "Core Technologies & Tools Applied:",
    modalLiveDemo: "Live Demo Preview:",
    modalGithubCode: "GitHub Source Code:",
    modalPhotoOf: "Photo",

    skillsBadge: "// TECHNICAL MASTERY & DOMAIN ACUMEN",
    skillsTitle: "Core Engineering Framework & Competencies",
    skillsDesc: "Comprehensive synergy across Full-Stack coding (React/Next.js, Node.js, C#), Business Analysis (BA) discovery, and production rollout.",

    contactBadge: "// CONTACT INFORMATION & INQUIRY",
    contactTitle: "Connect Directly With Software Engineer Ktee",
    contactDesc: "Open for discussions regarding Software Engineer roles (Full-Stack, Front-End, Back-End), digital transformation initiatives, or Business Analyst positions.",
    contactPhoneLabel: "// DIRECT PHONE NUMBER",
    contactEmailLabel: "// PERSONAL EMAIL ADDRESS",
    contactLocationLabel: "Work location:",
    contactLocationType: "(On-site / Hybrid / Remote)",
    contactStatusLabel: "Recruitment status:",
    contactCopy: "Copy",
    contactCopied: "Copied!",
    contactDirectPhone: "// DIRECT PHONE NUMBER",
    contactDirectEmail: "// PERSONAL EMAIL ADDRESS",
    contactSuccessTitle: "Message Sent Successfully!",
    contactSuccessDesc: "Your message has been safely recorded in CMS. Ktee will reach back out promptly.",
    contactSendAnother: "Send another message",
    contactFormHeading: "Send Message / Interview Invitation to Ktee",
    contactFormLead: "Your message will be sent directly to Ktee's inbox and responded to within 24 hours.",
    contactFormName: "Your Full Name / Hiring Company:",
    contactFormNamePh: "John Doe / Acme Corp...",
    contactFormEmail: "Response Email:",
    contactFormPhone: "Phone Number (optional):",
    contactFormMsg: "Discussion Details / Interview Invitation:",
    contactFormMsgPh: "Brief description of job role, project, or interview details...",
    contactFormMessage: "Discussion Details / Interview Invitation:",
    contactFormSubmit: "Send Directly to Ktee & Save to CMS",
    contactFormSending: "Transmitting data...",
    contactFormSubmitting: "Transmitting data...",
    contactFormSuccess: "Message Sent Successfully!",
    contactFormSuccessDesc: "Your message has been safely recorded in CMS. Ktee will reach back out promptly.",
    contactFormAnother: "Send another message",

    footerEngineer: "Battle-Tested Engineer",
    footerCrafted: "Battle-Tested Engineer",
    footerRights: "All rights reserved by",
    footerBackToTop: "Back to top",
    dockLeaveContact: "Leave Phone",
    dockInterview: "Interview Invite",
    dockInterviewSubtitle: "15s Form • Priority",
    dockDownloadCv: "Download Resume (PDF)",
    dockPhoneTitle: "Leave Phone",
    dockPhoneNumber: "0852.723.945",
    dockInterviewTitle: "Interview Invite",
    dockCvTooltip: "Download Resume (PDF)",

    cvModalTitle: "Download Resume & Technical Profile",
    cvModalSubtitle: "Select the CV edition matching your hiring requirements",
    closeModal: "Close modal",
    cvDownloadBtn: "Download",

    expFptLightboxTitle: "Field Evidence - Civil Judgment Enforcement System (FPT IS)",
    expFptCaption1: "Hands-on training sessions delivered for 230+ officers across 15 workshops.",
    expFptCaption2: "Live field rollout, digital signature configuration, and acceptance protocol sign-off.",
    expKeyAchievements: "// KEY DELIVERABLES & MEASURABLE IMPACT:",

    interviewTitle: "Fast 15-Second Interview Request",
    interviewTabInterview: "Interview Invite (15s)",
    interviewTabPhone: "Leave Phone Number",
    interviewSubmitBtn: "Submit Interview Invitation",
    interviewSubmitPhoneBtn: "Submit Phone Number",
  },
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string, fallback?: string) => string;
  data: PortfolioDataStructure;
  ui: UiDictionary;
}

const STORAGE_KEY = "ktee_portfolio_locale";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("vi");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === "vi" || saved === "en") {
        setLocaleState(saved);
        if (typeof document !== "undefined") {
          document.documentElement.lang = saved;
        }
      }
    } catch {
      // Che do an danh
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // Ngoai le ghi
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLocale;
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("portfolio_language_change", { detail: { locale: newLocale } })
      );
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "vi" ? "en" : "vi");
  };

  const ui = useMemo<UiDictionary>(() => {
    return uiDictionaries[locale] || uiDictionaries.vi;
  }, [locale]);

  const data = useMemo<PortfolioDataStructure>(() => {
    return locale === "en" ? portfolioDataEn : portfolioDataVi;
  }, [locale]);

  const t = (key: string, fallback?: string): string => {
    const dict = ui as unknown as Record<string, string>;
    if (dict && dict[key]) {
      return dict[key];
    }
    return fallback !== undefined ? fallback : key;
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t,
      data,
      ui,
    }),
    [locale, data, ui]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      locale: "vi",
      setLocale: () => {},
      toggleLocale: () => {},
      t: (key: string, fallback?: string) => fallback !== undefined ? fallback : key,
      data: portfolioDataVi || portfolioData,
      ui: uiDictionaries.vi,
    };
  }
  return context;
}
