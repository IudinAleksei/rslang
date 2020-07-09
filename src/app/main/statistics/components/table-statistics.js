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
    const order = event.target;
    // const order = event.target.dataset.order = -(event.target.dataset.order || -1);
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
    arrayWords.forEach((word) => {
      tBody.append(TableStatistics.getRowWord(word, arrayRow));
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
