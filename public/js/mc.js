// ============================================
// MC.JS v2.0 - Hệ thống MC thông minh
// ✅ Nói hết câu rồi mới chuyển
// ✅ Hàng chờ ưu tiên 4 cấp
// ✅ Gộp sự kiện, ghép câu
// ✅ Giọng thay đổi theo cảm xúc
// ✅ Khoảng lặng tự nhiên
// ============================================

class AutoMC {
    constructor() {
        this.synth = window.speechSynthesis;
        this.enabled = true;
        this.voice = null;
        this.voiceReady = false;

        // ===== TRẠNG THÁI =====
        this.isSpeaking = false;       // đang nói hay không
        this.currentUtterance = null;  // câu đang nói
        this.lastSpokeTime = 0;        // thời điểm nói xong câu cuối
        this.pauseBetween = 2500;       // nghỉ 2.5 giây giữa các câu

        // ===== HÀNG CHỜ ƯU TIÊN =====
        // Priority: 0 = URGENT, 1 = HIGH, 2 = NORMAL, 3 = LOW
        this.queue = [];
        this.MAX_QUEUE = 8;

        // ===== GỘP SỰ KIỆN =====
        this.pendingEvents = {
            likes: { count: 0, lastTime: 0 },
            joins: { users: [], lastTime: 0 },
            smallGifts: { items: [], lastTime: 0 },
        };
        this.batchInterval = 5000; // gộp sự kiện trong 5 giây

        // ===== COMBO TRACKING =====
        this.comboTracker = {};

        // ===== KỊCH BẢN =====
        this.scripts = {
            join: [
                "Welcome {user} from {country}! The ocean awaits you!",
                "Hey hey! {user} just dived in from {country}!",
                "A new challenger from {country}! Welcome {user}!",
                "Splash! {user} from {country} joined the party!",
                "{user} has entered the arena! Let's gooo!",
                "The ocean just got more exciting! {user} from {country}!",
                "Look who's here! {user} all the way from {country}!",
            ],
            joinMultiple: [
                "Welcome to {users} and {count} others! The ocean is getting crowded!",
                "So many new faces! Welcome {users}! Glad to have you all!",
                "The party is growing! {users} and more just joined!",
                "Look at this! {count} new swimmers just dived in! Welcome everyone!",
            ],
            like: [
                "Bubbles everywhere! Keep those hearts coming!",
                "The ocean is alive with love!",
                "Pop pop pop! Baby fish are spawning from all those likes!",
                "So many hearts! The fish are loving it!",
                "Keep tapping! Every heart creates a tiny fish!",
            ],
            likeBatch: [
                "WOW! {count} likes just flooded in! That's a LOT of tiny fish!",
                "INCREDIBLE! {count} hearts! The ocean is OVERFLOWING with love!",
                "{count} likes! You guys are AMAZING! Look at all those baby fish!",
                "Holy moly! {count} likes in seconds! The fish are going CRAZY!",
            ],
            giftSmall: [
                "{user} sends a gift! A beautiful {fish} appears!",
                "Thank you {user}! Your {fish} is swimming happily!",
                "Nice! {user} just added a {fish} to the ocean!",
                "{user}'s {fish} joins the battle! Looking good!",
                "Splash! A {fish} from {user}! Will it survive?",
            ],
            giftSmallBatch: [
                "Gifts are pouring in! {users} just added new fish to the ocean!",
                "What a rush! {count} gifts in a row! The ocean is filling up!",
                "{users} are going at it! {count} new creatures in the water!",
            ],
            giftBig: [
                "WOAH! {user} goes BIG with a {fish}! Everyone watch out!",
                "INCREDIBLE! {user} drops a powerful {fish}! The ocean trembles!",
                "OH MY! {user} is NOT messing around! Look at that {fish}!",
                "The ocean shakes! {user} summons a mighty {fish}!",
                "BIG spender alert! {user} just unleashed a {fish}!",
            ],
            giftLegendary: [
                "LEGENDARY! {user} just changed the ENTIRE game! A {fish} descends from the DEEP!",
                "I can NOT believe this! {user} drops a {fish}! That is INSANE!",
                "BOW DOWN everyone! {user} summons the mighty {fish}! ABSOLUTE LEGEND!",
                "ALERT ALERT! {user} goes NUCLEAR with a {fish}! This is HISTORY!",
                "The ocean will NEVER be the same! {user} brings out a {fish}! UNBELIEVABLE!",
            ],
            eat: [
                "NOM NOM! {predator} just devoured {prey}! Savage!",
                "The circle of life! {predator} feeds on {prey}!",
                "RIP {prey}! Swallowed whole by {predator}!",
                "Gulp! {predator} makes a meal out of {prey}!",
                "{predator} shows NO mercy to {prey}!",
                "And just like THAT, {prey} is GONE! {predator} is unstoppable!",
            ],
            evolution: [
                "EVOLUTION! {user}'s fish transforms into a {fish}! The crowd goes WILD!",
                "POWER UP! {user} evolves into {fish}! What a MOMENT!",
                "INCREDIBLE transformation! {user}'s creature is now a {fish}! AMAZING!",
                "Did you SEE that?! {user} just evolved into a {fish}! SPECTACULAR!",
                "Level UP! {user} becomes a {fish}! The competition just got REAL!",
            ],
            milestone: [
                "We just hit {count} viewers! NEW creatures are now UNLOCKED! Things are about to get CRAZY!",
                "{count} people watching! The ocean is evolving! New species are appearing!",
                "AMAZING! {count} viewers! You all are INCREDIBLE! New tier UNLOCKED!",
                "WOW! {count} viewers and counting! The aquarium just got a MAJOR upgrade!",
            ],
            encourage: [
                "Send a gift to spawn YOUR fish! Will it survive the ocean?",
                "The bigger the gift, the BIGGER the fish! Who dares to go LEGENDARY?",
                "Your fish is hungry! Feed it with more gifts and watch it EVOLVE!",
                "Who will be the OCEAN KING today? Only one way to find out!",
                "The leaderboard is heating up! Drop a gift to climb the ranks!",
                "Only the STRONGEST survive! Power up your fish NOW!",
                "Think your fish is tough? Wait until you see what a BIGGER gift can spawn!",
                "The ocean needs more warriors! Send a gift and join the BATTLE!",
                "Pro tip: bigger gifts spawn BIGGER fish that can eat EVERYTHING!",
                "Ever seen a Kraken? Send a legendary gift and find out!",
            ],
            combo: [
                "{user} hits a {count}x COMBO! They are ON FIRE!",
                "UNSTOPPABLE! {user} with a {count}x gift combo! INCREDIBLE!",
                "{count} gifts in a ROW from {user}! Someone stop this LEGEND!",
            ],
            predatorWarn: [
                "WARNING! Something DARK is approaching from the deep! Send gifts to protect your fish!",
                "Do you feel that? The water is getting COLD. Predators are COMING!",
                "DANGER! The ocean senses a disturbance! PREDATOR WAVE incoming!",
            ],
            predatorArrive: [
                "They're HERE! MASSIVE predators just entered the ocean! Your fish are in DANGER!",
                "CODE RED! Giant hunters are in the water! Only the BIGGEST fish can survive!",
                "RUN little fishies RUN! The predators have ARRIVED! Send gifts to fight back!",
            ],
            predatorClear: [
                "The predators have retreated! You all SURVIVED! But they WILL come back even STRONGER!",
                "Victory! The hunters are gone, for NOW. Keep your fish growing!",
                "The ocean is safe again! But don't relax! The next wave will be even MORE terrifying!",
            ],
            bossSpawn: [
                "WARNING! WARNING! A BOSS has appeared in the ocean! This is NOT a drill!",
                "THE ANCIENT SEA DRAGON AWAKENS! Everyone, prepare yourselves!",
                "CODE RED! A TITAN rises from the ABYSS! The ocean shakes with FEAR!",
            ],
            leaderboard: [
                "Current champion: {user} from {country} with {score} points! Can ANYONE challenge them?",
                "{user} is DOMINATING the leaderboard with {score} points! Who's brave enough to try?",
                "The battle for number ONE rages on! {user} leads with {score} points!",
            ],
            // CÂU GHÉP - khi có nhiều sự kiện cùng lúc
            combined: [
                "Welcome {joinUser}! And WOW, {giftUser} just dropped a {fish}! What a moment!",
                "{giftUser} sends a {fish} while {joinUser} joins the fun! The ocean is ALIVE!",
                "Double action! {joinUser} dives in and {giftUser} spawns a {fish}! LOVE the energy!",
            ],
        };

        // Load voices
        this.loadVoices();
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this.loadVoices();
        }

        // Bắt đầu các vòng lặp xử lý
        this.startQueueProcessor();
        this.startBatchProcessor();
        this.startPeriodicEncouragement();
    }

    // ===== LOAD GIỌNG NÓI =====
    loadVoices() {
    const voices = this.synth.getVoices();
    if (voices.length === 0) return;

    // Ưu tiên giọng English tự nhiên nhất
    const preferred = [
        // Google voices (tự nhiên nhất)
        'Google US English',
        'Google UK English Female',
        'Google UK English Male',
        // Microsoft Online voices (chất lượng cao)
        'Microsoft Ana Online (Natural)',
        'Microsoft Jenny Online (Natural)',
        'Microsoft Guy Online (Natural)',
        'Microsoft Aria Online (Natural)',
        // Microsoft Desktop voices
        'Microsoft Zira Desktop',
        'Microsoft David Desktop',
        'Microsoft Mark',
        // macOS voices
        'Samantha',
        'Alex',
        'Karen',
        'Daniel',
    ];

    for (const name of preferred) {
        const found = voices.find(v => v.name.includes(name));
        if (found) {
            this.voice = found;
            break;
        }
    }

    // Fallback: tìm giọng en-US trước, rồi en-GB, rồi bất kỳ en
    if (!this.voice) {
        this.voice = voices.find(v => v.lang === 'en-US')
            || voices.find(v => v.lang === 'en-GB')
            || voices.find(v => v.lang.startsWith('en'))
            || voices[0];
    }

    this.voiceReady = true;
    console.log('🎙️ MC Voice loaded:', this.voice?.name, '(' + this.voice?.lang + ')');
}

    // ===== THÊM VÀO HÀNG CHỜ =====
    // priority: 0=URGENT, 1=HIGH, 2=NORMAL, 3=LOW
    // emotion: 'normal', 'excited', 'warning', 'epic'
    enqueue(text, priority = 2, emotion = 'normal') {
        if (!this.enabled || !this.voiceReady || !text) return;

        // Nếu queue đầy, xóa bớt item ưu tiên thấp nhất
        while (this.queue.length >= this.MAX_QUEUE) {
            // Tìm item ưu tiên thấp nhất (số lớn nhất)
            let lowestIdx = -1;
            let lowestPriority = -1;
            for (let i = this.queue.length - 1; i >= 0; i--) {
                if (this.queue[i].priority > lowestPriority) {
                    lowestPriority = this.queue[i].priority;
                    lowestIdx = i;
                }
            }
            // Nếu item mới ưu tiên cao hơn (số nhỏ hơn) item thấp nhất → xóa item thấp
            if (lowestIdx >= 0 && priority < lowestPriority) {
                this.queue.splice(lowestIdx, 1);
            } else {
                // Queue toàn item ưu tiên cao hơn hoặc bằng → bỏ qua item mới
                return;
            }
        }

        this.queue.push({ text, priority, emotion, timestamp: Date.now() });

        // Sắp xếp: ưu tiên cao (số nhỏ) lên trước, cùng ưu tiên thì cái cũ trước
        this.queue.sort((a, b) => {
            if (a.priority !== b.priority) return a.priority - b.priority;
            return a.timestamp - b.timestamp;
        });
    }

    // ===== XỬ LÝ HÀNG CHỜ (nói từng câu một) =====
    startQueueProcessor() {
        setInterval(() => {
            // Đang nói → KHÔNG làm gì, chờ nói xong
            if (this.isSpeaking) return;
            if (!this.enabled || !this.voiceReady) return;
            if (this.queue.length === 0) return;

            // Kiểm tra khoảng nghỉ giữa các câu
            const now = Date.now();
            if (now - this.lastSpokeTime < this.pauseBetween) return;

            // Lấy câu đầu tiên trong queue (ưu tiên cao nhất)
            const item = this.queue.shift();
            if (!item) return;

            // Kiểm tra: nếu sự kiện đã quá cũ (> 15 giây) → bỏ qua
            if (now - item.timestamp > 15000 && item.priority > 1) return;

            this._speak(item.text, item.emotion);
        }, 300); // check mỗi 300ms
    }

    // ===== NÓI 1 CÂU =====
    _speak(text, emotion = 'normal') {
    if (!this.voiceReady || this.isSpeaking) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.voice;
    utterance.lang = 'en-US';

    // Giọng thay đổi theo cảm xúc
    switch (emotion) {
        case 'excited':
            utterance.rate = 1.15;
            utterance.pitch = 1.25;
            utterance.volume = 0.9;
            break;
        case 'epic':
            utterance.rate = 1.05;
            utterance.pitch = 1.3;
            utterance.volume = 1.0;
            break;
        case 'warning':
            utterance.rate = 0.9;
            utterance.pitch = 0.8;
            utterance.volume = 1.0;
            break;
        case 'calm':
            utterance.rate = 0.95;
            utterance.pitch = 1.05;
            utterance.volume = 0.75;
            break;
        default: // normal
            utterance.rate = 1.0;
            utterance.pitch = 1.1;
            utterance.volume = 0.85;
            break;
    }

    this.isSpeaking = true;
    this.currentUtterance = utterance;

    utterance.onend = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        this.lastSpokeTime = Date.now();
    };

    utterance.onerror = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        this.lastSpokeTime = Date.now();
    };

    // Fix Chrome bug: speechSynthesis bị treo sau 15 giây
    if (this.synth.paused) {
        this.synth.resume();
    }

    this.synth.speak(utterance);

    // Chrome workaround: tự resume nếu bị pause
    this._chromeFixTimer = setInterval(() => {
        if (!this.isSpeaking) {
            clearInterval(this._chromeFixTimer);
            return;
        }
        if (this.synth.paused) {
            this.synth.resume();
        }
    }, 5000);
}


    // ===== GỘP SỰ KIỆN (batch) =====
    startBatchProcessor() {
        setInterval(() => {
            if (!this.enabled) return;
            const now = Date.now();

            // Gộp likes
            if (this.pendingEvents.likes.count > 0 &&
                now - this.pendingEvents.likes.lastTime > this.batchInterval) {
                const count = this.pendingEvents.likes.count;
                this.pendingEvents.likes.count = 0;

                if (count >= 20) {
                    const script = this.pickRandom(this.scripts.likeBatch);
                    this.enqueue(script.replace('{count}', count.toString()), 3, 'excited');
                } else if (count >= 5) {
                    const script = this.pickRandom(this.scripts.like);
                    this.enqueue(script, 3, 'normal');
                }
                // < 5 likes: không nói gì (tránh spam)
            }

            // Gộp joins
            if (this.pendingEvents.joins.users.length > 0 &&
                now - this.pendingEvents.joins.lastTime > this.batchInterval) {
                const users = this.pendingEvents.joins.users;
                this.pendingEvents.joins.users = [];

                if (users.length >= 3) {
                    // Gộp nhiều người
                    const names = users.slice(0, 3).map(u => u.name).join(', ');
                    const script = this.pickRandom(this.scripts.joinMultiple);
                    this.enqueue(
                        script.replace('{users}', names).replace('{count}', users.length.toString()),
                        3, 'normal'
                    );
                } else if (users.length === 1) {
                    // 1 người → câu đơn
                    const script = this.pickRandom(this.scripts.join);
                    this.enqueue(
                        script.replace('{user}', users[0].name).replace('{country}', users[0].country),
                        3, 'normal'
                    );
                } else {
                    // 2 người
                    const script = this.pickRandom(this.scripts.joinMultiple);
                    const names = users.map(u => u.name).join(' and ');
                    this.enqueue(
                        script.replace('{users}', names).replace('{count}', users.length.toString()),
                        3, 'normal'
                    );
                }
            }

            // Gộp small gifts
            if (this.pendingEvents.smallGifts.items.length > 0 &&
                now - this.pendingEvents.smallGifts.lastTime > this.batchInterval) {
                const items = this.pendingEvents.smallGifts.items;
                this.pendingEvents.smallGifts.items = [];

                if (items.length >= 3) {
                    const names = items.slice(0, 3).map(g => g.user).join(', ');
                    const script = this.pickRandom(this.scripts.giftSmallBatch);
                    this.enqueue(
                        script.replace('{users}', names).replace('{count}', items.length.toString()),
                        2, 'excited'
                    );
                } else {
                    // 1-2 gift: nói từng cái
                    items.forEach(g => {
                        const script = this.pickRandom(this.scripts.giftSmall);
                        this.enqueue(
                            script.replace('{user}', g.user).replace('{fish}', g.fish).replace('{country}', g.country),
                            2, 'normal'
                        );
                    });
                }
            }

        }, 2000); // check mỗi 2 giây
    }

    // ===== KHUYẾN KHÍCH ĐỊNH KỲ =====
    startPeriodicEncouragement() {
        // Khuyến khích tặng quà mỗi 35-50 giây
        setInterval(() => {
            if (!this.enabled || this.isSpeaking) return;
            if (this.queue.length > 3) return; // queue đang bận, skip

            const script = this.pickRandom(this.scripts.encourage);
            this.enqueue(script, 3, 'calm');
        }, 35000 + Math.random() * 15000);

        // Thông báo leaderboard mỗi 2-3 phút
        setInterval(() => {
            if (!this.enabled || this.isSpeaking) return;
            if (this.queue.length > 2) return;

            if (this.onLeaderboardRequest) {
                const data = this.onLeaderboardRequest();
                if (data) {
                    const script = this.pickRandom(this.scripts.leaderboard);
                    this.enqueue(
                        script.replace('{user}', data.username)
                              .replace('{country}', data.country)
                              .replace('{score}', data.score.toString()),
                        2, 'normal'
                    );
                }
            }
        }, 120000 + Math.random() * 60000);
    }

    // ===== CÁC HÀM GỌI TỪ GAME =====

    onJoin(username, country) {
        // Thêm vào batch, không nói ngay
        this.pendingEvents.joins.users.push({ name: username, country: country });
        this.pendingEvents.joins.lastTime = Date.now();

        // Nếu queue đang trống VÀ không có join nào pending → cơ hội ghép câu
        if (this.pendingEvents.smallGifts.items.length > 0 && this.queue.length === 0) {
            // Ghép câu: join + gift gần đây
            const gift = this.pendingEvents.smallGifts.items.pop();
            const script = this.pickRandom(this.scripts.combined);
            this.enqueue(
                script.replace('{joinUser}', username)
                      .replace('{giftUser}', gift.user)
                      .replace('{fish}', gift.fish),
                2, 'excited'
            );
            // Clear join pending vì đã ghép
            this.pendingEvents.joins.users = [];
        }
    }

    onLike(username) {
        // Tích lũy, không nói ngay
        this.pendingEvents.likes.count++;
        if (this.pendingEvents.likes.count === 1) {
            this.pendingEvents.likes.lastTime = Date.now();
        }
    }

    onGift(username, country, fishName, tier) {
        // Combo tracking
        this.trackCombo(username);

        if (tier === 'mythic') {
            // MYTHIC → URGENT, nói ngay (sau câu hiện tại)
            const script = this.pickRandom(this.scripts.giftLegendary);
            this.enqueue(
                script.replace('{user}', username).replace('{fish}', fishName).replace('{country}', country),
                0, 'epic'
            );
        } else if (tier === 'legendary') {
            // LEGENDARY → HIGH
            const script = this.pickRandom(this.scripts.giftLegendary);
            this.enqueue(
                script.replace('{user}', username).replace('{fish}', fishName).replace('{country}', country),
                1, 'epic'
            );
        } else if (tier === 'epic') {
            // EPIC → HIGH
            const script = this.pickRandom(this.scripts.giftBig);
            this.enqueue(
                script.replace('{user}', username).replace('{fish}', fishName).replace('{country}', country),
                1, 'excited'
            );
        } else {
            // Common/Rare → batch (gộp)
            this.pendingEvents.smallGifts.items.push({
                user: username, fish: fishName, country: country
            });
            if (this.pendingEvents.smallGifts.items.length === 1) {
                this.pendingEvents.smallGifts.lastTime = Date.now();
            }
        }
    }

    onEat(predatorName, preyName) {
        // Chỉ nói 30% → tránh spam khi nhiều cá ăn nhau
        if (Math.random() > 0.3) return;
        const script = this.pickRandom(this.scripts.eat);
        this.enqueue(
            script.replace('{predator}', predatorName).replace('{prey}', preyName),
            2, 'excited'
        );
    }

    onEvolution(username, fishName) {
        // Evolution → HIGH priority
        const script = this.pickRandom(this.scripts.evolution);
        this.enqueue(
            script.replace('{user}', username).replace('{fish}', fishName),
            1, 'epic'
        );
    }

    onMilestone(viewerCount) {
        const script = this.pickRandom(this.scripts.milestone);
        this.enqueue(
            script.replace('{count}', viewerCount.toString()),
            0, 'epic'
        );
    }

    onBossSpawn() {
        const script = this.pickRandom(this.scripts.bossSpawn);
        this.enqueue(script, 0, 'warning');
    }

    onPredatorWarning() {
        const script = this.pickRandom(this.scripts.predatorWarn);
        this.enqueue(script, 0, 'warning');
    }

    onPredatorArrive() {
        const script = this.pickRandom(this.scripts.predatorArrive);
        this.enqueue(script, 0, 'warning');
    }

    onPredatorClear() {
        const script = this.pickRandom(this.scripts.predatorClear);
        this.enqueue(script, 0, 'excited');
    }

    trackCombo(username) {
        if (!this.comboTracker[username]) {
            this.comboTracker[username] = { count: 0, lastTime: 0 };
        }
        const tracker = this.comboTracker[username];
        const now = Date.now();

        if (now - tracker.lastTime < 15000) {
            tracker.count++;
            if (tracker.count === 3 || tracker.count === 5 || tracker.count === 10 || tracker.count % 10 === 0) {
                const script = this.pickRandom(this.scripts.combo);
                this.enqueue(
                    script.replace('{user}', username).replace('{count}', tracker.count.toString()),
                    1, 'epic'
                );
            }
        } else {
            tracker.count = 1;
        }
        tracker.lastTime = now;
    }

    // ===== NÓI CÂU TÙY CHỈNH (dùng từ game.js) =====
    speak(text, priority = 2, emotion = 'normal') {
        // Map string priority sang số
        const priorityMap = { 'urgent': 0, 'high': 1, 'normal': 2, 'low': 3 };
        const p = typeof priority === 'string' ? (priorityMap[priority] ?? 2) : priority;
        this.enqueue(text, p, emotion);
    }

    // ===== BẬT/TẮT =====
    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            // Dừng nhẹ nhàng: để câu hiện tại nói xong, xóa queue
            this.queue = [];
            this.pendingEvents.likes.count = 0;
            this.pendingEvents.joins.users = [];
            this.pendingEvents.smallGifts.items = [];
        }
        return this.enabled;
    }

    // ===== TIỆN ÍCH =====
    pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Thông tin debug
    getStatus() {
        return {
            speaking: this.isSpeaking,
            queueLength: this.queue.length,
            pendingLikes: this.pendingEvents.likes.count,
            pendingJoins: this.pendingEvents.joins.users.length,
            pendingGifts: this.pendingEvents.smallGifts.items.length,
        };
    }
}
