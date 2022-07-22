const articleListContainer = '../json/articleList.json';

function handleCategoryClick(e){        
    const articleContainer = e.closest('.browse');
    const activeButton = document.querySelector('.active');    
    activeButton && activeButton.classList.remove('active');
    e.classList.add('active');
    articleContainer.dataset.category = e.textContent.toLowerCase();
}