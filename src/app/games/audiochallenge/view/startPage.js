import startAudiochallengeGame from './startGame';

export default function renderAudiochallengeStartPage() {
  const bodyClass = document.querySelector('body').classList;
  document.querySelector('body').classList.remove(bodyClass[0], bodyClass[1]);
  document.querySelector('body').classList.add('audiochallenge__body');
  document.querySelector('.main-container').innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'audiochallenge');

  const title = document.createElement('div');
  title.classList.add('audiochallenge__title');
  title.innerHTML = `
  <svg class='logo' width="803" height="78" viewBox="0 0 803 78" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="path-1-outside-1" maskUnits="userSpaceOnUse" x="0.959961" y="0.527985" width="802" height="77" fill="black">
  <rect fill="white" x="0.959961" y="0.527985" width="802" height="77"/>
  <path d="M52.424 71.672C50.12 71.672 48.616 70.584 47.912 68.408L41 48.44L21.416 52.76L15.176 68.504C14.792 69.4 14.216 70.136 13.448 70.712C12.744 71.288 11.848 71.576 10.76 71.576C9.47996 71.576 8.35996 71.128 7.39996 70.232C6.43996 69.336 5.95996 68.28 5.95996 67.064C5.95996 66.232 6.18396 65.272 6.63196 64.184L10.472 54.584C10.088 54.456 9.79996 54.328 9.60796 54.2C7.94396 53.368 7.11196 51.96 7.11196 49.976C7.11196 48.824 7.43196 47.832 8.07196 47C8.77596 46.168 9.67196 45.624 10.76 45.368L14.312 44.6L28.52 8.50399C28.904 7.54399 29.512 6.80799 30.344 6.29599C31.176 5.78399 32.072 5.52798 33.032 5.52798C34.056 5.52798 34.952 5.78399 35.72 6.29599C36.488 6.80799 37.064 7.60799 37.448 8.69598L56.552 64.088C56.616 64.216 56.744 64.6 56.936 65.24C57.128 65.816 57.224 66.424 57.224 67.064C57.224 68.28 56.776 69.368 55.88 70.328C54.984 71.224 53.832 71.672 52.424 71.672ZM37.832 39.512L32.648 24.056L25.448 42.2L37.832 39.512Z"/>
  <path d="M89.1687 71.576C83.8567 71.576 79.2807 70.104 75.4407 67.16C71.6647 64.216 68.7207 60.088 66.6087 54.776C64.5607 49.464 63.4087 43.32 63.1527 36.344C63.0247 30.968 62.9607 27.32 62.9607 25.4L63.0567 18.008C63.1207 16.408 63.1527 13.976 63.1527 10.712C63.1527 9.68798 63.5367 8.69598 64.3047 7.73598C65.1367 6.71199 66.4167 6.19999 68.1447 6.19999C69.8087 6.19999 70.9927 6.71199 71.6967 7.73598C72.4007 8.69598 72.7527 9.71998 72.7527 10.808L72.6567 17.72C72.5927 19.064 72.5607 21.112 72.5607 23.864C72.5607 25.912 72.6247 29.624 72.7527 35C73.0087 43.128 74.3847 49.784 76.8807 54.968C79.4407 60.152 83.6007 62.744 89.3607 62.744C93.8407 62.744 97.6487 61.336 100.785 58.52C103.921 55.64 105.841 51.096 106.545 44.888C107.121 39.384 107.409 33.208 107.409 26.36L107.313 11C107.313 9.84799 107.665 8.75999 108.369 7.73598C109.073 6.71199 110.321 6.19999 112.113 6.19999C113.905 6.19999 115.121 6.71199 115.761 7.73598C116.465 8.69598 116.817 9.71998 116.817 10.808L116.913 13.496C117.105 20.024 117.201 24.472 117.201 26.84C117.201 33.432 116.817 39.704 116.049 45.656C114.961 53.784 112.241 60.152 107.889 64.76C103.537 69.304 97.2967 71.576 89.1687 71.576Z"/>
  <path d="M144.555 72.152C142.315 72.152 140.043 71.928 137.739 71.48C135.435 71.096 133.867 70.776 133.035 70.52C132.011 70.2 131.147 69.592 130.443 68.696C129.739 67.8 129.387 66.84 129.387 65.816V11.384C129.387 10.04 129.835 8.91999 130.731 8.02399C131.691 7.12799 132.843 6.67999 134.187 6.67999C140.651 6.67999 147.179 7.63999 153.771 9.55998C160.363 11.48 166.059 15.064 170.859 20.312C175.723 25.56 178.155 32.824 178.155 42.104C178.155 48.824 176.683 54.456 173.739 59C170.795 63.48 166.795 66.808 161.739 68.984C156.683 71.096 150.955 72.152 144.555 72.152ZM144.555 62.552C152.043 62.552 157.899 60.824 162.123 57.368C166.411 53.912 168.555 48.824 168.555 42.104C168.555 33.784 165.835 27.608 160.395 23.576C155.019 19.544 147.883 17.176 138.987 16.472V61.976C141.163 62.36 143.019 62.552 144.555 62.552Z"/>
  <path d="M187.434 71C186.09 71 184.938 70.552 183.978 69.656C183.082 68.696 182.634 67.544 182.634 66.2C182.634 64.856 183.082 63.736 183.978 62.84C184.938 61.88 186.09 61.4 187.434 61.4H194.154V16.28H187.434C186.09 16.28 184.938 15.8 183.978 14.84C183.082 13.88 182.634 12.728 182.634 11.384C182.634 10.04 183.082 8.91999 183.978 8.02399C184.938 7.12799 186.09 6.67999 187.434 6.67999H210.378C211.722 6.67999 212.842 7.12799 213.738 8.02399C214.634 8.91999 215.082 10.04 215.082 11.384C215.082 12.728 214.634 13.88 213.738 14.84C212.842 15.8 211.722 16.28 210.378 16.28H203.754V61.4H210.378C211.786 61.4 212.906 61.88 213.738 62.84C214.634 63.736 215.082 64.856 215.082 66.2C215.082 67.544 214.634 68.696 213.738 69.656C212.842 70.552 211.722 71 210.378 71H187.434Z"/>
  <path d="M244.735 71.576C239.999 71.576 235.743 70.264 231.967 67.64C228.191 64.952 225.215 61.304 223.039 56.696C220.927 52.088 219.871 46.936 219.871 41.24C219.871 34.776 221.183 28.856 223.807 23.48C226.431 18.104 229.919 13.88 234.271 10.808C238.687 7.67198 243.423 6.10398 248.479 6.10398C253.215 6.10398 257.471 7.41598 261.247 10.04C265.087 12.664 268.063 16.28 270.175 20.888C272.351 25.496 273.439 30.68 273.439 36.44C273.439 42.968 272.127 48.92 269.503 54.296C266.879 59.608 263.359 63.832 258.943 66.968C254.591 70.04 249.855 71.576 244.735 71.576ZM244.735 62.456C248.191 62.456 251.359 61.368 254.239 59.192C257.183 57.016 259.519 53.976 261.247 50.072C262.975 46.168 263.839 41.752 263.839 36.824C263.839 32.344 263.071 28.472 261.535 25.208C260.063 21.944 258.079 19.48 255.583 17.816C253.151 16.088 250.591 15.224 247.903 15.224C244.575 15.224 241.503 16.344 238.687 18.584C235.871 20.824 233.631 23.928 231.967 27.896C230.303 31.8 229.471 36.248 229.471 41.24C229.471 45.72 230.175 49.56 231.583 52.76C232.991 55.96 234.847 58.392 237.151 60.056C239.519 61.656 242.047 62.456 244.735 62.456Z"/>
  <path d="M309.122 71.576C304.002 71.576 299.298 70.424 295.01 68.12C290.722 65.816 287.33 62.488 284.834 58.136C282.338 53.72 281.09 48.568 281.09 42.68C281.09 36.472 282.53 30.552 285.41 24.92C288.354 19.224 292.13 14.68 296.738 11.288C301.41 7.83198 306.178 6.10398 311.042 6.10398C313.09 6.10398 315.106 6.42398 317.09 7.06399C319.138 7.70399 320.962 8.50399 322.562 9.46399C323.33 8.69598 324.29 8.31198 325.442 8.31198C326.722 8.31198 327.778 8.75998 328.61 9.65598C329.442 10.488 329.858 11.512 329.858 12.728V18.872C329.858 20.152 329.378 21.272 328.418 22.232C327.522 23.192 326.402 23.672 325.058 23.672C323.778 23.672 322.69 23.288 321.794 22.52C320.962 21.752 320.546 20.856 320.546 19.832V19.16C318.178 16.664 314.786 15.416 310.37 15.416C307.17 15.416 304.034 16.728 300.962 19.352C297.89 21.912 295.394 25.304 293.474 29.528C291.618 33.752 290.69 38.136 290.69 42.68C290.69 46.712 291.522 50.232 293.186 53.24C294.85 56.184 297.058 58.456 299.81 60.056C302.626 61.592 305.73 62.36 309.122 62.36C315.33 62.36 320.45 59.704 324.482 54.392C325.058 53.688 325.634 53.208 326.21 52.952C326.786 52.632 327.458 52.472 328.226 52.472C329.57 52.472 330.69 52.92 331.586 53.816C332.546 54.648 333.026 55.8 333.026 57.272C333.026 58.36 332.738 59.32 332.162 60.152C329.538 63.864 326.21 66.712 322.178 68.696C318.21 70.616 313.858 71.576 309.122 71.576Z"/>
  <path d="M346.81 71.576C345.466 71.576 344.346 71.128 343.45 70.232C342.554 69.272 342.106 68.152 342.106 66.872V10.904C342.106 9.55999 342.554 8.43999 343.45 7.54399C344.346 6.64799 345.466 6.19999 346.81 6.19999C348.154 6.19999 349.306 6.64799 350.266 7.54399C351.226 8.43999 351.706 9.55999 351.706 10.904V35.864L386.65 30.968V10.904C386.65 9.55999 387.098 8.43999 387.994 7.54399C388.954 6.64799 390.106 6.19999 391.45 6.19999C392.73 6.19999 393.85 6.64799 394.81 7.54399C395.77 8.43999 396.25 9.55999 396.25 10.904V66.872C396.25 68.088 395.77 69.176 394.81 70.136C393.85 71.096 392.73 71.576 391.45 71.576C390.106 71.576 388.954 71.128 387.994 70.232C387.098 69.272 386.65 68.152 386.65 66.872V40.376L351.706 45.272V66.872C351.706 68.152 351.226 69.272 350.266 70.232C349.306 71.128 348.154 71.576 346.81 71.576Z"/>
  <path d="M450.861 71.672C448.557 71.672 447.053 70.584 446.349 68.408L439.437 48.44L419.853 52.76L413.613 68.504C413.229 69.4 412.653 70.136 411.885 70.712C411.181 71.288 410.285 71.576 409.197 71.576C407.917 71.576 406.797 71.128 405.837 70.232C404.877 69.336 404.397 68.28 404.397 67.064C404.397 66.232 404.621 65.272 405.069 64.184L408.909 54.584C408.525 54.456 408.237 54.328 408.045 54.2C406.381 53.368 405.549 51.96 405.549 49.976C405.549 48.824 405.869 47.832 406.509 47C407.213 46.168 408.109 45.624 409.197 45.368L412.749 44.6L426.957 8.50399C427.341 7.54399 427.949 6.80799 428.781 6.29599C429.613 5.78399 430.509 5.52798 431.469 5.52798C432.493 5.52798 433.389 5.78399 434.157 6.29599C434.925 6.80799 435.501 7.60799 435.885 8.69598L454.989 64.088C455.053 64.216 455.181 64.6 455.373 65.24C455.565 65.816 455.661 66.424 455.661 67.064C455.661 68.28 455.213 69.368 454.317 70.328C453.421 71.224 452.269 71.672 450.861 71.672ZM436.269 39.512L431.085 24.056L423.885 42.2L436.269 39.512Z"/>
  <path d="M468.31 71.48C467.094 71.544 466.006 71.096 465.046 70.136C464.086 69.176 463.606 68.088 463.606 66.872V10.904C463.606 9.62399 464.054 8.53599 464.95 7.63999C465.91 6.67999 467.062 6.19999 468.406 6.19999C469.686 6.19999 470.774 6.67999 471.67 7.63999C472.63 8.53599 473.11 9.62399 473.11 10.904V61.784L499.222 60.056C500.566 59.992 501.686 60.408 502.582 61.304C503.478 62.136 503.926 63.256 503.926 64.664C503.926 65.816 503.478 66.904 502.582 67.928C501.75 68.888 500.758 69.4 499.606 69.464L468.31 71.48Z"/>
  <path d="M517.529 71.48C516.313 71.544 515.225 71.096 514.265 70.136C513.305 69.176 512.825 68.088 512.825 66.872V10.904C512.825 9.62399 513.273 8.53599 514.169 7.63999C515.129 6.67999 516.281 6.19999 517.625 6.19999C518.905 6.19999 519.993 6.67999 520.889 7.63999C521.849 8.53599 522.329 9.62399 522.329 10.904V61.784L548.441 60.056C549.785 59.992 550.905 60.408 551.801 61.304C552.697 62.136 553.145 63.256 553.145 64.664C553.145 65.816 552.697 66.904 551.801 67.928C550.969 68.888 549.977 69.4 548.825 69.464L517.529 71.48Z"/>
  <path d="M566.844 71C565.5 71 564.348 70.552 563.388 69.656C562.492 68.696 562.044 67.544 562.044 66.2V11.48C562.044 10.136 562.492 9.01599 563.388 8.11999C564.348 7.15999 565.5 6.67999 566.844 6.67999H605.148C606.492 6.67999 607.612 7.15999 608.508 8.11999C609.404 9.01599 609.852 10.136 609.852 11.48C609.852 12.824 609.404 13.976 608.508 14.936C607.612 15.832 606.492 16.28 605.148 16.28H571.548V32.792H600.732C602.076 32.792 603.196 33.24 604.092 34.136C604.988 35.032 605.436 36.152 605.436 37.496C605.436 38.84 604.988 39.992 604.092 40.952C603.196 41.848 602.076 42.296 600.732 42.296H571.548V61.4H604.956C606.3 61.4 607.42 61.88 608.316 62.84C609.212 63.736 609.66 64.856 609.66 66.2C609.66 67.544 609.212 68.696 608.316 69.656C607.42 70.552 606.3 71 604.956 71H566.844Z"/>
  <path d="M623.654 71.576C622.438 71.576 621.35 71.096 620.39 70.136C619.43 69.176 618.95 68.088 618.95 66.872L619.046 10.904C619.046 9.62399 619.462 8.53599 620.294 7.63999C621.19 6.67999 622.31 6.19999 623.654 6.19999C624.422 6.19999 625.158 6.39199 625.862 6.77599C626.566 7.09599 627.142 7.57598 627.59 8.21598L657.638 51.704V10.904C657.638 9.62399 658.086 8.50399 658.982 7.54399C659.942 6.58398 661.094 6.10398 662.438 6.10398C663.718 6.10398 664.806 6.58398 665.702 7.54399C666.662 8.50399 667.142 9.62399 667.142 10.904V66.872C667.142 68.216 666.694 69.336 665.798 70.232C664.902 71.128 663.782 71.576 662.438 71.576C661.734 71.576 660.998 71.384 660.23 71C659.526 70.616 658.95 70.104 658.502 69.464L628.55 26.168L628.454 66.872C628.454 68.216 627.974 69.336 627.014 70.232C626.118 71.128 624.998 71.576 623.654 71.576Z"/>
  <path d="M707.399 71.672C701.639 71.672 696.519 70.168 692.039 67.16C687.623 64.152 684.199 60.216 681.767 55.352C679.399 50.424 678.215 45.208 678.215 39.704C678.215 34.264 679.495 28.952 682.055 23.768C684.615 18.52 688.199 14.264 692.807 11C697.479 7.67199 702.823 6.00798 708.839 6.00798C714.471 6.00798 719.207 7.22398 723.047 9.65598C726.951 12.024 729.863 14.744 731.783 17.816C733.703 20.888 734.663 23.32 734.663 25.112C734.663 26.456 734.247 27.544 733.415 28.376C732.583 29.144 731.463 29.528 730.055 29.528C727.751 29.528 726.215 28.504 725.447 26.456C724.295 23.384 722.375 20.824 719.687 18.776C716.999 16.664 713.383 15.608 708.839 15.608C704.103 15.608 700.135 17.016 696.935 19.832C693.799 22.584 691.495 25.848 690.023 29.624C688.551 33.4 687.815 36.76 687.815 39.704C687.815 43.16 688.551 46.616 690.023 50.072C691.495 53.528 693.703 56.408 696.647 58.712C699.655 60.952 703.239 62.072 707.399 62.072C711.495 62.072 715.079 61.048 718.151 59C721.223 56.888 723.495 53.944 724.967 50.168H723.527C721.351 50.296 718.951 50.68 716.327 51.32C715.239 51.64 714.375 51.8 713.735 51.8C712.455 51.8 711.335 51.384 710.375 50.552C709.479 49.656 709.031 48.472 709.031 47C709.031 44.824 710.183 43.256 712.487 42.296C713.575 41.848 715.335 41.464 717.767 41.144C720.263 40.824 722.791 40.664 725.351 40.664C728.999 40.664 732.551 41.208 736.007 42.296C738.055 42.936 739.079 44.44 739.079 46.808C739.079 47.896 738.759 48.856 738.119 49.688C737.479 50.456 736.679 51 735.719 51.32C735.207 51.448 734.823 51.512 734.567 51.512C732.775 57.464 729.479 62.328 724.679 66.104C719.943 69.816 714.183 71.672 707.399 71.672Z"/>
  <path d="M754.156 71C752.812 71 751.66 70.552 750.7 69.656C749.804 68.696 749.356 67.544 749.356 66.2V11.48C749.356 10.136 749.804 9.01599 750.7 8.11999C751.66 7.15999 752.812 6.67999 754.156 6.67999H792.46C793.804 6.67999 794.924 7.15999 795.82 8.11999C796.716 9.01599 797.164 10.136 797.164 11.48C797.164 12.824 796.716 13.976 795.82 14.936C794.924 15.832 793.804 16.28 792.46 16.28H758.86V32.792H788.044C789.388 32.792 790.508 33.24 791.404 34.136C792.3 35.032 792.748 36.152 792.748 37.496C792.748 38.84 792.3 39.992 791.404 40.952C790.508 41.848 789.388 42.296 788.044 42.296H758.86V61.4H792.268C793.612 61.4 794.732 61.88 795.628 62.84C796.524 63.736 796.972 64.856 796.972 66.2C796.972 67.544 796.524 68.696 795.628 69.656C794.732 70.552 793.612 71 792.268 71H754.156Z"/>
  </mask>
  <path d="M52.424 71.672C50.12 71.672 48.616 70.584 47.912 68.408L41 48.44L21.416 52.76L15.176 68.504C14.792 69.4 14.216 70.136 13.448 70.712C12.744 71.288 11.848 71.576 10.76 71.576C9.47996 71.576 8.35996 71.128 7.39996 70.232C6.43996 69.336 5.95996 68.28 5.95996 67.064C5.95996 66.232 6.18396 65.272 6.63196 64.184L10.472 54.584C10.088 54.456 9.79996 54.328 9.60796 54.2C7.94396 53.368 7.11196 51.96 7.11196 49.976C7.11196 48.824 7.43196 47.832 8.07196 47C8.77596 46.168 9.67196 45.624 10.76 45.368L14.312 44.6L28.52 8.50399C28.904 7.54399 29.512 6.80799 30.344 6.29599C31.176 5.78399 32.072 5.52798 33.032 5.52798C34.056 5.52798 34.952 5.78399 35.72 6.29599C36.488 6.80799 37.064 7.60799 37.448 8.69598L56.552 64.088C56.616 64.216 56.744 64.6 56.936 65.24C57.128 65.816 57.224 66.424 57.224 67.064C57.224 68.28 56.776 69.368 55.88 70.328C54.984 71.224 53.832 71.672 52.424 71.672ZM37.832 39.512L32.648 24.056L25.448 42.2L37.832 39.512Z" stroke="white" stroke-width="10" mask="url(#path-1-outside-1)"/>
  <path d="M89.1687 71.576C83.8567 71.576 79.2807 70.104 75.4407 67.16C71.6647 64.216 68.7207 60.088 66.6087 54.776C64.5607 49.464 63.4087 43.32 63.1527 36.344C63.0247 30.968 62.9607 27.32 62.9607 25.4L63.0567 18.008C63.1207 16.408 63.1527 13.976 63.1527 10.712C63.1527 9.68798 63.5367 8.69598 64.3047 7.73598C65.1367 6.71199 66.4167 6.19999 68.1447 6.19999C69.8087 6.19999 70.9927 6.71199 71.6967 7.73598C72.4007 8.69598 72.7527 9.71998 72.7527 10.808L72.6567 17.72C72.5927 19.064 72.5607 21.112 72.5607 23.864C72.5607 25.912 72.6247 29.624 72.7527 35C73.0087 43.128 74.3847 49.784 76.8807 54.968C79.4407 60.152 83.6007 62.744 89.3607 62.744C93.8407 62.744 97.6487 61.336 100.785 58.52C103.921 55.64 105.841 51.096 106.545 44.888C107.121 39.384 107.409 33.208 107.409 26.36L107.313 11C107.313 9.84799 107.665 8.75999 108.369 7.73598C109.073 6.71199 110.321 6.19999 112.113 6.19999C113.905 6.19999 115.121 6.71199 115.761 7.73598C116.465 8.69598 116.817 9.71998 116.817 10.808L116.913 13.496C117.105 20.024 117.201 24.472 117.201 26.84C117.201 33.432 116.817 39.704 116.049 45.656C114.961 53.784 112.241 60.152 107.889 64.76C103.537 69.304 97.2967 71.576 89.1687 71.576Z" stroke="white" stroke-width="10" mask="url(#path-1-outside-1)"/>
  <path d="M144.555 72.152C142.315 72.152 140.043 71.928 137.739 71.48C135.435 71.096 133.867 70.776 133.035 70.52C132.011 70.2 131.147 69.592 130.443 68.696C129.739 67.8 129.387 66.84 129.387 65.816V11.384C129.387 10.04 129.835 8.91999 130.731 8.02399C131.691 7.12799 132.843 6.67999 134.187 6.67999C140.651 6.67999 147.179 7.63999 153.771 9.55998C160.363 11.48 166.059 15.064 170.859 20.312C175.723 25.56 178.155 32.824 178.155 42.104C178.155 48.824 176.683 54.456 173.739 59C170.795 63.48 166.795 66.808 161.739 68.984C156.683 71.096 150.955 72.152 144.555 72.152ZM144.555 62.552C152.043 62.552 157.899 60.824 162.123 57.368C166.411 53.912 168.555 48.824 168.555 42.104C168.555 33.784 165.835 27.608 160.395 23.576C155.019 19.544 147.883 17.176 138.987 16.472V61.976C141.163 62.36 143.019 62.552 144.555 62.552Z" stroke="white" stroke-width="10" mask="url(#path-1-outside-1)"/>
  <path d="M187.434 71C186.09 71 184.938 70.552 183.978 69.656C183.082 68.696 182.634 67.544 182.634 66.2C182.634 64.856 183.082 63.736 183.978 62.84C184.938 61.88 186.09 61.4 187.434 61.4H194.154V16.28H187.434C186.09 16.28 184.938 15.8 183.978 14.84C183.082 13.88 182.634 12.728 182.634 11.384C182.634 10.04 183.082 8.91999 183.978 8.02399C184.938 7.12799 186.09 6.67999 187.434 6.67999H210.378C211.722 6.67999 212.842 7.12799 213.738 8.02399C214.634 8.91999 215.082 10.04 215.082 11.384C215.082 12.728 214.634 13.88 213.738 14.84C212.842 15.8 211.722 16.28 210.378 16.28H203.754V61.4H210.378C211.786 61.4 212.906 61.88 213.738 62.84C214.634 63.736 215.082 64.856 215.082 66.2C215.082 67.544 214.634 68.696 213.738 69.656C212.842 70.552 211.722 71 210.378 71H187.434Z" stroke="white" stroke-width="10" mask="url(#path-1-outside-1)"/>
  <path d="M244.735 71.576C239.999 71.576 235.743 70.264 231.967 67.64C228.191 64.952 225.215 61.304 223.039 56.696C220.927 52.088 219.871 46.936 219.871 41.24C219.871 34.776 221.183 28.856 223.807 23.48C226.431 18.104 229.919 13.88 234.271 10.808C238.687 7.67198 243.423 6.10398 248.479 6.10398C253.215 6.10398 257.471 7.41598 261.247 10.04C265.087 12.664 268.063 16.28 270.175 20.888C272.351 25.496 273.439 30.68 273.439 36.44C273.439 42.968 272.127 48.92 269.503 54.296C266.879 59.608 263.359 63.832 258.943 66.968C254.591 70.04 249.855 71.576 244.735 71.576ZM244.735 62.456C248.191 62.456 251.359 61.368 254.239 59.192C257.183 57.016 259.519 53.976 261.247 50.072C262.975 46.168 263.839 41.752 263.839 36.824C263.839 32.344 263.071 28.472 261.535 25.208C260.063 21.944 258.079 19.48 255.583 17.816C253.151 16.088 250.591 15.224 247.903 15.224C244.575 15.224 241.503 16.344 238.687 18.584C235.871 20.824 233.631 23.928 231.967 27.896C230.303 31.8 229.471 36.248 229.471 41.24C229.471 45.72 230.175 49.56 231.583 52.76C232.991 55.96 234.847 58.392 237.151 60.056C239.519 61.656 242.047 62.456 244.735 62.456Z" stroke="white" stroke-width="10" mask="url(#path-1-outside-1)"/>
  <path d="M309.122 71.576C304.002 71.576 299.298 70.424 295.01 68.12C290.722 65.816 287.33 62.488 284.834 58.136C282.338 53.72 281.09 48.568 281.09 42.68C281.09 36.472 282.53 30.552 285.41 24.92C288.354 19.224 292.13 14.68 296.738 11.288C301.41 7.83198 306.178 6.10398 311.042 6.10398C313.09 6.10398 315.106 6.42398 317.09 7.06399C319.138 7.70399 320.962 8.50399 322.562 9.46399C323.33 8.69598 324.29 8.31198 325.442 8.31198C326.722 8.31198 327.778 8.75998 328.61 9.65598C329.442 10.488 329.858 11.512 329.858 12.728V18.872C329.858 20.152 329.378 21.272 328.418 22.232C327.522 23.192 326.402 23.672 325.058 23.672C323.778 23.672 322.69 23.288 321.794 22.52C320.962 21.752 320.546 20.856 320.546 19.832V19.16C318.178 16.664 314.786 15.416 310.37 15.416C307.17 15.416 304.034 16.728 300.962 19.352C297.89 21.912 295.394 25.304 293.474 29.528C291.618 33.752 290.69 38.136 290.69 42.68C290.69 46.712 291.522 50.232 293.186 53.24C294.85 56.184 297.058 58.456 299.81 60.056C302.626 61.592 305.73 62.36 309.122 62.36C315.33 62.36 320.45 59.704 324.482 54.392C325.058 53.688 325.634 53.208 326.21 52.952C326.786 52.632 327.458 52.472 328.226 52.472C329.57 52.472 330.69 52.92 331.586 53.816C332.546 54.648 333.026 55.8 333.026 57.272C333.026 58.36 332.738 59.32 332.162 60.152C329.538 63.864 326.21 66.712 322.178 68.696C318.21 70.616 313.858 71.576 309.122 71.576Z" stroke="white" stroke-width="10" mask="url(#path-1-outside-1)"/>
  <path d="M346.81 71.576C345.466 71.576 344.346 71.128 343.45 70.232C342.554 69.272 342.106 68.152 342.106 66.872V10.904C342.106 9.55999 342.554 8.43999 343.45 7.54399C344.346 6.64799 345.466 6.19999 346.81 6.19999C348.154 6.19999 349.306 6.64799 350.266 7.54399C351.226 8.43999 351.706 9.55999 351.706 10.904V35.864L386.65 30.968V10.904C386.65 9.55999 387.098 8.43999 387.994 7.54399C388.954 6.64799 390.106 6.19999 391.45 6.19999C392.73 6.19999 393.85 6.64799 394.81 7.54399C395.77 8.43999 396.25 9.55999 396.25 10.904V66.872C396.25 68.088 395.77 69.176 394.81 70.136C393.85 71.096 392.73 71.576 391.45 71.576C390.106 71.576 388.954 71.128 387.994 70.232C387.098 69.272 386.65 68.152 386.65 66.872V40.376L351.706 45.272V66.872C351.706 68.152 351.226 69.272 350.266 70.232C349.306 71.128 348.154 71.576 346.81 71.576Z" stroke="white" stroke-width="10" mask="url(#path-1-outside-1)"/>
  <path d="M450.861 71.672C448.557 71.672 447.053 70.584 446.349 68.408L439.437 48.44L419.853 52.76L413.613 68.504C413.229 69.4 412.653 70.136 411.885 70.712C411.181 71.288 410.285 71.576 409.197 71.576C407.917 71.576 406.797 71.128 405.837 70.232C404.877 69.336 404.397 68.28 404.397 67.064C404.397 66.232 404.621 65.272 405.069 64.184L408.909 54.584C408.525 54.456 408.237 54.328 408.045 54.2C406.381 53.368 405.549 51.96 405.549 49.976C405.549 48.824 405.869 47.832 406.509 47C407.213 46.168 408.109 45.624 409.197 45.368L412.749 44.6L426.957 8.50399C427.341 7.54399 427.949 6.80799 428.781 6.29599C429.613 5.78399 430.509 5.52798 431.469 5.52798C432.493 5.52798 433.389 5.78399 434.157 6.29599C434.925 6.80799 435.501 7.60799 435.885 8.69598L454.989 64.088C455.053 64.216 455.181 64.6 455.373 65.24C455.565 65.816 455.661 66.424 455.661 67.064C455.661 68.28 455.213 69.368 454.317 70.328C453.421 71.224 452.269 71.672 450.861 71.672ZM436.269 39.512L431.085 24.056L423.885 42.2L436.269 39.512Z" stroke="white" stroke-width="10" mask="url(#path-1-outside-1)"/>
  <path d="M468.31 71.48C467.094 71.544 466.006 71.096 465.046 70.136C464.086 69.176 463.606 68.088 463.606 66.872V10.904C463.606 9.62399 464.054 8.53599 464.95 7.63999C465.91 6.67999 467.062 6.19999 468.406 6.19999C469.686 6.19999 470.774 6.67999 471.67 7.63999C472.63 8.53599 473.11 9.62399 473.11 10.904V61.784L499.222 60.056C500.566 59.992 501.686 60.408 502.582 61.304C503.478 62.136 503.926 63.256 503.926 64.664C503.926 65.816 503.478 66.904 502.582 67.928C501.75 68.888 500.758 69.4 499.606 69.464L468.31 71.48Z" stroke="white" stroke-width="10" mask="url(#path-1-outside-1)"/>
  <path d="M517.529 71.48C516.313 71.544 515.225 71.096 514.265 70.136C513.305 69.176 512.825 68.088 512.825 66.872V10.904C512.825 9.62399 513.273 8.53599 514.169 7.63999C515.129 6.67999 516.281 6.19999 517.625 6.19999C518.905 6.19999 519.993 6.67999 520.889 7.63999C521.849 8.53599 522.329 9.62399 522.329 10.904V61.784L548.441 60.056C549.785 59.992 550.905 60.408 551.801 61.304C552.697 62.136 553.145 63.256 553.145 64.664C553.145 65.816 552.697 66.904 551.801 67.928C550.969 68.888 549.977 69.4 548.825 69.464L517.529 71.48Z" stroke="white" stroke-width="10" mask="url(#path-1-outside-1)"/>
  <path d="M566.844 71C565.5 71 564.348 70.552 563.388 69.656C562.492 68.696 562.044 67.544 562.044 66.2V11.48C562.044 10.136 562.492 9.01599 563.388 8.11999C564.348 7.15999 565.5 6.67999 566.844 6.67999H605.148C606.492 6.67999 607.612 7.15999 608.508 8.11999C609.404 9.01599 609.852 10.136 609.852 11.48C609.852 12.824 609.404 13.976 608.508 14.936C607.612 15.832 606.492 16.28 605.148 16.28H571.548V32.792H600.732C602.076 32.792 603.196 33.24 604.092 34.136C604.988 35.032 605.436 36.152 605.436 37.496C605.436 38.84 604.988 39.992 604.092 40.952C603.196 41.848 602.076 42.296 600.732 42.296H571.548V61.4H604.956C606.3 61.4 607.42 61.88 608.316 62.84C609.212 63.736 609.66 64.856 609.66 66.2C609.66 67.544 609.212 68.696 608.316 69.656C607.42 70.552 606.3 71 604.956 71H566.844Z" stroke="white" stroke-width="10" mask="url(#path-1-outside-1)"/>
  <path d="M623.654 71.576C622.438 71.576 621.35 71.096 620.39 70.136C619.43 69.176 618.95 68.088 618.95 66.872L619.046 10.904C619.046 9.62399 619.462 8.53599 620.294 7.63999C621.19 6.67999 622.31 6.19999 623.654 6.19999C624.422 6.19999 625.158 6.39199 625.862 6.77599C626.566 7.09599 627.142 7.57598 627.59 8.21598L657.638 51.704V10.904C657.638 9.62399 658.086 8.50399 658.982 7.54399C659.942 6.58398 661.094 6.10398 662.438 6.10398C663.718 6.10398 664.806 6.58398 665.702 7.54399C666.662 8.50399 667.142 9.62399 667.142 10.904V66.872C667.142 68.216 666.694 69.336 665.798 70.232C664.902 71.128 663.782 71.576 662.438 71.576C661.734 71.576 660.998 71.384 660.23 71C659.526 70.616 658.95 70.104 658.502 69.464L628.55 26.168L628.454 66.872C628.454 68.216 627.974 69.336 627.014 70.232C626.118 71.128 624.998 71.576 623.654 71.576Z" stroke="white" stroke-width="10" mask="url(#path-1-outside-1)"/>
  <path d="M707.399 71.672C701.639 71.672 696.519 70.168 692.039 67.16C687.623 64.152 684.199 60.216 681.767 55.352C679.399 50.424 678.215 45.208 678.215 39.704C678.215 34.264 679.495 28.952 682.055 23.768C684.615 18.52 688.199 14.264 692.807 11C697.479 7.67199 702.823 6.00798 708.839 6.00798C714.471 6.00798 719.207 7.22398 723.047 9.65598C726.951 12.024 729.863 14.744 731.783 17.816C733.703 20.888 734.663 23.32 734.663 25.112C734.663 26.456 734.247 27.544 733.415 28.376C732.583 29.144 731.463 29.528 730.055 29.528C727.751 29.528 726.215 28.504 725.447 26.456C724.295 23.384 722.375 20.824 719.687 18.776C716.999 16.664 713.383 15.608 708.839 15.608C704.103 15.608 700.135 17.016 696.935 19.832C693.799 22.584 691.495 25.848 690.023 29.624C688.551 33.4 687.815 36.76 687.815 39.704C687.815 43.16 688.551 46.616 690.023 50.072C691.495 53.528 693.703 56.408 696.647 58.712C699.655 60.952 703.239 62.072 707.399 62.072C711.495 62.072 715.079 61.048 718.151 59C721.223 56.888 723.495 53.944 724.967 50.168H723.527C721.351 50.296 718.951 50.68 716.327 51.32C715.239 51.64 714.375 51.8 713.735 51.8C712.455 51.8 711.335 51.384 710.375 50.552C709.479 49.656 709.031 48.472 709.031 47C709.031 44.824 710.183 43.256 712.487 42.296C713.575 41.848 715.335 41.464 717.767 41.144C720.263 40.824 722.791 40.664 725.351 40.664C728.999 40.664 732.551 41.208 736.007 42.296C738.055 42.936 739.079 44.44 739.079 46.808C739.079 47.896 738.759 48.856 738.119 49.688C737.479 50.456 736.679 51 735.719 51.32C735.207 51.448 734.823 51.512 734.567 51.512C732.775 57.464 729.479 62.328 724.679 66.104C719.943 69.816 714.183 71.672 707.399 71.672Z" stroke="white" stroke-width="10" mask="url(#path-1-outside-1)"/>
  <path d="M754.156 71C752.812 71 751.66 70.552 750.7 69.656C749.804 68.696 749.356 67.544 749.356 66.2V11.48C749.356 10.136 749.804 9.01599 750.7 8.11999C751.66 7.15999 752.812 6.67999 754.156 6.67999H792.46C793.804 6.67999 794.924 7.15999 795.82 8.11999C796.716 9.01599 797.164 10.136 797.164 11.48C797.164 12.824 796.716 13.976 795.82 14.936C794.924 15.832 793.804 16.28 792.46 16.28H758.86V32.792H788.044C789.388 32.792 790.508 33.24 791.404 34.136C792.3 35.032 792.748 36.152 792.748 37.496C792.748 38.84 792.3 39.992 791.404 40.952C790.508 41.848 789.388 42.296 788.044 42.296H758.86V61.4H792.268C793.612 61.4 794.732 61.88 795.628 62.84C796.524 63.736 796.972 64.856 796.972 66.2C796.972 67.544 796.524 68.696 795.628 69.656C794.732 70.552 793.612 71 792.268 71H754.156Z" stroke="white" stroke-width="10" mask="url(#path-1-outside-1)"/>
  </svg>
  `;

  const subtitle = document.createElement('p');
  subtitle.classList.add('audiochallenge-subtitle');
  subtitle.textContent = 'Welcome to audiochallenge game';

  const form = document.createElement('form');
  form.classList.add('select-level__form');

  const choose = document.createElement('p');
  choose.classList.add('choose-level');
  choose.textContent = 'You can choose level';

  const selectLevel = document.createElement('select');
  selectLevel.classList.add('select-level');

  for (let i = 1; i < 7; i += 1) {
    const option = document.createElement('option');
    option.setAttribute('data-level', i - 1);
    option.textContent = i;
    selectLevel.append(option);
  }

  const chooseUserWord = document.createElement('p');
  chooseUserWord.textContent = 'or your ';
  chooseUserWord.classList.add('choose-user-word');

  const selectUserWord = document.createElement('span');
  selectUserWord.classList.add('select-user-word');
  selectUserWord.textContent = 'learning words';

  chooseUserWord.append(selectUserWord);

  form.append(choose, selectLevel, chooseUserWord);

  const button = document.createElement('button');
  button.classList.add('audiochallenge__start-button');
  button.textContent = 'Start';

  wrapper.append(title, subtitle, form, button);

  document.querySelector('.main-container').append(wrapper);

  button.addEventListener('click', () => {
    wrapper.innerHTML = '';
    startAudiochallengeGame();
  });
}
