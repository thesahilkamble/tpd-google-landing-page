/* ============================================================
   THE PETS DOWNTOWN — TRACKING / ANALYTICS
   Click tracking · Conversion events · Google Ads integration
   ============================================================ */

(function () {
    'use strict';

    /* ---------- CONFIG: Google Ads Conversion IDs ---------- */
    /* Replace these with your actual Google Ads conversion tracking IDs */
    var CONVERSION = {
        /* CONFIG: Add your Google Ads conversion ID and label */
        id:    '', /* e.g. 'AW-XXXXXXXXXX' */
        label: '' /* e.g. 'XXXXXXXXXXXX' */
    };

    /* ---------- Global tracking helper ---------- */
    window.tpdTrack = function (action, label) {
        /* Google Analytics (gtag) */
        if (typeof gtag === 'function') {
            gtag('event', action, {
                event_category: 'engagement',
                event_label: label
            });
        }

        /* Google Ads conversion */
        if (typeof gtag === 'function' && CONVERSION.id && CONVERSION.label) {
            if (action === 'form_submit' || action === 'whatsapp_click') {
                gtag('event', 'conversion', {
                    send_to: CONVERSION.id + '/' + CONVERSION.label
                });
            }
        }

        /* Console log in dev (remove for production) */
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            console.log('[TPD Track]', action, label);
        }
    };

    /* ---------- Auto-track [data-track] elements ---------- */
    document.querySelectorAll('[data-track]').forEach(function (el) {
        el.addEventListener('click', function () {
            var trackValue = this.getAttribute('data-track');
            window.tpdTrack('click', trackValue);
        });
    });

    /* ---------- Track CTA clicks by href pattern ---------- */
    document.querySelectorAll('a[href^="https://wa.me"]').forEach(function (el) {
        el.addEventListener('click', function () {
            window.tpdTrack('whatsapp_click', this.closest('section')
                ? this.closest('section').id || 'unknown'
                : 'unknown');
        });
    });

    document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
        el.addEventListener('click', function () {
            window.tpdTrack('phone_click', this.closest('section')
                ? this.closest('section').id || 'unknown'
                : 'unknown');
        });
    });

    /* ---------- Track scroll depth ---------- */
    var scrollMarks = [25, 50, 75, 100];
    var scrollFired = {};

    window.addEventListener('scroll', function () {
        var scrollTop   = window.scrollY;
        var docHeight   = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPct   = Math.round((scrollTop / docHeight) * 100);

        scrollMarks.forEach(function (mark) {
            if (scrollPct >= mark && !scrollFired[mark]) {
                scrollFired[mark] = true;
                window.tpdTrack('scroll_depth', mark + '%');
            }
        });
    }, { passive: true });

})();
