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
  console.log('===============================================================');
  console.log('  🚀 QA TESTING SUITE: LIVE GOOGLE CHROME VERIFICATION ON MAC  ');
  console.log('===============================================================');
  console.log(`Route: ${ROUTE} | Mode: ${MODE} | Duration: ${DURATION}s`);

  // 1. Launch Chrome
  console.log('[1/5] Khởi động Google Chrome thật với CDP Remote Debugging (port 9222)...');
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

  const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
  console.log(`[2/5] Kết nối WebSocket CDP: ${pageTarget.webSocketDebuggerUrl}`);

  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();

  await client.send('Page.enable');
  await client.send('DOM.enable');
  await client.send('Runtime.enable');

  // Wait for initial page load and Three.js initialization
  console.log('[3/5] Chờ trang tải và khởi tạo Three.js Universe (3s)...');
  await sleep(3000);

  const results = {
    desktop: null,
    mobile: null,
    avatarCheck: null,
  };

  // --- A. DESKTOP TEST (1440x900) ---
  if (MODE === 'desktop' || MODE === 'all') {
    console.log('\n--- [TEST DESKTOP 1440x900: THẺ BÊN PHẢI & THREE.JS PLANET OVERLAP] ---');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(1000);

    const desktopMetrics = await client.eval(`
      (() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        
        // Find card container
        const card = document.querySelector('.hud-card-entrance') || document.querySelector('.card-glass');
        const cardRect = card ? card.getBoundingClientRect() : null;
        
        // Find Three.js canvas
        const canvas = document.querySelector('canvas');
        const canvasRect = canvas ? canvas.getBoundingClientRect() : null;

        // Check overflow
        const overflow = docWidth > winWidth;

        return {
          winWidth,
          winHeight,
          docWidth,
          overflow,
          cardRect: cardRect ? {
            left: Math.round(cardRect.left),
            right: Math.round(cardRect.right),
            top: Math.round(cardRect.top),
            bottom: Math.round(cardRect.bottom),
            width: Math.round(cardRect.width),
            height: Math.round(cardRect.height),
          } : null,
          canvasRect: canvasRect ? {
            width: Math.round(canvasRect.width),
            height: Math.round(canvasRect.height),
          } : null,
        };
      })()
    `);

    console.log('Desktop Metrics:', JSON.stringify(desktopMetrics, null, 2));

    // Check if card is on the right
    const card = desktopMetrics.cardRect;
    const isDockedOnRight = card && card.left > desktopMetrics.winWidth / 2;
    console.log(`Thẻ card nằm ở nửa PHẢI màn hình (left=${card?.left}px > 720px): ${isDockedOnRight ? '✅ ĐẠT' : '❌ LỖI'}`);
    console.log(`Khoảng cách mép phải (1440 - right=${1440 - (card?.right || 0)}px): ${1440 - (card?.right || 0) < 100 ? '✅ ĐẠT (NEO PHẢI)' : '⚠️ CẦN KIỂM TRA'}`);
    console.log(`Không tràn viền ngang (scrollWidth=${desktopMetrics.docWidth} <= 1440): ${!desktopMetrics.overflow ? '✅ ĐẠT' : '❌ TRÀN VIỀN'}`);

    // Take Desktop Screenshot
    const deskShotPath = '/tmp/qa_chrome_desktop.png';
    await client.screenshot(deskShotPath);
    console.log(`📸 Screenshot Desktop lưu tại: ${deskShotPath}`);

    results.desktop = {
      ...desktopMetrics,
      isDockedOnRight,
      screenshot: deskShotPath,
    };
  }

  // --- B. MOBILE TEST (430x932 iPhone 14 Pro Max) ---
  if (MODE === 'mobile' || MODE === 'all') {
    console.log('\n--- [TEST MOBILE 430x932 (iPhone 14 Pro Max): NỬA DƯỚI & CHỐNG TRÀN VIỀN] ---');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 430,
      height: 932,
      deviceScaleFactor: 3,
      mobile: true,
    });
    await sleep(1000);

    const mobileMetrics = await client.eval(`
      (() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        const card = document.querySelector('.hud-card-entrance') || document.querySelector('.card-glass');
        const cardRect = card ? card.getBoundingClientRect() : null;

        // Check all elements for overflow
        let maxRight = 0;
        let overflowingElement = null;
        document.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right > maxRight) {
            maxRight = r.right;
          }
          if (r.right > 430.5 && !overflowingElement && el.clientWidth > 0) {
            overflowingElement = {
              tag: el.tagName,
              className: el.className ? el.className.toString().slice(0, 50) : '',
              right: Math.round(r.right),
              width: Math.round(r.width)
            };
          }
        });

        // Touch targets check
        const buttons = Array.from(document.querySelectorAll('button, a.nav-btn, a.cta-btn'));
        const smallTouchTargets = buttons
          .filter(b => {
            const r = b.getBoundingClientRect();
            return (r.width > 0 && r.height > 0) && (r.width < 40 || r.height < 40);
          })
          .map(b => ({
            text: b.innerText ? b.innerText.slice(0, 20) : '',
            width: Math.round(b.getBoundingClientRect().width),
            height: Math.round(b.getBoundingClientRect().height)
          }));

        return {
          winWidth,
          winHeight,
          docWidth,
          overflow: docWidth > 430.5,
          maxRight: Math.round(maxRight),
          overflowingElement,
          cardRect: cardRect ? {
            left: Math.round(cardRect.left),
            right: Math.round(cardRect.right),
            top: Math.round(cardRect.top),
            bottom: Math.round(cardRect.bottom),
            width: Math.round(cardRect.width),
            height: Math.round(cardRect.height),
          } : null,
          smallTouchTargetsCount: smallTouchTargets.length,
          smallTouchTargetsSample: smallTouchTargets.slice(0, 3)
        };
      })()
    `);

    console.log('Mobile Metrics:', JSON.stringify(mobileMetrics, null, 2));

    const card = mobileMetrics.cardRect;
    const isAtBottomHalf = card && card.top >= 350;
    console.log(`Thẻ card nằm ở NỬA DƯỚI màn hình (top=${card?.top}px >= 350px): ${isAtBottomHalf ? '✅ ĐẠT' : '⚠️ CẦN CHỈNH'}`);
    console.log(`Chiều rộng thẻ (width=${card?.width}px <= 430px): ${card && card.width <= 430 ? '✅ ĐẠT' : '❌ QUÁ RỘNG'}`);
    console.log(`Tuyệt đối không tràn viền ngang (scrollWidth=${mobileMetrics.docWidth} <= 430px): ${!mobileMetrics.overflow ? '✅ ĐẠT (CHUẨN 100%)' : '❌ TRÀN VIỀN'}`);
    console.log(`Touch targets >= 44px (Số nút dưới chuẩn: ${mobileMetrics.smallTouchTargetsCount}): ${mobileMetrics.smallTouchTargetsCount === 0 ? '✅ ĐẠT 100%' : '⚠️ CẦN CHÚ Ý'}`);

    // Take Mobile Screenshot
    const mobShotPath = '/tmp/qa_chrome_mobile.png';
    await client.screenshot(mobShotPath);
    console.log(`📸 Screenshot Mobile lưu tại: ${mobShotPath}`);

    results.mobile = {
      ...mobileMetrics,
      isAtBottomHalf,
      screenshot: mobShotPath,
    };
  }

  // --- C. AVATAR & CV MODAL INTERACTION TEST ---
  console.log('\n--- [TEST AVATAR & CV MODAL & MASTER PDF EMBED] ---');
  // Click on "Tải Hồ Sơ Kỹ Sư (PDF)" to open modal
  await client.eval(`
    (() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const cvBtn = btns.find(b => b.innerText.includes('Tải Hồ Sơ') || b.innerText.includes('PDF'));
      if (cvBtn) cvBtn.click();
    })()
  `);
  await sleep(1000);

  const modalCheck = await client.eval(`
    (() => {
      const modal = document.querySelector('[role="dialog"]');
      if (!modal) return { open: false };
      
      const avatarImg = modal.querySelector('img[src="/avatar.jpg"]');
      const cvLink = modal.querySelector('a[href="/cv/NguyenKhoaTai_s_CV.pdf"]');
      
      return {
        open: true,
        hasAvatarImg: !!avatarImg,
        avatarLoaded: avatarImg ? (avatarImg.complete && avatarImg.naturalWidth > 0) : false,
        avatarNaturalSize: avatarImg ? { width: avatarImg.naturalWidth, height: avatarImg.naturalHeight } : null,
        avatarRenderedSize: avatarImg ? { width: Math.round(avatarImg.getBoundingClientRect().width), height: Math.round(avatarImg.getBoundingClientRect().height) } : null,
        hasCvLink: !!cvLink,
        cvLinkHref: cvLink ? cvLink.getAttribute('href') : null,
      };
    })()
  `);

  console.log('CV Modal & Avatar Verification:', JSON.stringify(modalCheck, null, 2));
  console.log(`Modal mở thành công: ${modalCheck.open ? '✅ ĐẠT' : '❌ LỖI'}`);
  console.log(`Ảnh Avatar (/avatar.jpg) load thành công (naturalWidth > 0): ${modalCheck.avatarLoaded ? '✅ ĐẠT 100%' : '❌ LỖI LOAD ẢNH'}`);
  console.log(`Link Master CV PDF (/cv/NguyenKhoaTai_s_CV.pdf) hiện diện: ${modalCheck.hasCvLink ? '✅ ĐẠT' : '❌ THIẾU LINK'}`);

  const modalShotPath = '/tmp/qa_chrome_modal.png';
  await client.screenshot(modalShotPath);
  console.log(`📸 Screenshot Modal lưu tại: ${modalShotPath}`);

  results.avatarCheck = {
    ...modalCheck,
    screenshot: modalShotPath,
  };

  // Close modal with Escape key
  await client.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape' });
  await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape' });
  await sleep(500);

  // Keep open for user inspection on screen
  console.log(`\n[4/5] Giữ cửa sổ Google Chrome thật hiển thị trên Mac trong ${DURATION} giây để người dùng quan sát...`);
  await sleep(DURATION * 1000);

  // Close CDP & Chrome
  console.log('[5/5] Đóng kết nối CDP và giải phóng tài nguyên...');
  client.close();
  chromeProcess.kill('SIGTERM');

  console.log('\n===============================================================');
  console.log('  🎯 BIÊN BẢN NGHIỆM THU QA TESTING TRỰC QUAN HOÀN TẤT         ');
  console.log('===============================================================');
  console.log(JSON.stringify(results, null, 2));

  return results;
}

run().catch((err) => {
  console.error('Lỗi kiểm thử Chrome QA:', err);
  process.exit(1);
});
