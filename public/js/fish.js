// ============================================
// FISH.JS - World Battle Aquarium v3.0
// 30+ loài sinh vật có hình dạng RIÊNG BIỆT
// + Hệ thống vòng lặp vô hạn (Infinite Loop)
// ============================================

// ===== BẢNG SINH VẬT THEO TIER =====
const CREATURE_TYPES = {
    tiny: [
        { name: 'Plankton',      shape: 'plankton',    color: '#88ffaa', size: 8,  speed: 0.3 },
        { name: 'Baby Shrimp',   shape: 'shrimp',      color: '#ffaa88', size: 10, speed: 0.4 },
        { name: 'Sea Butterfly', shape: 'butterfly',    color: '#ff88ff', size: 9,  speed: 0.5 },
        { name: 'Krill',         shape: 'krill',        color: '#88ddff', size: 8,  speed: 0.35 },
    ],
    common: [
        { name: 'Clownfish',   shape: 'clownfish',   color: '#ff6633', accent: '#fff',    size: 18, speed: 1.2 },
        { name: 'Blue Tang',   shape: 'tang',        color: '#3399ff', accent: '#ffee44', size: 17, speed: 1.3 },
        { name: 'Guppy',       shape: 'guppy',       color: '#ff44aa', accent: '#ffaadd', size: 15, speed: 1.4 },
        { name: 'Seahorse',    shape: 'seahorse',    color: '#ffcc00', accent: '#ff8800', size: 16, speed: 0.8 },
        { name: 'Neon Tetra',  shape: 'tetra',       color: '#00ffcc', accent: '#ff0044', size: 14, speed: 1.5 },
        { name: 'Damselfish',  shape: 'damsel',      color: '#6699ff', accent: '#ffff66', size: 16, speed: 1.1 },
    ],
    rare: [
        { name: 'Angelfish',     shape: 'angelfish',   color: '#ffdd44', accent: '#8844ff', size: 28, speed: 1.0 },
        { name: 'Lionfish',      shape: 'lionfish',    color: '#ff4444', accent: '#ffcccc', size: 30, speed: 0.9 },
        { name: 'Pufferfish',    shape: 'puffer',      color: '#ffaa00', accent: '#ff6600', size: 32, speed: 0.7 },
        { name: 'Moray Eel',     shape: 'eel',         color: '#44aa44', accent: '#88ff88', size: 35, speed: 1.1 },
        { name: 'Mantis Shrimp', shape: 'mantis',      color: '#ff00ff', accent: '#00ffff', size: 26, speed: 1.3 },
        { name: 'Sea Turtle',    shape: 'turtle',      color: '#44cc88', accent: '#2a7a55', size: 34, speed: 0.6 },
    ],
    epic: [
        { name: 'Dolphin',       shape: 'dolphin',     color: '#4488ff', accent: '#aaccff', size: 45, speed: 1.5 },
        { name: 'Manta Ray',     shape: 'manta',       color: '#6644aa', accent: '#aa88ff', size: 50, speed: 0.8 },
        { name: 'Giant Octopus', shape: 'octopus',     color: '#cc44ff', accent: '#ff88ff', size: 48, speed: 0.7 },
        { name: 'Swordfish',     shape: 'swordfish',   color: '#aaaaff', accent: '#6666cc', size: 46, speed: 1.8 },
        { name: 'Hammerhead',    shape: 'hammerhead',   color: '#888899', accent: '#bbbbcc', size: 52, speed: 1.2 },
    ],
    legendary: [
        { name: 'Great White',   shape: 'greatwhite',  color: '#ccccdd', accent: '#ffffff', size: 65, speed: 1.4 },
        { name: 'Giant Squid',   shape: 'squid',       color: '#ff2288', accent: '#ff88bb', size: 60, speed: 1.0 },
        { name: 'Blue Whale',    shape: 'whale',       color: '#4466cc', accent: '#8899ee', size: 80, speed: 0.5 },
        { name: 'Orca',          shape: 'orca',        color: '#111133', accent: '#ffffff', size: 70, speed: 1.3 },
    ],
    mythic: [
        { name: 'Dragon Fish',      shape: 'dragon',      color: '#ffdd00', accent: '#ff4400', size: 90,  speed: 1.6 },
        { name: 'Kraken',           shape: 'kraken',      color: '#440066', accent: '#aa00ff', size: 100, speed: 0.9 },
        { name: 'Leviathan',        shape: 'leviathan',   color: '#003366', accent: '#00aaff', size: 110, speed: 0.7 },
        { name: 'Phoenix Jellyfish', shape: 'phoenix',    color: '#ff4400', accent: '#ffcc00', size: 85,  speed: 1.2 },
    ],
    boss: [
        { name: 'Sea Dragon',    shape: 'seadragon',   color: '#ff0066', accent: '#ffcc00', size: 130, speed: 0.5 },
        { name: 'Abyssal Titan', shape: 'titan',       color: '#330066', accent: '#cc00ff', size: 150, speed: 0.3 },
    ],
    // PREDATOR WAVE - sinh vật từ hệ thống vòng lặp
      predator: [
        { name: 'Shadow Shark',  shape: 'shadowshark', color: '#1a1a2e', accent: '#ff0044', size: 100, speed: 1.8 },
        { name: 'Void Whale',    shape: 'voidwhale',   color: '#0a0a1e', accent: '#4400ff', size: 140, speed: 0.6 },
        { name: 'Storm Eel',     shape: 'stormeel',    color: '#222244', accent: '#00ffff', size: 120, speed: 2.0 },
    ],
    god: [
        { name: 'Leviathan',         shape: 'leviathan', color: '#003366', accent: '#00aaff', size: 150, speed: 0.7 },
        { name: 'Phoenix Sea God',   shape: 'phoenix',   color: '#ff4400', accent: '#ffcc00', size: 130, speed: 1.2 },
    ]
};


const TIER_ORDER = ['tiny', 'common', 'rare', 'epic', 'legendary', 'mythic'];

const VIEWER_MILESTONES = [
    { viewers: 50,   unlock: 'rare',      message: '🌊 50 viewers! Rare creatures appear!' },
    { viewers: 100,  unlock: 'epic',      message: '🔥 100 viewers! Epic creatures unleashed!' },
    { viewers: 200,  unlock: 'legendary', message: '⚡ 200 viewers! Legendary beasts rise!' },
    { viewers: 500,  unlock: 'mythic',    message: '🌟 500 viewers! Mythic gods descend!' },
    { viewers: 1000, unlock: 'boss',      message: '👑 1000 viewers! THE BOSS HAS ARRIVED!' },
];

// ===== SHAPE DRAWER - Hình dạng riêng biệt cho từng loài =====
const ShapeDrawer = {

    // ---------- TINY TIER ----------
    plankton(ctx, s, color) {
        // Hình tròn nhỏ với râu
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Râu nhỏ
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * s * 0.5, Math.sin(angle) * s * 0.5);
            ctx.lineTo(Math.cos(angle) * s, Math.sin(angle) * s);
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    },

    shrimp(ctx, s, color, t) {
        // Thân cong hình chữ C
        ctx.beginPath();
        ctx.moveTo(s * 0.6, 0);
        ctx.quadraticCurveTo(s * 0.3, -s * 0.5, -s * 0.2, -s * 0.3);
        ctx.quadraticCurveTo(-s * 0.6, 0, -s * 0.2, s * 0.3);
        ctx.quadraticCurveTo(s * 0.3, s * 0.5, s * 0.6, 0);
        ctx.fillStyle = color;
        ctx.fill();
        // Râu
        ctx.beginPath();
        ctx.moveTo(s * 0.6, 0);
        ctx.lineTo(s * 1.2, -s * 0.3 + Math.sin(t) * 2);
        ctx.moveTo(s * 0.6, 0);
        ctx.lineTo(s * 1.2, s * 0.2 + Math.sin(t + 1) * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
    },

    butterfly(ctx, s, color, t) {
        // Cánh bướm biển - 2 cánh phập phồng
        const wingFlap = Math.sin(t * 3) * 0.3;
        // Thân nhỏ
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.3, s * 0.15, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Cánh trên
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.3, s * 0.5, s * 0.35 + wingFlap * s, -0.2, 0, Math.PI * 2);
        ctx.fillStyle = color + 'aa';
        ctx.fill();
        // Cánh dưới
        ctx.beginPath();
        ctx.ellipse(0, s * 0.3, s * 0.4, s * 0.3 - wingFlap * s * 0.5, 0.2, 0, Math.PI * 2);
        ctx.fillStyle = color + '88';
        ctx.fill();
    },

    krill(ctx, s, color) {
        // Thân dài mảnh
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.8, s * 0.2, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Chân nhỏ
        for (let i = -2; i <= 2; i++) {
            ctx.beginPath();
            ctx.moveTo(i * s * 0.25, s * 0.2);
            ctx.lineTo(i * s * 0.25, s * 0.5);
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
    },

    // ---------- COMMON TIER ----------
    clownfish(ctx, s, color, t, accent) {
        // Thân oval cam với sọc trắng
        ctx.beginPath();
        ctx.ellipse(0, 0, s, s * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // 3 sọc trắng đặc trưng
        ctx.fillStyle = accent || '#fff';
        ctx.fillRect(-s * 0.1, -s * 0.6, s * 0.12, s * 1.2);
        ctx.fillRect(s * 0.4, -s * 0.5, s * 0.1, s * 1.0);
        ctx.fillRect(-s * 0.5, -s * 0.45, s * 0.1, s * 0.9);
        // Đuôi tròn
        const tailWag = Math.sin(t) * 6;
        ctx.beginPath();
        ctx.moveTo(-s * 0.8, 0);
        ctx.lineTo(-s * 1.2 + tailWag, -s * 0.4);
        ctx.quadraticCurveTo(-s * 1.4 + tailWag, 0, -s * 1.2 + tailWag, s * 0.4);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.5, -s * 0.1, s * 0.16, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.55, -s * 0.1, s * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    },

    tang(ctx, s, color, t, accent) {
        // Blue Tang: thân dẹt hình oval, đuôi vàng
        ctx.beginPath();
        ctx.ellipse(0, 0, s, s * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Sọc đen đặc trưng
        ctx.beginPath();
        ctx.moveTo(s * 0.2, -s * 0.6);
        ctx.quadraticCurveTo(-s * 0.3, 0, s * 0.2, s * 0.6);
        ctx.strokeStyle = '#112';
        ctx.lineWidth = s * 0.1;
        ctx.stroke();
        // Đuôi vàng
        const tailWag = Math.sin(t) * 5;
        ctx.beginPath();
        ctx.moveTo(-s * 0.8, 0);
        ctx.lineTo(-s * 1.3 + tailWag, -s * 0.5);
        ctx.lineTo(-s * 1.3 + tailWag, s * 0.5);
        ctx.closePath();
        ctx.fillStyle = accent || '#ffee44';
        ctx.fill();
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.5, -s * 0.05, s * 0.14, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.54, -s * 0.05, s * 0.07, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    },

    guppy(ctx, s, color, t, accent) {
        // Thân nhỏ với đuôi quạt lớn rực rỡ
        // Thân
        ctx.beginPath();
        ctx.ellipse(s * 0.1, 0, s * 0.6, s * 0.35, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Đuôi quạt lớn (đặc trưng guppy)
        const tailWag = Math.sin(t) * 8;
        ctx.beginPath();
        ctx.moveTo(-s * 0.4, 0);
        ctx.quadraticCurveTo(-s * 1.0, -s * 0.8 + tailWag, -s * 1.5 + tailWag, -s * 0.3);
        ctx.quadraticCurveTo(-s * 1.2, 0, -s * 1.5 + tailWag, s * 0.3);
        ctx.quadraticCurveTo(-s * 1.0, s * 0.8 + tailWag, -s * 0.4, 0);
        ctx.fillStyle = accent || '#ffaadd';
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.4, -s * 0.08, s * 0.12, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.43, -s * 0.08, s * 0.06, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    },

    seahorse(ctx, s, color, t, accent) {
        // Cá ngựa: thân cong chữ S, đuôi cuộn
        ctx.save();
        ctx.rotate(-0.3);
        // Đầu
        ctx.beginPath();
        ctx.ellipse(s * 0.1, -s * 0.4, s * 0.3, s * 0.25, -0.4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Mõm dài
        ctx.beginPath();
        ctx.ellipse(s * 0.5, -s * 0.5, s * 0.25, s * 0.08, -0.3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Thân S-curve
        ctx.beginPath();
        ctx.moveTo(s * 0.0, -s * 0.2);
        ctx.bezierCurveTo(s * 0.3, s * 0.1, -s * 0.3, s * 0.4, s * 0.0, s * 0.7);
        ctx.bezierCurveTo(-s * 0.2, s * 1.0, -s * 0.1, s * 1.1, s * 0.1 + Math.sin(t) * 3, s * 1.2);
        ctx.lineWidth = s * 0.3;
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.stroke();
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.2, -s * 0.45, s * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.22, -s * 0.45, s * 0.04, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
        ctx.restore();
    },

    tetra(ctx, s, color, t, accent) {
        // Neon tetra: thân mảnh, sọc neon sáng
        ctx.beginPath();
        ctx.ellipse(0, 0, s, s * 0.3, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#334466';
        ctx.fill();
        // Sọc neon xanh
        ctx.beginPath();
        ctx.moveTo(s * 0.6, -s * 0.05);
        ctx.lineTo(-s * 0.5, -s * 0.05);
        ctx.lineTo(-s * 0.5, s * 0.05);
        ctx.lineTo(s * 0.6, s * 0.05);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Sọc đỏ phía dưới
        ctx.beginPath();
        ctx.moveTo(0, s * 0.05);
        ctx.lineTo(-s * 0.5, s * 0.05);
        ctx.lineTo(-s * 0.5, s * 0.15);
        ctx.lineTo(0, s * 0.15);
        ctx.fillStyle = accent || '#ff0044';
        ctx.fill();
        // Đuôi
        const tw = Math.sin(t) * 4;
        ctx.beginPath();
        ctx.moveTo(-s * 0.8, 0);
        ctx.lineTo(-s * 1.2 + tw, -s * 0.3);
        ctx.lineTo(-s * 1.2 + tw, s * 0.3);
        ctx.closePath();
        ctx.fillStyle = '#556688';
        ctx.fill();
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.6, -s * 0.05, s * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.63, -s * 0.05, s * 0.05, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    },

    damsel(ctx, s, color, t, accent) {
        // Damselfish: thân tròn dẹt
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.8, s * 0.65, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Chấm vàng
        ctx.beginPath(); ctx.arc(s * 0.1, -s * 0.1, s * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = accent || '#ffff66';
        ctx.fill();
        // Vây lưng cao
        ctx.beginPath();
        ctx.moveTo(-s * 0.3, -s * 0.6);
        ctx.lineTo(s * 0.0, -s * 1.0);
        ctx.lineTo(s * 0.3, -s * 0.6);
        ctx.fillStyle = color;
        ctx.fill();
        // Đuôi
        const tw = Math.sin(t) * 5;
        ctx.beginPath();
        ctx.moveTo(-s * 0.7, 0);
        ctx.lineTo(-s * 1.1 + tw, -s * 0.4);
        ctx.lineTo(-s * 1.1 + tw, s * 0.4);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.4, -s * 0.05, s * 0.13, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.44, -s * 0.05, s * 0.06, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    },

    // ---------- RARE TIER ----------
    angelfish(ctx, s, color, t, accent) {
        // Angelfish: thân cao hình tam giác, sọc
        // Thân hình kim cương
        ctx.beginPath();
        ctx.moveTo(s * 0.7, 0);
        ctx.lineTo(0, -s * 0.9);
        ctx.lineTo(-s * 0.5, 0);
        ctx.lineTo(0, s * 0.9);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        // Sọc chéo
        ctx.save();
        ctx.clip();
        for (let i = -3; i < 4; i++) {
            ctx.fillStyle = accent || '#8844ff';
            ctx.globalAlpha = 0.3;
            ctx.fillRect(i * s * 0.3, -s, s * 0.1, s * 2);
        }
        ctx.restore();
        ctx.globalAlpha = 1;
        // Vây dài phía trên + dưới
        ctx.beginPath();
        ctx.moveTo(-s * 0.1, -s * 0.9);
        ctx.quadraticCurveTo(-s * 0.3, -s * 1.3, -s * 0.6, -s * 1.1 + Math.sin(t) * 3);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-s * 0.1, s * 0.9);
        ctx.quadraticCurveTo(-s * 0.3, s * 1.3, -s * 0.6, s * 1.1 + Math.sin(t + 1) * 3);
        ctx.stroke();
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.35, -s * 0.05, s * 0.12, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.38, -s * 0.05, s * 0.06, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    },

    lionfish(ctx, s, color, t, accent) {
        // Lionfish: thân ngắn, tua dài phức tạp
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.6, s * 0.45, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Sọc trắng đỏ
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.6, s * 0.45, 0, 0, Math.PI * 2);
        ctx.clip();
        for (let i = -4; i < 5; i++) {
            ctx.fillStyle = accent || '#ffcccc';
            ctx.fillRect(i * s * 0.2, -s * 0.5, s * 0.08, s);
        }
        ctx.restore();
        // Tua dài (vây) - đặc trưng lionfish
        for (let i = 0; i < 8; i++) {
            const angle = -0.8 + i * 0.25;
            const len = s * (0.8 + Math.sin(t + i) * 0.2);
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * s * 0.4, Math.sin(angle) * s * 0.4 - s * 0.2);
            ctx.lineTo(Math.cos(angle) * len, Math.sin(angle) * len - s * 0.5);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();
            // Chấm nhỏ ở đầu tua
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * len, Math.sin(angle) * len - s * 0.5, 2, 0, Math.PI * 2);
            ctx.fillStyle = accent || '#ffcccc';
            ctx.fill();
        }
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.3, -s * 0.08, s * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.33, -s * 0.08, s * 0.05, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    },

    puffer(ctx, s, color, t, accent) {
        // Pufferfish: hình tròn phồng lớn với gai
        const puffSize = s * (0.8 + Math.sin(t * 0.5) * 0.1);
        ctx.beginPath();
        ctx.arc(0, 0, puffSize, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Gai ngắn khắp thân
        for (let i = 0; i < 16; i++) {
            const angle = (i / 16) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * puffSize, Math.sin(angle) * puffSize);
            ctx.lineTo(Math.cos(angle) * (puffSize + s * 0.2), Math.sin(angle) * (puffSize + s * 0.2));
            ctx.strokeStyle = accent || '#ff6600';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
        // Bụng sáng hơn
        ctx.beginPath();
        ctx.ellipse(0, s * 0.15, puffSize * 0.6, puffSize * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fill();
        // Mắt to (đặc trưng puffer)
        ctx.beginPath(); ctx.arc(s * 0.3, -s * 0.15, s * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.35, -s * 0.15, s * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
        // Miệng nhỏ O
        ctx.beginPath(); ctx.arc(s * 0.65, s * 0.05, s * 0.08, 0, Math.PI * 2);
        ctx.strokeStyle = '#994400';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    },

    eel(ctx, s, color, t, accent) {
        // Lươn biển: thân dài uốn lượn
        const segments = 8;
        ctx.beginPath();
        let prevX = s * 0.5, prevY = 0;
        ctx.moveTo(prevX, prevY);
        for (let i = 1; i <= segments; i++) {
            const progress = i / segments;
            const x = s * 0.5 - progress * s * 2.5;
            const y = Math.sin(t * 2 + progress * 4) * s * 0.3;
            const thickness = s * 0.3 * (1 - progress * 0.6);
            ctx.lineTo(x, y);
        }
        ctx.lineWidth = s * 0.35;
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        // Hoa văn
        ctx.lineWidth = s * 0.2;
        ctx.strokeStyle = accent || '#88ff88';
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;
        // Đầu tròn
        ctx.beginPath(); ctx.arc(s * 0.5, 0, s * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.6, -s * 0.08, s * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = '#ffff44'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.62, -s * 0.08, s * 0.04, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    },

    mantis(ctx, s, color, t, accent) {
        // Mantis shrimp: thân dài, càng lớn, nhiều màu
        // Thân nhiều khúc
        for (let i = 0; i < 5; i++) {
            const x = -i * s * 0.3;
            const hue = (i * 30 + Date.now() * 0.1) % 360;
            ctx.beginPath();
            ctx.ellipse(x, 0, s * 0.22, s * 0.2, 0, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${hue}, 80%, 55%)`;
            ctx.fill();
        }
        // Càng lớn phía trước
        ctx.beginPath();
        ctx.ellipse(s * 0.5, -s * 0.3, s * 0.25, s * 0.12, -0.5, 0, Math.PI * 2);
        ctx.fillStyle = accent || '#00ffff';
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(s * 0.5, s * 0.3, s * 0.25, s * 0.12, 0.5, 0, Math.PI * 2);
        ctx.fillStyle = accent || '#00ffff';
        ctx.fill();
        // Mắt trên cuống
        ctx.beginPath(); ctx.arc(s * 0.3, -s * 0.35, s * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.32, -s * 0.35, s * 0.04, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    },

    turtle(ctx, s, color, t, accent) {
        // Rùa biển: mai tròn, chân chèo
        // Mai
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.7, s * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Hoa văn mai
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.45, s * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = accent || '#2a7a55';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // Hexagon pattern
        for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(a) * s * 0.4, Math.sin(a) * s * 0.35);
            ctx.strokeStyle = accent || '#2a7a55';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        // Đầu
        ctx.beginPath();
        ctx.ellipse(s * 0.7, 0, s * 0.2, s * 0.15, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#3a8a60';
        ctx.fill();
        // Chân chèo (4 chân)
        const flapAngle = Math.sin(t) * 0.3;
        ctx.save();
        // Trước trên
        ctx.translate(s * 0.3, -s * 0.45);
        ctx.rotate(-0.5 + flapAngle);
        ctx.beginPath(); ctx.ellipse(s * 0.2, 0, s * 0.3, s * 0.1, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#3a8a60'; ctx.fill();
        ctx.restore();
        ctx.save();
        // Trước dưới
        ctx.translate(s * 0.3, s * 0.45);
        ctx.rotate(0.5 - flapAngle);
        ctx.beginPath(); ctx.ellipse(s * 0.2, 0, s * 0.3, s * 0.1, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#3a8a60'; ctx.fill();
        ctx.restore();
        // Sau
        ctx.save();
        ctx.translate(-s * 0.5, -s * 0.35);
        ctx.rotate(-0.3 - flapAngle * 0.5);
        ctx.beginPath(); ctx.ellipse(0, 0, s * 0.2, s * 0.08, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#3a8a60'; ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.translate(-s * 0.5, s * 0.35);
        ctx.rotate(0.3 + flapAngle * 0.5);
        ctx.beginPath(); ctx.ellipse(0, 0, s * 0.2, s * 0.08, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#3a8a60'; ctx.fill();
        ctx.restore();
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.78, -s * 0.06, s * 0.06, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.8, -s * 0.06, s * 0.03, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    },

    // ---------- EPIC TIER ----------
    dolphin(ctx, s, color, t, accent) {
        // Cá heo: thân thon dài, mõm nhọn
        ctx.beginPath();
        ctx.moveTo(s * 0.9, 0);
        ctx.quadraticCurveTo(s * 0.5, -s * 0.4, -s * 0.3, -s * 0.25);
        ctx.quadraticCurveTo(-s * 0.8, -s * 0.15, -s * 0.9, 0);
        ctx.quadraticCurveTo(-s * 0.8, s * 0.15, -s * 0.3, s * 0.2);
        ctx.quadraticCurveTo(s * 0.5, s * 0.35, s * 0.9, 0);
        ctx.fillStyle = color;
        ctx.fill();
        // Bụng sáng
        ctx.beginPath();
        ctx.moveTo(s * 0.7, s * 0.05);
        ctx.quadraticCurveTo(s * 0.2, s * 0.25, -s * 0.5, s * 0.1);
        ctx.quadraticCurveTo(s * 0.2, s * 0.15, s * 0.7, s * 0.05);
        ctx.fillStyle = accent || '#aaccff';
        ctx.fill();
        // Vây lưng tam giác
        ctx.beginPath();
        ctx.moveTo(-s * 0.1, -s * 0.3);
        ctx.lineTo(s * 0.1, -s * 0.65);
        ctx.lineTo(s * 0.3, -s * 0.25);
        ctx.fillStyle = color;
        ctx.fill();
        // Đuôi 2 thùy
        const tw = Math.sin(t) * 8;
        ctx.beginPath();
        ctx.moveTo(-s * 0.85, 0);
        ctx.quadraticCurveTo(-s * 1.1, -s * 0.3 + tw, -s * 1.4 + tw, -s * 0.35);
        ctx.quadraticCurveTo(-s * 1.1, 0, -s * 1.4 + tw, s * 0.35);
        ctx.quadraticCurveTo(-s * 1.1, s * 0.3 + tw, -s * 0.85, 0);
        ctx.fillStyle = color;
        ctx.fill();
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.5, -s * 0.08, s * 0.09, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.53, -s * 0.08, s * 0.045, 0, Math.PI * 2);
        ctx.fillStyle = '#222'; ctx.fill();
        // Miệng cười
        ctx.beginPath();
        ctx.arc(s * 0.65, s * 0.05, s * 0.15, 0, Math.PI * 0.6);
        ctx.strokeStyle = '#334466';
        ctx.lineWidth = 1;
        ctx.stroke();
    },

    manta(ctx, s, color, t, accent) {
        // Cá đuối manta: hình cánh rộng
        const flapY = Math.sin(t * 1.5) * s * 0.15;
        // Cánh trái
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-s * 0.3, -s * 0.8 + flapY, -s * 1.0, -s * 0.6 + flapY);
        ctx.quadraticCurveTo(-s * 0.6, -s * 0.1 + flapY * 0.5, 0, 0);
        ctx.fillStyle = color;
        ctx.fill();
        // Cánh phải
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-s * 0.3, s * 0.8 - flapY, -s * 1.0, s * 0.6 - flapY);
        ctx.quadraticCurveTo(-s * 0.6, s * 0.1 - flapY * 0.5, 0, 0);
        ctx.fillStyle = color;
        ctx.fill();
        // Thân giữa
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.5, s * 0.25, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Bụng trắng
        ctx.beginPath();
        ctx.ellipse(s * 0.05, 0, s * 0.3, s * 0.15, 0, 0, Math.PI * 2);
        ctx.fillStyle = accent || '#aa88ff';
        ctx.globalAlpha = 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;
        // Đuôi dài
        ctx.beginPath();
        ctx.moveTo(-s * 0.5, 0);
        ctx.lineTo(-s * 1.5, Math.sin(t * 2) * s * 0.15);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.25, -s * 0.12, s * 0.06, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.25, s * 0.12, s * 0.06, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
    },

    octopus(ctx, s, color, t, accent) {
        // Bạch tuộc: đầu tròn, 8 xúc tu
        // Đầu
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.2, s * 0.5, s * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // 8 xúc tu
        for (let i = 0; i < 8; i++) {
            const startAngle = 0.3 + (i / 8) * Math.PI * 1.2;
            const startX = Math.cos(startAngle) * s * 0.35;
            const startY = s * 0.2 + Math.sin(startAngle) * s * 0.1;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            const tentacleWave = Math.sin(t * 2 + i * 0.8) * s * 0.15;
            ctx.bezierCurveTo(
                startX - s * 0.3, startY + s * 0.4 + tentacleWave,
                startX + s * 0.1, startY + s * 0.6 - tentacleWave,
                startX - s * 0.1, startY + s * 0.8 + tentacleWave
            );
            ctx.lineWidth = s * 0.1 * (1 - i * 0.05);
            ctx.strokeStyle = color;
            ctx.lineCap = 'round';
            ctx.stroke();
            // Giác mút
            ctx.beginPath();
            ctx.arc(startX - s * 0.1, startY + s * 0.8 + tentacleWave, s * 0.04, 0, Math.PI * 2);
            ctx.fillStyle = accent || '#ff88ff';
            ctx.fill();
        }
        // Mắt lớn
        ctx.beginPath(); ctx.arc(s * 0.15, -s * 0.3, s * 0.16, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(-s * 0.15, -s * 0.3, s * 0.16, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.18, -s * 0.3, s * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
        ctx.beginPath(); ctx.arc(-s * 0.12, -s * 0.3, s * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    },

    swordfish(ctx, s, color, t, accent) {
        // Cá kiếm: thân torpedo, mõm kiếm dài
        // Thân torpedo
        ctx.beginPath();
        ctx.moveTo(s * 0.3, 0);
        ctx.quadraticCurveTo(s * 0.1, -s * 0.35, -s * 0.6, -s * 0.15);
        ctx.quadraticCurveTo(-s * 0.9, 0, -s * 0.6, s * 0.15);
        ctx.quadraticCurveTo(s * 0.1, s * 0.35, s * 0.3, 0);
        ctx.fillStyle = color;
        ctx.fill();
        // Mõm kiếm dài
        ctx.beginPath();
        ctx.moveTo(s * 0.3, 0);
        ctx.lineTo(s * 1.3, -s * 0.02);
        ctx.lineTo(s * 1.3, s * 0.02);
        ctx.closePath();
        ctx.fillStyle = accent || '#6666cc';
        ctx.fill();
        // Vây lưng cao nhọn
        ctx.beginPath();
        ctx.moveTo(-s * 0.1, -s * 0.3);
        ctx.lineTo(s * 0.1, -s * 0.8);
        ctx.lineTo(s * 0.3, -s * 0.3);
        ctx.fillStyle = color;
        ctx.fill();
        // Đuôi chẻ
        const tw = Math.sin(t) * 6;
        ctx.beginPath();
        ctx.moveTo(-s * 0.8, 0);
        ctx.lineTo(-s * 1.3 + tw, -s * 0.45);
        ctx.lineTo(-s * 1.0, 0);
        ctx.lineTo(-s * 1.3 + tw, s * 0.45);
        ctx.closePath();
        ctx.fillStyle = accent || '#6666cc';
        ctx.fill();
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.2, -s * 0.08, s * 0.07, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.22, -s * 0.08, s * 0.035, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    },

    hammerhead(ctx, s, color, t, accent) {
        // Cá mập đầu búa: đầu T-shape
        // Thân
        ctx.beginPath();
        ctx.moveTo(s * 0.2, 0);
        ctx.quadraticCurveTo(s * 0.1, -s * 0.25, -s * 0.6, -s * 0.12);
        ctx.quadraticCurveTo(-s * 0.9, 0, -s * 0.6, s * 0.12);
        ctx.quadraticCurveTo(s * 0.1, s * 0.25, s * 0.2, 0);
        ctx.fillStyle = color;
        ctx.fill();
        // Đầu búa (T-shape)
        ctx.beginPath();
        ctx.ellipse(s * 0.25, 0, s * 0.1, s * 0.45, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Vây lưng
        ctx.beginPath();
        ctx.moveTo(-s * 0.1, -s * 0.2);
        ctx.lineTo(0, -s * 0.6);
        ctx.lineTo(s * 0.15, -s * 0.2);
        ctx.fillStyle = color;
        ctx.fill();
        // Đuôi (thùy trên dài hơn)
        const tw = Math.sin(t) * 5;
        ctx.beginPath();
        ctx.moveTo(-s * 0.8, 0);
        ctx.lineTo(-s * 1.3 + tw, -s * 0.55);
        ctx.lineTo(-s * 1.0, -s * 0.05);
        ctx.lineTo(-s * 1.2 + tw, s * 0.25);
        ctx.closePath();
        ctx.fillStyle = accent || '#bbbbcc';
        ctx.fill();
        // Mắt (ở 2 đầu búa)
        ctx.beginPath(); ctx.arc(s * 0.28, -s * 0.38, s * 0.06, 0, Math.PI * 2);
        ctx.fillStyle = '#ffee44'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.28, s * 0.38, s * 0.06, 0, Math.PI * 2);
        ctx.fillStyle = '#ffee44'; ctx.fill();
    },

    // ---------- LEGENDARY TIER ----------
    greatwhite(ctx, s, color, t, accent) {
        // Great White: thân torpedo lớn, răng
        ctx.beginPath();
        ctx.moveTo(s * 0.8, 0);
        ctx.quadraticCurveTo(s * 0.4, -s * 0.4, -s * 0.5, -s * 0.2);
        ctx.quadraticCurveTo(-s * 0.9, 0, -s * 0.5, s * 0.2);
        ctx.quadraticCurveTo(s * 0.4, s * 0.4, s * 0.8, 0);
        ctx.fillStyle = color;
        ctx.fill();
        // Bụng trắng
        ctx.beginPath();
        ctx.moveTo(s * 0.6, s * 0.05);
        ctx.quadraticCurveTo(0, s * 0.3, -s * 0.5, s * 0.15);
        ctx.quadraticCurveTo(0, s * 0.12, s * 0.6, s * 0.05);
        ctx.fillStyle = accent || '#ffffff';
        ctx.fill();
        // Vây lưng lớn (iconic)
        ctx.beginPath();
        ctx.moveTo(-s * 0.1, -s * 0.35);
        ctx.lineTo(s * 0.15, -s * 0.85);
        ctx.lineTo(s * 0.4, -s * 0.3);
        ctx.fillStyle = color;
        ctx.fill();
        // Đuôi
        const tw = Math.sin(t) * 7;
        ctx.beginPath();
        ctx.moveTo(-s * 0.8, 0);
        ctx.lineTo(-s * 1.3 + tw, -s * 0.5);
        ctx.lineTo(-s * 1.0, 0);
        ctx.lineTo(-s * 1.2 + tw, s * 0.35);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        // Mang
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
            ctx.moveTo(s * 0.2 + i * s * 0.1, -s * 0.15);
            ctx.lineTo(s * 0.2 + i * s * 0.1, s * 0.1);
        }
        ctx.strokeStyle = '#999'; ctx.lineWidth = 1; ctx.stroke();
        // Mắt đen
        ctx.beginPath(); ctx.arc(s * 0.55, -s * 0.08, s * 0.07, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    },

    squid(ctx, s, color, t, accent) {
        // Mực khổng lồ: thân dài, 10 xúc tu
        // Thân hình nón
        ctx.beginPath();
        ctx.moveTo(s * 0.5, 0);
        ctx.quadraticCurveTo(s * 0.3, -s * 0.35, -s * 0.4, -s * 0.2);
        ctx.lineTo(-s * 0.7, 0);
        ctx.lineTo(-s * 0.4, s * 0.2);
        ctx.quadraticCurveTo(s * 0.3, s * 0.35, s * 0.5, 0);
        ctx.fillStyle = color;
        ctx.fill();
        // Vây tam giác 2 bên
        ctx.beginPath();
        ctx.moveTo(-s * 0.3, -s * 0.2);
        ctx.lineTo(-s * 0.6, -s * 0.5 + Math.sin(t) * 3);
        ctx.lineTo(-s * 0.6, -s * 0.15);
        ctx.fillStyle = color; ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-s * 0.3, s * 0.2);
        ctx.lineTo(-s * 0.6, s * 0.5 + Math.sin(t + 1) * 3);
        ctx.lineTo(-s * 0.6, s * 0.15);
        ctx.fillStyle = color; ctx.fill();
        // Xúc tu
        for (let i = 0; i < 10; i++) {
            const angle = -0.4 + (i / 10) * 0.8;
            const wave = Math.sin(t * 2 + i * 0.6) * s * 0.12;
            const len = s * (0.6 + (i % 2 === 0 ? 0.4 : 0));
            ctx.beginPath();
            ctx.moveTo(s * 0.5, angle * s * 0.5);
            ctx.bezierCurveTo(
                s * 0.8, angle * s * 0.3 + wave,
                s * 1.0 + wave, angle * s * 0.2,
                s * 0.5 + len, angle * s * 0.4 + wave
            );
            ctx.strokeStyle = accent || '#ff88bb';
            ctx.lineWidth = 2.5 - i * 0.15;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
        // Mắt lớn
        ctx.beginPath(); ctx.arc(s * 0.2, -s * 0.1, s * 0.14, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.23, -s * 0.1, s * 0.07, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    },

    whale(ctx, s, color, t, accent) {
        // Cá voi xanh: thân khổng lồ, tròn
        ctx.beginPath();
        ctx.moveTo(s * 0.8, 0);
        ctx.quadraticCurveTo(s * 0.5, -s * 0.45, -s * 0.4, -s * 0.35);
        ctx.quadraticCurveTo(-s * 0.9, -s * 0.15, -s * 0.9, 0);
        ctx.quadraticCurveTo(-s * 0.9, s * 0.15, -s * 0.4, s * 0.35);
        ctx.quadraticCurveTo(s * 0.5, s * 0.45, s * 0.8, 0);
        ctx.fillStyle = color;
        ctx.fill();
        // Bụng sáng có nếp gấp
        ctx.beginPath();
        ctx.moveTo(s * 0.6, s * 0.1);
        ctx.quadraticCurveTo(0, s * 0.35, -s * 0.6, s * 0.2);
        ctx.quadraticCurveTo(0, s * 0.2, s * 0.6, s * 0.1);
        ctx.fillStyle = accent || '#8899ee';
        ctx.fill();
        // Nếp gấp bụng
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(s * 0.4 - i * s * 0.2, s * 0.15);
            ctx.lineTo(s * 0.4 - i * s * 0.2, s * 0.3);
            ctx.strokeStyle = 'rgba(255,255,255,0.15)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        // Vây ngực
        ctx.save();
        ctx.translate(s * 0.1, s * 0.25);
        ctx.rotate(0.4 + Math.sin(t) * 0.1);
        ctx.beginPath();
        ctx.ellipse(0, s * 0.15, s * 0.08, s * 0.3, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
        // Đuôi 2 thùy lớn
        const tw = Math.sin(t * 0.8) * 10;
        ctx.beginPath();
        ctx.moveTo(-s * 0.85, 0);
        ctx.quadraticCurveTo(-s * 1.1, -s * 0.2 + tw, -s * 1.4 + tw, -s * 0.4);
        ctx.quadraticCurveTo(-s * 1.2, -s * 0.05, -s * 1.4 + tw, s * 0.4);
        ctx.quadraticCurveTo(-s * 1.1, s * 0.2 + tw, -s * 0.85, 0);
        ctx.fillStyle = color;
        ctx.fill();
        // Mắt nhỏ (so với thân)
        ctx.beginPath(); ctx.arc(s * 0.55, -s * 0.12, s * 0.05, 0, Math.PI * 2);
        ctx.fillStyle = '#223'; ctx.fill();
    },

    orca(ctx, s, color, t, accent) {
        // Cá voi sát thủ: đen trắng phân biệt
        // Thân đen
        ctx.beginPath();
        ctx.moveTo(s * 0.8, 0);
        ctx.quadraticCurveTo(s * 0.4, -s * 0.4, -s * 0.5, -s * 0.2);
        ctx.quadraticCurveTo(-s * 0.9, 0, -s * 0.5, s * 0.2);
        ctx.quadraticCurveTo(s * 0.4, s * 0.4, s * 0.8, 0);
        ctx.fillStyle = color;
        ctx.fill();
        // Mảng trắng bụng
        ctx.beginPath();
        ctx.moveTo(s * 0.7, s * 0.05);
        ctx.quadraticCurveTo(s * 0.3, s * 0.35, -s * 0.3, s * 0.18);
        ctx.quadraticCurveTo(s * 0.3, s * 0.15, s * 0.7, s * 0.05);
        ctx.fillStyle = accent || '#ffffff';
        ctx.fill();
        // Mảng trắng sau mắt (đặc trưng orca)
        ctx.beginPath();
        ctx.ellipse(s * 0.35, -s * 0.12, s * 0.18, s * 0.08, -0.3, 0, Math.PI * 2);
        ctx.fillStyle = accent || '#ffffff';
        ctx.fill();
        // Vây lưng rất cao
        ctx.beginPath();
        ctx.moveTo(-s * 0.1, -s * 0.3);
        ctx.lineTo(s * 0.05, -s * 0.9);
        ctx.lineTo(s * 0.25, -s * 0.25);
        ctx.fillStyle = color;
        ctx.fill();
        // Đuôi
        const tw = Math.sin(t) * 7;
        ctx.beginPath();
        ctx.moveTo(-s * 0.8, 0);
        ctx.lineTo(-s * 1.3 + tw, -s * 0.4);
        ctx.quadraticCurveTo(-s * 1.1, 0, -s * 1.3 + tw, s * 0.4);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        // Mắt nhỏ
        ctx.beginPath(); ctx.arc(s * 0.5, -s * 0.06, s * 0.05, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
    },

    // ---------- MYTHIC TIER ----------
    dragon(ctx, s, color, t, accent) {
        // Rồng cá: thân dài uốn, vảy, râu
        // Thân dài
        ctx.beginPath();
        ctx.moveTo(s * 0.5, 0);
        for (let i = 0; i <= 10; i++) {
            const progress = i / 10;
            const x = s * 0.5 - progress * s * 2.5;
            const y = Math.sin(t * 2 + progress * 5) * s * 0.2;
            ctx.lineTo(x, y);
        }
        ctx.lineWidth = s * 0.3;
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        // Vảy ánh kim
        for (let i = 0; i < 8; i++) {
            const progress = i / 8;
            const x = s * 0.3 - progress * s * 2;
            const y = Math.sin(t * 2 + progress * 5) * s * 0.2;
            ctx.beginPath();
            ctx.arc(x, y, s * 0.08, 0, Math.PI * 2);
            ctx.fillStyle = accent || '#ff4400';
            ctx.globalAlpha = 0.4 + Math.sin(t + i) * 0.2;
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        // Đầu rồng
        ctx.beginPath();
        ctx.ellipse(s * 0.5, 0, s * 0.35, s * 0.25, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Sừng
        ctx.beginPath();
        ctx.moveTo(s * 0.3, -s * 0.2);
        ctx.lineTo(s * 0.15, -s * 0.55);
        ctx.lineTo(s * 0.4, -s * 0.25);
        ctx.fillStyle = accent || '#ff4400'; ctx.fill();
        ctx.beginPath();
        ctx.moveTo(s * 0.5, -s * 0.2);
        ctx.lineTo(s * 0.45, -s * 0.5);
        ctx.lineTo(s * 0.6, -s * 0.22);
        ctx.fillStyle = accent || '#ff4400'; ctx.fill();
        // Râu dài
        ctx.beginPath();
        ctx.moveTo(s * 0.7, -s * 0.05);
        ctx.bezierCurveTo(s * 1.0, -s * 0.2 + Math.sin(t) * 5, s * 1.2, -s * 0.1, s * 1.3, -s * 0.3 + Math.sin(t) * 3);
        ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s * 0.7, s * 0.05);
        ctx.bezierCurveTo(s * 1.0, s * 0.2 + Math.sin(t + 1) * 5, s * 1.2, s * 0.1, s * 1.3, s * 0.3 + Math.sin(t + 1) * 3);
        ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();
        // Mắt rực lửa
        ctx.beginPath(); ctx.arc(s * 0.55, -s * 0.05, s * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = '#ff0'; ctx.shadowColor = '#ff0'; ctx.shadowBlur = 10; ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(s * 0.57, -s * 0.05, s * 0.04, 0, Math.PI * 2);
        ctx.fillStyle = '#f00'; ctx.fill();
    },

    kraken(ctx, s, color, t, accent) {
        // Kraken: đầu khổng lồ, xúc tu cuộn
        // Đầu
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.15, s * 0.55, s * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Xúc tu lớn cuộn
        for (let i = 0; i < 8; i++) {
            const baseAngle = 0.2 + (i / 8) * Math.PI * 1.3;
            const sx = Math.cos(baseAngle) * s * 0.4;
            const sy = s * 0.3 + Math.sin(baseAngle) * s * 0.15;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            const wave = Math.sin(t * 1.5 + i * 0.7) * s * 0.2;
            const len = s * (0.7 + i * 0.05);
            ctx.bezierCurveTo(
                sx + wave, sy + len * 0.4,
                sx - wave, sy + len * 0.7,
                sx + Math.sin(t + i) * s * 0.15, sy + len
            );
            ctx.lineWidth = s * 0.12 * (1 - i * 0.04);
            ctx.strokeStyle = color;
            ctx.lineCap = 'round';
            ctx.stroke();
            // Giác mút phát sáng
            for (let j = 0; j < 3; j++) {
                const p = 0.3 + j * 0.25;
                const px = sx + wave * p;
                const py = sy + len * p;
                ctx.beginPath();
                ctx.arc(px, py, s * 0.03, 0, Math.PI * 2);
                ctx.fillStyle = accent || '#aa00ff';
                ctx.shadowColor = accent || '#aa00ff';
                ctx.shadowBlur = 5;
                ctx.fill();
            }
        }
        ctx.shadowBlur = 0;
        // Mắt to phát sáng
        ctx.beginPath(); ctx.arc(s * 0.18, -s * 0.25, s * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = accent || '#aa00ff';
        ctx.shadowColor = accent || '#aa00ff';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(s * 0.2, -s * 0.25, s * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(-s * 0.18, -s * 0.25, s * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = accent || '#aa00ff';
        ctx.shadowColor = accent || '#aa00ff';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(-s * 0.16, -s * 0.25, s * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
    },

    leviathan(ctx, s, color, t, accent) {
        // Leviathan: siêu thể hải xà
        // Thân xà uốn lượn dài
        const segments = 12;
        const points = [];
        for (let i = 0; i <= segments; i++) {
            const p = i / segments;
            points.push({
                x: s * 0.6 - p * s * 3,
                y: Math.sin(t * 1.5 + p * 6) * s * 0.3,
                r: s * 0.25 * (1 - p * 0.5)
            });
        }
        // Thân
        for (let i = 0; i < points.length - 1; i++) {
            ctx.beginPath();
            ctx.arc(points[i].x, points[i].y, points[i].r, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            // Vây lưng cho mỗi segment
            if (i % 2 === 0) {
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y - points[i].r);
                ctx.lineTo(points[i].x - s * 0.05, points[i].y - points[i].r - s * 0.15);
                ctx.lineTo(points[i].x + s * 0.05, points[i].y - points[i].r);
                ctx.fillStyle = accent || '#00aaff';
                ctx.fill();
            }
        }
        // Đầu
        ctx.beginPath();
        ctx.ellipse(s * 0.6, 0, s * 0.35, s * 0.3, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Hàm dưới mở
        ctx.beginPath();
        ctx.ellipse(s * 0.75, s * 0.12, s * 0.2, s * 0.08, 0.2, 0, Math.PI * 2);
        ctx.fillStyle = '#001a33';
        ctx.fill();
        // Mắt phát sáng
        ctx.beginPath(); ctx.arc(s * 0.65, -s * 0.08, s * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = accent || '#00aaff';
        ctx.shadowColor = accent || '#00aaff';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(s * 0.67, -s * 0.08, s * 0.04, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
    },

    phoenix(ctx, s, color, t, accent) {
        // Sứa phượng hoàng: phát sáng, xúc tu lửa
        // Chuông
        const pulseSize = s * 0.5 + Math.sin(t * 2) * s * 0.08;
        ctx.beginPath();
        ctx.arc(0, -s * 0.1, pulseSize, Math.PI, 0);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Lớp trong sáng hơn
        ctx.beginPath();
        ctx.arc(0, -s * 0.1, pulseSize * 0.7, Math.PI, 0);
        ctx.fillStyle = accent || '#ffcc00';
        ctx.globalAlpha = 0.4;
        ctx.fill();
        ctx.globalAlpha = 1;
        // Xúc tu lửa
        for (let i = 0; i < 12; i++) {
            const x = -pulseSize + (i / 11) * pulseSize * 2;
            const waveLen = s * (0.5 + Math.sin(i * 0.5) * 0.3);
            ctx.beginPath();
            ctx.moveTo(x, s * 0.0);
            ctx.bezierCurveTo(
                x + Math.sin(t * 3 + i) * s * 0.15, s * waveLen * 0.4,
                x - Math.sin(t * 2 + i * 0.5) * s * 0.1, s * waveLen * 0.7,
                x + Math.sin(t * 2.5 + i * 0.8) * s * 0.12, s * waveLen
            );
            const gradient = ctx.createLinearGradient(x, 0, x, s * waveLen);
            gradient.addColorStop(0, color + 'cc');
            gradient.addColorStop(0.5, accent || '#ffcc00');
            gradient.addColorStop(1, color + '00');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2.5 - (i % 3);
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    },

    // ---------- PREDATOR WAVE (Vòng lặp) ----------
    shadowshark(ctx, s, color, t, accent) {
        // Cá mập bóng tối: đen, mắt đỏ, aura đen
        // Aura tối
        ctx.beginPath();
        ctx.arc(0, 0, s * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fill();
        // Thân
        ctx.beginPath();
        ctx.moveTo(s * 0.8, 0);
        ctx.quadraticCurveTo(s * 0.4, -s * 0.4, -s * 0.5, -s * 0.2);
        ctx.quadraticCurveTo(-s * 0.9, 0, -s * 0.5, s * 0.2);
        ctx.quadraticCurveTo(s * 0.4, s * 0.4, s * 0.8, 0);
        ctx.fillStyle = color;
        ctx.fill();
        // Vây
        ctx.beginPath();
        ctx.moveTo(-s * 0.1, -s * 0.35);
        ctx.lineTo(s * 0.1, -s * 0.8);
        ctx.lineTo(s * 0.3, -s * 0.3);
        ctx.fillStyle = color; ctx.fill();
        // Đuôi
        const tw = Math.sin(t) * 8;
        ctx.beginPath();
        ctx.moveTo(-s * 0.8, 0);
        ctx.lineTo(-s * 1.3 + tw, -s * 0.5);
        ctx.lineTo(-s * 1.0, 0);
        ctx.lineTo(-s * 1.3 + tw, s * 0.4);
        ctx.closePath();
        ctx.fillStyle = color; ctx.fill();
        // Mắt đỏ phát sáng
        ctx.beginPath(); ctx.arc(s * 0.5, -s * 0.08, s * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = accent || '#ff0044';
        ctx.shadowColor = accent || '#ff0044';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
    },

    voidwhale(ctx, s, color, t, accent) {
        // Cá voi hư không: tối, aura tím
        // Thân rất lớn
        ctx.beginPath();
        ctx.moveTo(s * 0.8, 0);
        ctx.quadraticCurveTo(s * 0.5, -s * 0.5, -s * 0.5, -s * 0.35);
        ctx.quadraticCurveTo(-s * 0.9, 0, -s * 0.5, s * 0.35);
        ctx.quadraticCurveTo(s * 0.5, s * 0.5, s * 0.8, 0);
        ctx.fillStyle = color;
        ctx.fill();
        // Vân phát sáng
        for (let i = 0; i < 6; i++) {
            const x = s * 0.4 - i * s * 0.25;
            ctx.beginPath();
            ctx.moveTo(x, -s * 0.15);
            ctx.bezierCurveTo(x + s * 0.1, -s * 0.25, x - s * 0.1, -s * 0.05, x + s * 0.05, s * 0.15);
            ctx.strokeStyle = accent || '#4400ff';
            ctx.shadowColor = accent || '#4400ff';
            ctx.shadowBlur = 8;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
        ctx.shadowBlur = 0;
        // Đuôi
        const tw = Math.sin(t * 0.8) * 10;
        ctx.beginPath();
        ctx.moveTo(-s * 0.85, 0);
        ctx.quadraticCurveTo(-s * 1.1, -s * 0.3 + tw, -s * 1.5, -s * 0.4);
        ctx.quadraticCurveTo(-s * 1.2, 0, -s * 1.5, s * 0.4);
        ctx.quadraticCurveTo(-s * 1.1, s * 0.3 + tw, -s * 0.85, 0);
        ctx.fillStyle = color; ctx.fill();
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.45, -s * 0.1, s * 0.06, 0, Math.PI * 2);
        ctx.fillStyle = accent || '#4400ff';
        ctx.shadowColor = accent || '#4400ff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
    },

    stormeel(ctx, s, color, t, accent) {
        // Lươn bão: tia sét, di chuyển nhanh
        const segments = 10;
        ctx.beginPath();
        ctx.moveTo(s * 0.5, 0);
        for (let i = 1; i <= segments; i++) {
            const p = i / segments;
            const x = s * 0.5 - p * s * 2.8;
            const y = Math.sin(t * 3 + p * 5) * s * 0.25;
            ctx.lineTo(x, y);
        }
        ctx.lineWidth = s * 0.25;
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.stroke();
        // Tia sét dọc thân
        ctx.beginPath();
        ctx.moveTo(s * 0.5, 0);
        for (let i = 1; i <= segments; i++) {
            const p = i / segments;
            const x = s * 0.5 - p * s * 2.8;
            const y = Math.sin(t * 3 + p * 5) * s * 0.25;
            ctx.lineTo(x + (Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 4);
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = accent || '#00ffff';
        ctx.shadowColor = accent || '#00ffff';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
        // Đầu
        ctx.beginPath(); ctx.arc(s * 0.5, 0, s * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
        // Mắt
        ctx.beginPath(); ctx.arc(s * 0.55, -s * 0.05, s * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = accent || '#00ffff';
        ctx.shadowColor = accent || '#00ffff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
    },

    // ---------- BOSS ----------
    seadragon(ctx, s, color, t, accent) {
        // Gọi dragon nhưng to hơn + thêm hiệu ứng
        ShapeDrawer.dragon(ctx, s, color, t, accent);
        // Thêm vầng lửa quanh thân
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.8, 0, Math.PI * 2);
        ctx.strokeStyle = accent || '#ffcc00';
        ctx.shadowColor = accent || '#ffcc00';
        ctx.shadowBlur = 25;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.3 + Math.sin(t * 3) * 0.2;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    },

    titan(ctx, s, color, t, accent) {
        // Gọi kraken nhưng to hơn + aura
        ShapeDrawer.kraken(ctx, s * 0.9, color, t, accent);
        // Crown
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const x = -s * 0.3 + i * s * 0.15;
            ctx.lineTo(x, -s * 0.7);
            ctx.lineTo(x + s * 0.075, -s * 0.55);
        }
        ctx.fillStyle = accent || '#cc00ff';
        ctx.shadowColor = accent || '#cc00ff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
    },

    // FALLBACK cho shape không tìm thấy
    _default(ctx, s, color, t) {
        ctx.beginPath();
        ctx.ellipse(0, 0, s, s * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
        const tw = Math.sin(t) * 5;
        ctx.beginPath();
        ctx.moveTo(-s * 0.8, 0);
        ctx.lineTo(-s * 1.2 + tw, -s * 0.4);
        ctx.lineTo(-s * 1.2 + tw, s * 0.4);
        ctx.closePath();
        ctx.fillStyle = color; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.5, -s * 0.1, s * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.beginPath(); ctx.arc(s * 0.55, -s * 0.1, s * 0.07, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
    }
};

// === FLAG IMAGE CACHE ===
const FLAG_CACHE = {};
function getFlagImage(countryCode) {
    if (!countryCode || countryCode.length !== 2 || countryCode === '🌍') return null;
    var cc = countryCode.toLowerCase();
    if (FLAG_CACHE[cc]) return FLAG_CACHE[cc];
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'https://flagcdn.com/w40/' + cc + '.png';
    img.loaded = false;
    img.onload = function() { img.loaded = true; };
    img.onerror = function() { img.loaded = false; };
    FLAG_CACHE[cc] = img;
    return img;
}

// ===== LỚP CÁ CHÍNH =====
class Fish {
    constructor(canvas, username, country, tier, giftName) {
        this.canvas = canvas;
        this.username = username || 'Anonymous';
        this.country = country || '🌍';
        this.tier = tier || 'common';
        this.giftName = giftName || '';
        this.id = Math.random().toString(36).substr(2, 9);
        this.createdAt = Date.now();
        this.isPredatorWave = (tier === 'predator');

        const types = CREATURE_TYPES[this.tier] || CREATURE_TYPES.common;
        this.type = types[Math.floor(Math.random() * types.length)];

        this.size = this.type.size * (0.85 + Math.random() * 0.3);
        this.baseSize = this.size;
        this.maxSize = this.size * 3;
        this.x = Math.random() * canvas.width;
        this.y = 80 + Math.random() * (canvas.height - 160);
        this.speed = this.type.speed * (0.8 + Math.random() * 0.4);
        this.baseSpeed = this.speed;
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.vx = this.speed * this.direction;
        this.vy = (Math.random() - 0.5) * 0.5;

        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.02 + Math.random() * 0.03;
        this.tailAngle = Math.random() * Math.PI * 2;
        this.tailSpeed = 0.05 + Math.random() * 0.05;
        this.opacity = 0;
        this.fadeIn = true;
        this.alive = true;
        this.deathTimer = 0;

        this.color = this.type.color;
        this.accent = this.type.accent || '#ffffff';
        this.glowColor = this.color + '66';

        this.eatCount = 0;
        this.score = this.getTierScore();
        this.huntTarget = null;
        this.isHunting = false;
        this.huntCooldown = 0;

        this.evolutionProgress = 0;
        this.isEvolving = false;
        this.evolveParticles = [];

        this.isScared = false;
        this.scaredTimer = 0;
        this.isExcited = false;
        this.excitedTimer = 0;

        this.trail = [];
        this.maxTrailLength = (['mythic', 'boss', 'predator'].includes(this.tier)) ? 15 :
                              (this.tier === 'legendary') ? 10 : 0;

        this.showLabel = true;
        this.labelTimer = 300;

        // Predator wave: spawn từ rìa
        if (this.isPredatorWave) {
            const side = Math.floor(Math.random() * 4);
            if (side === 0) { this.x = -this.size * 2; this.direction = 1; }
            else if (side === 1) { this.x = canvas.width + this.size * 2; this.direction = -1; }
            else if (side === 2) { this.y = -this.size * 2; }
            else { this.y = canvas.height + this.size * 2; }
            this.vx = this.speed * this.direction;
            // Predator tự biến mất sau 60 giây
            this.predatorLifespan = 60 * 60; // 60 giây * 60fps
        }
    }

    getTierScore() {
        const scores = { tiny: 1, common: 10, rare: 25, epic: 50, legendary: 100, mythic: 250, boss: 500, predator: 0 };
        return scores[this.tier] || 10;
    }

    canEat(other) {
        if (!other.alive || !this.alive) return false;
        if (other === this) return false;
        return this.size > other.size * 1.3;
    }

    getEatToEvolve() {
        const requirements = { tiny: 3, common: 4, rare: 5, epic: 6, legendary: 8, mythic: 10 };
        return requirements[this.tier] || 999;
    }

    getNextTier() {
        const idx = TIER_ORDER.indexOf(this.tier);
        if (idx < 0 || idx >= TIER_ORDER.length - 1) return null;
        return TIER_ORDER[idx + 1];
    }

    eatFish(other) {
        if (!this.canEat(other)) return false;
        other.alive = false;
        const growAmount = other.size * 0.15;
        this.size = Math.min(this.size + growAmount, this.maxSize);
        this.score += other.score;
        this.eatCount++;
        this.isExcited = true;
        this.excitedTimer = 60;
        const needed = this.getEatToEvolve();
        this.evolutionProgress = this.eatCount / needed;
        if (this.eatCount >= needed) return this.evolve();
        return false;
    }

    evolve() {
        const nextTier = this.getNextTier();
        if (!nextTier) return false;
        this.isEvolving = true;
        this.tier = nextTier;
        const types = CREATURE_TYPES[nextTier];
        this.type = types[Math.floor(Math.random() * types.length)];
        this.size = this.type.size * 1.2;
        this.baseSize = this.size;
        this.maxSize = this.size * 3;
        this.speed = this.type.speed;
        this.baseSpeed = this.speed;
        this.color = this.type.color;
        this.accent = this.type.accent || '#ffffff';
        this.glowColor = this.color + '66';
        this.score += this.getTierScore() * 2;
        this.eatCount = 0;
        this.evolutionProgress = 0;
        for (let i = 0; i < 20; i++) {
            this.evolveParticles.push({
                x: this.x, y: this.y,
                vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6,
                life: 1.0, color: this.color, size: 3 + Math.random() * 5
            });
        }
        this.maxTrailLength = (['mythic', 'boss'].includes(nextTier)) ? 15 : (nextTier === 'legendary') ? 10 : 5;
        return true;
    }

    update() {
        if (!this.alive) {
            this.deathTimer++;
            this.opacity = Math.max(0, this.opacity - 0.05);
            return this.deathTimer < 30;
        }

        // Predator lifespan
        if (this.isPredatorWave) {
            this.predatorLifespan--;
            if (this.predatorLifespan <= 0) {
                this.alive = false;
                return false;
            }
        }

        if (this.fadeIn) {
            this.opacity = Math.min(1, this.opacity + 0.02);
            if (this.opacity >= 1) this.fadeIn = false;
        }

        if (this.labelTimer > 0) this.labelTimer--;
        if (this.labelTimer <= 0) this.showLabel = false;

        this.wobble += this.wobbleSpeed;
        this.tailAngle += this.tailSpeed;

        if (this.isScared) {
            this.scaredTimer--;
            this.speed = this.baseSpeed * 2.5;
            if (this.scaredTimer <= 0) { this.isScared = false; this.speed = this.baseSpeed; }
        }

        if (this.isExcited) {
            this.excitedTimer--;
            if (this.excitedTimer <= 0) this.isExcited = false;
        }

        // Hunting
        if (this.huntTarget) {
            if (!this.huntTarget.alive) {
                this.huntTarget = null; this.isHunting = false;
            } else {
                const dx = this.huntTarget.x - this.x;
                const dy = this.huntTarget.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this.size * 0.6 + this.huntTarget.size * 0.3) {
                    const evolved = this.eatFish(this.huntTarget);
                    this.huntTarget = null; this.isHunting = false;
                    return { ate: true, evolved: evolved };
                } else {
                    this.vx += (dx / dist) * 0.15;
                    this.vy += (dy / dist) * 0.15;
                    this.direction = dx > 0 ? 1 : -1;
                }
            }
        }

        const maxV = this.speed * 2;
        this.vx = Math.max(-maxV, Math.min(maxV, this.vx));
        this.vy = Math.max(-maxV, Math.min(maxV, this.vy));
        this.x += this.vx;
        this.y += this.vy + Math.sin(this.wobble) * 0.3;
        this.vx *= 0.99;
        this.vy *= 0.98;
        if (Math.abs(this.vx) < this.speed * 0.3) this.vx = this.speed * this.direction;

        // Bounce (predator có thể vượt rìa rồi quay lại)
        const margin = this.isPredatorWave ? this.size * 5 : this.size * 2;
        if (this.x < -margin) { this.direction = 1; this.vx = Math.abs(this.vx); }
        if (this.x > this.canvas.width + margin) { this.direction = -1; this.vx = -Math.abs(this.vx); }
        if (this.y < 40) { this.y = 40; this.vy = Math.abs(this.vy); }
        if (this.y > this.canvas.height - 60) { this.y = this.canvas.height - 60; this.vy = -Math.abs(this.vy); }

        // Trail
        if (this.maxTrailLength > 0) {
            this.trail.push({ x: this.x, y: this.y, life: 1.0 });
            if (this.trail.length > this.maxTrailLength) this.trail.shift();
            this.trail.forEach(t => t.life -= 0.05);
        }

        this.evolveParticles = this.evolveParticles.filter(p => {
            p.x += p.vx; p.y += p.vy; p.life -= 0.03; p.vx *= 0.95; p.vy *= 0.95;
            return p.life > 0;
        });

        if (this.huntCooldown > 0) this.huntCooldown--;

        return true;
    }

    draw(ctx) {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;

        // Trail
        if (this.trail.length > 1) {
            for (const t of this.trail) {
                ctx.beginPath();
                ctx.arc(t.x, t.y, this.size * 0.3 * t.life, 0, Math.PI * 2);
                ctx.fillStyle = this.color + Math.floor(t.life * 40).toString(16).padStart(2, '0');
                ctx.fill();
            }
        }

        // Evolve particles
        this.evolveParticles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, '0');
            ctx.fill();
        });

        ctx.translate(this.x, this.y);
        if (this.isExcited) ctx.translate(Math.random() * 3 - 1.5, Math.random() * 3 - 1.5);
        ctx.scale(this.direction, 1);

        // Glow cho tier cao
        if (['epic', 'legendary', 'mythic', 'boss', 'predator'].includes(this.tier)) {
            const glowSize = this.tier === 'boss' ? 30 : this.tier === 'predator' ? 25 : this.tier === 'mythic' ? 22 : 15;
            const pulseSize = glowSize + Math.sin(this.wobble * 2) * 5;
            const gradient = ctx.createRadialGradient(0, 0, this.size * 0.3, 0, 0, this.size + pulseSize);
            gradient.addColorStop(0, this.color + '44');
            gradient.addColorStop(1, this.color + '00');
            ctx.beginPath();
            ctx.arc(0, 0, this.size + pulseSize, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        // ===== VẼ HÌNH DẠNG RIÊNG BIỆT =====
        const shapeName = this.type.shape || '_default';
        const drawFn = ShapeDrawer[shapeName] || ShapeDrawer._default;
        ctx.save();
        drawFn(ctx, this.size, this.color, this.tailAngle, this.accent);
        ctx.restore();

        // Evolution progress bar
        if (this.eatCount > 0 && this.getNextTier()) {
            const barW = this.size * 1.5;
            const barH = 4;
            const barY = -this.size * 0.7 - 12;
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(-barW / 2, barY, barW, barH);
            ctx.fillStyle = '#00ff88';
            ctx.fillRect(-barW / 2, barY, barW * Math.min(1, this.evolutionProgress), barH);
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.strokeRect(-barW / 2, barY, barW, barH);
        }

        ctx.restore();

        // Label
        if (this.showLabel || this.isHunting) {
            ctx.save();
            ctx.globalAlpha = this.showLabel ? Math.min(1, this.labelTimer / 30) : 0.7;
            ctx.font = `bold ${Math.max(10, this.size * 0.3)}px Arial`;
            ctx.textAlign = 'center';
                        var flagText = this.country;
            if (this.country && this.country.length === 2 && this.country !== '🌍') {
                try {
                    var first = 0x1F1E6 + this.country.toUpperCase().charCodeAt(0) - 65;
                    var second = 0x1F1E6 + this.country.toUpperCase().charCodeAt(1) - 65;
                    flagText = String.fromCodePoint(first) + String.fromCodePoint(second);
                } catch (e) {
                    flagText = this.country;
                }
            }
            // === VẼ LABEL VỚI CỜ HÌNH ẢNH ===
var labelName = this.username || 'Fish';
var fontSize = Math.max(10, Math.min(14, this.size * 0.3));
ctx.font = 'bold ' + fontSize + 'px Arial';

var flagImg = getFlagImage(this.country);
var flagW = 0;
var flagH = Math.round(fontSize * 0.85);
var flagGap = 3;
if (flagImg && flagImg.loaded) {
    flagW = Math.round(flagH * 1.5);
}

var textW = ctx.measureText(labelName).width;
var totalW = flagW + (flagW > 0 ? flagGap : 0) + textW;
var labelX = this.x - totalW / 2;
var labelY = this.y - this.size - 6;

// Background
ctx.fillStyle = 'rgba(0,0,0,0.5)';
ctx.fillRect(labelX - 4, labelY - fontSize / 2 - 4, totalW + 8, fontSize + 8);

// Flag
if (flagImg && flagImg.loaded) {
    ctx.drawImage(flagImg, labelX, labelY - flagH / 2, flagW, flagH);
    labelX += flagW + flagGap;
}

// Name
ctx.textAlign = 'left';
ctx.textBaseline = 'middle';
ctx.fillStyle = '#fff';
ctx.fillText(labelName, labelX, labelY);
ctx.textAlign = 'center';


            if (this.isHunting) {
                ctx.font = `${this.size * 0.4}px Arial`;
                ctx.fillText('🎯', this.x, this.y - this.size - 22);
            }
            if (this.isScared) {
                ctx.font = `${this.size * 0.4}px Arial`;
                ctx.fillText('😱', this.x, this.y - this.size - 22);
            }
            if (this.isPredatorWave) {
                ctx.font = `${this.size * 0.4}px Arial`;
                ctx.fillText('☠️', this.x, this.y - this.size - 22);
            }
            ctx.restore();
        }
    }
}
