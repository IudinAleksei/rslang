import Chart from './chart';
import TableStatistics from './table-statistics';

export default class Statistics {
  constructor(arrayCategory) {
    this.arrayCategory = arrayCategory;
    this.chart = new Chart();
    this.tableStatistics = new TableStatistics();
  }

  render(arrayWords, arrayRow, statisticsChart) {
    this.statistics = document.createElement('div');
    this.statistics.classList.add('table_statistics');
    this.statistics.append(this.getTabsContainer(arrayWords, arrayRow, statisticsChart));

    this.statistics.addEventListener('click', (event) => Statistics.handlerClick(event));

    return this.statistics;
  }

  static handlerClick(event) {
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
        tabsPanel.append(this.tableStatistics.render(arrayWords, arrayRow));
      }
      if (index === 1) {
        tabsPanel.append(this.chart.render(statisticsChart));
      }
      tabsPanel.dataset.index = index;
      tabsContent.append(tabsPanel);
    });
    return tabsContent;
  }
}
