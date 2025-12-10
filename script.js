document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // 🔧 ส่วนตั้งค่า (แก้ไขตรงนี้ได้เลย)
    // ============================================
    const CONFIG = {
        // ----------------------------------------------------------------------
        // 📝 แก้ไขข้อความรักด้านล่างนี้เลยครับ (\n คือการขึ้นบรรทัดใหม่)
        // ----------------------------------------------------------------------
        loveMessage: "ขอบคุณที่เข้ามาเป็นความสุขให้เค้านะ เค้ารักเธอมาก \nเค้าจะดูแลเธอให้ดีที่สุดเลยนะ \n\nบางครั้งเค้าอาจทำตัวไม่ดี หรือเธอไม่ชอบก็ขอโทษนะ \nเธองอนหรือเป็นอะไรก็บอกเค้านะ เค้าไม่รู้จริง \nเค้าไม่อยากเสียเธอไป เค้าไม่อยากโดนเธอทิ้ง \n\nเค้ารักเธอมากๆ นะ รักสุด เค้าไม่อยากเสียเธอไปนะ \nเธอคือคนที่น่ารักและสวยที่สุดสำหรับเค้า \nและเธอก็ไม่ต้องมากังวลเรื่องผู้หญิงคนอื่นได้เลย เพราะเค้าจะไม่มี \n\nอยากได้อะไรก็บอกนะ เค้ายอมทำได้ทุกอย่างถ้าเค้าทำได้นะ \nเค้าไม่มีไรจะบอกแล้ว... เค้าแค่อยากจะบอกว่า \nเค้ารักเธอมากๆ นะ รักจริงๆ ด้วย ❤☺",

        // ----------------------------------------------------------------------
        // 🎁 ใส่ลิงก์ซองของขวัญ TrueMoney ในช่องว่างระหว่างฟันหนู "" ด้านล่าง
        // ----------------------------------------------------------------------
        giftLink: "https://gift.truemoney.com/campaign/?v=019b06df48c07889be8849b1d328404cddt",

        // ความเร็วในการพิมพ์ (ยิ่งน้อยยิ่งเร็ว)
        typingSpeed: 50
    };

    // ============================================
    // 🎵 ตั้งค่าเพลง Background (YouTube)
    // ============================================
    const youtubeVideoId = "QFpsBK0F0js"; // เพลงที่เลือกมา
    let player;

    // โหลด YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('player', {
            height: '0',
            width: '0',
            videoId: youtubeVideoId,
            playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': youtubeVideoId }
        });
    };

    // ============================================
    // 🎬 ส่วนการทำงาน
    // ============================================
    const introScreen = document.getElementById('introScreen');
    const contentScreen = document.getElementById('contentScreen');
    const openBtn = document.getElementById('openBtn');
    const envelope = document.querySelector('.envelope');

    // Canvas Background logic
    initBackground();

    // Start Floating Hearts
    setInterval(createFloatingHeart, 300);

    function createFloatingHeart() {
        const heartsContainer = document.querySelector('.hearts-container') || document.body;
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = ['❤️', '💖', '💕', '💗', '💓'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's';
        heart.style.opacity = Math.random();
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }

    // 1. เปิดซองจดหมาย
    openBtn.addEventListener('click', () => {
        envelope.classList.add('open');

        // เล่นเพลง
        if (player && player.playVideo) {
            player.playVideo();
        }

        setTimeout(() => {
            // ซ่อนหน้าซอง
            introScreen.classList.add('hidden');
            setTimeout(() => { introScreen.style.display = 'none'; }, 800);

            // แสดงหน้าเนื้อหา
            contentScreen.classList.remove('hidden');
            contentScreen.style.display = 'flex';

            // เริ่มพิมพ์ข้อความหลังจากหน้าต่างปรากฏ
            setTimeout(() => {
                const typeEl = document.getElementById('typingText');

                // Show text immediately
                typeEl.innerHTML = CONFIG.loveMessage.replace(/\n/g, '<br>');
                const cursor = document.querySelector('.cursor');
                if (cursor) cursor.style.display = 'none';

                // Provide button immediately
                const giftSection = document.getElementById('giftSection');
                giftSection.classList.remove('hidden');
                giftSection.style.opacity = 0;
                giftSection.style.transition = 'opacity 1s ease';

                // Fade in ปุ่ม
                setTimeout(() => giftSection.style.opacity = 1, 100);
            }, 1000);

        }, 800); // รอ animation เปิดซอง
    });

    // 2. Logic พิมพ์ข้อความ (เก็บไว้เผื่ออยากใช้ แต่ไม่ได้เรียกใช้แล้ว)
    function typeWriter(element, text, speed, callback) {
        let i = 0;
        element.innerHTML = "";
        function type() {
            if (i < text.length) {
                // แปลง \n เป็น <br>
                if (text.charAt(i) === '\n') {
                    element.innerHTML += '<br>';
                } else {
                    element.innerHTML += text.charAt(i);
                }
                i++;
                setTimeout(type, speed);
            } else {
                // ซ่อน cursor กระพริบเมื่อพิมพ์เสร็จ
                document.querySelector('.cursor').style.display = 'none';
                if (callback) callback();
            }
        }
        type();
    }

    // 3. ปุ่มรับของขวัญ
    const giftBtn = document.getElementById('giftBtn');
    giftBtn.addEventListener('click', () => {
        if (!CONFIG.giftLink) {
            alert('อย่าลืมใส่ลิ้งก์ในไฟล์ script.js นะครับ! (บรรทัดที่ 8)');
            return;
        }

        // เอฟเฟกต์พลุกระดาษ
        fireConfetti();

        const btnText = document.querySelector('.btn-content');
        const loading = document.getElementById('loading');

        // เปลี่ยนปุ่มเป็น loading
        btnText.style.display = 'none';
        loading.classList.remove('hidden');

        // หน่วงเวลานิดหน่อยให้ดูสวยงามก่อน redirect
        setTimeout(() => {
            window.location.href = CONFIG.giftLink;
        }, 1500);
    });

    // ============================================
    // 🎨 Background Particles
    // ============================================
    function initBackground() {
        const canvas = document.getElementById('bgCanvas');
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }

        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 5 + 2;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.color = `rgba(255, ${150 + Math.random() * 105}, ${150 + Math.random() * 105}, ${Math.random() * 0.5})`;
            }
            update() {
                this.x += this.speedX * 0.5;
                this.y += this.speedY * 0.5;
                if (this.x > width) this.x = 0;
                if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                if (this.y < 0) this.y = height;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 50; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Confetti Helper
    function fireConfetti() {
        const duration = 2000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // ยิงจากซ้ายและขวา
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
});
