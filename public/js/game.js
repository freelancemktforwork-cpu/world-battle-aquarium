// ============================================
// GAME.JS - World Battle Aquarium v3.0
// Infinite Loop + Predator Wave + Gift System
// + Like Farming System
// ============================================

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

// ★ NEW — Like Farming milestone definitions
var LIKE_FARM_MILESTONES = [
    { likes: 300, tier: 'legendary', size: 60, color: '#FFD700', label: '🌟 LEGENDARY' },
    { likes: 150, tier: 'epic',      size: 45, color: '#E056FD', label: '💎 EPIC' },
    { likes: 75,  tier: 'large',     size: 32, color: '#FF6B6B', label: '🔥 LARGE' },
    { likes: 30,  tier: 'medium',    size: 22, color: '#54A0FF', label: '⭐ MEDIUM' },
    { likes: 10,  tier: 'small',     size: 14, color: '#5CD85C', label: '🌱 SMALL' }
];

class WorldBattleAquarium {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.audio = new AudioSystem();
        this.mc = new AutoMC();
        this.fishes = [];
        this.bubbles = [];
        this.seaweeds = [];
        this.particles = [];
        this.shockwaves = [];

        this.stats = { totalViewers: 0, totalGifts: 0, totalLikes: 0, totalFish: 0, peakViewers: 0 };
        this.MAX_FISH = 300;
        this.MAX_BUBBLES = 200;
        this.MAX_PARTICLES = 150;
        this.HUNT_CHECK_INTERVAL = 30;
        this.huntCheckCounter = 0;
        this.unlockedTiers = ['tiny', 'common'];
        this.lastMilestone = 0;
        this.giftStreak = 0;
        this.lastGiftTime = 0;
        this.streakMultiplier = 1;
        this.bossActive = false;
        this.bossTimer = 0;
        this.playerScores = {};
        this.loopCheckInterval = 300;
        this.loopCheckCounter = 0;
        this.predatorWaveCount = 0;
        this.predatorWaveActive = false;
        this.bigFishThreshold = 40;
        this.screenShake = 0;
        this._lastLeaderboardUpdate = 0;
        this._lastLeaderboardFingerprint = '';

        // ★ NEW — Like Farming tracker
        this.likeFarming = {};  // { username: { count: 0, lastFish: null } }

        var self = this;
        this.mc.onLeaderboardRequest = function() {
            var sorted = Object.values(self.playerScores)
                .filter(function(p) { return p.score > 0; })
                .sort(function(a, b) { return b.score - a.score; });
            if (sorted.length > 0) {
                return { username: sorted[0].username, country: sorted[0].country, score: sorted[0].score };
            }
            return null;
        };

        this.createSeaweeds();
        this.connectWebSocket();
        this.gameLoop();

        setInterval(function() {
            if (self.bubbles.length < self.MAX_BUBBLES) {
                self.bubbles.push(new Bubble(self.canvas));
            }
        }, 500);

        this.initSmartDecoy();
        this.initHookSystem();

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

    // ============================================
    // SMART DECOY SYSTEM
    // ============================================

    initSmartDecoy() {
        this.decoy = {
            enabled: true, phase: 1, startTime: Date.now(),
            realPlayerCount: 0, realPlayers: new Set(), botFishes: [],
            lastBotAction: 0, lastHunterSpawn: 0, lastBossSpawn: 0, lastCallToAction: 0,
        };
        this.spawnInitialDecoys();
        this.startDecoyLoop();
        console.log('🎭 Smart Decoy System: ACTIVE');
    }

    spawnInitialDecoys() {
        var decoyData = [
            { tier: 'legendary', count: 1 }, { tier: 'epic', count: 2 },
            { tier: 'rare', count: 3 }, { tier: 'common', count: 5 }, { tier: 'tiny', count: 8 },
        ];
        var names = ['Ocean_King','Sea_Master','Wave_Pro','Shark_Fan','Deep_Diver','Coral_Star','Reef_Queen','Tide_Boss','Pearl_Hunter','Storm_Fish','Aqua_Lord','Blue_Wave','Sea_Dragon','Nemo_Fan','Whale_Song','Dolphin_Rider','Coral_Lover','Reef_Walker','Aqua_King','Ocean_Explorer'];
        var countries = ['VN','US','JP','KR','BR','DE','FR','GB','TH','IN','PH','ID','MX','IT','ES','AU','CA','TR','RU','EG'];
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
                    if (decoyData[d].tier === 'legendary' || decoyData[d].tier === 'epic') {
                        fish.x = this.canvas.width * (0.3 + Math.random() * 0.4);
                        fish.y = this.canvas.height * (0.3 + Math.random() * 0.4);
                    }
                    this.fishes.push(fish);
                    this.decoy.botFishes.push(fish);
                } catch (e) { console.error('Decoy spawn error:', e); }
            }
        }
        console.log('🐟 Spawned ' + this.decoy.botFishes.length + ' decoy fish');
    }

    startDecoyLoop() {
        var self = this;
        setInterval(function() {
            if (!self.decoy.enabled) return;
            var now = Date.now();
            var elapsed = (now - self.decoy.startTime) / 1000;
            var aliveFish = self.fishes.filter(function(f) { return f.alive; }).length;
            var aliveDecoys = self.decoy.botFishes.filter(function(f) { return f.alive; }).length;

            if (self.decoy.realPlayerCount >= 10 || elapsed > 900) { self.decoy.phase = 3; }
            else if (self.decoy.realPlayerCount >= 3 || elapsed > 300) { self.decoy.phase = 2; }
            else { self.decoy.phase = 1; }

            if (self.decoy.phase === 1) {
                if (aliveFish < 15 && now - self.decoy.lastBotAction > 5000) { self.spawnDecoyFish(['tiny','common','rare']); self.decoy.lastBotAction = now; }
                if (now - self.decoy.lastHunterSpawn > 20000) { self.spawnDecoyHunter(); self.decoy.lastHunterSpawn = now; }
                if (now - self.decoy.lastBossSpawn > 60000 && elapsed > 15) { self.spawnDecoyBoss(); self.decoy.lastBossSpawn = now; }
                if (now - self.decoy.lastCallToAction > 25000) { self.showCallToAction(); self.decoy.lastCallToAction = now; }
            } else if (self.decoy.phase === 2) {
                if (aliveFish < 8 && now - self.decoy.lastBotAction > 10000) { self.spawnDecoyFish(['tiny','common']); self.decoy.lastBotAction = now; }
                if (now - self.decoy.lastHunterSpawn > 40000 && aliveDecoys < 5) { self.spawnDecoyHunter(); self.decoy.lastHunterSpawn = now; }
                if (now - self.decoy.lastCallToAction > 45000) { self.showCallToAction(); self.decoy.lastCallToAction = now; }
            } else {
                if (now - self.decoy.lastCallToAction > 60000) { self.showCallToAction(); self.decoy.lastCallToAction = now; }
            }
        }, 3000);

        setInterval(function() {
            if (!self.decoy.enabled || self.decoy.phase === 3) return;
            var aliveDecoys = self.decoy.botFishes.filter(function(f) { return f.alive; });
            if (aliveDecoys.length === 0) return;
            var count = Math.min(1 + Math.floor(Math.random() * 3), aliveDecoys.length);
            for (var i = 0; i < count; i++) {
                var fish = aliveDecoys[Math.floor(Math.random() * aliveDecoys.length)];
                fish.score = (fish.score || 0) + Math.floor(Math.random() * 5) + 1;
            }
        }, 8000);
    }

    spawnDecoyFish(tiers) {
        var tier = tiers[Math.floor(Math.random() * tiers.length)];
        var names = ['Lucky_Fish','Star_Wave','Moon_Sea','Sun_Reef','Cool_Fin','Happy_Gill','Swift_Tail','Bright_Scale'];
        var countries = ['VN','US','JP','KR','BR','TH','FR','DE'];
        try {
            var fish = new Fish(this.canvas, names[Math.floor(Math.random() * names.length)], countries[Math.floor(Math.random() * countries.length)], tier, 'decoy');
            fish.isDecoy = true;
            fish.score = Math.floor(Math.random() * 10) + 1;
            this.fishes.push(fish);
            this.decoy.botFishes.push(fish);
        } catch (e) {}
    }

    spawnDecoyHunter() {
        var tiers = ['rare','epic','legendary'];
        var tier = tiers[Math.floor(Math.random() * tiers.length)];
        var names = ['HUNTER_X','Predator_Pro','Mega_Shark','Alpha_Fish','Boss_Wave'];
        var countries = ['US','JP','KR','GB','DE'];
        try {
            var fish = new Fish(this.canvas, names[Math.floor(Math.random() * names.length)], countries[Math.floor(Math.random() * countries.length)], tier, 'hunter');
            fish.isDecoy = true; fish.isHunting = true;
            fish.score = Math.floor(Math.random() * 80) + 20;
            var side = Math.floor(Math.random() * 4);
            if (side === 0) { fish.x = -50; fish.y = Math.random() * this.canvas.height; }
            else if (side === 1) { fish.x = this.canvas.width + 50; fish.y = Math.random() * this.canvas.height; }
            else if (side === 2) { fish.x = Math.random() * this.canvas.width; fish.y = -50; }
            else { fish.x = Math.random() * this.canvas.width; fish.y = this.canvas.height + 50; }
            this.fishes.push(fish); this.decoy.botFishes.push(fish);
            if (this.mc) this.mc.speak('Watch out! A hunter just entered the ocean!', 2, 'warning');
        } catch (e) {}
    }

    spawnDecoyBoss() {
        var names = ['OCEAN_KING','SEA_TITAN','DEEP_LORD'];
        try {
            var fish = new Fish(this.canvas, names[Math.floor(Math.random() * names.length)], '🌍', 'mythic', 'boss');
            fish.isDecoy = true; fish.isHunting = true;
            fish.score = Math.floor(Math.random() * 200) + 100;
            fish.x = this.canvas.width / 2; fish.y = this.canvas.height / 2;
            this.fishes.push(fish); this.decoy.botFishes.push(fish);
            if (this.mc) this.mc.speak('WARNING! A BOSS has appeared! Send gifts to defeat it!', 0, 'epic');
            this.screenShake = 10;
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
            '❤️ Keep liking to GROW your fish!',           // ★ NEW — CTA for like farming
            '👏 Like 10x = Small fish, 30x = Medium, 75x = Large!', // ★ NEW
        ];
        var msg = messages[Math.floor(Math.random() * messages.length)];
        var notify = document.getElementById('evolution-notify');
        if (notify) {
            notify.textContent = msg;
            notify.classList.add('show');
            setTimeout(function() { notify.classList.remove('show'); }, 4000);
        }
    }

    registerRealPlayer(username) {
        if (!this.decoy) return;
        if (!this.decoy.realPlayers.has(username)) {
            this.decoy.realPlayers.add(username);
            this.decoy.realPlayerCount = this.decoy.realPlayers.size;
            console.log('👤 Real player: ' + username + ' (total: ' + this.decoy.realPlayerCount + ')');
        }
    }

    // ============================================
    // ★ NEW — LIKE FARMING SYSTEM
    // ============================================

    processLikeFarming(username, country) {
        if (!username) return;

        // Init tracking for this user
        if (!this.likeFarming[username]) {
            this.likeFarming[username] = { count: 0, lastFish: null, currentTier: null };
        }

        var tracker = this.likeFarming[username];
        tracker.count++;

        // Find the highest milestone reached
        var targetMilestone = null;
        for (var i = 0; i < LIKE_FARM_MILESTONES.length; i++) {
            if (tracker.count >= LIKE_FARM_MILESTONES[i].likes) {
                targetMilestone = LIKE_FARM_MILESTONES[i];
                break;
            }
        }

        // Haven't reached 10 likes yet — no upgrade
        if (!targetMilestone) return;

        // Already at this tier — no change needed
        if (tracker.currentTier === targetMilestone.tier) return;

        // Remove old "farmed" fish if it still exists
        if (tracker.lastFish && tracker.lastFish.alive) {
            tracker.lastFish.alive = false;
            // Death particles
            for (var p = 0; p < 6; p++) {
                this.particles.push({
                    x: tracker.lastFish.x + (Math.random() - 0.5) * 30,
                    y: tracker.lastFish.y + (Math.random() - 0.5) * 30,
                    vx: (Math.random() - 0.5) * 3,
                    vy: (Math.random() - 0.5) * 3,
                    life: 1, color: targetMilestone.color, size: 3
                });
            }
        }

        // Spawn upgraded fish
        if (this.fishes.length < this.MAX_FISH) {
            try {
                // Map like-farming tier to a real fish tier for Fish constructor
                var fishTierMap = {
                    'small': 'common',
                    'medium': 'rare',
                    'large': 'epic',
                    'epic': 'legendary',
                    'legendary': 'mythic'
                };
                var realTier = fishTierMap[targetMilestone.tier] || 'common';

                var newFish = new Fish(
                    this.canvas,
                    username,
                    country || '🌍',
                    realTier,
                    'LikeFarm'
                );
                newFish.size = targetMilestone.size;
                newFish.baseSize = targetMilestone.size;
                newFish.maxSize = targetMilestone.size * 2.5;
                newFish.color = targetMilestone.color;
                newFish._likeTier = targetMilestone.tier;
                newFish._isLikeFarmed = true;
                newFish.score = tracker.count;

                this.fishes.push(newFish);
                tracker.lastFish = newFish;
                tracker.currentTier = targetMilestone.tier;

                // Shockwave effect for big upgrades
                if (targetMilestone.likes >= 75) {
                    this.createShockwave(newFish.x, newFish.y);
                    this.screenShake = 5;
                }

                // Show evolution notification
                this.showHookNotify(
                    '👏 ' + username + ' → ' + targetMilestone.label + ' (' + tracker.count + ' likes!)',
                    targetMilestone.color
                );

                // MC announcement
                if (this.mc) {
                    var msgs = [
                        username + ' just leveled up to ' + targetMilestone.label + ' with ' + tracker.count + ' likes! Keep going!',
                        'Amazing! ' + username + ' liked their way to a bigger fish!',
                        username + ' is on fire! ' + tracker.count + ' likes and counting! Their fish is GROWING!'
                    ];
                    this.mc.speak(msgs[Math.floor(Math.random() * msgs.length)], 1, 'excited');
                }

                // Play sound
                if (targetMilestone.likes >= 150) {
                    this.audio.playGiftBig();
                } else {
                    this.audio.playEvolution();
                }

                console.log('🐟 Like Farming:', username, '→', targetMilestone.label, '(' + tracker.count + ' likes)');
            } catch (e) {
                console.error('Like farming spawn error:', e);
            }
        }
    }

    // ★ NEW — Keep like-farmed fish scores updated
    updateLikeFarmScores() {
        for (var username in this.likeFarming) {
            var tracker = this.likeFarming[username];
            if (tracker.lastFish && tracker.lastFish.alive) {
                tracker.lastFish.score = tracker.count;
            }
        }
    }

    // ============================================
    // HOOK SYSTEM
    // ============================================

    initHookSystem() {
        var self = this;
        this.hookTriggered = {};
        setTimeout(function() { self.hookEpicBattle(); }, 10000);
        setTimeout(function() { self.hookMysteryChest(); }, 40000);
        setTimeout(function() { self.hookPredatorAttack(); }, 80000);
        setTimeout(function() { self.hookOceanKingChallenge(); }, 150000);
        setTimeout(function() { self.hookGoldRush(); }, 200000);
        setTimeout(function() { self.startRandomHooks(); }, 300000);
        console.log('🎣 Hook System: ARMED');
    }

    hookEpicBattle() {
        if (this.decoy && this.decoy.realPlayerCount >= 5) return;
        var self = this;
        if (this.mc) this.mc.speak('Something is happening in the ocean! Two MASSIVE creatures are approaching each other!', 0, 'warning');
        this.showHookNotify('⚔️ EPIC BATTLE INCOMING! ⚔️', '#ff4444');
        setTimeout(function() {
            try {
                var fish1 = new Fish(self.canvas, 'TITAN_RED', 'US', 'epic', 'battle');
                fish1.isDecoy = true; fish1.isHunting = true; fish1.score = 150;
                fish1.x = 50; fish1.y = self.canvas.height / 2;
                self.fishes.push(fish1); if (self.decoy) self.decoy.botFishes.push(fish1);

                var fish2 = new Fish(self.canvas, 'DRAGON_BLUE', 'JP', 'epic', 'battle');
                fish2.isDecoy = true; fish2.isHunting = true; fish2.score = 145;
                fish2.x = self.canvas.width - 50; fish2.y = self.canvas.height / 2;
                self.fishes.push(fish2); if (self.decoy) self.decoy.botFishes.push(fish2);

                if (self.mc) self.mc.speak('FIGHT! TITAN RED versus DRAGON BLUE! Who will SURVIVE?!', 0, 'epic');
            } catch (e) {}
        }, 3000);
    }

    hookMysteryChest() {
        if (this.decoy && this.decoy.realPlayerCount >= 5) return;
        var self = this;
        var countdown = 5;
        if (this.mc) this.mc.speak('WAIT! A mysterious chest has appeared in the ocean! What could be inside?!', 0, 'excited');
        var chestDiv = document.createElement('div');
        chestDiv.id = 'mystery-chest';
        chestDiv.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:500;text-align:center;pointer-events:none;';
        chestDiv.innerHTML = '<div style="font-size:80px;animation:giftBounce 1s ease infinite;">🎁</div><div id="chest-countdown" style="color:#FFD700;font-size:36px;font-weight:900;text-shadow:0 0 20px rgba(255,215,0,0.8);margin-top:10px;">' + countdown + '</div><div style="color:#fff;font-size:14px;opacity:0.8;">OPENING IN...</div>';
        document.body.appendChild(chestDiv);
        var timer = setInterval(function() {
            countdown--;
            var countdownEl = document.getElementById('chest-countdown');
            if (countdownEl) countdownEl.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(timer);
                chestDiv.innerHTML = '<div style="font-size:100px;animation:giftBounce 0.5s ease;">💥</div>';
                setTimeout(function() {
                    if (chestDiv.parentNode) chestDiv.parentNode.removeChild(chestDiv);
                    try {
                        var fish = new Fish(self.canvas, 'MYSTERY_LEGEND', 'KR', 'legendary', 'chest');
                        fish.isDecoy = true; fish.isHunting = true; fish.score = 200;
                        fish.x = self.canvas.width / 2; fish.y = self.canvas.height / 2;
                        self.fishes.push(fish); if (self.decoy) self.decoy.botFishes.push(fish);
                        if (self.mc) self.mc.speak('UNBELIEVABLE! A LEGENDARY creature emerges from the chest! It is MASSIVE!', 0, 'epic');
                        self.showHookNotify('🌟 LEGENDARY FISH UNLOCKED! 🌟', '#FFD700');
                        self.screenShake = 8;
                    } catch (e) {}
                }, 1000);
            }
        }, 1000);
    }

    hookPredatorAttack() {
        if (this.decoy && this.decoy.realPlayerCount >= 5) return;
        var self = this;
        if (this.mc) this.mc.speak('DANGER! The water is getting dark! Something HUGE is coming from the deep!', 0, 'warning');
        this.showHookNotify('🦈 DANGER! PREDATOR APPROACHING! 🦈', '#ff0044');
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:50;pointer-events:none;transition:opacity 2s;';
        document.body.appendChild(overlay);
        setTimeout(function() {
            try {
                var predator = new Fish(self.canvas, 'MEGA_SHARK', '🌍', 'mythic', 'predator');
                predator.isDecoy = true; predator.isHunting = true; predator.isPredatorWave = true;
                predator.score = 500; predator.x = -100; predator.y = self.canvas.height / 2;
                self.fishes.push(predator); if (self.decoy) self.decoy.botFishes.push(predator);
                if (self.mc) self.mc.speak('IT IS HERE! The MEGA SHARK enters the arena! Send gifts to spawn bigger fish and fight back!', 0, 'epic');
                self.screenShake = 15;
            } catch (e) {}
            overlay.style.opacity = '0';
            setTimeout(function() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 2000);
        }, 4000);
    }

    hookOceanKingChallenge() {
        if (this.decoy && this.decoy.realPlayerCount >= 8) return;
        var self = this;
        if (this.mc) this.mc.speak('ATTENTION EVERYONE! The OCEAN KING is about to make his entrance!', 0, 'epic');
        this.showHookNotify('👑 OCEAN KING IS COMING! 👑', '#e056fd');
        setTimeout(function() { self.showHookNotify('💎 Send gifts to challenge the KING! 💎', '#00d4ff'); }, 3000);
        setTimeout(function() {
            try {
                var boss = new Fish(self.canvas, 'OCEAN_KING', '🌍', 'mythic', 'boss');
                boss.isDecoy = true; boss.isHunting = true; boss.score = 999;
                boss.x = self.canvas.width / 2; boss.y = -100;
                self.fishes.push(boss); if (self.decoy) self.decoy.botFishes.push(boss);
                if (self.mc) self.mc.speak('BOW DOWN! The OCEAN KING has ARRIVED! Only YOUR gifts can stop him!', 0, 'epic');
                self.screenShake = 20;
                setTimeout(function() {
                    self.showHookNotify('🎁 Gift = YOUR Champion Fish! 🐋', '#FFD700');
                    if (self.mc) self.mc.speak('Send a gift NOW to spawn your OWN champion!', 0, 'excited');
                }, 5000);
            } catch (e) {}
        }, 6000);
    }

    hookGoldRush() {
        if (this.decoy && this.decoy.realPlayerCount >= 8) return;
        var self = this;
        if (this.mc) this.mc.speak('GOLD RUSH! A wave of golden fish is flooding the ocean!', 0, 'epic');
        this.showHookNotify('✨ GOLD RUSH! ✨', '#FFD700');
        var spawned = 0;
        var countries = ['VN','US','JP','KR','BR','TH','FR','DE','IN','PH'];
        var goldTimer = setInterval(function() {
            if (spawned >= 10) {
                clearInterval(goldTimer);
                if (self.mc) self.mc.speak('What an AMAZING gold rush! Send a gift to get YOUR golden champion!', 1, 'excited');
                return;
            }
            try {
                var tiers = ['tiny','common','common','rare'];
                var tier = tiers[Math.floor(Math.random() * tiers.length)];
                var fish = new Fish(self.canvas, 'Gold_' + (spawned + 1), countries[spawned % countries.length], tier, 'gold');
                fish.isDecoy = true; fish.score = Math.floor(Math.random() * 20) + 5;
                fish.x = Math.random() * self.canvas.width; fish.y = -30;
                self.fishes.push(fish); if (self.decoy) self.decoy.botFishes.push(fish);
            } catch (e) {}
            spawned++;
        }, 400);
    }

    startRandomHooks() {
        var self = this;
        var hooks = ['battle','chest','predator','gold'];
        setInterval(function() {
            if (self.decoy && self.decoy.realPlayerCount >= 10) return;
            var hook = hooks[Math.floor(Math.random() * hooks.length)];
            if (hook === 'battle') self.hookEpicBattle();
            else if (hook === 'chest') self.hookMysteryChest();
            else if (hook === 'predator') self.hookPredatorAttack();
            else self.hookGoldRush();
        }, 120000 + Math.random() * 60000);
    }

    showHookNotify(text, color) {
        var notify = document.getElementById('evolution-notify');
        if (!notify) return;
        notify.textContent = text;
        notify.style.background = 'linear-gradient(135deg, ' + color + ', rgba(0,0,0,0.8))';
        notify.style.color = '#fff';
        notify.style.boxShadow = '0 0 40px ' + color + '80';
        notify.classList.add('show');
        setTimeout(function() {
            notify.classList.remove('show');
            notify.style.background = '';
            notify.style.color = '';
            notify.style.boxShadow = '';
        }, 4000);
    }

    // ============================================
    // WEBSOCKET
    // ============================================

    connectWebSocket() {
        var protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
        this.ws = new WebSocket(protocol + '//' + location.host);
        var self = this;
        this.ws.onopen = function() { console.log('✅ WebSocket connected'); };
        this.ws.onmessage = function(event) {
            try { var data = JSON.parse(event.data); self.handleEvent(data); } catch (e) { console.error('Parse error:', e); }
        };
        this.ws.onclose = function() {
            console.log('❌ WebSocket disconnected, reconnecting...');
            setTimeout(function() { self.connectWebSocket(); }, 3000);
        };
    }

    handleEvent(data) {
        switch (data.type) {
            case 'like': this.onLike(data); break;
            case 'gift': this.onGift(data); break;
            case 'chat': this.onChat(data); break;
            case 'member': this.onMemberJoin(data); break;
            case 'roomUser': this.onRoomUpdate(data); break;
        }
    }

    // ============================================
    // EVENTS
    // ============================================

    onLike(data) {
        var username = data.username || 'Viewer';
        var country = data.country || '🌍';
        this.registerRealPlayer(username);
        this.stats.totalLikes += (data.likeCount || 1);

        var count = Math.min(data.likeCount || 1, 5);
        for (var i = 0; i < count; i++) {
            if (this.fishes.length < this.MAX_FISH) {
                var fish = new Fish(this.canvas, username, country, 'tiny', 'Like');
                this.fishes.push(fish);
            }
        }
        for (var j = 0; j < 3; j++) {
            if (this.bubbles.length < this.MAX_BUBBLES) this.bubbles.push(new Bubble(this.canvas));
        }
        this.audio.playBubble();
        if (this.mc) this.mc.onLike(username);

        // ★ NEW — Process like farming (accumulate likes → grow fish)
        var likeCount = data.likeCount || 1;
        for (var lf = 0; lf < likeCount; lf++) {
            this.processLikeFarming(username, country);
        }
    }

    onGift(data) {
        var username = data.username || 'Anonymous';
        var country = data.country || '🌍';
        var giftName = data.giftName || 'Gift';
        var coins = Number(data.coins) || Number(data.diamondCount) || 1;

        this.registerRealPlayer(username);
        this.stats.totalGifts++;

        var tier = this.getGiftTier(giftName, coins);
        var giftInfo = GIFT_TIERS_DATA[(giftName || '').toLowerCase().trim()];
        var giftEmoji = giftInfo ? giftInfo.emoji : '🎁';
        var fishInfo = this.getRandomFishForTier(tier);

        this.showGiftPopup(username, giftName, giftEmoji, tier, fishInfo, coins);

        if (this.fishes.length < this.MAX_FISH) {
            var fish = new Fish(this.canvas, username, country, tier, giftName);
            fish.size = fishInfo.size; fish.baseSize = fishInfo.size;
            fish.color = fishInfo.color; fish.tier = tier;
            fish.maxSize = fishInfo.size * 3;
            this.fishes.push(fish);

            if (tier === 'god' || tier === 'boss') {
                this.screenShake = 30;
                this.createShockwave(fish.x, fish.y);
                for (var p = 0; p < 30; p++) {
                    this.particles.push({ x: fish.x + (Math.random()-0.5)*100, y: fish.y + (Math.random()-0.5)*100, vx: (Math.random()-0.5)*6, vy: (Math.random()-0.5)*6, life: 1, color: fishInfo.color, size: 5 });
                }
            } else if (tier === 'mythic' || tier === 'legendary') {
                this.screenShake = 15;
                this.createShockwave(fish.x, fish.y);
                for (var p2 = 0; p2 < 15; p2++) {
                    this.particles.push({ x: fish.x + (Math.random()-0.5)*60, y: fish.y + (Math.random()-0.5)*60, vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4, life: 1, color: fishInfo.color, size: 4 });
                }
            } else if (tier === 'epic' || tier === 'rare') {
                for (var p3 = 0; p3 < 8; p3++) {
                    this.particles.push({ x: fish.x + (Math.random()-0.5)*40, y: fish.y + (Math.random()-0.5)*40, vx: (Math.random()-0.5)*3, vy: (Math.random()-0.5)*3, life: 1, color: fishInfo.color, size: 3 });
                }
            }
        }

        if (tier === 'god' || tier === 'boss' || tier === 'mythic') this.audio.playGiftLegendary();
        else if (tier === 'legendary' || tier === 'epic') this.audio.playGiftBig();
        else this.audio.playGift();

        this.updatePlayerScore(username, country, coins);
        if (this.mc) this.mc.onGift(username, country, fishInfo.name, tier);

        if (tier === 'god') this.showEvolutionNotify('👑 GOD TIER! ' + username + ' summoned ' + fishInfo.name + '!');
        else if (tier === 'boss') this.showEvolutionNotify('🔥 BOSS! ' + username + ' summoned ' + fishInfo.name + '!');
        else if (tier === 'mythic') this.showEvolutionNotify('🌟 MYTHIC! ' + username + ' summoned ' + fishInfo.name + '!');

        var now = Date.now();
        if (now - this.lastGiftTime < 10000) { this.giftStreak++; this.streakMultiplier = 1 + this.giftStreak * 0.1; }
        else { this.giftStreak = 1; this.streakMultiplier = 1; }
        this.lastGiftTime = now;
    }

    onChat(data) {
        var msg = (data.comment || '').toLowerCase();
        if (msg.indexOf('boss') !== -1) {
            this.bossTimer++;
            if (this.bossTimer >= 10 && !this.bossActive) this.spawnBoss();
        }
    }

    onMemberJoin(data) {
        this.stats.totalViewers++;
        if (this.mc) this.mc.onJoin(data.username || 'Viewer', data.country || '🌍');
        this.audio.playSplash();
        this.checkMilestone();
    }

    onRoomUpdate(data) {
        var count = data.viewerCount || 0;
        this.stats.totalViewers = count;
        if (count > this.stats.peakViewers) this.stats.peakViewers = count;
        var el = document.getElementById('viewer-count');
        if (el) el.textContent = count.toLocaleString();
        this.checkMilestone();
    }

    // ============================================
    // HELPERS
    // ============================================

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
        return { name: fish.name, emoji: fish.emoji, color: fish.color, tier: tier, size: sizes.min + Math.random() * (sizes.max - sizes.min) };
    }

    showGiftPopup(username, giftName, giftEmoji, tier, fishInfo, coins) {
        var tierColors = {
            'tiny': { bg: 'rgba(168,230,207,0.9)', border: '#a8e6cf', text: '#2d3436', glow: 'none' },
            'common': { bg: 'rgba(116,185,255,0.9)', border: '#74b9ff', text: '#fff', glow: 'none' },
            'rare': { bg: 'rgba(162,155,254,0.9)', border: '#a29bfe', text: '#fff', glow: '0 0 15px rgba(162,155,254,0.5)' },
            'epic': { bg: 'rgba(108,92,231,0.9)', border: '#6c5ce7', text: '#fff', glow: '0 0 25px rgba(108,92,231,0.6)' },
            'legendary': { bg: 'rgba(253,203,110,0.95)', border: '#ffd700', text: '#2d3436', glow: '0 0 35px rgba(253,203,110,0.7)' },
            'mythic': { bg: 'linear-gradient(135deg, rgba(108,92,231,0.95), rgba(224,86,253,0.95))', border: '#e056fd', text: '#fff', glow: '0 0 50px rgba(224,86,253,0.8)' },
            'boss': { bg: 'linear-gradient(135deg, rgba(214,48,49,0.95), rgba(225,112,85,0.95))', border: '#ff3838', text: '#fff', glow: '0 0 60px rgba(214,48,49,0.8)' },
            'god': { bg: 'linear-gradient(135deg, rgba(255,215,0,0.95), rgba(224,86,253,0.95), rgba(255,215,0,0.95))', border: '#ffd700', text: '#fff', glow: '0 0 80px rgba(255,215,0,0.9)' }
        };
        var tc = tierColors[tier] || tierColors['tiny'];
        var coinsDisplay = Number(coins) >= 1000 ? (Number(coins)/1000).toFixed(1) + 'K' : coins;

        var popup = document.createElement('div');
        popup.className = 'gift-popup gift-popup-' + tier;
        popup.innerHTML = '<div class="gift-popup-inner"><div class="gift-popup-tier">' + tier.toUpperCase() + '</div><div class="gift-popup-gift-icon">' + (giftEmoji||'🎁') + '</div><div class="gift-popup-info"><div class="gift-popup-user">' + (username||'Anonymous') + '</div><div class="gift-popup-gift-name">sent ' + (giftName||'a gift') + ' <span class="gift-popup-coins">(' + coinsDisplay + ' coins)</span></div></div><div class="gift-popup-arrow">➜</div><div class="gift-popup-fish"><div class="gift-popup-fish-icon">' + fishInfo.emoji + '</div><div class="gift-popup-fish-name">' + fishInfo.name + '</div></div></div>';

        var inner = popup.querySelector('.gift-popup-inner');
        if (tc.bg.indexOf('gradient') >= 0) inner.style.background = tc.bg;
        else inner.style.backgroundColor = tc.bg;
        inner.style.borderColor = tc.border;
        inner.style.color = tc.text;
        inner.style.boxShadow = tc.glow;

        var container = document.getElementById('gift-popup-container');
        if (!container) { container = document.createElement('div'); container.id = 'gift-popup-container'; document.body.appendChild(container); }
        container.appendChild(popup);
        setTimeout(function() { popup.classList.add('gift-popup-show'); }, 50);

        var durations = { tiny: 3000, common: 3500, rare: 4000, epic: 5000, legendary: 6000, mythic: 7000, boss: 8000, god: 10000 };
        var dur = durations[tier] || 3000;
        setTimeout(function() {
            popup.classList.remove('gift-popup-show');
            popup.classList.add('gift-popup-hide');
            setTimeout(function() { if (popup.parentNode) popup.parentNode.removeChild(popup); }, 500);
        }, dur);
        while (container.children.length > 5) container.removeChild(container.children[0]);
    }

    checkMilestone() {
        var count = this.stats.totalViewers;
        var VIEWER_MILESTONES = [
            { viewers: 10, unlock: 'rare', message: '🎉 10 viewers! Rare fish unlocked!' },
            { viewers: 50, unlock: 'epic', message: '🔥 50 viewers! Epic fish unlocked!' },
            { viewers: 100, unlock: 'legendary', message: '🌟 100 viewers! Legendary fish unlocked!' },
            { viewers: 500, unlock: 'mythic', message: '💎 500 viewers! Mythic fish unlocked!' },
            { viewers: 1000, unlock: 'boss', message: '👑 1000 viewers! Boss fish unlocked!' },
            { viewers: 5000, unlock: 'god', message: '🔱 5000 viewers! GOD TIER unlocked!' }
        ];
        for (var i = 0; i < VIEWER_MILESTONES.length; i++) {
            var ms = VIEWER_MILESTONES[i];
            if (count >= ms.viewers && this.unlockedTiers.indexOf(ms.unlock) === -1) {
                this.unlockedTiers.push(ms.unlock);
                if (this.mc) this.mc.onMilestone(ms.viewers);
                this.showEvolutionNotify(ms.message);
                for (var j = 0; j < 30; j++) {
                    this.particles.push({ x: Math.random()*this.canvas.width, y: Math.random()*this.canvas.height, vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4, life: 1.0, color: '#ffdd00', size: 3+Math.random()*6 });
                }
            }
        }
    }

    spawnBoss() {
        if (this.bossActive) return;
        this.bossActive = true;
        var boss = new Fish(this.canvas, '🏴‍☠️ BOSS', '🌍', 'boss', 'Boss');
        boss.x = this.canvas.width / 2; boss.y = this.canvas.height / 2;
        this.fishes.push(boss);
        if (this.mc) this.mc.onBossSpawn();
        this.audio.playGiftLegendary();
        this.createShockwave(boss.x, boss.y);
        this.showEvolutionNotify('⚠️ BOSS HAS APPEARED!');
        var self = this;
        setTimeout(function() {
            boss.alive = false; self.bossActive = false; self.bossTimer = 0;
            self.showEvolutionNotify('🎉 The Boss has been defeated!');
        }, 120000);
    }

    checkPredatorWave() {
        var aliveFish = [];
        for (var i = 0; i < this.fishes.length; i++) {
            if (this.fishes[i].alive && !this.fishes[i].isPredatorWave) aliveFish.push(this.fishes[i]);
        }
        if (aliveFish.length < 5) return;
        var totalSize = 0, maxSize = 0, bigCount = 0;
        for (var j = 0; j < aliveFish.length; j++) {
            totalSize += aliveFish[j].size;
            if (aliveFish[j].size > maxSize) maxSize = aliveFish[j].size;
            if (aliveFish[j].size > this.bigFishThreshold) bigCount++;
        }
        var avgSize = totalSize / aliveFish.length;
        var bigFishRatio = bigCount / aliveFish.length;
        if (bigFishRatio > 0.6 || avgSize > this.bigFishThreshold) this.spawnPredatorWave(maxSize);
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
                        predator.baseSize = predator.size; predator.maxSize = predator.size * 2;
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
                            self.particles.push({ x: f.x+(Math.random()-0.5)*30, y: f.y+(Math.random()-0.5)*30, vx: (Math.random()-0.5)*3, vy: (Math.random()-0.5)*3, life: 1, color: f.color||'#ff0000', size: 4 });
                        }
                    }
                }
                if (self.mc) self.mc.onPredatorClear();
                self.showEvolutionNotify('✅ Predator Wave cleared!');
            }, 45000);
        }, 2000);
    }

    updatePlayerScore(username, country, coins) {
        if (!username) return;
        var c = Number(coins) || 1;
        if (!this.playerScores[username]) {
            this.playerScores[username] = { username: username, country: country || '🌍', score: 0, fishCount: 0, lastGiftTime: Date.now() };
        }
        this.playerScores[username].score += c;
        this.playerScores[username].fishCount++;
        this.playerScores[username].lastGiftTime = Date.now();
        if (country && country !== '🌍') this.playerScores[username].country = country;
    }

    // ============================================
    // GAME LOOP
    // ============================================

    gameLoop() {
        this.update();
        this.draw();
        var self = this;
        requestAnimationFrame(function() { self.gameLoop(); });
    }

    update() {
        if (this.screenShake > 0) this.screenShake--;
        for (var i = this.fishes.length - 1; i >= 0; i--) {
            var fish = this.fishes[i];
            if (!fish.alive) {
                if (fish.deathTimer !== undefined) {
                    fish.deathTimer = (fish.deathTimer || 0) + 1;
                    if (fish.deathTimer > 30) this.fishes.splice(i, 1);
                } else { this.fishes.splice(i, 1); }
                continue;
            }
            var result = fish.update();
            if (typeof result === 'object' && result) {
                if (result.ate) {
                    this.audio.playEat();
                    for (var p = 0; p < 8; p++) {
                        this.particles.push({ x: fish.x, y: fish.y, vx: (Math.random()-0.5)*5, vy: (Math.random()-0.5)*5, life: 1.0, color: fish.color||'#ffffff', size: 2+Math.random()*3 });
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

        this.huntCheckCounter++;
        if (this.huntCheckCounter >= this.HUNT_CHECK_INTERVAL) { this.huntCheckCounter = 0; this.performHuntCheck(); }

        this.loopCheckCounter++;
        if (this.loopCheckCounter >= this.loopCheckInterval) { this.loopCheckCounter = 0; this.checkPredatorWave(); }

        var newBubbles = [];
        for (var b = 0; b < this.bubbles.length; b++) { this.bubbles[b].update(); if (this.bubbles[b].y + this.bubbles[b].radius > 0) newBubbles.push(this.bubbles[b]); }
        this.bubbles = newBubbles;

        var newParticles = [];
        for (var pp = 0; pp < this.particles.length; pp++) {
            var pt = this.particles[pp]; pt.x += pt.vx; pt.y += pt.vy; pt.life -= 0.02; pt.vx *= 0.97; pt.vy *= 0.97;
            if (pt.life > 0) newParticles.push(pt);
        }
        this.particles = newParticles;
        if (this.particles.length > this.MAX_PARTICLES) this.particles = this.particles.slice(-this.MAX_PARTICLES);

        var newShockwaves = [];
        for (var sw = 0; sw < this.shockwaves.length; sw++) {
            var s = this.shockwaves[sw]; s.radius += 4; s.life -= 0.03;
            if (s.life > 0) newShockwaves.push(s);
        }
        this.shockwaves = newShockwaves;

        if (this.fishes.length > this.MAX_FISH) {
            this.fishes.sort(function(a, b) { return a.size - b.size; });
            var excess = this.fishes.length - this.MAX_FISH;
            for (var ex = 0; ex < excess; ex++) { if (this.fishes[ex]) this.fishes[ex].alive = false; }
        }

        // ★ NEW — Keep like-farmed fish scores in sync
        this.updateLikeFarmScores();

        this.updateStatsUI();
    }

    performHuntCheck() {
        var aliveFish = [];
        for (var i = 0; i < this.fishes.length; i++) {
            var f = this.fishes[i];
            if (f.alive && !f.isHunting && (f.huntCooldown === undefined || f.huntCooldown <= 0)) aliveFish.push(f);
        }
        for (var a = 0; a < aliveFish.length; a++) {
            var predator = aliveFish[a];
            if (predator.tier === 'tiny' || predator.isHunting) continue;
            var closestPrey = null;
            var closestDist = predator.isPredatorWave ? 400 : 250;
            for (var b = 0; b < this.fishes.length; b++) {
                var prey = this.fishes[b];
                if (!prey.alive || prey === predator || prey.size >= predator.size) continue;
                var dx = prey.x - predator.x, dy = prey.y - predator.y;
                var dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < closestDist) { closestDist = dist; closestPrey = prey; }
            }
            var huntChance = predator.isPredatorWave ? 0.9 : 0.5;
            if (closestPrey && Math.random() < huntChance) {
                predator.huntTarget = closestPrey; predator.isHunting = true;
                predator.huntCooldown = predator.isPredatorWave ? 30 : 120;
                closestPrey.isScared = true; closestPrey.scaredTimer = 90;
                if (this.mc && Math.random() < 0.3) this.mc.onEat(predator.username, closestPrey.username);
            }
        }
    }

    createShockwave(x, y) { this.shockwaves.push({ x: x, y: y, radius: 10, life: 1.0 }); }

    showEvolutionNotify(message) {
        var el = document.getElementById('evolution-notify');
        if (el) {
            el.textContent = message; el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
            setTimeout(function() { el.classList.remove('show'); }, 4000);
        }
    }

    updateFeedUI(message) { }

    updateStatsUI() {
        if (!this._lastLeaderboardUpdate) this._lastLeaderboardUpdate = 0;
        var now = Date.now();
        if (now - this._lastLeaderboardUpdate > 3000) { this._lastLeaderboardUpdate = now; this.updateLeaderboardUI(); }
    }

    updateLeaderboardUI() {
        var board = document.getElementById('leaderboard');
        if (!board) return;
        var sorted = this.fishes.filter(function(f) { return f.alive; }).sort(function(a, b) { return (b.score||0) - (a.score||0); }).slice(0, 10);
        var html = '<div class="lb-title">🏆 TOP 10</div>';
        for (var i = 0; i < sorted.length; i++) {
            var fish = sorted[i]; var rank = i + 1;
            var medal = rank === 1 ? '👑' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '#' + rank;
            var cc = (fish.country || '').toUpperCase();
            var flagHTML = '';
            if (cc && cc.length === 2 && cc !== '🌍') flagHTML = '<img src="https://flagcdn.com/w40/' + cc.toLowerCase() + '.png" onerror="this.style.display=\'none\'">';
            var rowClass = 'lb-row' + (rank === 1 ? ' lb-top1' : rank === 2 ? ' lb-top2' : rank === 3 ? ' lb-top3' : '');
            html += '<div class="' + rowClass + '"><span class="lb-rank">' + medal + '</span><span class="lb-flag">' + flagHTML + '</span><span class="lb-name">' + (fish.username||'Fish') + '</span><span class="lb-score">' + (fish.score||0) + '</span></div>';
        }
        board.innerHTML = html;
    }

    // ============================================
    // DRAW
    // ============================================

    draw() {
        var ctx = this.ctx; var w = this.canvas.width; var h = this.canvas.height;
        ctx.save();
        if (this.screenShake > 0) ctx.translate(Math.random()*6-3, Math.random()*6-3);

        var bgGrad = ctx.createLinearGradient(0, 0, 0, h);
        bgGrad.addColorStop(0, '#001833'); bgGrad.addColorStop(0.3, '#002244');
        bgGrad.addColorStop(0.7, '#003355'); bgGrad.addColorStop(1, '#001122');
        ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, w, h);

        if (this.predatorWaveActive) {
            ctx.fillStyle = 'rgba(80, 0, 0, ' + (0.1 + Math.sin(Date.now()*0.003)*0.05) + ')';
            ctx.fillRect(0, 0, w, h);
        }

        var lightGrad = ctx.createRadialGradient(w*0.5, -50, 0, w*0.5, -50, h*0.8);
        lightGrad.addColorStop(0, 'rgba(100, 200, 255, 0.08)'); lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = lightGrad; ctx.fillRect(0, 0, w, h);

        var sandGrad = ctx.createLinearGradient(0, h-60, 0, h);
        sandGrad.addColorStop(0, '#1a3a2a'); sandGrad.addColorStop(1, '#0d1f15');
        ctx.fillStyle = sandGrad; ctx.fillRect(0, h-60, w, 60);

        this.drawSeaweeds(ctx);
        for (var bi = 0; bi < this.bubbles.length; bi++) this.bubbles[bi].draw(ctx);
        for (var pi = 0; pi < this.particles.length; pi++) {
            var pt = this.particles[pi]; ctx.beginPath();
            ctx.arc(pt.x, pt.y, Math.max(0.1, pt.size*pt.life), 0, Math.PI*2);
            ctx.globalAlpha = Math.max(0, pt.life); ctx.fillStyle = pt.color||'#ffffff'; ctx.fill(); ctx.globalAlpha = 1;
        }
        for (var si = 0; si < this.shockwaves.length; si++) {
            var shw = this.shockwaves[si]; ctx.beginPath();
            ctx.arc(shw.x, shw.y, shw.radius, 0, Math.PI*2);
            ctx.strokeStyle = 'rgba(255, 255, 255, ' + (shw.life*0.4) + ')'; ctx.lineWidth = 2; ctx.stroke();
        }

        var drawFish = [];
        for (var fi = 0; fi < this.fishes.length; fi++) { if (this.fishes[fi].alive) drawFish.push(this.fishes[fi]); }
        drawFish.sort(function(a, b) { return a.size - b.size; });
        for (var di = 0; di < drawFish.length; di++) drawFish[di].draw(ctx);

        this.drawVignette(ctx, w, h);

        if (this.giftStreak >= 3) {
            ctx.font = 'bold 28px Arial'; ctx.textAlign = 'center';
            var streakAlpha = 0.5 + Math.sin(Date.now()*0.005)*0.3;
            ctx.fillStyle = 'rgba(255, 200, 0, ' + streakAlpha + ')';
            ctx.fillText('🔥 GIFT STREAK x' + this.giftStreak + '! 🔥', w/2, h-80);
        }

        if (this.predatorWaveActive) {
            ctx.font = 'bold 20px Arial'; ctx.textAlign = 'center';
            var warnAlpha = 0.5 + Math.sin(Date.now()*0.008)*0.4;
            ctx.fillStyle = 'rgba(255, 50, 50, ' + warnAlpha + ')';
            ctx.fillText('☠️ PREDATOR WAVE #' + this.predatorWaveCount + ' — Send gifts to save your fish! ☠️', w/2, 70);
        }

        ctx.restore();
    }

    drawSeaweeds(ctx) {
        var time = Date.now() * 0.001;
        for (var i = 0; i < this.seaweeds.length; i++) {
            var sw = this.seaweeds[i]; ctx.beginPath();
            var x = sw.x; var y = this.canvas.height - 55; ctx.moveTo(x, y);
            for (var j = 0; j < sw.segments; j++) {
                var segH = sw.height / sw.segments;
                var sway = Math.sin(time*sw.speed*5 + sw.phase + j*0.5) * (8 + j*2);
                x += sway / sw.segments; y -= segH; ctx.lineTo(x, y);
            }
            ctx.strokeStyle = sw.color; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.stroke();
        }
    }

    drawVignette(ctx, w, h) {
        var vignette = ctx.createRadialGradient(w/2, h/2, w*0.3, w/2, h/2, w*0.8);
        vignette.addColorStop(0, 'rgba(0,0,0,0)'); vignette.addColorStop(1, 'rgba(0,0,0,0.4)');
        ctx.fillStyle = vignette; ctx.fillRect(0, 0, w, h);
    }
}

// ===== KHỞI CHẠY =====
var game;
window.addEventListener('DOMContentLoaded', function() { game = new WorldBattleAquarium(); });
document.addEventListener('click', function() {
    if (game && game.audio && typeof game.audio.init === 'function') game.audio.init();
}, { once: true });
