const menu = document.querySelector('.menu__icon');
const menuItems = document.querySelector('.menu__items');
const menuBg = document.querySelector('.menu-bg');
const selectedMenuElement = document.getElementById('menu');
const menuItem = document.querySelector('.menu__items__item');

export default function menuHandling() {
  menuItem.classList.add('menu__active-element'); // highlight first item in the menu

  // burger menu handling
  function onClickBurgerIcon() {
    menu.classList.toggle('menu-active');
    menuBg.classList.toggle('menu__bg-active');
    menuItems.classList.toggle('menu-active');
  }

  function removeActiveStateFromBurger() {
    menuBg.classList.remove('menu__bg-active');
    menu.classList.remove('menu-active');
    menuItems.classList.remove('menu-active');
  }

  function onClickOutsideMenu(event) {
    const isClickInside = selectedMenuElement.contains(event.target);
    if (!isClickInside) {
      removeActiveStateFromBurger();
    }
  }

  function onMenuItemClick(event) {
    const sectionInTheMenu = event.target.closest('.menu__items__item');
    if (sectionInTheMenu) {
      menuItems.querySelectorAll('a').forEach((element) => element.classList.remove('menu__active-element'));
      sectionInTheMenu.classList.add('menu__active-element');
      removeActiveStateFromBurger();
    }
  }

  menuItems.addEventListener('click', onMenuItemClick);

  menu.addEventListener('click', onClickBurgerIcon);

  document.addEventListener('click', onClickOutsideMenu);
}
