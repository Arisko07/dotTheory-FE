function readHTML(){
    const moduleContainer = document.querySelectorAll('[data-module]');
    moduleContainer.forEach(modules => {
        const refHTML = modules.dataset.module;
        fetch(`${refHTML}`).then(response => response.text()).then(text => modules.innerHTML = text);        
    });
    console.log("aa")
}
function readCharacterDetails(){
    const character = document.querySelectorAll('[data-table]');    
    character.forEach(character => fetch(`../json/characterDetails.json`).then(response => response.json()).then(text => createTable(text,character)));
    
}
function createTable(text,character){
    console.log(character);
    const details = text[character.dataset.table];
    let detailHTML = '';
    details.forEach(detail => {
        detailHTML+=`
        <div class="character-table_header">
            <img src="../../img//${detail.icon}">
            <div class="character-table_detail">${detail.name}</div>
            <div class="character-table_detail">${detail.type}</div>
        </div>
        <div class="character-table_description">${detail.description}</div>
        `
    });
    character.innerHTML = detailHTML;
}
readCharacterDetails();
readHTML();
/*rebranching fe101*/