// burger menu handling
function onClickBurgerIcon() {
  document.querySelector('.menu__icon').classList.toggle('menu-active');
  document.querySelector('.menu-bg').classList.toggle('menu__bg-active');
  document.querySelector('.menu__items').classList.toggle('menu-active');
}

function removeActiveStateFromBurger() {
  document.querySelector('.menu-bg').classList.remove('menu__bg-active');
  document.querySelector('.menu__icon').classList.remove('menu-active');
  document.querySelector('.menu__items').classList.remove('menu-active');
}

function onClickOutsideMenu(event) {
  const isClickInside = document.getElementById('menu').contains(event.target);
  if (!isClickInside) {
    removeActiveStateFromBurger();
  }
}

function onMenuItemClick(event) {
  const sectionInTheMenu = event.target.closest('.menu__items__item');
  if (sectionInTheMenu) {
    document.querySelector('.menu__items').querySelectorAll('.menu__items__item').forEach((element) => element.classList.remove('menu__items__item_active'));
    sectionInTheMenu.classList.add('menu__items__item_active');
    removeActiveStateFromBurger();
  }
}

export default function menuHandling() {
  const menu = document.querySelector('.menu__icon');
  const menuItems = document.querySelector('.menu__items');
  const menuItem = document.querySelector('.menu__items__item');

  menuItem.classList.add('menu__items__item_active'); // highlight first item in the menu

  menuItems.addEventListener('click', onMenuItemClick);

  menu.addEventListener('click', onClickBurgerIcon);

  document.addEventListener('click', onClickOutsideMenu);
}
