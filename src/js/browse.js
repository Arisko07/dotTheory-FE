const pagelistContainer = '../json/pageList.json';
const articleListContainer = '../json/articleList.json';

async function fetchPage(){
    const request = new Request(pagelistContainer);
    const response = await fetch(request);
    const pageList = await response.json();            
    navigate(pageList)
}                
function navigate(pageLists){
    let articlePage = document.querySelector("#article");            
    let errorPage = document.querySelector(".page-not-found");
    errorPage.classList.remove("show");
    let pageList = pageLists.pageList;

    if(pageList.includes(articlePage.value)){
        this.location.href=`../view/${articlePage.value}Page.html`;
    }
    else{
        errorPage.classList.add("show");
    }                        
}
fetchArticles();
async function fetchArticles(){
    const request = new Request(articleListContainer);
    const response = await fetch(request);
    const articles = await response.json();            
    createArticles(articles)
} 
function createArticles(articles){
    let articleContainer = document.querySelector(".browse-list");    
    articles.articles.forEach( article => {
        articleContainer.innerHTML+=`
        <a class="${article.type}" href="${article.source}">
        <section class="section-item ${article.type}">
            <img class="list" src="../../img/${article.img}">
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

function changeView(e){            
    const browseList = document.querySelector('.browse-list');    
    if(e.classList.contains('list-button')){
        browseList.classList.add('list');
        return
    }
    browseList.classList.remove('list');
}    
