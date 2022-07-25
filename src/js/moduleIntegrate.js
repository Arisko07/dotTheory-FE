const articleContainer = document.querySelector(".browse");
const hotNewsContainer = document.querySelector(".hot-news");
const nationsContainer = document.querySelector(".nations");
const articleListContainer = '../json/articleList.json';
const hotNewsListContainer = '../json/hotNews.json';
const nationListContainer = '../json/nationList.json';

function readHTML(){
    const moduleContainer = document.querySelectorAll('[data-module]');
    moduleContainer.forEach(modules => {        
        const refHTML = `../modules/${modules.dataset.module}.html`
        fetch(`${refHTML}`).then(response => response.text()).then(text => {
            const settings = modules.dataset.settings && JSON.parse(modules.dataset.settings);
            let moduleText = text;
            if(settings){
                Object.entries(settings).map(item => {
                    moduleText = moduleText.replace(`data-${item[0]}`,`${item[1]}`)
                })
            }
            modules.removeAttribute('data-settings');            
            modules.innerHTML = moduleText;
        });        
    });    
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
async function fetchJSON(type, targetJSON){
    const request = new Request(targetJSON);
    const response = await fetch(request);
    const result = await response.json();
    if (type === 'articles') createArticles(result);
    else if (type === 'hot-news') createHotNews(result);
    else if (type === 'nation') createNations(result);
}
function createArticles(articles){          
    articles.articles.forEach( article => {
        articleContainer.innerHTML+=`
        <a class="${article.type}" href="${article.source}">
        <section class="section-item ${article.type}">
            <img class="browse__section-image" src="../../img/${article.img}">
            <div>
                <h1>${article.header}</h1>
                <p>${article.content}</p>
            </div>
            <p class="date-item">${article.date}</p>           
        </section>
        </a>
        `
    });
}
function createHotNews(hotNews){
    hotNews.hotNews.forEach(news => {        
        const {image,heading,description,date,type} = news;
        hotNewsContainer.innerHTML+=`
        <article class="hot-news__article">
            <div class="hot-news__image art-wrapper">
                <img src="../../img/${image}">
            </div>
            <h3 class="hot-news__heading">${heading}</h3>
            <p class="hot-news__description">${description}</p>
            <div class="hot-news__date art-footer">
                <span>${date}</span>
                <span><strong>${type}</strong></span>
            </div>
        </article>
    `});
}
function createNations(nations){
    let nationList = '<ul class="nation__list">';
    nations.nation.forEach(nation => {
        const {background,heading,image} = nation;
        nationList+=`
        <li class="nation__item">
            <div class="nation__background background-image" style="background-image: url(../../img/${background});"></div>
            <h1 class="nation__heading">${heading}</h1>
            <img class="nation__image character-icon" src="../../img/${image}">
        </li>
        `
    });
    nationList+='</ul>'
    nationsContainer.innerHTML += nationList;    
}
articleContainer && fetchJSON('articles',articleListContainer);
hotNewsContainer && fetchJSON('hot-news',hotNewsListContainer);
nationsContainer && fetchJSON('nation',nationListContainer);
readHTML();
readCharacterDetails();
/*rebranching fe101*/