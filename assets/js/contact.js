/**
 * 联系我们 页面：渲染联系卡片
 */
var obj_contact = {};

const SVG_STROKE = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"';

const ICON_SVGS = {
    phone: `<svg ${SVG_STROKE}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>`,
    mail:  `<svg ${SVG_STROKE}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
    pin:   `<svg ${SVG_STROKE}><path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z"/><circle cx="12" cy="11" r="2.5"/></svg>`,
    whatsapp: `<svg ${SVG_STROKE}><path d="M7.9 20A9 9 0 1 0 4 16.1L3 21l4.9-1z"/><path d="M8.5 13.5c.6 1.1 2.1 2.6 3.2 3.2l1.2-1.2c.2-.2.5-.3.8-.2.9.3 1.9.5 2.9.5.3 0 .6.3.6.6v1.7c0 .3-.2.5-.5.6-1 .2-2 .1-2.9-.2-.3-.1-.6 0-.8.2"/></svg>`
};

obj_contact.render = function () {
    const grid = document.querySelector('.contact-grid');
    if (!grid) return;
    const d = obj_lang.getLangData();

    grid.innerHTML = `
        <div class="contact-card">
            <div class="contact-icon">${ICON_SVGS.phone}</div>
            <div class="contact-label">${d.contactPhoneLabel}</div>
            <div class="contact-value"><a href="tel:+8675527782265">${d.contactPhone}</a></div>
        </div>
        <div class="contact-card">
            <div class="contact-icon">${ICON_SVGS.mail}</div>
            <div class="contact-label">${d.contactEmailLabel}</div>
            <div class="contact-value"><a href="mailto:info@setra-ep.com">${d.contactEmail}</a></div>
        </div>
        <div class="contact-card">
            <div class="contact-icon">${ICON_SVGS.whatsapp}</div>
            <div class="contact-label">${d.contactWhatsappLabel}</div>
            <div class="contact-value"><a href="#" target="_blank" rel="noopener">${d.contactWhatsappValue}</a></div>
        </div>
        <div class="contact-card">
            <div class="contact-icon">${ICON_SVGS.pin}</div>
            <div class="contact-label">${d.contactAddrLabel}</div>
            <div class="contact-value">${d.contactAddr}</div>
        </div>
    `;
};

window.addEventListener('langchange', obj_contact.render);
obj_contact.render();
