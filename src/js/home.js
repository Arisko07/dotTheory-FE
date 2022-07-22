function handleCategoryClick(e){        
    const articleContainer = e.closest('.browse');
    const activeButton = document.querySelector('.browse__button-home-active');    
    activeButton && activeButton.classList.remove('browse__button-home-active');
    e.classList.add('browse__button-home-active');
    articleContainer.dataset.category = e.textContent.toLowerCase();
}