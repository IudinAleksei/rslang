// const backgrounds = [{
//   0: 'linear-gradient(to right top, #f5fb71, #6ff7a0, #00e4e4, #00c5ff, #719bfb)',
// },
// {
//   1: 'linear-gradient(to right bottom, #fbb971, #ffbb95, #ffc2b5, #f1cdcd, #ded9da);',
// },
// {
//   2: 'linear-gradient(to right top, #c9d1a3, #bfd8b0, #b6ddbe, #b1e1cd, #b0e5dc)',
// }];

const changeBackground = () => {
  document.querySelector('.audiochallenge__body').classList.add('animated');
  document.querySelector('.audiochallenge__body').style.backgroundImage = 'linear-gradient(to right top, #c9d1a3, #bfd8b0, #b6ddbe, #b1e1cd, #b0e5dc)';
};
export default changeBackground;
