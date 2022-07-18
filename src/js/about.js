const selector = document.querySelector('.about.content');
const articles = selector.querySelectorAll('.about-article');
const header = selector.querySelector('.about-header');
const articlesSize = articles.length - 1;
const headerChar = header.textContent.split('');
header.innerHTML = '';

let index = 0;
const activatePanels = setInterval(function(){    
    if( index >= articlesSize ) {        
        clearInterval(activatePanels)
    }  
    articles[index].classList.add('active');
    index++;    
},200)

headerChar.forEach(char => header.innerHTML+= `<h1>${char}</h1>`)
let charIndex = 0;
const activeLetter = setInterval(function(){
    if( charIndex >= header.children.length ) {        
        charIndex = 0;
    }  
    header.querySelector('.active') && header.querySelector('.active').classList.remove('active');
    header.children[charIndex].classList.add('active');
    charIndex++;    
},500)