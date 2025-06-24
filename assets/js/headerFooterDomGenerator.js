function genBodyBackground(){
    const bodySvg = document.getElementsByClassName('body-svg');
    if(!bodySvg.length) {
        const mainBody = document.getElementsByTagName('body')[0];
        mainBody.insertAdjacentHTML('afterbegin', `
                <svg class="body-svg" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1600 500" preserveAspectRatio="xMidYMax slice">
                        <defs>
                            <linearGradient id="bg">
                                <stop offset="0%" style="stop-color:rgba(130, 158, 249, 0.06)"></stop>
                                <stop offset="50%" style="stop-color:rgba(76, 190, 255, 0.6)"></stop>
                                <stop offset="100%" style="stop-color:rgba(115, 209, 72, 0.2)"></stop>
                            </linearGradient>
                            <path id="wave" fill="url(#bg)" d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
                    s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z" />
                        </defs>
                        <g>
                            <use xlink:href='#wave' opacity=".3">
                                <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="10s"
                            calcMode="spline"
                            values="270 230; -334 180; 270 230"
                            keyTimes="0; .5; 1"
                            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                            repeatCount="indefinite" />
                            </use>
                            <use xlink:href='#wave' opacity=".6">
                                    <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="8s"
                            calcMode="spline"
                            values="-270 230;243 220;-270 230"
                            keyTimes="0; .6; 1"
                            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                            repeatCount="indefinite" />
                            </use>
                            <use xlink:href='#wave' opacty=".9">
                                    <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="6s"
                            calcMode="spline"
                            values="0 230;-140 200;0 230"
                            keyTimes="0; .4; 1"
                            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                            repeatCount="indefinite" />
                            </use>
                        </g>
                    </svg>
        `);

    }
    
}
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
genBodyBackground();