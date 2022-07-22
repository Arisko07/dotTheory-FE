const articleContainer = document.querySelector(".browse");
const hotNewsContainer = document.querySelector(".hot-news");
const articleListContainer = '../json/articleList.json';
const hotNewsListContainer = '../json/hotNews.json';

function readHTML(){
    const moduleContainer = document.querySelectorAll('[data-module]');
    moduleContainer.forEach(modules => {
        const refHTML = modules.dataset.module;        
        fetch(`${refHTML}`).then(response => response.text()).then(text => {
            const settings = modules.dataset.settings && JSON.parse(modules.dataset.settings);
            let moduleText = text;
            if(settings){
                Object.entries(settings).map(item => {
                    moduleText = moduleText.replace(`data-${item[0]}`,`${item[1]}`)
                })
            }
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
async function fetchArticles(){    
    const request = new Request(articleListContainer);
    const response = await fetch(request);
    const articles = await response.json();            
    createArticles(articles)
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
async function fetchHotNews(){
    const request = new Request(hotNewsListContainer);
    const response = await fetch(request);
    const hotNews = await response.json();            
    createHowNews(hotNews)
}
function createHowNews(hotNews){
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
hotNewsContainer && fetchHotNews();
articleContainer && fetchArticles();
readHTML();
readCharacterDetails();
/*rebranching fe101*/