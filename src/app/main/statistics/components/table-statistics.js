/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
export default class TableStatistics {
  render(arrayWords, arrayRow) {
    this.table = document.createElement('table');
    this.table.classList.add('table_sort');
    this.table.append(TableStatistics.getTHead(arrayRow));
    this.table.append(TableStatistics.getTbody(arrayWords, arrayRow));

    this.table.addEventListener('click', (event) => TableStatistics.handlerClick(event));
    return this.table;
  }

  static handlerClick(event) {
    if (TableStatistics.isClickOnTheadTable(event)) {
      TableStatistics.getSortTable(event);
    }
  }

  static isClickOnTheadTable(event) {
    return event.target.tagName === 'TH';
  }

  static getSortTable(event) {
    // const order = event.target;
    // eslint-disable-next-line no-param-reassign
    const order = event.target.dataset.order = -(event.target.dataset.order || -1);
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
    if (arrayWords.length === 0) {
      const infoText = document.createElement('span');
      infoText.classList.add('infoText');
      infoText.innerHTML = 'No data';
      tBody.append(infoText);
    }
    arrayWords.forEach((word) => {
      tBody.append(TableStatistics.getRowWord(word, arrayRow));
    });
    return tBody;
  }

  static getRowWord(word, arrayRow) {
    const row = document.createElement('tr');
    arrayRow.forEach((element) => {
      const headCell = document.createElement('td');
      if (element === 'date') {
        headCell.innerHTML = new Date(word.optional[element]).toLocaleDateString();
      } else if (element === 'correct answer') {
        headCell.innerHTML = word.optional.rightWord;
      } else if (element === '% errors') {
        headCell.innerHTML = Math.floor((word.optional.rightWord
          / (word.optional.rightWord + word.optional.wrongWord)) * 100);
      } else {
        headCell.innerHTML = word.optional[element];
      }
      row.append(headCell);
    });
    return row;
  }
}
