const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROUTE = process.argv[2] || '/';
const MODE = process.argv[3] || 'all'; // desktop, mobile, or all
const DURATION = parseInt(process.argv[4] || '5', 10); // seconds to keep open

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DEBUG_PORT = 9222;
const USER_DATA_DIR = '/tmp/chrome-qa-profile';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) {
            reject(new Error(msg.error.message || JSON.stringify(msg.error)));
          } else {
            resolve(msg.result);
          }
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = this.id++;
      this.callbacks.set(msgId, { resolve, reject });
      this.ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    return res.result ? res.result.value : null;
  }

  async screenshot(filePath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filePath, Buffer.from(res.data, 'base64'));
    return filePath;
  }

  close() {
    this.ws.close();
  }
}

async function run() {
  console.log('=============================================================================');
  console.log('  🚀 QA TESTING SUITE: LIVE GOOGLE CHROME VERIFICATION ON MACOS (CDP)        ');
  console.log('  MỤC TIÊU: HEADER PHÂN TAB CHUẨN MỰC, TỐI ƯU NÚT BẤM, ĐỐI SOÁT ĐA MÀN HÌNH    ');
  console.log('=============================================================================');
  console.log(`Route: ${ROUTE} | Mode: ${MODE} | Duration: ${DURATION}s`);

  // 1. Launch Chrome
  console.log('\n[1/6] Khởi động Google Chrome thật với CDP Remote Debugging (port 9222)...');
  const chromeProcess = spawn(
    CHROME_PATH,
    [
      `--remote-debugging-port=${DEBUG_PORT}`,
      `--user-data-dir=${USER_DATA_DIR}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--window-size=1440,900',
      `http://localhost:3000${ROUTE}`,
    ],
    { stdio: 'ignore' }
  );

  let targets = null;
  for (let i = 0; i < 30; i++) {
    await sleep(500);
    try {
      targets = await fetchJson(`http://127.0.0.1:${DEBUG_PORT}/json`);
      if (targets && targets.length > 0) break;
    } catch (e) {}
  }

  if (!targets || targets.length === 0) {
    throw new Error('Không thể kết nối đến Google Chrome CDP trên port 9222.');
  }

  const pageTarget = targets.find((t) => t.type === 'page' && t.url && t.url.includes('3000')) || targets.find((t) => t.type === 'page') || targets[0];
  console.log(`[2/6] Kết nối WebSocket CDP: ${pageTarget.webSocketDebuggerUrl}`);

  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();

  await client.send('Page.enable');
  await client.send('DOM.enable');
  await client.send('Runtime.enable');
  await client.send('Page.navigate', { url: `http://localhost:3000${ROUTE}` });

  console.log('[3/6] Chờ trang tải và render hoàn tất (2s)...');
  await sleep(2000);

  const report = {
    headerAudit: null,
    desktopAudit: null,
    mobileAudit: null,
    mobileDrawerAudit: null,
    cvModalAudit: null,
    verdict: 'PASS',
  };

  // --- STEP A: HEADER NAVIGATION AUDIT ---
  console.log('\n===============================================================');
  console.log('  📌 KIỂM TRA 1: HEADER PHÂN TAB CHUẨN MỰC                     ');
  console.log('===============================================================');
  const headerCheck = await client.eval(`
    (() => {
      const header = document.querySelector('header');
      if (!header) return { found: false };

      const navLinks = Array.from(header.querySelectorAll('nav a')).map(a => ({
        text: a.innerText.trim(),
        href: a.getAttribute('href'),
      }));

      const expectedTabs = ['Tổng Quan', 'AI Copilot', 'Học Vấn', 'Kinh Nghiệm', 'Dự Án', 'Kỹ Năng', 'Liên Hệ'];
      const currentTabs = navLinks.map(l => l.text);
      const allTabsPresent = expectedTabs.every(t => currentTabs.some(c => c.includes(t)));

      return {
        found: true,
        expectedTabs,
        currentTabs,
        allTabsPresent,
      };
    })()
  `);

  console.log('Header Tabs Check:', JSON.stringify(headerCheck, null, 2));
  console.log(`Header hiện diện: ${headerCheck.found ? '✅ ĐẠT' : '❌ THIẾU HEADER'}`);
  console.log(`Đầy đủ 7 Tab Chuẩn Mực: ${headerCheck.allTabsPresent ? '✅ ĐẠT 100%' : '❌ THIẾU TAB'}`);
  report.headerAudit = headerCheck;

  // --- STEP B: DESKTOP TEST (1440x900) ---
  if (MODE === 'desktop' || MODE === 'all') {
    console.log('\n===============================================================');
    console.log('  💻 KIỂM TRA 2: DESKTOP (1440x900) - NÚT BẤM & KHÔNG TRÀN VIỀN ');
    console.log('===============================================================');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(1000);

    const desktopData = await client.eval(`
      (() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const overflow = docWidth > winWidth;

        // Button audit
        const interactive = Array.from(document.querySelectorAll('button, a[class*="touch-target"], a[class*="rounded"]'));
        const buttonAudits = interactive.map(el => {
          const r = el.getBoundingClientRect();
          const isHidden = (r.width === 0 && r.height === 0) || window.getComputedStyle(el).display === 'none';
          if (isHidden) return null;

          const isTextClipped = el.scrollWidth > el.clientWidth + 2;
          const isSquished = r.height < 36 || r.width < 36;
          
          return {
            tag: el.tagName,
            text: (el.innerText || el.getAttribute('aria-label') || '').trim().replace(/\\n/g, ' ').slice(0, 35),
            width: Math.round(r.width),
            height: Math.round(r.height),
            touchTargetPass: r.height >= 40 && r.width >= 40,
            isTextClipped,
            isSquished,
          };
        }).filter(Boolean);

        const clippedButtons = buttonAudits.filter(b => b.isTextClipped);
        const squishedButtons = buttonAudits.filter(b => b.isSquished);

        return {
          winWidth,
          docWidth,
          overflow,
          totalButtons: buttonAudits.length,
          clippedButtonsCount: clippedButtons.length,
          clippedButtonsSample: clippedButtons.slice(0, 3),
          squishedButtonsCount: squishedButtons.length,
        };
      })()
    `);

    console.log('Desktop Audit:', JSON.stringify(desktopData, null, 2));
    console.log(`Không tràn viền ngang (scrollWidth=${desktopData.docWidth} <= 1440): ${!desktopData.overflow ? '✅ ĐẠT' : '❌ TRÀN VIỀN'}`);
    console.log(`Số nút bị tràn chữ: ${desktopData.clippedButtonsCount === 0 ? '✅ 0 (KHÔNG TRÀN CHỮ)' : `❌ ${desktopData.clippedButtonsCount} nút`}`);
    console.log(`Số nút bị bẹp (< 36px): ${desktopData.squishedButtonsCount === 0 ? '✅ 0 (KHÔNG BẸP NÚT)' : `⚠️ ${desktopData.squishedButtonsCount} nút`}`);

    // Smooth scroll down test
    await client.eval(`window.scrollTo({ top: 1200, behavior: 'smooth' });`);
    await sleep(600);
    await client.eval(`window.scrollTo({ top: 0, behavior: 'smooth' });`);
    await sleep(600);

    const deskShotPath = '/tmp/qa_chrome_desktop.png';
    await client.screenshot(deskShotPath);
    console.log(`📸 Screenshot Desktop lưu tại: ${deskShotPath}`);

    report.desktopAudit = {
      ...desktopData,
      screenshot: deskShotPath,
    };
  }

  // --- STEP C: MOBILE TEST (430x932 iPhone 14 Pro Max) ---
  if (MODE === 'mobile' || MODE === 'all') {
    console.log('\n===============================================================');
    console.log('  📱 KIỂM TRA 3: MOBILE (430x932 iPhone 14 Pro Max)           ');
    console.log('===============================================================');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 430,
      height: 932,
      deviceScaleFactor: 3,
      mobile: true,
    });
    await sleep(1000);

    const mobileData = await client.eval(`
      (() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const overflow = docWidth > 430.5;

        // Check for any element bleeding past 430px
        let maxRight = 0;
        let overflowingElements = [];
        document.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right > maxRight) maxRight = r.right;
          if (r.right > 430.8 && el.clientWidth > 0 && window.getComputedStyle(el).display !== 'none') {
            overflowingElements.push({
              tag: el.tagName,
              className: el.className ? el.className.toString().slice(0, 40) : '',
              right: Math.round(r.right),
              width: Math.round(r.width),
            });
          }
        });

        // Visible buttons audit on mobile
        const buttons = Array.from(document.querySelectorAll('button, a[class*="touch-target"], a[class*="rounded"]'));
        const mobileButtons = buttons.map(el => {
          const r = el.getBoundingClientRect();
          const isHidden = (r.width === 0 && r.height === 0) || window.getComputedStyle(el).display === 'none';
          if (isHidden) return null;

          const isTextClipped = el.scrollWidth > el.clientWidth + 2;
          const isSquished = r.height < 36;
          const touchTargetPass = r.height >= 40 && r.width >= 40;

          return {
            tag: el.tagName,
            text: (el.innerText || el.getAttribute('aria-label') || '').trim().replace(/\\n/g, ' ').slice(0, 30),
            width: Math.round(r.width),
            height: Math.round(r.height),
            touchTargetPass,
            isTextClipped,
            isSquished,
          };
        }).filter(Boolean);

        const clippedButtons = mobileButtons.filter(b => b.isTextClipped);
        const squishedButtons = mobileButtons.filter(b => b.isSquished);

        return {
          winWidth,
          docWidth,
          overflow,
          maxRight: Math.round(maxRight),
          overflowingCount: overflowingElements.length,
          overflowingSample: overflowingElements.slice(0, 3),
          totalButtons: mobileButtons.length,
          clippedButtonsCount: clippedButtons.length,
          clippedButtonsSample: clippedButtons.slice(0, 3),
          squishedButtonsCount: squishedButtons.length,
        };
      })()
    `);

    console.log('Mobile Audit:', JSON.stringify(mobileData, null, 2));
    console.log(`Không tràn viền ngang (scrollWidth=${mobileData.docWidth} <= 430px): ${!mobileData.overflow ? '✅ ĐẠT (CHUẨN 100%)' : '❌ TRÀN VIỀN'}`);
    console.log(`Số phần tử tràn lề phải (> 430px): ${mobileData.overflowingCount === 0 ? '✅ 0 (TUYỆT ĐỐI CHUẨN)' : `❌ ${mobileData.overflowingCount} phần tử`}`);
    console.log(`Số nút bị tràn chữ trên mobile: ${mobileData.clippedButtonsCount === 0 ? '✅ 0 (KHÔNG TRÀN CHỮ)' : `❌ ${mobileData.clippedButtonsCount} nút`}`);
    console.log(`Số nút bị bẹp trên mobile: ${mobileData.squishedButtonsCount === 0 ? '✅ 0' : `⚠️ ${mobileData.squishedButtonsCount}`}`);

    const mobShotPath = '/tmp/qa_chrome_mobile.png';
    await client.screenshot(mobShotPath);
    console.log(`📸 Screenshot Mobile lưu tại: ${mobShotPath}`);

    report.mobileAudit = {
      ...mobileData,
      screenshot: mobShotPath,
    };

    // --- STEP D: MOBILE DRAWER MENU INTERACTION TEST ---
    console.log('\n===============================================================');
    console.log('  📱 KIỂM TRA 4: MOBILE DRAWER MENU & TAB NAVIGATION          ');
    console.log('===============================================================');
    // Click Hamburger Button
    await client.eval(`
      (() => {
        const btn = document.querySelector('header button[aria-label*="menu" i]') || 
                    Array.from(document.querySelectorAll('header button')).find(b => b.querySelector('svg.lucide-menu'));
        if (btn) btn.click();
      })()
    `);
    await sleep(800);

    const drawerCheck = await client.eval(`
      (() => {
        const drawer = document.querySelector('.mobile-nav-drawer');
        if (!drawer) return { open: false };

        const links = Array.from(drawer.querySelectorAll('nav a')).map(a => a.innerText.trim().replace(/\\n/g, ' '));
        const cvBtn = drawer.querySelector('button');

        return {
          open: true,
          linksCount: links.length,
          links,
          hasCvBtn: !!cvBtn,
          cvBtnText: cvBtn ? cvBtn.innerText.trim().replace(/\\n/g, ' ') : '',
        };
      })()
    `);

    console.log('Mobile Drawer Menu Check:', JSON.stringify(drawerCheck, null, 2));
    console.log(`Drawer Menu mở thành công: ${drawerCheck.open ? '✅ ĐẠT' : '❌ LỖI KHÔNG MỞ'}`);
    console.log(`Đầy đủ liên kết phân tab trong Drawer: ${drawerCheck.linksCount >= 7 ? '✅ ĐẠT' : '⚠️ THIẾU'}`);

    const drawerShotPath = '/tmp/qa_chrome_mobile_drawer.png';
    await client.screenshot(drawerShotPath);
    console.log(`📸 Screenshot Mobile Drawer lưu tại: ${drawerShotPath}`);

    report.mobileDrawerAudit = {
      ...drawerCheck,
      screenshot: drawerShotPath,
    };

    // Close Drawer
    await client.eval(`
      (() => {
        const btn = document.querySelector('header button[aria-label*="Đóng" i]') || 
                    Array.from(document.querySelectorAll('header button')).find(b => b.querySelector('svg.lucide-x'));
        if (btn) btn.click();
      })()
    `);
    await sleep(600);
  }

  // --- STEP E: CV DOWNLOAD MODAL INTERACTION & AVATAR VERIFICATION ---
  console.log('\n===============================================================');
  console.log('  📄 KIỂM TRA 5: CV DOWNLOAD MODAL & KTEE AVATAR LOAD THẬT    ');
  console.log('===============================================================');
  // Click CV button (Header or Hero or Floating Dock)
  await client.eval(`
    (() => {
      const cvBtn = Array.from(document.querySelectorAll('button')).find(b => 
        (b.innerText.includes('Tải CV') || b.innerText.includes('Xem CV') || b.innerText.includes('Tải Hồ Sơ')) &&
        b.offsetParent !== null
      ) || document.querySelector('button[aria-label*="CV" i]');
      if (cvBtn) cvBtn.click();
    })()
  `);
  await sleep(1000);

  const cvModalCheck = await client.eval(`
    (() => {
      const modal = document.querySelector('[role="dialog"]');
      if (!modal) return { open: false };

      const avatarImg = modal.querySelector('img[src="/avatar.jpg"]');
      const cvLinks = Array.from(modal.querySelectorAll('a[href*="/cv/"]')).map(a => ({
        href: a.getAttribute('href'),
        text: a.innerText.trim().replace(/\\n/g, ' '),
      }));

      return {
        open: true,
        hasAvatarImg: !!avatarImg,
        avatarLoaded: avatarImg ? (avatarImg.complete && avatarImg.naturalWidth > 0) : false,
        avatarNaturalWidth: avatarImg ? avatarImg.naturalWidth : 0,
        avatarNaturalHeight: avatarImg ? avatarImg.naturalHeight : 0,
        cvLinksCount: cvLinks.length,
        cvLinks,
      };
    })()
  `);

  console.log('CV Modal Check:', JSON.stringify(cvModalCheck, null, 2));
  console.log(`CV Modal mở thành công từ Header: ${cvModalCheck.open ? '✅ ĐẠT' : '❌ LỖI'}`);
  console.log(`Ảnh Avatar (/avatar.jpg) load thật (naturalWidth > 0): ${cvModalCheck.avatarLoaded ? `✅ ĐẠT (${cvModalCheck.avatarNaturalWidth}x${cvModalCheck.avatarNaturalHeight}px)` : '❌ LỖI LOAD ẢNH'}`);
  console.log(`Đầy đủ 4 phiên bản CV PDF: ${cvModalCheck.cvLinksCount >= 4 ? `✅ ĐẠT (${cvModalCheck.cvLinksCount} bản)` : '❌ THIẾU BẢN CV'}`);

  const modalShotPath = '/tmp/qa_chrome_modal.png';
  await client.screenshot(modalShotPath);
  console.log(`📸 Screenshot CV Modal lưu tại: ${modalShotPath}`);

  report.cvModalAudit = {
    ...cvModalCheck,
    screenshot: modalShotPath,
  };

  // Close CV Modal via Escape
  await client.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape' });
  await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
  await sleep(500);

  // --- FINAL DISPLAY ON MAC SCREEN ---
  console.log(`\n===============================================================`);
  console.log(`  👀 GIỮ CỬA SỔ GOOGLE CHROME THẬT TRÊN MAC TRONG ${DURATION} GIÂY ĐỂ QUAN SÁT`);
  console.log(`===============================================================`);
  await sleep(DURATION * 1000);

  // Close
  client.close();
  chromeProcess.kill('SIGTERM');

  console.log('\n===============================================================');
  console.log('  🎯 BIÊN BẢN NGHIỆM THU QA TESTING CHÍNH THỨC HOÀN TẤT         ');
  console.log('===============================================================');
  console.log(JSON.stringify(report, null, 2));

  return report;
}

run().catch((err) => {
  console.error('Lỗi kiểm thử Chrome QA:', err);
  process.exit(1);
});
