const langData = {
  zh: {
    home: '首页',
    siteTitle: '深圳市西特新环保材料有限公司',
    about: '关于我们',
    products: '我们的产品',
    strengths: '我们的强项',
    contact: '联系我们',
    aboutTitle: '公司简介',
    aboutDesc: '深圳市西特新环保材料有限公司是一家专注于化工新材料研发、生产与销售的高新技术企业，致力于为客户提供高品质的化工产品和专业的技术服务。',
    strengthsTitle: '我们的强项',
    strengthsList: ['专业的研发团队', '高品质的产品保障', '完善的售后服务', '丰富的行业经验'],
    contactTitle: '联系我们',
    contactPhoneLabel: '电话',
    contactEmailLabel: '邮箱',
    contactAddrLabel: '公司地址',
    contactDesc: '如有任何关于化工产品的需求或疑问，欢迎随时联系我们，我们将竭诚为您服务！',
    contactPhone: '13724351021<br>0755-27782265',
    contactEmail: 'info@setra-ep.com',
    contactAddr: '深圳市松岗镇江边工业一路9号',
    productsTitle: '产品列表',
    categoriesTitle: '商品分类',
    view: '查看详情',
    homeProfileTitle: '公司简介',
    homeProfileContent: '我们自豪地介绍自己是西特新环保材料有限公司出口事业部，是电镀染料、生物染色剂、PH指示剂、染发剂、沙黄系列等领先制造商之一，拥有设备齐全的工厂和专业的化学师团队。',
    homeProfileList: [
      '<strong>成立年份：</strong> 2009',
      '<strong>主营业务：</strong> 西特新环保材料有限公司自2009年4月以来在实验室化学品领域享有盛誉。期间我们始终坚持为每一位客户提供高品质产品。',
      '<strong>年营业额：</strong> 拥有100多种高品质产品，技术不断进步，取得了显著成就。',
      '<strong>市场覆盖：</strong> 随着业务在中国及海外扩展，为便于客户了解产品，我们编制了产品手册，便于客户查阅。'
    ],
    homeServicesTitle: '我们的产品与服务',
    homeServicesList: [
      '电镀染料',
      '生物染色剂',
      'PH指示剂',
      '染发剂',
      '沙黄系列',
      '实验室化学品'
    ],
    homeServicesContent: '我们自豪地介绍自己是西特新环保材料有限公司出口事业部，是电镀染料、生物染色剂、PH指示剂、染发剂、沙黄系列等领先制造商之一，拥有设备齐全的工厂和专业的化学师团队。',
  },
  en: {
    home: 'Home', 
    siteTitle: 'SETRA New Environmental Protection Material Co., Ltd.',
    about: 'About Us',
    products: 'Our Products',
    strengths: 'Our Strengths',
    contact: 'Contact Us',
    aboutTitle: 'Company Profile',
    aboutDesc: 'Shenzhen SETRA New Environmental Protection Material Co., Ltd. is a high-tech enterprise focusing on R&D, production and sales of new chemical materials, committed to providing customers with high-quality chemical products and professional technical services.',
    strengthsTitle: 'Our Strengths',
    strengthsList: ['Professional R&D Team', 'High Quality Assurance', 'Comprehensive After-sales Service', 'Rich Industry Experience'],
    contactTitle: 'Contact Us',
    contactPhoneLabel: 'Phone',
    contactEmailLabel: 'Email',
    contactAddrLabel: 'Address',
    contactDesc: 'If you have any needs or questions about chemical products, please feel free to contact us. We are always at your service!',
    contactPhone: '13724351021<br>0755-27782265',
    contactEmail: 'info@setra-ep.com',
    contactAddr: 'No. 9, Jiangbian Industrial 1st Road, Songgang Town, Shenzhen',
    productsTitle: 'Product List',
    categoriesTitle: 'Categories',
    view: 'View Details',
    homeProfileTitle: 'Company Profile',
    homeProfileContent: 'We introduce ourselves as an export division of ARTI CHEMICALS, who is the one of the leading manufacturer of dyes from ELECTROPLATING DYES, Biological stains, PH Indicators, Hair Colour, safranine series. Under well equiped plant with qualified chemists.',
    homeProfileList: [
      '<strong>Year of Establishment:</strong> 2009',
      '<strong>Primary Business:</strong> The ARTI CHEMICALS has been recognized in the field of Laboratory Chemicals since April 2009. During this period we had to persuade every customer for a quality product.',
      '<strong>Annual Turnover:</strong> Detailed quality products with over 100 products. The technical advancement of the cervical product specification has been achieved and we have made significant progress.',
      '<strong>Market Covered:</strong> During this period we had to persuade every customer for a quality product. As the business expanded in India and different countries, it was difficult to inform all customers about different products. After that, we decided to prepare a book from where our valued customers get information about our products.'
    ],
    homeServicesTitle: 'Our Products & Services',
    homeServicesList: [
      'Electroplating Dyes',
      'Biological Stains',
      'PH Indicators',
      'Hair Colour',
      'Safranine Series',
      'Laboratory Chemicals'
    ],
    homeServicesContent: 'We introduce ourselves as an export division of ARTI CHEMICALS, who is the one of the leading manufacturer of dyes from ELECTROPLATING DYES, Biological stains, PH Indicators, Hair Colour, safranine series. Under well equiped plant with qualified chemists.',
  }
};

var lang = localStorage.getItem('lang') || 'zh';
function setLang(newLang) {
  lang = newLang;
  localStorage.setItem('lang', lang);
  renderLang();
}
function renderLang() {
  const d = langData[lang];
  if(document.getElementById('site-title')) document.getElementById('site-title').textContent = d.siteTitle;
  if(document.getElementById('about-title')) document.getElementById('about-title').textContent = d.aboutTitle;
  if(document.getElementById('about-desc')) document.getElementById('about-desc').textContent = d.aboutDesc;
  if(document.getElementById('strengths-title')) document.getElementById('strengths-title').textContent = d.strengthsTitle;
  if(document.getElementById('strengths-list')) {
    const ul = document.getElementById('strengths-list');
    ul.innerHTML = '';
    d.strengthsList.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
  }
  if(document.getElementById('contact-title')) document.getElementById('contact-title').textContent = d.contactTitle;
  if(document.getElementById('contact-info')) {
    const info = document.getElementById('contact-info');
    info.innerHTML = `<div><strong>${d.contactPhone}</strong>13724351021 / 0755-27782265</div><div><strong>${d.contactEmail}</strong>info@setra-ep.com</div><div><strong>${d.contactAddr}</strong>深圳市松岗镇江边工业一路9号</div>`;
  }
  if(document.getElementById('products-title')) document.getElementById('products-title').textContent = d.productsTitle;
  // 导航
  const nav = document.querySelector('.main-nav');
  if(nav) {
    const navText = [d.home, d.about, d.products, d.strengths, d.contact];
    for(let i=0; i<nav.children.length; i++) {
      nav.children[i].textContent = navText[i];
    }
  }
  // 联系我们卡片
  if(document.querySelector('.contact-section')) {
    if(document.getElementById('contact-title')) document.getElementById('contact-title').textContent = d.contactTitle;
    const grid = document.querySelector('.contact-grid');
    if(grid) {
      grid.innerHTML = `
        <div class="contact-card">
          <div class="contact-icon contact-icon-phone"></div>
          <div class="contact-label">${d.contactPhoneLabel}</div>
          <div class="contact-value">${d.contactPhone}</div>
        </div>
        <div class="contact-card">
          <div class="contact-icon contact-icon-email"></div>
          <div class="contact-label">${d.contactEmailLabel}</div>
          <div class="contact-value">${d.contactEmail}</div>
        </div>
        <div class="contact-card">
          <div class="contact-icon contact-icon-address"></div>
          <div class="contact-label">${d.contactAddrLabel}</div>
          <div class="contact-value">${d.contactAddr}</div>
        </div>
      `;
    }
    const desc = document.querySelector('.contact-desc');
    if(desc) desc.textContent = d.contactDesc;
  }
  // 首页 Company Profile & Our Products & Services
  if(document.querySelector('.company-profile-section')) {
    const title = document.querySelector('.company-profile-section h2');
    if(title) title.textContent = d.homeProfileTitle;
    const content = document.querySelector('.company-profile-content p');
    if(content) content.textContent = d.homeProfileContent;
    const ul = document.querySelector('.company-profile-content ul');
    if(ul) {
      ul.innerHTML = '';
      d.homeProfileList.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = item;
        ul.appendChild(li);
      });
    }
  }
  if(document.querySelector('.products-services-section')) {
    const title = document.querySelector('.products-services-section h2');
    if(title) title.textContent = d.homeServicesTitle;
    const ul = document.querySelector('.products-services-content ul');
    if(ul) {
      ul.innerHTML = '';
      d.homeServicesList.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
    }
    const p = document.querySelector('.products-services-content p');
    if(p) p.textContent = d.homeServicesContent;
  }
}
// 绑定按钮
const langBtns = document.querySelectorAll('#lang-switch button');
langBtns.forEach(btn => {
  btn.onclick = () => {
    setLang(btn.getAttribute('data-lang'));
    setActiveLangBtn();
  }
});
function setActiveLangBtn() {
  langBtns.forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}
setActiveLangBtn();
renderLang(); 