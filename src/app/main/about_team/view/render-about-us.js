const renderAboutUs = () => {
  const html = `<div class="main__about-us"> 
  <p class="logo-about-us">About us</p>
  <div class="wrap-cards">   
    <div class="about-us__wrap">
      <img src='../src/assets/img/cat.jpg' class="photo">
      <div class="wrap-name">
        <p class="name">Namename Namename</p>
        <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Curabitur dictum libero eu quam cursus dapibus eget non augue. 
          Morbi pulvinar purus non sodales eleifend.</p>
      </div>
      <div class="contact">
        <a href="https://telegram.org/" ><img src='/assets/telegram-icon.png' class="telegtam"></a>
        <a href="https://github.com/" ><img src='/assets/github-icon.jpg' class="github"></a>
      </div>
    </div>
    <div class="about-us__wrap">
      <img src='../src/assets/img/cat.jpg' class="photo">
      <div class="wrap-name">
        <p class="name">Namename Namename</p>
        <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Curabitur dictum libero eu quam cursus dapibus eget non augue. 
          Morbi pulvinar purus non sodales eleifend.</p>
      </div>
      <div class="contact">
        <a href="https://telegram.org/" ><img src='/assets/telegram-icon.png' class="telegtam"></a>
        <a href="https://github.com/" ><img src='/assets/github-icon.jpg' class="github"></a>
      </div>
    </div>
    <div class="about-us__wrap">
      <img src='../src/assets/img/cat.jpg' class="photo">
      <div class="wrap-name">
        <p class="name">Namename Namename</p>
        <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Curabitur dictum libero eu quam cursus dapibus eget non augue. 
          Morbi pulvinar purus non sodales eleifend.</p>
      </div>
      <div class="contact">
        <a href="https://telegram.org/" ><img src='/assets/telegram-icon.png' class="telegtam"></a>
        <a href="https://github.com/" ><img src='/assets/github-icon.jpg' class="github"></a>
      </div>
    </div>
    <div class="about-us__wrap">
      <img src='../src/assets/img/cat.jpg' class="photo">
      <div class="wrap-name">
        <p class="name">Namename Namename</p>
        <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Curabitur dictum libero eu quam cursus dapibus eget non augue. 
          Morbi pulvinar purus non sodales eleifend.</p>
      </div>
      <div class="contact">
        <a href="https://telegram.org/" ><img src='/assets/telegram-icon.png' class="telegtam"></a>
        <a href="https://github.com/" ><img src='/assets/github-icon.jpg' class="github"></a>
      </div>
    </div>
    <div class="about-us__wrap">
      <img src='../src/assets/img/cat.jpg' class="photo">
      <div class="wrap-name">
        <p class="name">Namename Namename</p>
        <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Curabitur dictum libero eu quam cursus dapibus eget non augue. 
          Morbi pulvinar purus non sodales eleifend.</p>
      </div>
      <div class="contact">
        <a href="https://telegram.org/" ><img src='/assets/telegram-icon.png' class="telegtam"></a>
        <a href="https://github.com/" ><img src='/assets/github-icon.jpg' class="github"></a>
      </div>
    </div>
    <div class="about-us__wrap">
      <img src='../src/assets/img/cat.jpg' class="photo">
      <div class="wrap-name">
        <p class="name">Namename Namename</p>
        <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Curabitur dictum libero eu quam cursus dapibus eget non augue. 
          Morbi pulvinar purus non sodales eleifend.</p>
      </div>
      <div class="contact">
        <a href="https://telegram.org/" ><img src='/assets/telegram-icon.png' class="telegtam"></a>
        <a href="https://github.com/" ><img src='/assets/github-icon.jpg' class="github"></a>
      </div>
    </div>
  </div>  
</div>`;
  const container = document.querySelector('.container');
  container.innerHTML = html;
};

export default renderAboutUs;
