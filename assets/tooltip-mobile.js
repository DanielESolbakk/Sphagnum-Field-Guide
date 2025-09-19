// Dynamic mobile tooltip positioning (mobile only)
(function () {
    const MOBILE_MAX = 600;
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    let openTrigger = null;

    function closeOpen() {
        if (!openTrigger) return;
        const tip = openTrigger.querySelector('.tooltiptext');
        if (tip) {
            tip.classList.remove('tooltip-pos-below', 'tooltip-pos-above');
            tip.style.left = '';
            tip.style.top = '';
        }
        openTrigger.classList.remove('is-open');
        openTrigger = null;
    }

    function position(trigger) {
        const tip = trigger.querySelector('.tooltiptext');
        if (!tip) return;

        // Ensure visible (but not yet interacting) for measurement
        trigger.classList.add('is-open');
        tip.style.visibility = 'hidden';
        tip.style.opacity = '0';
        tip.style.left = '0px';
        tip.style.top = '0px';

        const rect = trigger.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const pad = 8;

        const w = tip.offsetWidth;
        const h = tip.offsetHeight;

        // Horizontal centering then clamp
        let left = rect.left + rect.width / 2 - w / 2;
        if (left < pad) left = pad;
        if (left + w > vw - pad) left = vw - pad - w;

        // Vertical placement: prefer below
        const spaceBelow = vh - rect.bottom;
        const spaceAbove = rect.top;
        let below = spaceBelow >= h + 12 || spaceBelow >= spaceAbove;
        let top = below ? rect.bottom + 6 : rect.top - h - 6;

        // Clamp vertical
        if (top < pad) {
            top = pad;
            below = true;
        }
        if (top + h > vh - pad) {
            top = vh - pad - h;
        }

        tip.classList.remove('tooltip-pos-below', 'tooltip-pos-above');
        tip.classList.add(below ? 'tooltip-pos-below' : 'tooltip-pos-above');

        tip.style.left = left + 'px';
        tip.style.top = top + 'px';
        tip.style.visibility = 'visible';
        tip.style.opacity = '1';
    }

    function toggle(trigger, e) {
        e.preventDefault();
        e.stopPropagation();
        if (openTrigger === trigger) {
            closeOpen();
            return;
        }
        closeOpen();
        openTrigger = trigger;
        position(trigger);
    }

    function bind() {
        if (!mq.matches) return;
        document.querySelectorAll('.tooltip').forEach(t => {
            if (t.__mobileBound) return;
            t.__mobileBound = true;
            t.setAttribute('tabindex', '0');
            t.addEventListener('click', e => toggle(t, e));
            t.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') toggle(t, e);
                if (e.key === 'Escape') closeOpen();
            });
            const tip = t.querySelector('.tooltiptext');
            if (tip) {
                tip.addEventListener('click', e => e.stopPropagation());
            }
        });
    }

    function onResize() {
        if (!mq.matches) {
            closeOpen();
            return;
        }
        bind();
        if (openTrigger) position(openTrigger);
    }

    function init() {
        bind();
        document.addEventListener('click', closeOpen);
        window.addEventListener('scroll', () => {
            if (openTrigger) position(openTrigger);
        }, { passive: true });
        window.addEventListener('resize', onResize);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();