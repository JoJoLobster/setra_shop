var obj_strength = {};
obj_strength.renderStrengthPage = () => {
    let d = obj_lang.getLangData();
    if (document.getElementById('strengths-list')) {
        const ul = document.getElementById('strengths-list');
        ul.innerHTML = '';
        d.strengthsList.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
    }
}
obj_strength.renderStrengthPage();
registerLangReRenderFunction('strength', obj_strength.renderStrengthPage);