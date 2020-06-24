const param = [{
  img: 'src/assets/img/about-us/cat.jpg',
  name: 'Iudin Aleksei',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum libero eu quam cursus dapibus eget non augue. Morbi pulvinar purus non sodales eleifend.',
  telegramLink: 'https://telegram.org/',
  githubLink: 'https://github.com/',
},
{
  img: 'src/assets/img/about-us/cat.jpg',
  name: 'Kate Prokofieva',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum libero eu quam cursus dapibus eget non augue. Morbi pulvinar purus non sodales eleifend.',
  telegramLink: 'https://telegram.org/',
  githubLink: 'https://github.com/',
},
{
  img: 'src/assets/img/about-us/cat.jpg',
  name: 'Searhei Baranenkau',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum libero eu quam cursus dapibus eget non augue. Morbi pulvinar purus non sodales eleifend.',
  telegramLink: 'https://telegram.org/',
  githubLink: 'https://github.com/',
},
{
  img: 'src/assets/img/about-us/cat.jpg',
  name: 'Ihar Zimnitski',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum libero eu quam cursus dapibus eget non augue. Morbi pulvinar purus non sodales eleifend.',
  telegramLink: 'https://telegram.org/',
  githubLink: 'https://github.com/',
},
{
  img: 'src/assets/img/about-us/cat.jpg',
  name: 'Semen Shpakau',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum libero eu quam cursus dapibus eget non augue. Morbi pulvinar purus non sodales eleifend.',
  telegramLink: 'https://telegram.org/',
  githubLink: 'https://github.com/',
},
{
  img: 'src/assets/img/about-us/cat.jpg',
  name: 'Hanna Tsitsenkova',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum libero eu quam cursus dapibus eget non augue. Morbi pulvinar purus non sodales eleifend.',
  telegramLink: 'https://telegram.org/',
  githubLink: 'https://github.com/',
},
];

const card = (img, name, text, telegramLink, githubLink) => `<img src="${img}" class="photo">
<div class="wrap-name">
  <p class="name">${name}</p>
  <p class="text">${text}</p>
</div>
<div class="contact">
  <a href="${telegramLink}"><img src="file:///G:/assets/telegram-icon.png" class="telegtam"></a>
  <a href="${githubLink}"><img src="file:///G:/assets/github-icon.jpg" class="github"></a>
</div>`;

const logo = '<p class="logo-about-us">About us</p>';

export const generatePageAboutUs = () => {
  const divAboutUs = document.createElement('div');
  divAboutUs.className = 'main__about-us';

  const divWrapCards = document.createElement('div');
  divWrapCards.className = 'wrap-cards';
  divAboutUs.insertAdjacentHTML('beforebegin', logo);

  for (let i = 0; i < param.length; i += 1) {
    divWrapCards.insertAdjacentHTML('beforebegin', card(param[i].img, param[i].name, param[i].text, param[i].telegramLink, param[i].githubLink));
  }
  divWrapCards.appendChild(divAboutUs);
};
