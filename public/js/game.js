// ============================================
// GAME.JS - World Battle Aquarium v3.0
// Infinite Loop + Predator Wave + Gift System
// ============================================
// ===== GIFT DATA =====
var GIFT_TIERS_DATA = {
    'rose': { tier: 'tiny', coins: 1, emoji: '🌹', color: '#ff6b8a' },
    'gg': { tier: 'tiny', coins: 1, emoji: '✌️', color: '#66ff66' },
    'ice cream cone': { tier: 'tiny', coins: 1, emoji: '🍦', color: '#ffeaa7' },
    'ice cream': { tier: 'tiny', coins: 1, emoji: '🍦', color: '#ffeaa7' },
    'tiny dino': { tier: 'tiny', coins: 1, emoji: '🦕', color: '#a8e6cf' },
    'finger heart': { tier: 'common', coins: 5, emoji: '🫰', color: '#ff9ff3' },
    'heart me': { tier: 'common', coins: 5, emoji: '💕', color: '#ff6b8a' },
    'panda': { tier: 'common', coins: 5, emoji: '🐼', color: '#dfe6e9' },
    'sunflower': { tier: 'common', coins: 5, emoji: '🌻', color: '#fdcb6e' },
    'hi': { tier: 'common', coins: 5, emoji: '👋', color: '#74b9ff' },
    'hand heart': { tier: 'rare', coins: 10, emoji: '🫶', color: '#e17055' },
    'cheer you up': { tier: 'rare', coins: 15, emoji: '🎉', color: '#00cec9' },
    'perfume': { tier: 'rare', coins: 20, emoji: '🧴', color: '#a29bfe' },
    'sign language love': { tier: 'rare', coins: 25, emoji: '🤟', color: '#fd79a8' },
    'doughnut': { tier: 'epic', coins: 30, emoji: '🍩', color: '#e17055' },
    'donut': { tier: 'epic', coins: 30, emoji: '🍩', color: '#e17055' },
    'i love you': { tier: 'epic', coins: 49, emoji: '❤️', color: '#ff3838' },
    'concert': { tier: 'epic', coins: 50, emoji: '🎵', color: '#6c5ce7' },
    'confetti': { tier: 'legendary', coins: 100, emoji: '🎊', color: '#ffeaa7' },
    'sunglasses': { tier: 'legendary', coins: 199, emoji: '😎', color: '#fdcb6e' },
    'money rain': { tier: 'legendary', coins: 500, emoji: '💰', color: '#00b894' },
    'galaxy': { tier: 'mythic', coins: 1000, emoji: '🌌', color: '#6c5ce7' },
    'disco ball': { tier: 'mythic', coins: 1000, emoji: '🪩', color: '#dfe6e9' },
    'mermaid': { tier: 'mythic', coins: 2988, emoji: '🧜‍♀️', color: '#00cec9' },
    'airplane': { tier: 'boss', coins: 6000, emoji: '✈️', color: '#74b9ff' },
    'planet': { tier: 'boss', coins: 15000, emoji: '🪐', color: '#a29bfe' },
    'diamond flight': { tier: 'boss', coins: 18000, emoji: '💎', color: '#00cec9' },
    'lion': { tier: 'god', coins: 29999, emoji: '🦁', color: '#fdcb6e' },
    'tiktok universe': { tier: 'god', coins: 44999, emoji: '🌍', color: '#e056fd' },
    'universe': { tier: 'god', coins: 44999, emoji: '🌍', color: '#e056fd' }
};

var TIER_FISH_DATA = {
    'tiny': [
        { name: 'Plankton', emoji: '🦐', color: '#a8e6cf' },
        { name: 'Krill', emoji: '🦐', color: '#ffeaa7' },
        { name: 'Baby Shrimp', emoji: '🦐', color: '#fab1a0' }
    ],
    'common': [
        { name: 'Clownfish', emoji: '🐠', color: '#ff7675' },
        { name: 'Guppy', emoji: '🐟', color: '#74b9ff' },
        { name: 'Tetra', emoji: '🐟', color: '#00cec9' }
    ],
    'rare': [
        { name: 'Seahorse', emoji: '🐡', color: '#fdcb6e' },
        { name: 'Angelfish', emoji: '🐠', color: '#e17055' },
        { name: 'Butterfly Fish', emoji: '🦋', color: '#a29bfe' }
    ],
    'epic': [
        { name: 'Lionfish', emoji: '🦁', color: '#d63031' },
        { name: 'Pufferfish', emoji: '🐡', color: '#00b894' },
        { name: 'Electric Eel', emoji: '⚡', color: '#fdcb6e' },
        { name: 'Sea Turtle', emoji: '🐢', color: '#55a68e' }
    ],
    'legendary': [
        { name: 'Dolphin', emoji: '🐬', color: '#74b9ff' },
        { name: 'Manta Ray', emoji: '🦈', color: '#636e72' },
        { name: 'Octopus', emoji: '🐙', color: '#e056fd' },
        { name: 'Swordfish', emoji: '⚔️', color: '#0984e3' }
    ],
    'mythic': [
        { name: 'Hammerhead', emoji: '🔨', color: '#636e72' },
        { name: 'Great White', emoji: '🦈', color: '#b2bec3' },
        { name: 'Blue Whale', emoji: '🐋', color: '#0984e3' },
        { name: 'Orca', emoji: '🐋', color: '#2d3436' }
    ],
    'boss': [
        { name: 'Sea Dragon', emoji: '🐉', color: '#e17055' },
        { name: 'Kraken', emoji: '🦑', color: '#6c5ce7' }
    ],
    'god': [
        { name: 'Leviathan', emoji: '👑', color: '#ffd700' },
        { name: 'Phoenix Sea God', emoji: '🔱', color: '#e056fd' }
    ]
};

var TIER_SIZES_DATA = {
    'tiny': { min: 8, max: 15 },
    'common': { min: 15, max: 25 },
    'rare': { min: 25, max: 40 },
    'epic': { min: 40, max: 60 },
    'legendary': { min: 60, max: 90 },
    'mythic': { min: 90, max: 130 },
    'boss': { min: 130, max: 180 },
    'god': { min: 180, max: 250 }
};

class WorldBattleAquarium {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // === CÁC HỆ THỐNG ===
        this.audio = new AudioSystem();
        this.mc = new AutoMC();
        this.fishes = [];
        this.bubbles = [];
        this.seaweeds = [];
        this.particles = [];
        this.shockwaves = [];

        // === THỐNG KÊ ===
        this.stats = {
            totalViewers: 0,
            totalGifts: 0,
            totalLikes: 0,
            totalFish: 0,
            peakViewers: 0,
        };

        // === HIỆU SUẤT ===
        this.MAX_FISH = 300;
        this.MAX_BUBBLES = 200;
        this.MAX_PARTICLES = 150;
        this.HUNT_CHECK_INTERVAL = 30;
        this.huntCheckCounter = 0;

        // === VIEWER MILESTONE ===
        this.unlockedTiers = ['tiny', 'common'];
        this.lastMilestone = 0;

        // === COMBO / STREAK ===
        this.giftStreak = 0;
        this.lastGiftTime = 0;
        this.streakMultiplier = 1;

        // === BOSS ===
        this.bossActive = false;
        this.bossTimer = 0;

        // === PLAYER SCORES ===
        this.playerScores = {};

        // === INFINITE LOOP ===
        this.loopCheckInterval = 300;
        this.loopCheckCounter = 0;
        this.predatorWaveCount = 0;
        this.predatorWaveActive = false;
        this.bigFishThreshold = 40;

        // === SCREEN SHAKE ===
        this.screenShake = 0;

        // === LEADERBOARD CACHE ===
        this._lastLeaderboardUpdate = 0;
        this._lastLeaderboardFingerprint = '';

        // MC leaderboard callback
        var self = this;
        this.mc.onLeaderboardRequest = function() {
            var sorted = Object.values(self.playerScores)
                .filter(function(p) { return p.score > 0; })
                .sort(function(a, b) { return b.score - a.score; });
            if (sorted.length > 0) {
                return {
                    username: sorted[0].username,
                    country: sorted[0].country,
                    score: sorted[0].score,
                };
            }
            return null;
        };

        // === KHỞI TẠO ===
        this.createSeaweeds();
        this.connectWebSocket();
        this.gameLoop();

        // Sinh bubble tự nhiên
        var self2 = this;
        setInterval(function() {
            if (self2.bubbles.length < self2.MAX_BUBBLES) {
                self2.bubbles.push(new Bubble(self2.canvas));
            }
        }, 500);
 // === CÁ MỒI TỰ ĐỘNG ===
       this.initSmartDecoy();
        console.log('🌊 World Battle Aquarium v3.0 initialized!');
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createSeaweeds() {
        this.seaweeds = [];
        var count = Math.floor(this.canvas.width / 80);
        for (var i = 0; i < count; i++) {
            this.seaweeds.push({
                x: 30 + i * 80 + Math.random() * 40,
                height: 60 + Math.random() * 80,
                segments: 5 + Math.floor(Math.random() * 4),
                phase: Math.random() * Math.PI * 2,
                speed: 0.01 + Math.random() * 0.02,
                color: 'hsl(' + (120 + Math.random() * 40) + ', 70%, ' + (25 + Math.random() * 15) + '%)',
            });
        }
    }
  // ===== CÁ MỒI - DECOY SYSTEM =====
    // ============================================
// SMART DECOY SYSTEM - Hệ thống chim mồi thông minh
// ============================================

initSmartDecoy() {
    this.decoy = {
        enabled: true,
        phase: 1,              // Giai đoạn 1, 2, 3
        startTime: Date.now(),
        realPlayerCount: 0,    // Số người thật đã tặng
        realPlayers: new Set(),// Danh sách người thật
        botFishes: [],         // Danh sách cá bot
        lastBotAction: 0,
        lastHunterSpawn: 0,
        lastBossSpawn: 0,
        lastCallToAction: 0,
    };

    // Spawn cá ban đầu
    this.spawnInitialDecoys();

    // Bắt đầu vòng lặp decoy
    this.startDecoyLoop();

    console.log('🎭 Smart Decoy System: ACTIVE');
}

spawnInitialDecoys() {
    var decoyData = [
        // Cá lớn (tạo kịch tính)
        { tier: 'legendary', count: 1 },
        { tier: 'epic', count: 2 },
        { tier: 'rare', count: 3 },
        // Cá nhỏ (mồi cho cá lớn ăn)
        { tier: 'common', count: 5 },
        { tier: 'tiny', count: 8 },
    ];

    var names = [
        'Ocean_King', 'Sea_Master', 'Wave_Pro', 'Shark_Fan',
        'Deep_Diver', 'Coral_Star', 'Reef_Queen', 'Tide_Boss',
        'Pearl_Hunter', 'Storm_Fish', 'Aqua_Lord', 'Blue_Wave',
        'Sea_Dragon', 'Nemo_Fan', 'Whale_Song', 'Dolphin_Rider',
        'Coral_Lover', 'Reef_Walker', 'Aqua_King', 'Ocean_Explorer'
    ];
    var countries = ['VN', 'US', 'JP', 'KR', 'BR', 'DE', 'FR', 'GB', 'TH', 'IN', 'PH', 'ID', 'MX', 'IT', 'ES', 'AU', 'CA', 'TR', 'RU', 'EG'];
    var nameIdx = 0;

    for (var d = 0; d < decoyData.length; d++) {
        for (var i = 0; i < decoyData[d].count; i++) {
            var name = names[nameIdx % names.length];
            var country = countries[nameIdx % countries.length];
            nameIdx++;

            try {
                var fish = new Fish(this.canvas, name, country, decoyData[d].tier, 'decoy');
                fish.isDecoy = true;
                fish.score = Math.floor(Math.random() * 50) + 5;

                // Cá lớn spawn ở giữa, cá nhỏ spawn ngẫu nhiên
                if (decoyData[d].tier === 'legendary' || decoyData[d].tier === 'epic') {
                    fish.x = this.canvas.width * (0.3 + Math.random() * 0.4);
                    fish.y = this.canvas.height * (0.3 + Math.random() * 0.4);
                }

                this.fishes.push(fish);
                this.decoy.botFishes.push(fish);
            } catch (e) {
                console.error('Decoy spawn error:', e);
            }
        }
    }

    console.log('🐟 Spawned ' + this.decoy.botFishes.length + ' decoy fish');
}

startDecoyLoop() {
    var self = this;

    // === Vòng lặp chính: mỗi 3 giây ===
    setInterval(function() {
        if (!self.decoy.enabled) return;

        var now = Date.now();
        var elapsed = (now - self.decoy.startTime) / 1000; // giây
        var aliveFish = self.fishes.filter(function(f) { return f.alive; }).length;
        var aliveDecoys = self.decoy.botFishes.filter(function(f) { return f.alive; }).length;

        // === CẬP NHẬT PHASE ===
        if (self.decoy.realPlayerCount >= 10 || elapsed > 900) {
            self.decoy.phase = 3;
        } else if (self.decoy.realPlayerCount >= 3 || elapsed > 300) {
            self.decoy.phase = 2;
        } else {
            self.decoy.phase = 1;
        }

        // === PHASE 1: Sôi động tối đa (0-5 phút, < 3 người thật) ===
        if (self.decoy.phase === 1) {

            // Thêm cá nhỏ nếu quá ít
            if (aliveFish < 15 && now - self.decoy.lastBotAction > 5000) {
                self.spawnDecoyFish(['tiny', 'common', 'rare']);
                self.decoy.lastBotAction = now;
            }

            // Thêm hunter cá lớn mỗi 20 giây
            if (now - self.decoy.lastHunterSpawn > 20000) {
                self.spawnDecoyHunter();
                self.decoy.lastHunterSpawn = now;
            }

            // Boss mỗi 60 giây
            if (now - self.decoy.lastBossSpawn > 60000 && elapsed > 15) {
                self.spawnDecoyBoss();
                self.decoy.lastBossSpawn = now;
            }

            // Kêu gọi tặng quà mỗi 25 giây
            if (now - self.decoy.lastCallToAction > 25000) {
                self.showCallToAction();
                self.decoy.lastCallToAction = now;
            }
        }

        // === PHASE 2: Giảm dần bot (5-15 phút, 3-10 người thật) ===
        else if (self.decoy.phase === 2) {

            // Chỉ thêm cá nếu quá ít
            if (aliveFish < 8 && now - self.decoy.lastBotAction > 10000) {
                self.spawnDecoyFish(['tiny', 'common']);
                self.decoy.lastBotAction = now;
            }

            // Hunter ít hơn
            if (now - self.decoy.lastHunterSpawn > 40000 && aliveDecoys < 5) {
                self.spawnDecoyHunter();
                self.decoy.lastHunterSpawn = now;
            }

            // Kêu gọi ít hơn
            if (now - self.decoy.lastCallToAction > 45000) {
                self.showCallToAction();
                self.decoy.lastCallToAction = now;
            }
        }

        // === PHASE 3: Tắt bot (15+ phút hoặc đủ người) ===
        else {
            // Không spawn thêm bot
            // Chỉ giữ kêu gọi nhẹ
            if (now - self.decoy.lastCallToAction > 60000) {
                self.showCallToAction();
                self.decoy.lastCallToAction = now;
            }
        }

    }, 3000);

    // === Fake engagement: giả lập like/score mỗi 8 giây ===
    setInterval(function() {
        if (!self.decoy.enabled || self.decoy.phase === 3) return;

        var aliveDecoys = self.decoy.botFishes.filter(function(f) { return f.alive; });
        if (aliveDecoys.length === 0) return;

        // Random 1-3 con cá bot tăng score
        var count = Math.min(1 + Math.floor(Math.random() * 3), aliveDecoys.length);
        for (var i = 0; i < count; i++) {
            var fish = aliveDecoys[Math.floor(Math.random() * aliveDecoys.length)];
            fish.score = (fish.score || 0) + Math.floor(Math.random() * 5) + 1;
        }
    }, 8000);
}

spawnDecoyFish(tiers) {
    var tier = tiers[Math.floor(Math.random() * tiers.length)];
    var names = ['Lucky_Fish', 'Star_Wave', 'Moon_Sea', 'Sun_Reef', 'Cool_Fin', 'Happy_Gill', 'Swift_Tail', 'Bright_Scale'];
    var countries = ['VN', 'US', 'JP', 'KR', 'BR', 'TH', 'FR', 'DE'];

    var name = names[Math.floor(Math.random() * names.length)];
    var country = countries[Math.floor(Math.random() * countries.length)];

    try {
        var fish = new Fish(this.canvas, name, country, tier, 'decoy');
        fish.isDecoy = true;
        fish.score = Math.floor(Math.random() * 10) + 1;
        this.fishes.push(fish);
        this.decoy.botFishes.push(fish);
    } catch (e) {}
}

spawnDecoyHunter() {
    var tiers = ['rare', 'epic', 'legendary'];
    var tier = tiers[Math.floor(Math.random() * tiers.length)];
    var names = ['HUNTER_X', 'Predator_Pro', 'Mega_Shark', 'Alpha_Fish', 'Boss_Wave'];
    var countries = ['US', 'JP', 'KR', 'GB', 'DE'];

    var name = names[Math.floor(Math.random() * names.length)];
    var country = countries[Math.floor(Math.random() * countries.length)];

    try {
        var fish = new Fish(this.canvas, name, country, tier, 'hunter');
        fish.isDecoy = true;
        fish.isHunting = true;
        fish.score = Math.floor(Math.random() * 80) + 20;

        // Spawn từ cạnh màn hình
        var side = Math.floor(Math.random() * 4);
        if (side === 0) { fish.x = -50; fish.y = Math.random() * this.canvas.height; }
        else if (side === 1) { fish.x = this.canvas.width + 50; fish.y = Math.random() * this.canvas.height; }
        else if (side === 2) { fish.x = Math.random() * this.canvas.width; fish.y = -50; }
        else { fish.x = Math.random() * this.canvas.width; fish.y = this.canvas.height + 50; }

        this.fishes.push(fish);
        this.decoy.botFishes.push(fish);

        // MC thông báo
        if (this.mc) {
            this.mc.speak('Watch out! A hunter just entered the ocean!', 2, 'warning');
        }
    } catch (e) {}
}

spawnDecoyBoss() {
    var names = ['OCEAN_KING', 'SEA_TITAN', 'DEEP_LORD'];
    var name = names[Math.floor(Math.random() * names.length)];

    try {
        var fish = new Fish(this.canvas, name, '🌍', 'mythic', 'boss');
        fish.isDecoy = true;
        fish.isHunting = true;
        fish.score = Math.floor(Math.random() * 200) + 100;
        fish.x = this.canvas.width / 2;
        fish.y = this.canvas.height / 2;

        this.fishes.push(fish);
        this.decoy.botFishes.push(fish);

        // Hiệu ứng
        if (this.mc) {
            this.mc.speak('WARNING! A BOSS has appeared! Send gifts to defeat it!', 0, 'epic');
        }

        // Screen shake
        if (typeof this.screenShake === 'function') {
            this.screenShake(10, 1000);
        }
    } catch (e) {}
}

showCallToAction() {
    var messages = [
        '🎁 Send a gift to spawn YOUR fish!',
        '🐟 Bigger gift = BIGGER fish!',
        '👑 Will YOU be the Ocean Champion?',
        '🔥 Drop a gift and join the battle!',
        '💎 Legendary gifts spawn LEGENDARY fish!',
        '⚔️ Your fish is hungry! Feed it with gifts!',
    ];
    var msg = messages[Math.floor(Math.random() * messages.length)];

    // Hiển thị notification
    var notify = document.getElementById('evolution-notify');
    if (notify) {
        notify.textContent = msg;
        notify.classList.add('show');
        setTimeout(function() {
            notify.classList.remove('show');
        }, 4000);
    }
}

// Gọi khi có người thật tặng quà/like
registerRealPlayer(username) {
    if (!this.decoy) return;
    if (!this.decoy.realPlayers.has(username)) {
        this.decoy.realPlayers.add(username);
        this.decoy.realPlayerCount = this.decoy.realPlayers.size;
        console.log('👤 Real player: ' + username + ' (total: ' + this.decoy.realPlayerCount + ')');
    }
}

    // ===== WEBSOCKET =====
    connectWebSocket() {
        var protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
        this.ws = new WebSocket(protocol + '//' + location.host);

        var self = this;

        this.ws.onopen = function() {
            console.log('✅ WebSocket connected');
        };

        this.ws.onmessage = function(event) {
            try {
                var data = JSON.parse(event.data);
                self.handleEvent(data);
            } catch (e) {
                console.error('Parse error:', e);
            }
        };

        this.ws.onclose = function() {
            console.log('❌ WebSocket disconnected, reconnecting...');
            setTimeout(function() {
                self.connectWebSocket();
            }, 3000);
        };
    }

    handleEvent(data) {
        switch (data.type) {
            case 'like':
                this.onLike(data);
                break;
            case 'gift':
                this.onGift(data);
                break;
            case 'chat':
                this.onChat(data);
                break;
            case 'member':
                this.onMemberJoin(data);
                break;
            case 'roomUser':
                this.onRoomUpdate(data);
                break;
        }
    }

    // ===== SỰ KIỆN: LIKE =====
    onLike(data) {
		this.registerRealPlayer(username);
        this.stats.totalLikes += (data.likeCount || 1);
        var count = Math.min(data.likeCount || 1, 5);
        for (var i = 0; i < count; i++) {
            if (this.fishes.length < this.MAX_FISH) {
                var fish = new Fish(
                    this.canvas,
                    data.username || 'Viewer',
                    data.country || '🌍',
                    'tiny',
                    'Like'
                );
                this.fishes.push(fish);
            }
        }

        for (var j = 0; j < 3; j++) {
            if (this.bubbles.length < this.MAX_BUBBLES) {
                this.bubbles.push(new Bubble(this.canvas));
            }
        }

        this.audio.playBubble();
        if (this.mc) this.mc.onLike(data.username);
        this.updateFeedUI('💖 ' + (data.username || 'Viewer') + ' liked!');
    }

    // ===== GIFT HELPER METHODS =====
    getGiftTier(giftName, coins) {
        var name = (giftName || '').toLowerCase().trim();
        var info = GIFT_TIERS_DATA[name];
        if (info) return info.tier;
        var c = Number(coins) || 1;
        if (c >= 30000) return 'god';
        if (c >= 10000) return 'boss';
        if (c >= 1000) return 'mythic';
        if (c >= 100) return 'legendary';
        if (c >= 30) return 'epic';
        if (c >= 10) return 'rare';
        if (c >= 5) return 'common';
        return 'tiny';
    }

    getRandomFishForTier(tier) {
        var fishList = TIER_FISH_DATA[tier] || TIER_FISH_DATA['tiny'];
        var fish = fishList[Math.floor(Math.random() * fishList.length)];
        var sizes = TIER_SIZES_DATA[tier] || TIER_SIZES_DATA['tiny'];
        return {
            name: fish.name,
            emoji: fish.emoji,
            color: fish.color,
            tier: tier,
            size: sizes.min + Math.random() * (sizes.max - sizes.min)
        };
    }

    // ===== GIFT POPUP =====
    showGiftPopup(username, giftName, giftEmoji, tier, fishInfo, coins) {
        var tierColors = {
            'tiny':      { bg: 'rgba(168,230,207,0.9)', border: '#a8e6cf', text: '#2d3436', glow: 'none' },
            'common':    { bg: 'rgba(116,185,255,0.9)', border: '#74b9ff', text: '#fff', glow: 'none' },
            'rare':      { bg: 'rgba(162,155,254,0.9)', border: '#a29bfe', text: '#fff', glow: '0 0 15px rgba(162,155,254,0.5)' },
            'epic':      { bg: 'rgba(108,92,231,0.9)', border: '#6c5ce7', text: '#fff', glow: '0 0 25px rgba(108,92,231,0.6)' },
            'legendary': { bg: 'rgba(253,203,110,0.95)', border: '#ffd700', text: '#2d3436', glow: '0 0 35px rgba(253,203,110,0.7)' },
            'mythic':    { bg: 'linear-gradient(135deg, rgba(108,92,231,0.95), rgba(224,86,253,0.95))', border: '#e056fd', text: '#fff', glow: '0 0 50px rgba(224,86,253,0.8)' },
            'boss':      { bg: 'linear-gradient(135deg, rgba(214,48,49,0.95), rgba(225,112,85,0.95))', border: '#ff3838', text: '#fff', glow: '0 0 60px rgba(214,48,49,0.8)' },
            'god':       { bg: 'linear-gradient(135deg, rgba(255,215,0,0.95), rgba(224,86,253,0.95), rgba(255,215,0,0.95))', border: '#ffd700', text: '#fff', glow: '0 0 80px rgba(255,215,0,0.9)' }
        };

        var tc = tierColors[tier] || tierColors['tiny'];
        var coinsDisplay = Number(coins) >= 1000 ? (Number(coins) / 1000).toFixed(1) + 'K' : coins;

        var popup = document.createElement('div');
        popup.className = 'gift-popup gift-popup-' + tier;
        popup.innerHTML =
            '<div class="gift-popup-inner">' +
                '<div class="gift-popup-tier">' + tier.toUpperCase() + '</div>' +
                '<div class="gift-popup-gift-icon">' + (giftEmoji || '🎁') + '</div>' +
                '<div class="gift-popup-info">' +
                    '<div class="gift-popup-user">' + (username || 'Anonymous') + '</div>' +
                    '<div class="gift-popup-gift-name">sent ' + (giftName || 'a gift') +
                    ' <span class="gift-popup-coins">(' + coinsDisplay + ' coins)</span></div>' +
                '</div>' +
                '<div class="gift-popup-arrow">➜</div>' +
                '<div class="gift-popup-fish">' +
                    '<div class="gift-popup-fish-icon">' + fishInfo.emoji + '</div>' +
                    '<div class="gift-popup-fish-name">' + fishInfo.name + '</div>' +
                '</div>' +
            '</div>';

        var inner = popup.querySelector('.gift-popup-inner');
        if (tc.bg.indexOf('gradient') >= 0) {
            inner.style.background = tc.bg;
        } else {
            inner.style.backgroundColor = tc.bg;
        }
        inner.style.borderColor = tc.border;
        inner.style.color = tc.text;
        inner.style.boxShadow = tc.glow;

        var container = document.getElementById('gift-popup-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'gift-popup-container';
            document.body.appendChild(container);
        }

        container.appendChild(popup);
        setTimeout(function() { popup.classList.add('gift-popup-show'); }, 50);

        var durations = { tiny: 3000, common: 3500, rare: 4000, epic: 5000, legendary: 6000, mythic: 7000, boss: 8000, god: 10000 };
        var dur = durations[tier] || 3000;

        setTimeout(function() {
            popup.classList.remove('gift-popup-show');
            popup.classList.add('gift-popup-hide');
            setTimeout(function() {
                if (popup.parentNode) popup.parentNode.removeChild(popup);
            }, 500);
        }, dur);

        while (container.children.length > 5) {
            container.removeChild(container.children[0]);
        }
    }

    // ===== SỰ KIỆN: GIFT =====
    onGift(data) {
		this.registerRealPlayer(username);
        this.stats.totalGifts++;
        var username = data.username || 'Anonymous';
        var country = data.country || '🌍';
        var giftName = data.giftName || 'Gift';
        var coins = Number(data.coins) || Number(data.diamondCount) || 1;

        // Xác định tier
        var tier = this.getGiftTier(giftName, coins);

        // Get gift emoji
        var giftInfo = GIFT_TIERS_DATA[(giftName || '').toLowerCase().trim()];
        var giftEmoji = giftInfo ? giftInfo.emoji : '🎁';

        // Get random fish cho tier này
        var fishInfo = this.getRandomFishForTier(tier);

        // Hiển thị Gift Popup
        this.showGiftPopup(username, giftName, giftEmoji, tier, fishInfo, coins);

        // Tạo cá
        if (this.fishes.length < this.MAX_FISH) {
            var fish = new Fish(this.canvas, username, country, tier, giftName);

            fish.size = fishInfo.size;
            fish.baseSize = fishInfo.size;
            fish.color = fishInfo.color;
            fish.tier = tier;
            fish.maxSize = fishInfo.size * 3;
            this.fishes.push(fish);

            // Hiệu ứng theo tier
            if (tier === 'god' || tier === 'boss') {
                this.screenShake = 30;
                this.createShockwave(fish.x, fish.y);
                this.createShockwave(fish.x + 50, fish.y - 30);
                this.createShockwave(fish.x - 50, fish.y + 30);
                for (var p = 0; p < 30; p++) {
                    this.particles.push({
                        x: fish.x + (Math.random() - 0.5) * 100,
                        y: fish.y + (Math.random() - 0.5) * 100,
                        vx: (Math.random() - 0.5) * 6,
                        vy: (Math.random() - 0.5) * 6,
                        life: 1, color: fishInfo.color, size: 5
                    });
                }
            } else if (tier === 'mythic' || tier === 'legendary') {
                this.screenShake = 15;
                this.createShockwave(fish.x, fish.y);
                for (var p2 = 0; p2 < 15; p2++) {
                    this.particles.push({
                        x: fish.x + (Math.random() - 0.5) * 60,
                        y: fish.y + (Math.random() - 0.5) * 60,
                        vx: (Math.random() - 0.5) * 4,
                        vy: (Math.random() - 0.5) * 4,
                        life: 1, color: fishInfo.color, size: 4
                    });
                }
            } else if (tier === 'epic' || tier === 'rare') {
                for (var p3 = 0; p3 < 8; p3++) {
                    this.particles.push({
                        x: fish.x + (Math.random() - 0.5) * 40,
                        y: fish.y + (Math.random() - 0.5) * 40,
                        vx: (Math.random() - 0.5) * 3,
                        vy: (Math.random() - 0.5) * 3,
                        life: 1, color: fishInfo.color, size: 3
                    });
                }
            }
        }

        // Âm thanh
        if (tier === 'god' || tier === 'boss' || tier === 'mythic') {
            this.audio.playGiftLegendary();
        } else if (tier === 'legendary' || tier === 'epic') {
            this.audio.playGiftBig();
        } else {
            this.audio.playGift();
        }

        // Cập nhật điểm
        this.updatePlayerScore(username, country, coins);

        // MC
        if (this.mc) {
            this.mc.onGift(username, country, fishInfo.name, tier);
        }

        // Feed
        var tierIcons = { tiny: '🐟', common: '🐠', rare: '✨', epic: '💜', legendary: '⭐', mythic: '🌟', boss: '🔥', god: '👑' };
        this.updateFeedUI((tierIcons[tier] || '🐟') + ' ' + username + ' sent ' + giftName + ' → ' + fishInfo.emoji + ' ' + fishInfo.name);

        // Thông báo tier cao
        if (tier === 'god') {
            this.showEvolutionNotify('👑 GOD TIER! ' + username + ' summoned ' + fishInfo.name + '!');
        } else if (tier === 'boss') {
            this.showEvolutionNotify('🔥 BOSS! ' + username + ' summoned ' + fishInfo.name + '!');
        } else if (tier === 'mythic') {
            this.showEvolutionNotify('🌟 MYTHIC! ' + username + ' summoned ' + fishInfo.name + '!');
        }

        // Gift streak
        var now = Date.now();
        if (now - this.lastGiftTime < 10000) {
            this.giftStreak++;
            this.streakMultiplier = 1 + this.giftStreak * 0.1;
        } else {
            this.giftStreak = 1;
            this.streakMultiplier = 1;
        }
        this.lastGiftTime = now;
    }

    // ===== SỰ KIỆN: CHAT =====
    onChat(data) {
        var msg = (data.comment || '').toLowerCase();

        if (msg.indexOf('boss') !== -1) {
            this.bossTimer++;
            if (this.bossTimer >= 10 && !this.bossActive) {
                this.spawnBoss();
            }
        }

        this.updateFeedUI('💬 ' + (data.username || 'User') + ': ' + (data.comment || ''));
    }

    // ===== SỰ KIỆN: MEMBER JOIN =====
    onMemberJoin(data) {
        this.stats.totalViewers++;
        if (this.mc) this.mc.onJoin(data.username || 'Viewer', data.country || '🌍');
        this.audio.playSplash();
        this.updateFeedUI('👋 ' + (data.username || 'Viewer') + ' joined!');
        this.checkMilestone();
    }

    // ===== SỰ KIỆN: ROOM UPDATE =====
    onRoomUpdate(data) {
        var count = data.viewerCount || 0;
        this.stats.totalViewers = count;
        if (count > this.stats.peakViewers) {
            this.stats.peakViewers = count;
        }

        var el = document.getElementById('viewer-count');
        if (el) {
            el.textContent = count.toLocaleString();
        }

        this.checkMilestone();
    }

    // ===== MILESTONE SYSTEM =====
    checkMilestone() {
        var count = this.stats.totalViewers;
        for (var i = 0; i < VIEWER_MILESTONES.length; i++) {
            var ms = VIEWER_MILESTONES[i];
            if (count >= ms.viewers && this.unlockedTiers.indexOf(ms.unlock) === -1) {
                this.unlockedTiers.push(ms.unlock);
                if (this.mc) this.mc.onMilestone(ms.viewers);
                this.showEvolutionNotify(ms.message);
                this.updateFeedUI('🏆 ' + ms.message);

                for (var j = 0; j < 30; j++) {
                    this.particles.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        vx: (Math.random() - 0.5) * 4,
                        vy: (Math.random() - 0.5) * 4,
                        life: 1.0,
                        color: '#ffdd00',
                        size: 3 + Math.random() * 6,
                    });
                }
            }
        }
    }

    // ===== BOSS SYSTEM =====
    spawnBoss() {
        if (this.bossActive) return;
        this.bossActive = true;

        var boss = new Fish(this.canvas, '🏴‍☠️ BOSS', '🌍', 'boss', 'Boss');
        boss.x = this.canvas.width / 2;
        boss.y = this.canvas.height / 2;
        this.fishes.push(boss);

        if (this.mc) this.mc.onBossSpawn();
        this.audio.playGiftLegendary();
        this.createShockwave(boss.x, boss.y);
        this.showEvolutionNotify('⚠️ BOSS HAS APPEARED!');

        var self = this;
        setTimeout(function() {
            boss.alive = false;
            self.bossActive = false;
            self.bossTimer = 0;
            self.showEvolutionNotify('🎉 The Boss has been defeated!');
        }, 120000);
    }

    // ===== PREDATOR WAVE (Infinite Loop) =====
    checkPredatorWave() {
        var aliveFish = [];
        for (var i = 0; i < this.fishes.length; i++) {
            if (this.fishes[i].alive && !this.fishes[i].isPredatorWave) {
                aliveFish.push(this.fishes[i]);
            }
        }

        if (aliveFish.length < 5) return;

        var totalSize = 0;
        var maxSize = 0;
        var bigCount = 0;

        for (var j = 0; j < aliveFish.length; j++) {
            totalSize += aliveFish[j].size;
            if (aliveFish[j].size > maxSize) {
                maxSize = aliveFish[j].size;
            }
            if (aliveFish[j].size > this.bigFishThreshold) {
                bigCount++;
            }
        }

        var avgSize = totalSize / aliveFish.length;
        var bigFishRatio = bigCount / aliveFish.length;

        if (bigFishRatio > 0.6 || avgSize > this.bigFishThreshold) {
            this.spawnPredatorWave(maxSize);
        }
    }

    spawnPredatorWave(currentMaxSize) {
        if (this.predatorWaveActive) return;
        this.predatorWaveActive = true;
        this.predatorWaveCount++;

        var waveSize = Math.min(3, 1 + Math.floor(this.predatorWaveCount / 3));

        if (this.mc) this.mc.onPredatorWarning();
        this.showEvolutionNotify('🌊 PREDATOR WAVE #' + this.predatorWaveCount + ' incoming!');
        this.screenShake = 30;

        var self = this;
        var capturedMaxSize = currentMaxSize;

        setTimeout(function() {
            if (self.mc) self.mc.onPredatorArrive();

            for (var i = 0; i < waveSize; i++) {
                (function(idx) {
                    setTimeout(function() {
                        var predator = new Fish(self.canvas, '☠️ HUNTER', '🌊', 'predator', 'Wave');
                        predator.size = capturedMaxSize * 1.5 + idx * 10;
                        predator.baseSize = predator.size;
                        predator.maxSize = predator.size * 2;
                        predator.isPredatorWave = true;
                        self.fishes.push(predator);
                        self.audio.playGiftLegendary();
                        self.createShockwave(predator.x, predator.y);
                    }, idx * 3000);
                })(i);
            }

            self.bigFishThreshold = capturedMaxSize * 1.5 + 20;

            setTimeout(function() {
                self.predatorWaveActive = false;
                for (var k = 0; k < self.fishes.length; k++) {
                    var f = self.fishes[k];
                    if (f.isPredatorWave && f.alive) {
                        f.alive = false;
                        for (var p = 0; p < 10; p++) {
                            self.particles.push({
                                x: f.x + (Math.random() - 0.5) * 30,
                                y: f.y + (Math.random() - 0.5) * 30,
                                vx: (Math.random() - 0.5) * 3,
                                vy: (Math.random() - 0.5) * 3,
                                life: 1,
                                color: f.color || '#ff0000',
                                size: 4,
                            });
                        }
                    }
                }
                if (self.mc) self.mc.onPredatorClear();
                self.showEvolutionNotify('✅ Predator Wave cleared!');
            }, 45000);
        }, 2000);
    }

    // ===== PLAYER SCORES =====
    updatePlayerScore(username, country, coins) {
        if (!username) return;
        var c = Number(coins) || 1;

        if (!this.playerScores[username]) {
            this.playerScores[username] = {
                username: username,
                country: country || '🌍',
                score: 0,
                fishCount: 0,
                lastGiftTime: Date.now(),
            };
        }

        this.playerScores[username].score += c;
        this.playerScores[username].fishCount++;
        this.playerScores[username].lastGiftTime = Date.now();

        if (country && country !== '🌍') {
            this.playerScores[username].country = country;
        }
    }

    // ===== GAME LOOP =====
    gameLoop() {
        this.update();
        this.draw();
        var self = this;
        requestAnimationFrame(function() {
            self.gameLoop();
        });
    }

    update() {
        if (this.screenShake > 0) this.screenShake--;

        // Update fishes
        for (var i = this.fishes.length - 1; i >= 0; i--) {
            var fish = this.fishes[i];
            if (!fish.alive) {
                if (fish.deathTimer !== undefined) {
                    fish.deathTimer = (fish.deathTimer || 0) + 1;
                    if (fish.deathTimer > 30) {
                        this.fishes.splice(i, 1);
                    }
                } else {
                    this.fishes.splice(i, 1);
                }
                continue;
            }

            var result = fish.update();

            if (typeof result === 'object' && result) {
                if (result.ate) {
                    this.audio.playEat();
                    for (var p = 0; p < 8; p++) {
                        this.particles.push({
                            x: fish.x,
                            y: fish.y,
                            vx: (Math.random() - 0.5) * 5,
                            vy: (Math.random() - 0.5) * 5,
                            life: 1.0,
                            color: fish.color || '#ffffff',
                            size: 2 + Math.random() * 3,
                        });
                    }
                }
                if (result.evolved) {
                    this.audio.playEvolution();
                    if (this.mc) this.mc.onEvolution(fish.username, fish.type ? fish.type.name : 'Unknown');
                    this.showEvolutionNotify('⬆️ ' + fish.username + ' evolved!');
                    this.createShockwave(fish.x, fish.y);
                }
            }
        }

        // Hunting check
        this.huntCheckCounter++;
        if (this.huntCheckCounter >= this.HUNT_CHECK_INTERVAL) {
            this.huntCheckCounter = 0;
            this.performHuntCheck();
        }

        // Infinite Loop check
        this.loopCheckCounter++;
        if (this.loopCheckCounter >= this.loopCheckInterval) {
            this.loopCheckCounter = 0;
            this.checkPredatorWave();
        }

        // Update bubbles
        var newBubbles = [];
        for (var b = 0; b < this.bubbles.length; b++) {
            this.bubbles[b].update();
            if (this.bubbles[b].y + this.bubbles[b].radius > 0) {
                newBubbles.push(this.bubbles[b]);
            }
        }
        this.bubbles = newBubbles;

        // Update particles
        var newParticles = [];
        for (var pp = 0; pp < this.particles.length; pp++) {
            var pt = this.particles[pp];
            pt.x += pt.vx;
            pt.y += pt.vy;
            pt.life -= 0.02;
            pt.vx *= 0.97;
            pt.vy *= 0.97;
            if (pt.life > 0) {
                newParticles.push(pt);
            }
        }
        this.particles = newParticles;
        if (this.particles.length > this.MAX_PARTICLES) {
            this.particles = this.particles.slice(-this.MAX_PARTICLES);
        }

        // Update shockwaves
        var newShockwaves = [];
        for (var sw = 0; sw < this.shockwaves.length; sw++) {
            var s = this.shockwaves[sw];
            s.radius += 4;
            s.life -= 0.03;
            if (s.life > 0) {
                newShockwaves.push(s);
            }
        }
        this.shockwaves = newShockwaves;

        // Trim cá thừa
        if (this.fishes.length > this.MAX_FISH) {
            this.fishes.sort(function(a, b) { return a.size - b.size; });
            var excess = this.fishes.length - this.MAX_FISH;
            for (var ex = 0; ex < excess; ex++) {
                if (this.fishes[ex]) {
                    this.fishes[ex].alive = false;
                }
            }
        }

        this.updateStatsUI();
    }

    performHuntCheck() {
        var aliveFish = [];
        for (var i = 0; i < this.fishes.length; i++) {
            var f = this.fishes[i];
            if (f.alive && !f.isHunting && (f.huntCooldown === undefined || f.huntCooldown <= 0)) {
                aliveFish.push(f);
            }
        }

        for (var a = 0; a < aliveFish.length; a++) {
            var predator = aliveFish[a];
            if (predator.tier === 'tiny') continue;
            if (predator.isHunting) continue;

            var closestPrey = null;
            var closestDist = predator.isPredatorWave ? 400 : 250;

            for (var b = 0; b < this.fishes.length; b++) {
                var prey = this.fishes[b];
                if (!prey.alive || prey === predator) continue;
                if (prey.size >= predator.size) continue;

                var dx = prey.x - predator.x;
                var dy = prey.y - predator.y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < closestDist) {
                    closestDist = dist;
                    closestPrey = prey;
                }
            }

            var huntChance = predator.isPredatorWave ? 0.9 : 0.5;
            if (closestPrey && Math.random() < huntChance) {
                predator.huntTarget = closestPrey;
                predator.isHunting = true;
                predator.huntCooldown = predator.isPredatorWave ? 30 : 120;
                closestPrey.isScared = true;
                closestPrey.scaredTimer = 90;
                if (this.mc && Math.random() < 0.3) {
                    this.mc.onEat(predator.username, closestPrey.username);
                }
            }
        }
    }

    createShockwave(x, y) {
        this.shockwaves.push({ x: x, y: y, radius: 10, life: 1.0 });
    }

    showEvolutionNotify(message) {
        var el = document.getElementById('evolution-notify');
        if (el) {
            el.textContent = message;
            el.classList.remove('show');
            void el.offsetWidth;
            el.classList.add('show');
            setTimeout(function() {
                el.classList.remove('show');
            }, 4000);
        }
    }

    updateFeedUI(message) {
   // Đã tắt - TikTok có sẵn
    }

         updateStatsUI() {
        // Chỉ cập nhật leaderboard, bỏ stats overlay
        if (!this._lastLeaderboardUpdate) this._lastLeaderboardUpdate = 0;
        var now = Date.now();
        if (now - this._lastLeaderboardUpdate > 3000) {
            this._lastLeaderboardUpdate = now;
            this.updateLeaderboardUI();
        }
    }

    updateLeaderboardUI() {
    var board = document.getElementById('leaderboard');
    if (!board) return;

    var sorted = this.fishes
        .filter(function(f) { return f.alive; })
        .sort(function(a, b) { return (b.score || 0) - (a.score || 0); })
        .slice(0, 10);

    var html = '<div class="lb-title">🏆 TOP 10</div>';

    for (var i = 0; i < sorted.length; i++) {
        var fish = sorted[i];
        var rank = i + 1;
        var medal = '';
        if (rank === 1) medal = '👑';
        else if (rank === 2) medal = '🥈';
        else if (rank === 3) medal = '🥉';
        else medal = '#' + rank;

        var cc = (fish.country || '').toUpperCase();
        var flagHTML = '';
        if (cc && cc.length === 2 && cc !== '🌍') {
            flagHTML = '<img src="https://flagcdn.com/w40/' + cc.toLowerCase() + '.png" onerror="this.style.display=\'none\'">';
        }

        var rowClass = 'lb-row';
        if (rank === 1) rowClass += ' lb-top1';
        else if (rank === 2) rowClass += ' lb-top2';
        else if (rank === 3) rowClass += ' lb-top3';

        html += '<div class="' + rowClass + '">'
            + '<span class="lb-rank">' + medal + '</span>'
            + '<span class="lb-flag">' + flagHTML + '</span>'
            + '<span class="lb-name">' + (fish.username || 'Fish') + '</span>'
            + '<span class="lb-score">' + (fish.score || 0) + '</span>'
            + '</div>';
    }

    board.innerHTML = html;
}


    // ===== VẼ =====
    draw() {
        var ctx = this.ctx;
        var w = this.canvas.width;
        var h = this.canvas.height;

        ctx.save();

        if (this.screenShake > 0) {
            ctx.translate(Math.random() * 6 - 3, Math.random() * 6 - 3);
        }

        // Nền đại dương
        var bgGrad = ctx.createLinearGradient(0, 0, 0, h);
        bgGrad.addColorStop(0, '#001833');
        bgGrad.addColorStop(0.3, '#002244');
        bgGrad.addColorStop(0.7, '#003355');
        bgGrad.addColorStop(1, '#001122');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // Predator wave nền đỏ
        if (this.predatorWaveActive) {
            ctx.fillStyle = 'rgba(80, 0, 0, ' + (0.1 + Math.sin(Date.now() * 0.003) * 0.05) + ')';
            ctx.fillRect(0, 0, w, h);
        }

        // Ánh sáng
        var lightGrad = ctx.createRadialGradient(w * 0.5, -50, 0, w * 0.5, -50, h * 0.8);
        lightGrad.addColorStop(0, 'rgba(100, 200, 255, 0.08)');
        lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = lightGrad;
        ctx.fillRect(0, 0, w, h);

        // Đáy cát
        var sandGrad = ctx.createLinearGradient(0, h - 60, 0, h);
        sandGrad.addColorStop(0, '#1a3a2a');
        sandGrad.addColorStop(1, '#0d1f15');
        ctx.fillStyle = sandGrad;
        ctx.fillRect(0, h - 60, w, 60);

        // Rong biển
        this.drawSeaweeds(ctx);

        // Bubbles
        for (var bi = 0; bi < this.bubbles.length; bi++) {
            this.bubbles[bi].draw(ctx);
        }

        // Particles
        for (var pi = 0; pi < this.particles.length; pi++) {
            var pt = this.particles[pi];
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, Math.max(0.1, pt.size * pt.life), 0, Math.PI * 2);
            ctx.globalAlpha = Math.max(0, pt.life);
            ctx.fillStyle = pt.color || '#ffffff';
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        // Shockwaves
        for (var si = 0; si < this.shockwaves.length; si++) {
            var shw = this.shockwaves[si];
            ctx.beginPath();
            ctx.arc(shw.x, shw.y, shw.radius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, ' + (shw.life * 0.4) + ')';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Cá (sắp xếp theo size)
        var drawFish = [];
        for (var fi = 0; fi < this.fishes.length; fi++) {
            if (this.fishes[fi].alive) {
                drawFish.push(this.fishes[fi]);
            }
        }
        drawFish.sort(function(a, b) { return a.size - b.size; });
        for (var di = 0; di < drawFish.length; di++) {
            drawFish[di].draw(ctx);
        }

        // Vignette
        this.drawVignette(ctx, w, h);

        // Gift Streak
        if (this.giftStreak >= 3) {
            ctx.font = 'bold 28px Arial';
            ctx.textAlign = 'center';
            var streakAlpha = 0.5 + Math.sin(Date.now() * 0.005) * 0.3;
            ctx.fillStyle = 'rgba(255, 200, 0, ' + streakAlpha + ')';
            ctx.fillText('🔥 GIFT STREAK x' + this.giftStreak + '! 🔥', w / 2, h - 80);
        }

        // Predator wave warning
        if (this.predatorWaveActive) {
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            var warnAlpha = 0.5 + Math.sin(Date.now() * 0.008) * 0.4;
            ctx.fillStyle = 'rgba(255, 50, 50, ' + warnAlpha + ')';
            ctx.fillText(
                '☠️ PREDATOR WAVE #' + this.predatorWaveCount + ' — Send gifts to save your fish! ☠️',
                w / 2, 70
            );
        }

        ctx.restore();
    }

    drawSeaweeds(ctx) {
        var time = Date.now() * 0.001;
        for (var i = 0; i < this.seaweeds.length; i++) {
            var sw = this.seaweeds[i];
            ctx.beginPath();
            var x = sw.x;
            var y = this.canvas.height - 55;
            ctx.moveTo(x, y);

            for (var j = 0; j < sw.segments; j++) {
                var segH = sw.height / sw.segments;
                var sway = Math.sin(time * sw.speed * 5 + sw.phase + j * 0.5) * (8 + j * 2);
                x += sway / sw.segments;
                y -= segH;
                ctx.lineTo(x, y);
            }

            ctx.strokeStyle = sw.color;
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    }

    drawVignette(ctx, w, h) {
        var vignette = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.8);
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
        vignette.addColorStop(1, 'rgba(0,0,0,0.4)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, w, h);
    }
}

// ===== KHỞI CHẠY =====
var game;
window.addEventListener('DOMContentLoaded', function() {
    game = new WorldBattleAquarium();
});

document.addEventListener('click', function() {
    if (game && game.audio && typeof game.audio.init === 'function') {
        game.audio.init();
    }
}, { once: true });
