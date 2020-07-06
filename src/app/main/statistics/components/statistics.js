/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
export default class Statistics {
  constructor(arrayCategory) {
    this.arrayCategory = arrayCategory;
  }

  render(arrayWords, arrayRow) {
    this.statistics = document.createElement('div');
    this.statistics.classList.add('table_statistics');
    this.statistics.append(this.getControls());
    this.statistics.append(this.getTable(arrayWords, arrayRow));

    this.statistics.addEventListener('click', (event) => Statistics.handlerClick(event));

    return this.statistics;
  }

  static handlerClick(event) {
    if (Statistics.isClickOnTheadTable(event)) {
      Statistics.getSortTable(event);
    }
  }

  static isClickOnTheadTable(event) {
    return event.target.tagName === 'TH';
  }

  static getSortTable(event) {
    console.log('sort', event);
    // eslint-disable-next-line no-param-reassign
    const order = (event.target.dataset.order = -(event.target.dataset.order || -1));
    const index = [...event.target.parentNode.cells].indexOf(event.target);
    const collator = new Intl.Collator(['en', 'ru'], {
      numeric: true,
    });
    const comparator = (index, order) => (a, b) => order * collator.compare(
      b.children[index].innerHTML,
      a.children[index].innerHTML,
    );

    // eslint-disable-next-line no-restricted-syntax
    for (const tBody of event.target.closest('table').tBodies) {
      tBody.append(...[...tBody.rows].sort(comparator(index, order)));
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const cell of event.target.parentNode.cells) {
      cell.classList.toggle('sorted', cell === event.target);
    }
  }

  getControls() {
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controls');

    // const buttonRestart = document.createElement('button');
    // buttonRestart.classList.add('controls__repeat-button');
    // buttonRestart.innerHTML = 'Restart';
    // controlsContainer.append(buttonRestart);

    // const buttonVoice = document.createElement('button');
    // buttonVoice.classList.add('controls__reset-button');
    // buttonVoice.classList.add('user-speach');
    // buttonVoice.innerHTML = 'Speak please';
    // controlsContainer.append(buttonVoice);

    const categories = document.createElement('fieldset');
    categories.classList.add('fieldset');
    categories.id = 'categories';
    categories.innerHTML = '<legend>Categories</legend>';
    this.arrayCategory.forEach((element) => {
      if (element === 'main') {
        categories.append(Statistics.getCategory(element, true));
        console.log('ggg');
      } else {
        categories.append(Statistics.getCategory(element, false));
      }
    });
    controlsContainer.append(categories);

    return controlsContainer;
  }

  static getCategory(nameCategory, checkedCategory) {
    const category = document.createElement('span');
    category.classList.add('fieldset__filter-wrapper');
    const inputCategory = document.createElement('input');
    inputCategory.type = 'radio';
    inputCategory.value = nameCategory;
    inputCategory.name = 'category';
    inputCategory.id = nameCategory;
    inputCategory.checked = checkedCategory;
    inputCategory.innerHTML = nameCategory;
    category.append(inputCategory);

    const labelCategory = document.createElement('label');
    labelCategory.classList.add('fieldset__text');
    labelCategory.for = nameCategory;
    labelCategory.innerHTML = nameCategory;
    category.append(labelCategory);
    return category;
  }

  getTable(arrayWords, arrayRow) {
    this.table = document.createElement('table');
    this.table.classList.add('table_sort');
    this.table.append(Statistics.getTHead(arrayRow));
    this.table.append(Statistics.getTbody(arrayWords, arrayRow));

    return this.table;
  }

  static getTHead(arrayRow) {
    const head = document.createElement('thead');
    const row = document.createElement('tr');
    arrayRow.forEach((element) => {
      const headCell = document.createElement('th');
      headCell.innerHTML = element;
      row.append(headCell);
    });
    head.append(row);

    return head;
  }

  static getTbody(arrayWords, arrayRow) {
    const tBody = document.createElement('tbody');
    arrayWords.forEach((word) => {
      tBody.append(Statistics.getRowWord(word, arrayRow));
    });
    return tBody;
  }

  static getRowWord(word, arrayRow) {
    const row = document.createElement('tr');
    arrayRow.forEach((element) => {
      const headCell = document.createElement('td');
      headCell.innerHTML = word[element];
      row.append(headCell);
    });
    return row;
  }
}
