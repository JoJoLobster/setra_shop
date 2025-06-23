function genHeader() {
    const d = langData[lang];
    let siteTitle = d.siteTitle;
    let home      = d.home     ;
    let products  = d.products ;
    let strengths = d.strengths;
    let about     = d.about    ;
    let contact   = d.contact  ;

    let mainHeader = document.getElementsByClassName('main-header');
    if(!(mainHeader.length) || mainHeader[0].tagName !== 'HEADER') {
        const mainBody = document.getElementsByTagName('body')[0];
        mainBody.insertAdjacentHTML('afterbegin', `
        <header class="main-header">
            <div class="container">
                <div class="logo-area">
                <img src="assets/images/logo.png" alt="logo" class="logo-img">
                <span id="site-title">${siteTitle}</span>
                </div>

                <div class="phone_lang_switch"> 
                <div class="word_right">
                    <div class="iconPhone icon-dh"></div>
                    <div class="phone">
                    <div>13724351021</div>
                    <div>0755-27782265</div>
                    </div>
                </div>
                <div id="lang-switch">
                    <button data-lang="zh">中文</button>
                    <button data-lang="en">English</button>
                </div>
                </div>
            </div>
            <div class="container">
                <div class="main-nav-wrapper"> 
                    <nav class="main-nav">
                        <a href="index.html" class="active">${home}</a>
                        <a href="products.html">${products}</a>
                        <a href="strengths.html">${strengths}</a>
                        <a href="about.html">${about}</a>
                        <a href="contact.html">${contact}</a>
                    </nav>
                </div>
            </div>
        </header>
        `);
    }
}

function genFooter() {
    const ul = document.getElementById('site-footer');
    if(!ul) {
        const mainBody = document.getElementsByTagName('body')[0];
        mainBody.insertAdjacentHTML('beforeend', `
        <footer id="site-footer">
            <div class="footer-content">
            <div>地址：深圳市松岗镇江边工业一路9号</div>
            <div>电话：13724351021 | 座机：0755-27782265</div>
            <div>Copyright @ 2025, SETRA New Environmental Protection Material Co., Ltd.</div>
            </div>
        </footer>
        `);
    }
}

// 生成头部和底部
genHeader(); 
genFooter();