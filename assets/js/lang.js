
var obj_lang = {};
var pageName = 'index';
const langReRenderFunctions = {};
function registerLangReRenderFunction(name, func) {
    langReRenderFunctions[name] = func;
}
function unregisterLangReRenderFunction(name) {
    delete langReRenderFunctions[name];
}

obj_lang.langData = {
  zh: {
    home: '首页',
    siteTitle: '深圳市西特新环保材料有限公司',
    about: '关于我们',
    products: '我们的产品',
    strengths: '我们的强项',
    contact: '联系我们',
    aboutTitle: '公司简介',
    aboutDesc: `
        <p>深圳市西特新环保材料有限公司是专业电镀添加剂研发生产单位，从事电子、五金、塑胶、PCB、FPC电镀化学镀工艺全制程配套添加剂；铜、镍、锡、银、金、等添加剂,保护剂,提供特殊电镀工艺及产品配方开发。</p>
        <p>公司特色产品：<span class="highlight">碱铜、无氰碱铜、焦铜、酸铜</span>(原装德系酸铜、原装日系酸铜，均可代替德国日本品牌酸铜），公司研发无阳极泥酸铜添加剂均可应用于五金、塑胶、PCB\FPC电镀，节约阳极消耗、节约生产成本、提高生产效率、延长生产维护周期。无氰碱铜完全取代氰化物效果显著性能稳定。</p>
        <p>我们热忱期待着为您提供优质的产品和专业的服务！本着用户至上、信誉第一的宗旨，不断创新、与时俱进的理念热服务于每一位客户。</p>
        <p>深圳西特专注镀铜研发！ </p>
        <p>产品详情欢迎致电+086-0755-27782265，新产品开发技术支持请致电+086 13724351021</p>
    `,
    strengthsTitle: '我们的强项',
    strengthsList: ['专注镀铜研发', '高品质的产品保障', '完善的售后服务', '丰富的行业经验'],
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
    homeProfileContent: '我们自豪地介绍自己是西特新环保材料有限公司出口事业部，是电镀染料、添加剂、保护剂系列等领先制造商之一，拥有设备齐全的工厂和专业的化学师团队。',
    homeProfileList: [
      '<strong>成立年份：</strong> 2009',
      '<strong>主营业务：</strong> 西特新环保材料有限公司自2009年4月以来在实验室化学品领域享有盛誉。期间我们始终坚持为每一位客户提供高品质产品。',
      '<strong>年营业额：</strong> 拥有100多种高品质产品，技术不断进步，取得了显著成就。',
      '<strong>市场覆盖：</strong> 随着业务在中国及海外扩展，为便于客户了解产品，我们编制了产品手册，便于客户查阅。'
    ],
    homeServicesTitle: '我们的产品与服务',
    homeServicesList: [
        '无气电镀',
        '五金电镀系列',
        '塑胶电镀系列',
        'PCB/FPC电镀',
        '中间体系列',
        '特殊添加剂',
        '后处理保护系列'
    ],
    all: '全部',
  },
  en: {
    home: 'Home', 
    siteTitle: 'SETRA New Environmental Protection Material Co., Ltd.',
    about: 'About Us',
    products: 'Our Products',
    strengths: 'Our Strengths',
    contact: 'Contact Us',
    aboutTitle: 'Company Profile',
    aboutDesc: `
    <p>Shenzhen Xite New Environmental Protection Materials Co., Ltd. is a specialized unit for the research and production of electroplating additives, providing full-process additives for electroplating and chemical plating processes in electronics, hardware, plastics, PCB, and FPC. The company offers additives for copper, nickel, tin, silver, gold, and other metals, including protective agents and special electroplating process and product formula development.</p>
    <p>Key products: <span class="highlight">alkaline copper, cyanide-free alkaline copper, cuprous chloride, acid copper (original German acid copper and original Japanese acid copper, both can replace German and Japanese brand acid copper)</span>. The company's research on cyanide-free acid copper additives can be applied to hardware, plastics, PCB/FPC electroplating, saving anode consumption, reducing production costs, improving production efficiency, and extending maintenance cycles. Cyanide-free alkaline copper effectively replaces cyanides with significant performance stability.</p>
    <p>We warmly look forward to providing you with high-quality products and professional services! Adhering to the principle of user first and credibility paramount, we continuously innovate and keep pace with the times, serving every customer wholeheartedly.</p>
    <p>Shenzhen Xite focuses on copper plating research!</p>
    <p>For more product details, please call +086-0755-27782265. For new product development and technical support, please call +086 13724351021.</p>

    `,
    strengthsTitle: 'Our Strengths',
    strengthsList: ['Focus on copper plating research and development', 'High Quality Assurance', 'Comprehensive After-sales Service', 'Rich Industry Experience'],
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
    homeProfileContent: 'We introduce ourselves as an export division of SETRA, who is the one of the leading manufacturer of dyes from ELECTROPLATING DYES, Biological stains, PH Indicators, Hair Colour, safranine series. Under well equiped plant with qualified chemists.',
    homeProfileList: [
      '<strong>Year of Establishment:</strong> 2009',
      '<strong>Primary Business:</strong> The SETRA has been recognized in the field of Laboratory Chemicals since April 2009. During this period we had to persuade every customer for a quality product.',
      '<strong>Annual Turnover:</strong> Detailed quality products with over 100 products. The technical advancement of the cervical product specification has been achieved and we have made significant progress.',
      '<strong>Market Covered:</strong> During this period we had to persuade every customer for a quality product. As the business expanded in India and different countries, it was difficult to inform all customers about different products. After that, we decided to prepare a book from where our valued customers get information about our products.'
    ],
    homeServicesTitle: 'Our Products & Services',
    homeServicesList: [
      'No-air Plating',
      'Hardware Plating Series',
      'Plastic Plating Series',
      'PCB/FPC Plating',
      'Intermediate Series',
      'Special Additive',
      'Post-treatment Protection Series',
    ],
    all: 'All',
  }
};

obj_lang.getLang = () => localStorage.getItem('lang') || 'zh';
obj_lang.getLangData = () => obj_lang.langData[obj_lang.getLang()];

obj_lang.setLang = (newLang) => {
  localStorage.setItem('lang', newLang??(localStorage.getItem('lang') || 'zh'));
  obj_lang.renderLang();
}

obj_lang.renderLang = () => {
  const d = obj_lang.langData[obj_lang.getLang()];
  if(document.getElementById('about-title')) document.getElementById('about-title').textContent = d.aboutTitle;

  if(document.getElementById('about-desc')) document.getElementById('about-desc').innerHTML = d.aboutDesc;


  if(document.getElementById('strengths-title')) document.getElementById('strengths-title').textContent = d.strengthsTitle;
  
  if(document.getElementById('contact-title')) document.getElementById('contact-title').textContent = d.contactTitle;

  if(document.getElementById('products-title')) {
    document.getElementById('products-title').textContent = d.productsTitle;
  }
}



