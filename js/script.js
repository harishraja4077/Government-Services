/**
 * Government Services Portal - Enhanced Script
 * Medzo-style premium animations + interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. PAGE LOADER ─────────────────────────────────────── */
    const loader = document.getElementById('page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        });
        setTimeout(() => { loader.style.opacity='0'; setTimeout(()=>loader.style.display='none',500); }, 3000);
    }

    /* ── 2. SCROLL PROGRESS BAR ─────────────────────────────── */
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop  = window.scrollY;
            const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = (scrollTop / docHeight * 100) + '%';
        });
    }

    /* ── 3. STICKY HEADER ───────────────────────────────────── */
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    /* ── 4. MOBILE NAV ──────────────────────────────────────── */
    const toggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (toggle && navMenu) {
        toggle.addEventListener('click', e => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const ic = toggle.querySelector('i');
            if (ic) ic.className = navMenu.classList.contains('active') ? 'fa-solid fa-times' : 'fa-solid fa-bars';
        });
        document.addEventListener('click', e => {
            if (!navMenu.contains(e.target) && !toggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const ic = toggle.querySelector('i');
                if (ic) ic.className = 'fa-solid fa-bars';
            }
        });
    }

    /* ── 5. CUSTOM CURSOR ───────────────────────────────────── */
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
        document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
        function animateCursor() {
            dot.style.left  = mouseX + 'px';
            dot.style.top   = mouseY + 'px';
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.left = ringX + 'px';
            ring.style.top  = ringY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        document.querySelectorAll('a, button, .btn, .service-card, .project-card, .team-card').forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
        });
    } else {
        if (dot)  dot.style.display  = 'none';
        if (ring) ring.style.display = 'none';
    }

    /* ── 6. SCROLL REVEAL (Intersection Observer) ───────────── */
    const revealEls = document.querySelectorAll('.reveal, .animate-on-scroll, .scale-up');
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible', 'animate-active');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => obs.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('visible', 'animate-active'));
    }

    /* ── 7. ANIMATED COUNTER ────────────────────────────────── */
    function animateCounter(el) {
        const target   = parseInt(el.getAttribute('data-target') || el.textContent.replace(/\D/g,'')) || 0;
        const suffix   = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start    = performance.now();
        function update(now) {
            const elapsed = Math.min((now - start) / duration, 1);
            const ease    = 1 - Math.pow(1 - elapsed, 3);
            el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
            if (elapsed < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }
    const counterEls = document.querySelectorAll('.counter-number, [data-counter]');
    if ('IntersectionObserver' in window && counterEls.length) {
        const cObs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); cObs.unobserve(e.target); } });
        }, { threshold: 0.5 });
        counterEls.forEach(el => cObs.observe(el));
    }

    /* ── 8. PARALLAX IMAGES ─────────────────────────────────── */
    const parallaxImgs = document.querySelectorAll('.parallax-img');
    if (parallaxImgs.length) {
        window.addEventListener('scroll', () => {
            parallaxImgs.forEach(wrapper => {
                const rect   = wrapper.getBoundingClientRect();
                const center = rect.top + rect.height / 2 - window.innerHeight / 2;
                const img    = wrapper.querySelector('img');
                if (img) img.style.transform = `scale(1.15) translateY(${center * 0.04}px)`;
            });
        });
    }

    /* ── 9. ANIMATED TIMELINE LINE ──────────────────────────── */
    const timelines = document.querySelectorAll('.timeline-line');
    if ('IntersectionObserver' in window && timelines.length) {
        const tlObs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animated'); tlObs.unobserve(e.target); } });
        }, { threshold: 0.2 });
        timelines.forEach(t => tlObs.observe(t));
    }

    /* ── 10. RIPPLE EFFECT ──────────────────────────────────── */
    document.querySelectorAll('.btn, .ripple-effect').forEach(el => {
        el.addEventListener('click', function(e) {
            const r    = document.createElement('span');
            r.className = 'ripple-circle';
            const rect  = this.getBoundingClientRect();
            const size  = Math.max(rect.width, rect.height) * 2;
            r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
            this.appendChild(r);
            setTimeout(() => r.remove(), 700);
        });
    });

    /* ── 11. FAQ ACCORDION ──────────────────────────────────── */
    document.querySelectorAll('.faq-header').forEach(h => {
        h.addEventListener('click', () => {
            const parent = h.parentElement;
            const wasActive = parent.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!wasActive) parent.classList.add('active');
        });
    });

    /* ── 12. TESTIMONIAL SLIDER ─────────────────────────────── */
    const track  = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsC  = document.querySelector('.testimonial-dots');
    if (track && slides.length) {
        let cur = 0;
        dotsC.innerHTML = '';
        slides.forEach((_, i) => {
            const d = document.createElement('div');
            d.className = 'tdot' + (i===0 ? ' active' : '');
            d.addEventListener('click', () => goTo(i));
            dotsC.appendChild(d);
        });
        const dots = dotsC.querySelectorAll('.tdot');
        function goTo(n) {
            cur = n;
            track.style.transform = `translateX(-${cur*100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[cur].classList.add('active');
        }
        let iv = setInterval(() => goTo((cur+1) % slides.length), 5000);
        const sc = document.querySelector('.testimonial-slider-container');
        if (sc) {
            sc.addEventListener('mouseenter', () => clearInterval(iv));
            sc.addEventListener('mouseleave', () => { iv = setInterval(() => goTo((cur+1) % slides.length), 5000); });
        }
    }

    /* ── 13. PROJECT FILTER ─────────────────────────────────── */
    const filterBtns  = document.querySelectorAll('.filter-btn');
    const projCards   = document.querySelectorAll('.project-card');
    if (filterBtns.length && projCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const cat = btn.getAttribute('data-filter');
                projCards.forEach(c => {
                    const show = cat === 'all' || c.getAttribute('data-category') === cat;
                    c.style.transition = 'opacity 0.35s, transform 0.35s';
                    if (show) { c.style.opacity='1'; c.style.transform='scale(1)'; c.style.display='block'; }
                    else { c.style.opacity='0'; c.style.transform='scale(0.9)'; setTimeout(()=>c.style.display='none',350); }
                });
            });
        });
    }

    /* ── 14. SERVICES SEARCH FILTER ────────────────────────── */
    const sSearch = document.getElementById('services-search');
    const dFilter = document.getElementById('department-filter');
    const sCards  = document.querySelectorAll('.service-card-wrapper');
    if (sCards.length) {
        function filterSvc() {
            const q   = sSearch ? sSearch.value.toLowerCase() : '';
            const dep = dFilter ? dFilter.value : 'all';
            sCards.forEach(w => {
                const h3 = w.querySelector('h3'), p = w.querySelector('p');
                const ok = (h3&&h3.textContent.toLowerCase().includes(q))||(p&&p.textContent.toLowerCase().includes(q));
                const dm = dep==='all' || w.getAttribute('data-department')===dep;
                if (ok && dm) { w.style.opacity='1'; w.style.transform='scale(1)'; w.style.display='block'; }
                else { w.style.opacity='0'; w.style.transform='scale(0.9)'; setTimeout(()=>w.style.display='none',300); }
            });
        }
        if (sSearch) sSearch.addEventListener('input', filterSvc);
        if (dFilter) dFilter.addEventListener('change', filterSvc);
    }

    /* ── 15. BACK TO TOP ────────────────────────────────────── */
    const btt = document.getElementById('back-to-top');
    if (btt) {
        window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400));
        btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ── 16. AUTH / DASHBOARD ───────────────────────────────── */
    if (!localStorage.getItem('registeredUsers')) {
        localStorage.setItem('registeredUsers', JSON.stringify([
            { email: 'admin@gov.in',      password: 'password123', role: 'admin', name: 'Dr. Rajesh Kumar' },
            { email: 'citizen@gmail.com', password: 'password123', role: 'user',  name: 'Sarah Johnson' }
        ]));
    }
    // Signup
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', e => {
            e.preventDefault();
            const name  = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const pass  = document.getElementById('signup-password').value;
            const agree = document.getElementById('signup-agree').checked;
            if (!agree) return alert('You must agree to the Terms of Service.');
            const users = JSON.parse(localStorage.getItem('registeredUsers')||'[]');
            if (users.some(u=>u.email===email)) return alert('Email already registered.');
            users.push({ name, email, password: pass, role: 'user' });
            localStorage.setItem('registeredUsers', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify({ name, email, role: 'user' }));
            alert('Registration Successful!'); window.location.href = 'userdashboard.html';
        });
    }
    // Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const email  = document.getElementById('login-email').value;
            const pass   = document.getElementById('login-password').value;
            const active = document.querySelector('.auth-tab-btn.active');
            const role   = active ? active.getAttribute('data-role') : 'user';
            const users  = JSON.parse(localStorage.getItem('registeredUsers')||'[]');
            const user   = users.find(u=>u.email===email && u.password===pass);
            if (!user) return alert('Invalid credentials.\nDemo: citizen@gmail.com / password123\nAdmin: admin@gov.in / password123');
            localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email, role: user.role }));
            if (user.role==='admin') { alert('Admin Login Successful!'); window.location.href = 'admindashboard.html'; }
            else { alert('Login Successful!'); window.location.href = 'userdashboard.html'; }
        });
    }
    // Auth tabs
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.auth-tab-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    // Populate dashboards
    const cu = JSON.parse(localStorage.getItem('currentUser')||'null');
    const populateEl = (id, val) => { const el=document.getElementById(id); if(el) el.textContent=val; };
    if (document.getElementById('user-dashboard-marker') && cu) {
        if (cu.role!=='user') { window.location.href='login.html'; return; }
        populateEl('user-welcome-title', `Welcome Back, ${cu.name||'Citizen'}`);
        populateEl('user-email-display', cu.email);
        populateEl('user-avatar-text', (cu.name||'U').split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2));
    }
    if (document.getElementById('admin-dashboard-marker') && cu) {
        if (cu.role!=='admin') { window.location.href='login.html'; return; }
        populateEl('admin-welcome-title', `Administrator, ${cu.name||'Admin'}`);
        populateEl('admin-email-display', cu.email);
        populateEl('admin-avatar-text', (cu.name||'A').split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2));
        window.approveApplication = (btn, id) => {
            btn.closest('tr').querySelector('.badge').className='badge badge-success';
            btn.closest('tr').querySelector('.badge').textContent='Approved';
            btn.remove(); alert(`Application ${id} approved!`);
        };
        window.resolveGrievance = (btn, id) => {
            btn.closest('.notification-item').style.borderLeftColor='#22c55e';
            btn.remove(); alert(`Grievance ${id} resolved!`);
        };
    }
    // Logout
    document.querySelectorAll('.logout-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault(); localStorage.removeItem('currentUser');
            alert('Logged out.'); window.location.href='index.html';
        });
    });

    /* ── 17. SECTION LABEL LINE GROW ANIMATION ──────────────── */
    document.querySelectorAll('.section-label').forEach(el => {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if(e.isIntersecting) { el.style.opacity='1'; obs.unobserve(el); } });
        }, { threshold: 0.5 });
        obs.observe(el);
    });

});
