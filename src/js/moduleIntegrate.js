function readHTML(){
    const moduleContainer = document.querySelectorAll('[data-module]');
    moduleContainer.forEach(modules => {
        const refHTML = modules.dataset.module;
        fetch(`${refHTML}`).then(response => response.text()).then(text => modules.innerHTML = text);        
    });
    console.log("aa")
}
readHTML();