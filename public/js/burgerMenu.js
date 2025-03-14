var burgerMenu = false

function toggleMenu() {
    const menu = document.querySelectorAll('.div-header ul li');
    const burger = document.querySelector('.burger-menu');
    const selected = document.querySelector('.selected');
    if (!burgerMenu){
        menu.forEach((item) => {
        item.style.display = 'flex';
    });
    burgerMenu = true;
    }else{
        menu.forEach((item) => {
        item.style.display = 'none';
    });
    selected.style.display = 'flex';
    burgerMenu = false;
    
    }
    
    
}