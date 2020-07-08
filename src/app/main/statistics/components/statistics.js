/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
export default class Statistics {
  constructor(arrayCategory) {
    this.arrayCategory = arrayCategory;
  }

  render(arrayWords, arrayRow, statisticsChart) {
    this.statistics = document.createElement('div');
    this.statistics.classList.add('table_statistics');
    this.statistics.append(this.getTabsContainer(arrayWords, arrayRow, statisticsChart));

    this.statistics.addEventListener('click', (event) => Statistics.handlerClick(event));

    return this.statistics;
  }

  static handlerClick(event) {
    if (Statistics.isClickOnTheadTable(event)) {
      Statistics.getSortTable(event);
    }

    if (Statistics.isClickOnTabs(event)) {
      Statistics.clickOnTabs(event);
    }
  }

  static isClickOnTabs(event) {
    return event.target.parentNode.classList.contains('tabs') || event.target.parentNode.parentNode.classList.contains('tabs');
  }

  static clickOnTabs(event) {
    document.querySelector('.tabs li.active').classList.remove('active');
    document.querySelector('.tabs-panel.active').classList.remove('active');
    const parentListItem = event.target.parentElement;
    event.target.parentElement.classList.add('active');
    const index = [...parentListItem.parentElement.children].indexOf(parentListItem);
    document.querySelectorAll('.tabs-panel')[index].classList.add('active');
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

  getTabsContainer(arrayWords, arrayRow, statisticsChart) {
    const tabsContainer = document.createElement('div');
    tabsContainer.classList.add('tabs-container');

    tabsContainer.append(this.getTabsName());
    tabsContainer.append(this.getTabsContent(arrayWords, arrayRow, statisticsChart));
    return tabsContainer;
  }

  getTabsName() {
    this.tabs = document.createElement('ul');
    this.tabs.classList.add('tabs');
    this.arrayCategory.forEach((element, index) => {
      const item = document.createElement('li');
      if (index === 0) {
        item.classList.add('active');
      }
      const page = document.createElement('span');
      page.innerHTML = element;
      item.append(page);
      this.tabs.append(item);
    });
    return this.tabs;
  }

  getTabsContent(arrayWords, arrayRow, statisticsChart) {
    const tabsContent = document.createElement('div');
    tabsContent.classList.add('tabs-content');
    this.arrayCategory.forEach((element, index) => {
      const tabsPanel = document.createElement('div');
      tabsPanel.classList.add('tabs-panel');
      if (index === 0) {
        tabsPanel.classList.add('active');
        tabsPanel.append(this.getTable(arrayWords, arrayRow));
      }
      if (index === 1) {
        tabsPanel.append(Statistics.getChart(statisticsChart));
      }
      tabsPanel.dataset.index = index;
      tabsContent.append(tabsPanel);
    });
    this.getTable(arrayWords, arrayRow);
    return tabsContent;
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

  static getChart(statisticsChart) {
    const chart = document.createElement('canvas');
    chart.width = 600;
    chart.height = 500;
    chart.id = 'main-chart';
    const ctx = chart.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(30, 10);
    ctx.lineTo(30, chart.height - 40);
    ctx.lineTo(chart.width - 10, chart.height - 40);
    ctx.stroke();
    const countWords = statisticsChart.reduce((sum, cur) => sum + cur.wordsLearned, 0);
    ctx.fillText('words', 1, 10);
    const row = 6;
    for (let i = 0; i < row; i += 1) {
      ctx.fillText(`${(row - 1 - i) * (countWords / 5)}`, 4, i * 80 + 60);
      ctx.beginPath();
      ctx.moveTo(25, i * 80 + 60);
      ctx.lineTo(30, i * 80 + 60);
      ctx.stroke();
    }

    ctx.fillText('days', chart.width - 25, chart.height - 45);
    for (let i = 0; i < statisticsChart.length; i += 1) {
      ctx.fillText(statisticsChart[i].date, 50 + i * ((chart.width - 50) / statisticsChart.length),
        chart.height - 25);
      ctx.beginPath();
      ctx.moveTo(50 + i * ((chart.width - 25) / statisticsChart.length), chart.height - 45);
      ctx.lineTo(50 + i * ((chart.width - 25) / statisticsChart.length), chart.height - 40);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = '#1ab429';
    ctx.fillStyle = '#1ab429';
    ctx.moveTo(30, chart.height - 40);
    let count = 0;
    for (let i = 0; i < statisticsChart.length; i += 1) {
      const dp = statisticsChart[i].wordsLearned;
      count += dp;
      ctx.lineTo(50 + i * ((chart.width - 25) / statisticsChart.length),
        (chart.height - 40) - (chart.height - 100) * (count / countWords));
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(50 + i * ((chart.width - 25) / statisticsChart.length),
        (chart.height - 40) - (chart.height - 100) * (count / countWords),
        2, 0, 2 * Math.PI, true);
      ctx.fill();
    }
    chart.addEventListener('mousemove', (event) => Statistics.getInfoPointChart(event));
    return chart;
  }

  static getInfoPointChart(event) {
    const chart = document.querySelector('#main-chart');
    const ctx = chart.getContext('2d');
    const x = event.clientX;
    const y = event.clientY;
    ctx.rect(20, 20, 150, 100);
    console.log(ctx.isPointInPath(x, y));
    // ctx.fillText('info', x, y);
  }
}
