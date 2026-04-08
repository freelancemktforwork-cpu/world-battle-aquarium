// ====== LEADERBOARD — ROYAL VIP DESIGN ======
// Hỗ trợ 2 chế độ: Player ranking & Country ranking

class Leaderboard {
    constructor() {
        this.playerScores = {};  // { uniqueId: { name, country, score, giftCount, lastGift } }
        this.countryScores = {}; // { countryCode: totalScore }
        this.mode = 'player';    // 'player' hoặc 'country'

        this.top3El = document.getElementById('lb-top3');
        this.restEl = document.getElementById('lb-rest');

        this.resetInterval = 3 * 60 * 60 * 1000;
        this.lastReset = Date.now();
    }

    setMode(mode) {
        this.mode = mode;
        document.getElementById('btn-player').classList.toggle('active', mode === 'player');
        document.getElementById('btn-country').classList.toggle('active', mode === 'country');
        this.render();
    }

    addPlayerScore(uniqueId, nickname, country, points, giftName) {
        // Player
        if (!this.playerScores[uniqueId]) {
            this.playerScores[uniqueId] = {
                name: nickname || uniqueId,
                country: country,
                score: 0,
                giftCount: 0,
                lastGift: '',
                tier: 'bronze'
            };
        }
        const player = this.playerScores[uniqueId];
        player.score += points;
        player.giftCount++;
        player.name = nickname || uniqueId;
        player.lastGift = giftName || '';
        player.country = country;

        // Cập nhật tier dựa trên điểm
        if (player.score >= 500) player.tier = 'diamond';
        else if (player.score >= 200) player.tier = 'gold';
        else if (player.score >= 50) player.tier = 'silver';
        else player.tier = 'bronze';

        // Country
        if (!this.countryScores[country]) this.countryScores[country] = 0;
        this.countryScores[country] += points;

        this.render();
    }

    addScore(country, points) {
        if (!this.countryScores[country]) this.countryScores[country] = 0;
        this.countryScores[country] += points;
        if (this.mode === 'country') this.render();
    }

    getPointsForTier(tier) {
        switch (tier) {
            case 'legendary': return 100;
            case 'epic': return 30;
            case 'rare': return 10;
            case 'common': return 3;
            case 'tiny': return 1;
            default: return 1;
        }
    }

    checkReset() {
        if (Date.now() - this.lastReset > this.resetInterval) {
            this.reset();
        }
    }

    reset() {
        this.playerScores = {};
        this.countryScores = {};
        this.lastReset = Date.now();
        this.render();
    }

    getTopPlayers(limit = 10) {
        return Object.entries(this.playerScores)
            .sort((a, b) => b[1].score - a[1].score)
            .slice(0, limit)
            .map(([id, data]) => ({
                id,
                ...data,
                countryInfo: getCountryInfo(data.country)
            }));
    }

    getTopCountries(limit = 10) {
        return Object.entries(this.countryScores)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([code, score]) => ({
                code,
                score,
                ...getCountryInfo(code)
            }));
    }

    formatScore(score) {
        if (score >= 10000) return (score / 1000).toFixed(1) + 'K';
        if (score >= 1000) return (score / 1000).toFixed(1) + 'K';
        return score.toString();
    }

    getTierBadge(tier) {
        switch (tier) {
            case 'diamond': return '💎';
            case 'gold': return '🏅';
            case 'silver': return '🥈';
            default: return '🥉';
        }
    }

    render() {
        if (this.mode === 'player') {
            this.renderPlayers();
        } else {
            this.renderCountries();
        }
    }

    renderPlayers() {
        const players = this.getTopPlayers(10);

        if (players.length === 0) {
            this.top3El.innerHTML = `
                <div style="text-align:center; padding: 30px 10px; color: rgba(255,255,255,0.3); font-size: 13px;">
                    🎁 Gửi gift để lên Hall of Fame!
                </div>`;
            this.restEl.innerHTML = '';
            return;
        }

        // Top 3
        const top3 = players.slice(0, 3);
        const rankEmojis = ['👑', '🥈', '🥉'];

        this.top3El.innerHTML = top3.map((p, i) => `
            <div class="top3-entry rank-${i + 1}">
                <div class="top3-rank">${rankEmojis[i]}</div>
                <div class="top3-info">
                    <div class="top3-name">${p.countryInfo.flag} ${this.escapeHtml(p.name)}</div>
                    <div class="top3-details">${this.getTierBadge(p.tier)} ${p.giftCount} gifts · ${p.lastGift}</div>
                </div>
                <div class="top3-score">${this.formatScore(p.score)}</div>
            </div>
        `).join('');

        // 4-10
        const rest = players.slice(3);
        this.restEl.innerHTML = rest.map((p, i) => `
            <div class="rest-entry">
                <div class="rest-rank">${i + 4}</div>
                <div class="rest-flag">${p.countryInfo.flag}</div>
                <div class="rest-name">${this.escapeHtml(p.name)}</div>
                <div class="rest-score">${this.formatScore(p.score)}</div>
            </div>
        `).join('');
    }

    renderCountries() {
        const countries = this.getTopCountries(10);

        if (countries.length === 0) {
            this.top3El.innerHTML = `
                <div style="text-align:center; padding: 30px 10px; color: rgba(255,255,255,0.3); font-size: 13px;">
                    🌍 Gửi gift cho quốc gia bạn!
                </div>`;
            this.restEl.innerHTML = '';
            return;
        }

        const top3 = countries.slice(0, 3);
        const rankEmojis = ['👑', '🥈', '🥉'];

        this.top3El.innerHTML = top3.map((c, i) => `
            <div class="top3-entry rank-${i + 1}">
                <div class="top3-rank">${rankEmojis[i]}</div>
                <div class="top3-info">
                    <div class="top3-name">${c.flag} ${c.name}</div>
                    <div class="top3-details">🌍 Country Score</div>
                </div>
                <div class="top3-score">${this.formatScore(c.score)}</div>
            </div>
        `).join('');

        const rest = countries.slice(3);
        this.restEl.innerHTML = rest.map((c, i) => `
            <div class="rest-entry">
                <div class="rest-rank">${i + 4}</div>
                <div class="rest-flag">${c.flag}</div>
                <div class="rest-name">${c.name}</div>
                <div class="rest-score">${this.formatScore(c.score)}</div>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
