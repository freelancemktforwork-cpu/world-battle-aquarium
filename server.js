const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const path = require('path');

const PORT = process.env.PORT || 3000;
const TIKTOK_USERNAME = process.env.TIKTOK_USER || 'phamhocthuc';
const DEMO_MODE = false;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
app.use(express.static(path.join(__dirname, 'public')));

const clients = new Set();
wss.on('connection', function(ws) {
    clients.add(ws);
    console.log('✅ Client kết nối (tổng: ' + clients.size + ')');
    ws.on('close', function() {
        clients.delete(ws);
        console.log('❌ Client ngắt kết nối (tổng: ' + clients.size + ')');
    });
    ws.on('error', function(err) {
        console.error('WebSocket error:', err.message);
        clients.delete(ws);
    });
});

function broadcast(data) {
    var msg = typeof data === 'string' ? data : JSON.stringify(data);
    for (var client of clients) {
        if (client.readyState === 1) {
            try { client.send(msg); } catch (e) { console.error('Broadcast error:', e.message); }
        }
    }
}

function detectCountry(userData) {
    if (!userData) return '🌍';
    var bio = (userData.bioDescription || userData.Bio || '').toLowerCase();
    var nick = (userData.nickname || userData.Nickname || '').toLowerCase();
    var text = bio + ' ' + nick;
    var map = {
        'vietnam': 'VN', 'việt': 'VN', 'vn': 'VN', 'saigon': 'VN', 'hanoi': 'VN',
        'usa': 'US', 'america': 'US', 'united states': 'US',
        'japan': 'JP', '日本': 'JP', 'tokyo': 'JP',
        'korea': 'KR', '한국': 'KR', 'seoul': 'KR',
        'china': 'CN', '中国': 'CN', 'beijing': 'CN',
        'thai': 'TH', 'bangkok': 'TH',
        'indo': 'ID', 'jakarta': 'ID',
        'malay': 'MY', 'kuala': 'MY',
        'phil': 'PH', 'manila': 'PH',
        'brazil': 'BR', 'brasil': 'BR',
        'mexico': 'MX', 'méxico': 'MX',
        'france': 'FR', 'paris': 'FR',
        'german': 'DE', 'deutsch': 'DE', 'berlin': 'DE',
        'uk': 'GB', 'england': 'GB', 'british': 'GB', 'london': 'GB',
        'india': 'IN', 'mumbai': 'IN', 'delhi': 'IN',
        'russia': 'RU', 'россия': 'RU', 'moscow': 'RU',
        'turkey': 'TR', 'türk': 'TR', 'istanbul': 'TR',
        'egypt': 'EG', 'cairo': 'EG',
        'italy': 'IT', 'italia': 'IT', 'roma': 'IT',
        'spain': 'ES', 'españa': 'ES', 'madrid': 'ES',
        'canada': 'CA', 'toronto': 'CA',
        'australia': 'AU', 'sydney': 'AU'
    };
    for (var kw in map) {
        if (text.includes(kw)) return map[kw];
    }
    return '🌍';
}

function getGiftCoins(gift) {
    if (gift.diamondCount) return gift.diamondCount;
    if (gift.gift_value) return gift.gift_value;
    var prices = {
        'rose': 1, 'sunflower': 5, 'ice cream cone': 1, 'finger heart': 5,
        'love you': 10, 'doughnut': 30, 'concert': 50, 'drama queen': 100,
        'lion': 29999, 'universe': 44999, 'galaxy': 1000, 'planet': 15000
    };
    var name = (gift.giftName || '').toLowerCase();
    return prices[name] || 1;
}

// ===== DEMO MODE =====
function startDemoMode() {
    console.log('🎮 DEMO MODE đang chạy...');
    var fakeUsers = [
        { name: 'Tuan_VN', country: 'VN' }, { name: 'Sarah_US', country: 'US' },
        { name: 'Yuki_JP', country: 'JP' }, { name: 'Pedro_BR', country: 'BR' },
        { name: 'Anna_DE', country: 'DE' }, { name: 'Kim_KR', country: 'KR' },
        { name: 'Priya_IN', country: 'IN' }, { name: 'Ahmed_EG', country: 'EG' },
        { name: 'Luna_MX', country: 'MX' }, { name: 'Chen_CN', country: 'CN' },
        { name: 'Olga_RU', country: 'RU' }, { name: 'Marco_IT', country: 'IT' },
        { name: 'Suki_TH', country: 'TH' }, { name: 'Jean_FR', country: 'FR' },
        { name: 'Ali_TR', country: 'TR' }
    ];
    var fakeGifts = [
        { name: 'Rose', coins: 1 }, { name: 'GG', coins: 1 },
        { name: 'Ice Cream Cone', coins: 1 }, { name: 'Finger Heart', coins: 5 },
        { name: 'Sunflower', coins: 5 }, { name: 'Panda', coins: 5 },
        { name: 'Hand Heart', coins: 10 }, { name: 'Perfume', coins: 20 },
        { name: 'Doughnut', coins: 30 }, { name: 'Concert', coins: 50 },
        { name: 'Confetti', coins: 100 }, { name: 'Sunglasses', coins: 199 },
        { name: 'Money Rain', coins: 500 }, { name: 'Galaxy', coins: 1000 },
        { name: 'Lion', coins: 29999 }, { name: 'TikTok Universe', coins: 44999 }
    ];
    var fakeComments = [
        'Hello!', 'Amazing!', 'Love this game!', 'Go go go!', 'Wow!',
        'My fish is the best!', 'Eat them all!', 'boss', 'So cool!',
        'Who is winning?', 'Feed my fish!', 'LEGENDARY!', 'Number 1!',
        'This is awesome!', 'Keep going!', 'Haha nice!', 'GG!'
    ];
    var randomFrom = function(arr) { return arr[Math.floor(Math.random() * arr.length)]; };
    var viewerCount = 5;

    setInterval(function() {
        var u = randomFrom(fakeUsers);
        var cnt = 1 + Math.floor(Math.random() * 5);
        broadcast({ type: 'like', username: u.name, country: u.country, likeCount: cnt });
    }, 2000 + Math.random() * 2000);

    setInterval(function() {
        var u = randomFrom(fakeUsers);
        var g = randomFrom(fakeGifts);
        broadcast({ type: 'gift', username: u.name, country: u.country, giftName: g.name, coins: g.coins, diamondCount: g.coins });
        console.log('🎁 ' + u.name + ' (' + u.country + ') tặng ' + g.name + ' [' + g.coins + ' coins]');
    }, 3000 + Math.random() * 3000);

    setInterval(function() {
        var u = randomFrom(fakeUsers);
        var c = randomFrom(fakeComments);
        broadcast({ type: 'chat', username: u.name, country: u.country, comment: c });
    }, 4000 + Math.random() * 4000);

    setInterval(function() {
        var u = randomFrom(fakeUsers);
        viewerCount += Math.floor(Math.random() * 3) + 1;
        broadcast({ type: 'member', username: u.name, country: u.country });
        broadcast({ type: 'roomUser', viewerCount: viewerCount });
    }, 5000 + Math.random() * 5000);

    setInterval(function() {
        var u = randomFrom(fakeUsers);
        var big = fakeGifts.filter(function(g) { return g.coins >= 50; });
        var g = randomFrom(big);
        broadcast({ type: 'gift', username: u.name, country: u.country, giftName: g.name, coins: g.coins, diamondCount: g.coins });
        console.log('💎 BIG GIFT! ' + u.name + ' tặng ' + g.name + ' [' + g.coins + ' coins]');
    }, 20000 + Math.random() * 20000);
}

// ===== TIKTOK LIVE MODE =====
function startTikTokMode() {
    console.log('🔌 Đang kết nối tới TikTok LIVE: @' + TIKTOK_USERNAME + '...');
    var TikTokConnection;
    try {
        var mod = require('tiktok-live-connector');
        TikTokConnection = mod.WebcastPushConnection || mod.default;
    } catch (e) {
        console.error('❌ Không tìm thấy tiktok-live-connector.');
        console.log('🎮 Tự động chuyển sang DEMO MODE...');
        startDemoMode();
        return;
    }

    var tiktok = new TikTokConnection(TIKTOK_USERNAME, {
        processInitialData: true,
        enableExtendedGiftInfo: true,
        requestPollingIntervalMs: 1500
    });

    tiktok.connect().then(function(state) {
        console.log('✅ Đã kết nối TikTok LIVE! Room ID: ' + state.roomId);
    }).catch(function(err) {
        console.error('❌ Lỗi kết nối TikTok: ' + err.message);
        console.log('🎮 Chưa LIVE - Tự động chuyển sang DEMO MODE...');
        console.log('💡 Khi bạn bấm Go Live trên TikTok, hãy chạy lại npm start');
        startDemoMode();
        return;
    });

    tiktok.on('chat', function(data) {
        broadcast({ type: 'chat', username: data.uniqueId || data.nickname, country: detectCountry(data), comment: data.comment });
    });
    tiktok.on('like', function(data) {
        broadcast({ type: 'like', username: data.uniqueId || data.nickname, country: detectCountry(data), likeCount: data.likeCount || 1 });
    });
    tiktok.on('gift', function(data) {
        if (data.giftType === 1 && !data.repeatEnd) return;
        var coins = getGiftCoins(data);
        broadcast({ type: 'gift', username: data.uniqueId || data.nickname, country: detectCountry(data), giftName: data.giftName || 'Gift', coins: coins, diamondCount: coins, repeatCount: data.repeatCount || 1 });
        console.log('🎁 ' + data.uniqueId + ' tặng ' + data.giftName + ' x' + (data.repeatCount || 1) + ' [' + coins + ' coins]');
    });
    tiktok.on('member', function(data) {
        broadcast({ type: 'member', username: data.uniqueId || data.nickname, country: detectCountry(data) });
    });
    tiktok.on('roomUser', function(data) {
        broadcast({ type: 'roomUser', viewerCount: data.viewerCount || 0 });
    });
    tiktok.on('disconnected', function() {
        console.log('❌ TikTok LIVE ngắt kết nối. Chuyển sang DEMO MODE...');
        startDemoMode();
    });
    tiktok.on('error', function(err) {
        console.error('❌ TikTok error:', err.message);
    });
}

// ===== ROUTE MOBILE =====
app.get('/mobile', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'mobile.html'));
});

// ===== START SERVER =====
server.listen(PORT, function() {
    console.log('========================================');
    console.log('🌊 World Battle Aquarium');
    console.log('🌐 http://localhost:' + PORT);
    console.log('📱 http://localhost:' + PORT + '/mobile');
    console.log('🎮 Mode: ' + (DEMO_MODE ? 'DEMO' : 'TikTok LIVE'));
    console.log('========================================');
    if (DEMO_MODE) {
        startDemoMode();
    } else {
        startTikTokMode();
    }
});
