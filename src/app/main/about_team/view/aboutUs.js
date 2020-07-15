import '../sass/about-us.scss';

const generatePageAboutUs = () => {
  const OUR_TEAM = [{
    img: 'assets/img/about-us/cats/1566050267_bolshaya-morda-kota2.jpg',
    name: 'Aleksei Iudin',
    text: 'Created the project structure. Configured webpack and other project tools. Code review of all PRs. <br> Developed: common modules for the sessionStorage, localStorage, Yandex.Translate API and dictionary page.',
    telegramLink: 'https://t.me/AleksDraco',
    githubLink: 'https://github.com/IudinAleksei',
  },
  {
    img: 'assets/img/about-us/cats/Raspoznat-Kota.jpg',
    name: 'Hanna Tsitsenkova',
    text: 'Developed: design card for Tranning game, design and content for about us page, design landing page, SASS mixins and constants for app.',
    telegramLink: 'https://t.me/titenkova_anna',
    githubLink: 'https://github.com/Hanna25',
  },
  {
    img: 'assets/img/about-us/cats/55023223_big2-e1550635350619.jpg',
    name: 'Ihar Zimnitski',
    text: 'Developed: Savanna game, Audiochallenge game, function for working with skyeng api.',
    telegramLink: 'https://t.me/igor_zi',
    githubLink: 'https://github.com/igorzima',
  },
  {
    img: 'assets/img/about-us/cats/1739645.jpg',
    name: 'Searhei Baranenkau',
    text: 'Developed: Training game, English puzzle game, authorization form.',
    telegramLink: 'https://t.me/cupora',
    githubLink: 'https://github.com/cup0ra',
  },
  {
    img: 'assets/img/about-us/cats/3.jpg',
    name: 'Semen Shpakau',
    text: 'Developed: SpeakIt game, backend function, statistics page.',
    telegramLink: 'https://t.me/Jack34Black',
    githubLink: 'https://github.com/SkaymanT',
  },
  {
    img: 'assets/img/about-us/cats/photo_2020-07-12_23-22-42.jpg',
    name: 'Kate Prokofieva',
    text: 'Developed: Sprint game, burger menu, settings for Training game, content for landing page.',
    telegramLink: 'https://t.me/KatherineProkofieva',
    githubLink: 'https://github.com/KatherineP',
  },
  ];
  const CARD = (img, name, text, telegramLink, githubLink) => `<div class="about-us__wrap">
              <img src="${img}" class="photo">
              <div class="wrap-name">
                <p class="name">${name}</p>
                <p class="text">${text}</p>
              </div>
              <div class="contact">
                <a href="${telegramLink}" target="_blank"><img src="assets/img/about-us/telegram.svg" class="telegtam"></a>
                <a href="${githubLink}" target="_blank"><img src="assets/img/about-us/logo.svg" class="github"></a>
              </div>
            </div>`;
  const MAIN_CONTAINER = document.querySelector('.main-container');
  Array.from(MAIN_CONTAINER.children).forEach((child) => child.remove());
  const DIV_BACKGROUND = document.createElement('div');
  DIV_BACKGROUND.className = 'main__background-about-us';
  MAIN_CONTAINER.appendChild(DIV_BACKGROUND);
  const LOGO = '<p class="logo-about-us">About us</p>';
  const DIV_ABOUT_US = document.createElement('div');
  DIV_ABOUT_US.className = 'main__about-us';

  MAIN_CONTAINER.appendChild(DIV_ABOUT_US);
  DIV_ABOUT_US.insertAdjacentHTML('afterbegin', LOGO);

  const DIV_WRAP_CARDS = document.createElement('div');
  DIV_WRAP_CARDS.className = 'wrap-cards';
  DIV_ABOUT_US.appendChild(DIV_WRAP_CARDS);

  for (let i = 0; i < OUR_TEAM.length; i += 1) {
    DIV_WRAP_CARDS.insertAdjacentHTML('beforeend', CARD(OUR_TEAM[i].img, OUR_TEAM[i].name, OUR_TEAM[i].text, OUR_TEAM[i].telegramLink, OUR_TEAM[i].githubLink));
  }
};
export default generatePageAboutUs;
