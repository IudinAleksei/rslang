const generatePageAboutUs = () => {
  const OUR_TEAM = [{
    img: 'assets/img/about-us/cat.jpg',
    name: 'Aleksei Iudin',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum libero eu quam cursus dapibus eget non augue. Morbi pulvinar purus non sodales eleifend.',
    telegramLink: 'https://telegram.org/',
    githubLink: 'https://github.com/',
  },
  {
    img: 'assets/img/about-us/cat.jpg',
    name: 'Hanna Tsitsenkova',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum libero eu quam cursus dapibus eget non augue. Morbi pulvinar purus non sodales eleifend.',
    telegramLink: 'https://telegram.org/',
    githubLink: 'https://github.com/',
  },
  {
    img: 'assets/img/about-us/cat.jpg',
    name: 'Ihar Zimnitski',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum libero eu quam cursus dapibus eget non augue. Morbi pulvinar purus non sodales eleifend.',
    telegramLink: 'https://telegram.org/',
    githubLink: 'https://github.com/',
  },
  {
    img: 'assets/img/about-us/cat.jpg',
    name: 'Searhei Baranenkau',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum libero eu quam cursus dapibus eget non augue. Morbi pulvinar purus non sodales eleifend.',
    telegramLink: 'https://telegram.org/',
    githubLink: 'https://github.com/',
  },
  {
    img: 'assets/img/about-us/cat.jpg',
    name: 'Semen Shpakau',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum libero eu quam cursus dapibus eget non augue. Morbi pulvinar purus non sodales eleifend.',
    telegramLink: 'https://telegram.org/',
    githubLink: 'https://github.com/',
  },
  {
    img: 'assets/img/about-us/cat.jpg',
    name: 'Kate Prokofieva',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum libero eu quam cursus dapibus eget non augue. Morbi pulvinar purus non sodales eleifend.',
    telegramLink: 'https://telegram.org/',
    githubLink: 'https://github.com/',
  },
  ];
  const CARD = (img, name, text, telegramLink, githubLink) => `<div class="about-us__wrap">
              <img src="${img}" class="photo">
              <div class="wrap-name">
                <p class="name">${name}</p>
                <p class="text">${text}</p>
              </div>
              <div class="contact">
                <a href="${telegramLink}"><img src="assets/img/about-us/telegram.svg" class="telegtam"></a>
                <a href="${githubLink}"><img src="assets/img/about-us/logo.svg" class="github"></a>
              </div>
            </div>`;
  const LOGO = '<p class="logo-about-us">About us</p>';
  const DIV_ABOUT_US = document.createElement('div');
  DIV_ABOUT_US.className = 'main__about-us';

  document.querySelector('.main-container').appendChild(DIV_ABOUT_US);
  DIV_ABOUT_US.insertAdjacentHTML('afterbegin', LOGO);

  const DIV_WRAP_CARDS = document.createElement('div');
  DIV_WRAP_CARDS.className = 'wrap-cards';
  DIV_ABOUT_US.appendChild(DIV_WRAP_CARDS);

  for (let i = 0; i < OUR_TEAM.length; i += 1) {
    DIV_WRAP_CARDS.insertAdjacentHTML('beforebegin', CARD(OUR_TEAM[i].img, OUR_TEAM[i].name, OUR_TEAM[i].text, OUR_TEAM[i].telegramLink, OUR_TEAM[i].githubLink));
  }
};
export default generatePageAboutUs;
