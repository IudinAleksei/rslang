export default function getLevel() {
  let levelValue = 0;

  const selectLevel = document.querySelector('.select-level');
  selectLevel.onchange = function getLevelValue() {
    levelValue = selectLevel.value;
  };
  return levelValue;
}
