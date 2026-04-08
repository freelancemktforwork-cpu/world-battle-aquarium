// ====== AUDIO SYSTEM — PHIÊN BẢN 4.0 ======
// Playlist tự động chuyển bài + Hiệu ứng âm thanh

class AudioSystem {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.isStarted = false;
        this.masterVolume = null;

        // ====== PLAYLIST CONFIG ======
        // Thêm/bớt bài nhạc ở đây — đặt file mp3 trong public/assets/
        this.playlist = [
            'assets/bgm1.mp3',
            'assets/bgm2.mp3',
            'assets/bgm3.mp3',
            'assets/bgm4.mp3',
            'assets/bgm5.mp3',
			'assets/bgm6.mp3',
			'assets/bgm7.mp3',
        ];

        this.currentTrackIndex = 0;
        this.bgm = null;
        this.bgmVolume = 0.12;
        this.sfxVolume = 0.7;
        this.bgmLoaded = false;
        this.isShuffled = true;        // true = phát ngẫu nhiên, false = phát theo thứ tự
        this.crossfadeDuration = 3;     // Thời gian chuyển bài mượt (giây)
        this.currentTrackName = '';
        this.nextBgm = null;           // Dùng cho crossfade

        // Shuffle playlist ngay từ đầu
        if (this.isShuffled) {
            this.shufflePlaylist();
        }

        // Khởi tạo khi user click
        document.addEventListener('click', () => this.init(), { once: true });
        document.addEventListener('touchstart', () => this.init(), { once: true });
    }

    init() {
        if (this.isStarted) return;
        this.isStarted = true;

        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.masterVolume = this.ctx.createGain();
            this.masterVolume.gain.value = this.sfxVolume;
            this.masterVolume.connect(this.ctx.destination);

            // Bắt đầu playlist
            this.startPlaylist();

            console.log('🎵 Audio System v4.0 — Playlist Mode!');
        } catch (e) {
            console.log('⚠️ Audio not available:', e);
        }
    }

    // ====== PLAYLIST SYSTEM ======

    shufflePlaylist() {
        // Fisher-Yates shuffle
        for (let i = this.playlist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.playlist[i], this.playlist[j]] = [this.playlist[j], this.playlist[i]];
        }
    }

    startPlaylist() {
        // Tìm file đầu tiên có thể phát
        this.currentTrackIndex = 0;
        this.playTrack(this.currentTrackIndex);
    }

    playTrack(index) {
        if (index >= this.playlist.length) {
            // Hết playlist → shuffle lại rồi phát từ đầu
            if (this.isShuffled) {
                this.shufflePlaylist();
            }
            this.currentTrackIndex = 0;
            index = 0;
        }

        const trackPath = this.playlist[index];
        this.currentTrackName = trackPath.split('/').pop().replace('.mp3', '');

        console.log(`🎵 Đang phát: ${this.currentTrackName} (${index + 1}/${this.playlist.length})`);

        // Tạo audio element mới
        const newBgm = new Audio(trackPath);
        newBgm.volume = 0; // Bắt đầu im lặng (sẽ fade in)
        newBgm.preload = 'auto';

        newBgm.addEventListener('canplaythrough', () => {
            this.bgmLoaded = true;

            // Crossfade: fade out bài cũ, fade in bài mới
            if (this.bgm && !this.bgm.paused) {
                this.crossfade(this.bgm, newBgm);
            } else {
                // Không có bài cũ → fade in luôn
                newBgm.play().then(() => {
                    this.fadeIn(newBgm);
                }).catch(() => {
                    document.addEventListener('click', () => {
                        newBgm.play().then(() => this.fadeIn(newBgm)).catch(() => {});
                    }, { once: true });
                });
            }

            this.bgm = newBgm;
            this.updateNowPlaying();
        }, { once: true });

        // Khi bài hát kết thúc → chuyển bài tiếp
        newBgm.addEventListener('ended', () => {
            console.log(`🎵 Bài ${this.currentTrackName} đã kết thúc`);
            this.currentTrackIndex++;
            this.playTrack(this.currentTrackIndex);
        });

        // Nếu file lỗi → bỏ qua, phát bài tiếp
        newBgm.addEventListener('error', () => {
            console.log(`⚠️ Không tải được: ${trackPath}, bỏ qua...`);
            this.currentTrackIndex++;
            if (this.currentTrackIndex < this.playlist.length) {
                this.playTrack(this.currentTrackIndex);
            } else {
                console.log('🎵 Không có file nhạc nào, dùng ambient tự tạo');
                this.startGeneratedAmbient();
            }
        });
    }

    // Fade in nhạc mới
    fadeIn(audio) {
        const targetVolume = this.isMuted ? 0 : this.bgmVolume;
        let vol = 0;
        const step = targetVolume / (this.crossfadeDuration * 20); // 20 steps/giây

        const fadeInterval = setInterval(() => {
            vol += step;
            if (vol >= targetVolume) {
                vol = targetVolume;
                clearInterval(fadeInterval);
            }
            audio.volume = Math.max(0, Math.min(1, vol));
        }, 50);
    }

    // Fade out nhạc cũ
    fadeOut(audio, callback) {
        let vol = audio.volume;
        const step = vol / (this.crossfadeDuration * 20);

        const fadeInterval = setInterval(() => {
            vol -= step;
            if (vol <= 0) {
                vol = 0;
                audio.pause();
                clearInterval(fadeInterval);
                if (callback) callback();
            }
            audio.volume = Math.max(0, Math.min(1, vol));
        }, 50);
    }

    // Crossfade giữa 2 bài
    crossfade(oldAudio, newAudio) {
        // Fade out bài cũ
        this.fadeOut(oldAudio);

        // Fade in bài mới
        newAudio.play().then(() => {
            this.fadeIn(newAudio);
        }).catch(() => {});
    }

    // Chuyển bài thủ công (nút Skip)
    skipTrack() {
        console.log('⏭️ Chuyển bài...');
        this.currentTrackIndex++;
        this.playTrack(this.currentTrackIndex);
    }

    // Hiển thị tên bài đang phát
    updateNowPlaying() {
        const el = document.getElementById('now-playing');
        if (el) {
            el.textContent = `♪ ${this.currentTrackName}`;
            el.style.opacity = '1';
            setTimeout(() => { el.style.opacity = '0.5'; }, 3000);
        }
    }

    // Toggle mute
    toggleMute() {
        this.isMuted = !this.isMuted;

        if (this.bgm) {
            this.bgm.volume = this.isMuted ? 0 : this.bgmVolume;
        }
        if (this.masterVolume) {
            this.masterVolume.gain.value = this.isMuted ? 0 : this.sfxVolume;
        }

        document.getElementById('sound-icon').textContent = this.isMuted ? '🔇' : '🔊';
    }

    // ====== AMBIENT TỰ TẠO (fallback) ======
    startGeneratedAmbient() {
        if (!this.ctx) return;
        this.generatedAmbientPlaying = true;
        this.playAmbientLoop();
    }

    playAmbientLoop() {
        if (!this.ctx || !this.generatedAmbientPlaying) return;

        const now = this.ctx.currentTime;
        const duration = 8;

        const chords = [
            [130.81, 164.81, 196.00],
            [110.00, 138.59, 164.81],
            [146.83, 174.61, 220.00],
            [130.81, 155.56, 196.00],
        ];

        const chord = chords[Math.floor(Math.random() * chords.length)];

        chord.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = 'sine';
            osc.frequency.value = freq * 0.5;
            filter.type = 'lowpass';
            filter.frequency.value = 400;
            filter.Q.value = 1;

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.06, now + 2);
            gain.gain.linearRampToValueAtTime(0.04, now + duration - 2);
            gain.gain.linearRampToValueAtTime(0, now + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterVolume);
            osc.start(now + i * 0.3);
            osc.stop(now + duration);
        });

        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.01;
        }

        const source = this.ctx.createBufferSource();
        const wFilter = this.ctx.createBiquadFilter();
        const wGain = this.ctx.createGain();

        source.buffer = buffer;
        wFilter.type = 'bandpass';
        wFilter.frequency.value = 200 + Math.random() * 200;
        wFilter.Q.value = 0.5;

        wGain.gain.setValueAtTime(0, now);
        wGain.gain.linearRampToValueAtTime(0.15, now + 1);
        wGain.gain.linearRampToValueAtTime(0.1, now + duration - 1);
        wGain.gain.linearRampToValueAtTime(0, now + duration);

        source.connect(wFilter);
        wFilter.connect(wGain);
        wGain.connect(this.masterVolume);
        source.start(now);
        source.stop(now + duration);

        setTimeout(() => this.playAmbientLoop(), duration * 1000 - 500);
    }

    // ====== HIỆU ỨNG ÂM THANH ======

    playBubble() {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600 + Math.random() * 400, now);
        osc.frequency.exponentialRampToValueAtTime(1200 + Math.random() * 300, now + 0.1);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(this.masterVolume);
        osc.start(now);
        osc.stop(now + 0.15);
    }

    playGiftSmall() {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;
        [523, 659, 784].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, now + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.1, now + i * 0.08 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
            osc.connect(gain);
            gain.connect(this.masterVolume);
            osc.start(now + i * 0.08);
            osc.stop(now + i * 0.08 + 0.3);
        });
    }

    playGiftEpic() {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;
        [523, 659, 784, 1047].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, now + i * 0.12);
            gain.gain.linearRampToValueAtTime(0.15, now + i * 0.12 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.5);
            osc.connect(gain);
            gain.connect(this.masterVolume);
            osc.start(now + i * 0.12);
            osc.stop(now + i * 0.12 + 0.5);
        });
    }

    playGiftLegendary() {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;

        const notes = [
            { freq: 523, time: 0, dur: 0.2 },
            { freq: 523, time: 0.2, dur: 0.1 },
            { freq: 659, time: 0.35, dur: 0.15 },
            { freq: 784, time: 0.55, dur: 0.15 },
            { freq: 1047, time: 0.75, dur: 0.6 },
        ];

        notes.forEach(note => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.value = note.freq;
            gain.gain.setValueAtTime(0, now + note.time);
            gain.gain.linearRampToValueAtTime(0.08, now + note.time + 0.02);
            gain.gain.setValueAtTime(0.08, now + note.time + note.dur - 0.05);
            gain.gain.linearRampToValueAtTime(0, now + note.time + note.dur);
            osc.connect(gain);
            gain.connect(this.masterVolume);
            osc.start(now + note.time);
            osc.stop(now + note.time + note.dur + 0.01);
        });

        const sub = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        sub.type = 'sine';
        sub.frequency.value = 60;
        subGain.gain.setValueAtTime(0.2, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 1);
        sub.connect(subGain);
        subGain.connect(this.masterVolume);
        sub.start(now);
        sub.stop(now + 1);
    }

    playEat() {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterVolume);
        osc.start(now);
        osc.stop(now + 0.15);
    }

    playEvolution() {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;

        [523, 659, 784, 1047, 1318].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            const t = now + i * 0.1;
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.12, t + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
            osc.connect(gain);
            gain.connect(this.masterVolume);
            osc.start(t);
            osc.stop(t + 0.5);
        });

        const shimmer = this.ctx.createOscillator();
        const shimmerGain = this.ctx.createGain();
        shimmer.type = 'sine';
        shimmer.frequency.setValueAtTime(2000, now + 0.4);
        shimmer.frequency.exponentialRampToValueAtTime(4000, now + 1.2);
        shimmerGain.gain.setValueAtTime(0.05, now + 0.4);
        shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        shimmer.connect(shimmerGain);
        shimmerGain.connect(this.masterVolume);
        shimmer.start(now + 0.4);
        shimmer.stop(now + 1.2);
    }

    playSplash() {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * 0.3;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
        }
        const source = this.ctx.createBufferSource();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();
        source.buffer = buffer;
        filter.type = 'bandpass';
        filter.frequency.value = 1000;
        filter.Q.value = 0.5;
        gain.gain.value = 0.06;
        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterVolume);
        source.start(now);
    }
}
