export default class Chart {
  constructor() {
    this.isHover = false;
  }

  render(statisticsChart) {
    const countWords = statisticsChart.reduce((sum, cur) => sum + cur.wordsLearned, 0);
    this.chart = document.createElement('canvas');
    if (document.documentElement.clientWidth > 900) {
      this.chart.width = 600;
      this.chart.height = 500;
    }
    if (document.documentElement.clientWidth < 900) {
      this.chart.width = 400;
      this.chart.height = 350;
    }
    if (document.documentElement.clientWidth < 600) {
      this.chart.width = 300;
      this.chart.height = 250;
    }
    if (document.documentElement.clientWidth < 450) {
      this.chart.width = 210;
      this.chart.height = 200;
    }
    this.chart.id = 'main-chart';
    const ctx = this.chart.getContext('2d');
    this.getAxis(ctx, statisticsChart, countWords);
    this.getChart(ctx, statisticsChart, countWords);
    this.chart.addEventListener('mousemove', (event) => this.handlerClick(event));
    this.chart.addEventListener('touchmove', (event) => this.handlerClick(event));
    return this.chart;
  }

  handlerClick(event) {
    this.getInfoPointChart(event);
  }

  getInfoPointChart(event) {
    const chart = document.querySelector('#main-chart');
    const ctx = chart.getContext('2d');
    const x = event.offsetX;
    const y = event.offsetY;
    this.updateChart.forEach((element) => {
      ctx.rect(element.x - 4, element.y - 4, 6, 6);
    });
    if (ctx.isPointInPath(x, y)) {
      this.updateChart.forEach((element) => {
        if (!this.isHover && Math.abs(element.x - x) < 6 && Math.abs(element.y - y) < 6) {
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText(`${element.date} learned ${element.wordsLearned} words`, chart.width / 5, chart.height / 15);
          this.isHover = true;
        }
      });
    } else {
      this.isHover = false;
      ctx.clearRect(chart.width / 5, (chart.height / 15 - 10),
        chart.width, chart.height / 15);
    }
  }

  getAxis(context, statisticsChart, countWords) {
    context.font = '12px sans-serif';
    context.fillStyle = 'black';
    context.lineWidth = 2.0;
    context.beginPath();
    context.moveTo(30, 10);
    context.lineTo(30, this.chart.height - 40);
    context.lineTo(this.chart.width - 10, this.chart.height - 40);
    context.stroke();
    context.fillText('words', 1, 10);
    const row = 5;
    for (let i = 0; i < row; i += 1) {
      context.fillText(`${Math.floor((row - i) * (countWords / row))}`, 4, i * (this.chart.height / (row + 1)) + this.chart.height / 10);
      context.beginPath();
      context.moveTo(25, i * (this.chart.height / (row + 1)) + this.chart.height / 10);
      context.lineTo(30, i * (this.chart.height / (row + 1)) + this.chart.height / 10);
      context.stroke();
    }
    context.fillText('days', this.chart.width - 35, this.chart.height - 45);
    for (let i = 0; i < statisticsChart.length; i += 1) {
      context.fillText(`${i + 1}`, 50 + i * ((this.chart.width - this.chart.width / 20) / statisticsChart.length),
        this.chart.height - this.chart.height / 20);
      context.beginPath();
      context.moveTo(50 + i * ((this.chart.width - this.chart.width / 20) / statisticsChart.length),
        this.chart.height - 45);
      context.lineTo(50 + i * ((this.chart.width - this.chart.width / 20) / statisticsChart.length),
        this.chart.height - 40);
      context.stroke();
    }
  }

  getChart(context, statisticsChart, countWords) {
    context.beginPath();
    context.strokeStyle = '#1ab429';
    context.fillStyle = '#1ab429';
    context.moveTo(30, this.chart.height - 40);
    let count = 0;
    this.updateChart = [];
    for (let i = 0; i < statisticsChart.length; i += 1) {
      const dp = statisticsChart[i].wordsLearned;
      count += dp;
      context.lineTo(50 + i * ((this.chart.width - 25) / statisticsChart.length),
        (this.chart.height - 40) - (this.chart.height - 100) * (count / countWords));
      context.stroke();
      context.beginPath();
      context.arc(50 + i * ((this.chart.width - 25) / statisticsChart.length),
        (this.chart.height - 40) - (this.chart.height - 100) * (count / countWords),
        2, 0, 2 * Math.PI, true);
      this.updateChart.push({
        wordsLearned: statisticsChart[i].wordsLearned,
        date: new Date(statisticsChart[i].date).toLocaleDateString(),
        y: (this.chart.height - 40) - (this.chart.height - 100) * (count / countWords),
        x: 50 + i * ((this.chart.width - 25) / statisticsChart.length),
      });
      context.fill();
    }
  }
}
