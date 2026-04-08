// ====== BUBBLE & PARTICLE SYSTEM ======
class Bubble {
    constructor(x, y, options = {}) {
        this.x = x;
        this.y = y;
        this.radius = options.radius || (Math.random() * 8 + 3);
        this.speed = options.speed || (Math.random() * 1.5 + 0.5);
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.wobbleAmount = Math.random() * 30 + 10;
        this.wobbleOffset = Math.random() * Math.PI * 2;
        this.opacity = options.opacity || 0.6;
        this.fadeSpeed = options.fadeSpeed || 0.003;
        this.color = options.color || '255, 255, 255';
        this.alive = true;
        this.age = 0;
    }

    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.age * this.wobbleSpeed + this.wobbleOffset) * 0.5;
        this.opacity -= this.fadeSpeed;
        this.age++;

        if (this.opacity <= 0 || this.y < -this.radius) {
            this.alive = false;
        }
    }

    draw(ctx) {
        if (!this.alive) return;

        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Gradient cho bong bóng
        const gradient = ctx.createRadialGradient(
            this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.1,
            this.x, this.y, this.radius
        );
        gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity * 0.8})`);
        gradient.addColorStop(0.7, `rgba(${this.color}, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${this.color}, ${this.opacity * 0.1})`);

        ctx.fillStyle = gradient;
        ctx.fill();

        // Highlight
        ctx.beginPath();
        ctx.arc(this.x - this.radius * 0.25, this.y - this.radius * 0.25, this.radius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.6})`;
        ctx.fill();

        ctx.restore();
    }
}

// Light ray (tia sáng từ trên xuống)
class LightRay {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.width = Math.random() * 60 + 20;
        this.height = canvasHeight;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.08 + 0.02;
        this.fadeIn = true;
        this.speed = Math.random() * 0.001 + 0.0005;
        this.alive = true;
        this.drift = (Math.random() - 0.5) * 0.2;
    }

    update() {
        if (this.fadeIn) {
            this.opacity += this.speed;
            if (this.opacity >= this.maxOpacity) this.fadeIn = false;
        } else {
            this.opacity -= this.speed;
            if (this.opacity <= 0) this.alive = false;
        }
        this.x += this.drift;
    }

    draw(ctx) {
        if (!this.alive) return;
        ctx.save();
        const gradient = ctx.createLinearGradient(this.x, 0, this.x, this.height);
        gradient.addColorStop(0, `rgba(150, 220, 255, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(150, 220, 255, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x - this.width / 2, 0, this.width, this.height);
        ctx.restore();
    }
}

// Particle burst (cho gift lớn)
class ParticleBurst {
    constructor(x, y, color, count = 20) {
        this.particles = [];
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
            const speed = Math.random() * 4 + 2;
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: Math.random() * 4 + 2,
                color: color,
                opacity: 1,
                gravity: 0.05
            });
        }
        this.alive = true;
    }

    update() {
        let allDead = true;
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.98;
            p.opacity -= 0.015;
            if (p.opacity > 0) allDead = false;
        });
        if (allDead) this.alive = false;
    }

    draw(ctx) {
        this.particles.forEach(p => {
            if (p.opacity <= 0) return;
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.restore();
        });
    }
}
