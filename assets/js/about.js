var obj_about = {};

obj_about.renderAboutPage = () => {
    let langd = obj_lang.getLangData();
    if (document.getElementById('strengths-list')) {
        const ul = document.getElementById('strengths-list');
        ul.innerHTML = '';
        langd.strengthsList.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
    }
}
obj_about.renderAboutPage();
registerLangReRenderFunction('about', obj_about.renderAboutPage);