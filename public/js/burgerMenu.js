var burgerMenu = false

function toggleMenu() {
    const navigation = document.getElementById("nav");
    for (const e of navigation.children) e.classList.toggle("active");
}