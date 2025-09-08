
var obj_contact = {};



obj_contact.genContactInfo = (contactPhone, contactEmail, contactAddr) => `
  <div><strong>${contactPhone}</strong>13724351021 / 0755-27782265</div>
  <div><strong>${contactEmail}</strong>info@setra-ep.com</div>
  <div><strong>${contactAddr}</strong>深圳市松岗镇江边工业一路9号</div>
`;
obj_contact.genContactCards = (langDatas) => `
        <div class="contact-card">
          <!-- <div class="contact-icon contact-icon-phone contact-icon-email contact-icon-address"><img src="assets/images/c/whatsapp-logo.svg"/></div> -->
          <div class="contact-icon">&#128224;</div>
          <div class="contact-label">${langDatas.contactPhoneLabel}</div>
          <div class="contact-value">${langDatas.contactPhone}</div>
        </div>
        <div class="contact-card">
          <div class="contact-icon">&#128231;</div>
          <div class="contact-label">${langDatas.contactEmailLabel}</div>
          <div class="contact-value">${langDatas.contactEmail}</div>
        </div>
        <div class="contact-card">
          <div class="contact-icon contact-icon-whatsapp"></div>
          <div class="contact-label">whatsApp</div>
          <div class="contact-value">Link</div>
        </div>
        <div class="contact-card">
          <div class="contact-icon ">&#127979;</div>
          <div class="contact-label">${langDatas.contactAddrLabel}</div>
          <div class="contact-value">${langDatas.contactAddr}</div>
        </div>
      `;

obj_contact.renderContactInfo = () => {
    let langd = obj_lang.getLangData();
    if (document.getElementById('contact-info')) {
        const info = document.getElementById('contact-info');
        info.innerHTML = obj_contact.genContactInfo(langd.contactPhone, langd.contactEmail, langd.contactAddr);
    }
    // 联系我们卡片
    if (document.querySelector('.contact-section')) {
        if (document.getElementById('contact-title')) document.getElementById('contact-title').textContent = langd.contactTitle;
        const grid = document.querySelector('.contact-grid');
        if (grid) {
            grid.innerHTML = obj_contact.genContactCards(langd);
        }
        const desc = document.querySelector('.contact-desc');
        if (desc) desc.textContent = langd.contactDesc;
    }
}
obj_contact.genContactCards = (langDatas) => `
        <div class="contact-card">
          <!-- <div class="contact-icon contact-icon-phone contact-icon-email contact-icon-address"><img src="assets/images/c/whatsapp-logo.svg"/></div> -->
          <div class="contact-icon">&#128224;</div>
          <div class="contact-label">${langDatas.contactPhoneLabel}</div>
          <div class="contact-value">${langDatas.contactPhone}</div>
        </div>
        <div class="contact-card">
          <div class="contact-icon">&#128231;</div>
          <div class="contact-label">${langDatas.contactEmailLabel}</div>
          <div class="contact-value">${langDatas.contactEmail}</div>
        </div>
        <div class="contact-card">
          <div class="contact-icon contact-icon-whatsapp"></div>
          <div class="contact-label">whatsApp</div>
          <div class="contact-value">Link</div>
        </div>
        <div class="contact-card">
          <div class="contact-icon ">&#127979;</div>
          <div class="contact-label">${langDatas.contactAddrLabel}</div>
          <div class="contact-value">${langDatas.contactAddr}</div>
        </div>
      `;

obj_contact.renderContactInfo();
registerLangReRenderFunction('render_Contact', obj_contact.renderContactInfo);