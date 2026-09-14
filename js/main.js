/* ============================================================
   THE PETS DOWNTOWN — MAIN SCRIPTS
   Nav toggle · Smooth scroll · Form handler · Mobile CTA
   ============================================================ */

(function () {
    'use strict';

    /* ---------- Mobile nav toggle ---------- */
    var toggle = document.querySelector('.nav-toggle');
    var nav    = document.querySelector('.main-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('active');
            nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
        });

        /* Close nav when a link is clicked */
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                toggle.classList.remove('active');
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Header scroll shadow ---------- */
    var header = document.querySelector('.site-header');

    if (header) {
        var onScroll = function () {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- Smooth scroll for anchor links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');

            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            var headerH = header ? header.offsetHeight : 0;
            var top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;

            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    /* ---------- Date input min date (today) ---------- */
    var dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length) {
        var today = new Date().toISOString().split('T')[0];
        dateInputs.forEach(function (input) {
            input.setAttribute('min', today);
        });
    }

    /* ---------- Availability form → WhatsApp ---------- */
    var form = document.getElementById('availabilityForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var name      = document.getElementById('formName');
            var phone     = document.getElementById('formPhone');
            var petName   = document.getElementById('formPetName');
            var petType   = document.getElementById('formPetType');
            var checkin   = document.getElementById('formCheckin');
            var checkout  = document.getElementById('formCheckout');
            var numPets   = document.getElementById('formPets');

            /* Basic validation */
            var required = [name, phone, petName, checkin, checkout];
            var valid = true;

            required.forEach(function (input) {
                if (!input || !input.value.trim()) {
                    if (input) input.style.borderColor = '#e03131';
                    valid = false;
                } else {
                    if (input) input.style.borderColor = '';
                }
            });

            if (!valid) return;

            /* Date validation */
            if (checkout && checkin && checkout.value < checkin.value) {
                checkout.style.borderColor = '#e03131';
                return;
            }

            /* Build WhatsApp message */
            var message = 'Hi! I would like to check availability for pet boarding at The Pets Downtown.\n\n';
            message += '*Pet Details*\n';
            message += '• Pet Name: ' + petName.value.trim() + '\n';
            message += '• Pet Type/Breed: ' + (petType && petType.value.trim() ? petType.value.trim() : 'Dog') + '\n';
            message += '• Number of Pets: ' + (numPets ? numPets.value : '1') + '\n\n';
            message += '*Stay Dates*\n';
            message += '• Check-in: ' + formatDate(checkin.value) + '\n';
            message += '• Check-out: ' + formatDate(checkout.value) + '\n\n';
            message += '*Owner Details*\n';
            message += '• Name: ' + name.value.trim() + '\n';
            message += '• Phone: ' + phone.value.trim();

            var waUrl = 'https://wa.me/919604455664?text=' + encodeURIComponent(message);

            /* Track form submission if tracking is available */
            if (typeof window.tpdTrack === 'function') {
                window.tpdTrack('form_submit', 'availability_form');
            }

            window.open(waUrl, '_blank', 'noopener');
        });
    }

    /* ---------- Format date helper ---------- */
    function formatDate(dateStr) {
        if (!dateStr) return '';
        var parts = dateStr.split('-');
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return parts[2] + ' ' + months[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
    }

    /* ---------- Gallery expand / collapse toggle ---------- */
    var galleryBtn = document.getElementById('galleryToggleBtn');
    var galleryMore = document.getElementById('galleryMore');

    if (galleryBtn && galleryMore) {
        galleryBtn.addEventListener('click', function () {
            var isOpen = galleryMore.classList.toggle('is-open');
            galleryBtn.classList.toggle('is-active', isOpen);
            galleryBtn.setAttribute('aria-expanded', isOpen);

            var btnText = galleryBtn.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = isOpen ? 'Show Less Photos' : 'View All Facility Photos (38)';
            }

            if (!isOpen) {
                var facilitySec = document.getElementById('facility');
                if (facilitySec) {
                    var headerH = header ? header.offsetHeight : 0;
                    var top = facilitySec.getBoundingClientRect().top + window.scrollY - headerH - 16;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            }
        });
    }

    /* ---------- Mobile CTA visibility ---------- */
    var mobileCta = document.querySelector('.mobile-cta');

    if (mobileCta) {
        var heroSection = document.querySelector('.hero');

        var updateMobileCta = function () {
            var scrollY = window.scrollY;
            var heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 400;

            if (scrollY > heroBottom - 100) {
                mobileCta.classList.add('visible');
            } else {
                mobileCta.classList.remove('visible');
            }
        };

        mobileCta.style.transform = 'translateY(100%)';
        mobileCta.style.transition = 'transform 0.3s ease';

        var styleTag = document.createElement('style');
        styleTag.textContent = '.mobile-cta.visible { transform: translateY(0) !important; }';
        document.head.appendChild(styleTag);

        window.addEventListener('scroll', updateMobileCta, { passive: true });
        updateMobileCta();
    }

})();
