export default class Chart {
  constructor() {
    this.isHover = false;
  }

  render(statisticsChart) {
    this.chart = document.createElement('canvas');
    this.chart.width = 600;
    this.chart.height = 500;
    this.chart.id = 'main-chart';
    const ctx = this.chart.getContext('2d');
    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'black';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(30, 10);
    ctx.lineTo(30, this.chart.height - 40);
    ctx.lineTo(this.chart.width - 10, this.chart.height - 40);
    ctx.stroke();
    const countWords = statisticsChart.reduce((sum, cur) => sum + cur.wordsLearned, 0);
    ctx.fillText('words', 1, 10);
    const row = 6;
    for (let i = 0; i < row; i += 1) {
      ctx.fillText(`${(row - 1 - i) * (countWords / 5)}`, 4, i * (this.chart.height / 5) + 60);
      ctx.beginPath();
      ctx.moveTo(25, i * (this.chart.height / 5) + 60);
      ctx.lineTo(30, i * (this.chart.height / 5) + 60);
      ctx.stroke();
    }
    ctx.fillText('days', this.chart.width - 25, this.chart.height - 45);
    for (let i = 0; i < statisticsChart.length; i += 1) {
      ctx.fillText(`${i + 1} days`, 50 + i * ((this.chart.width - 50) / statisticsChart.length),
        this.chart.height - 25);
      ctx.beginPath();
      ctx.moveTo(50 + i * ((this.chart.width - 25) / statisticsChart.length),
        this.chart.height - 45);
      ctx.lineTo(50 + i * ((this.chart.width - 25) / statisticsChart.length),
        this.chart.height - 40);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = '#1ab429';
    ctx.fillStyle = '#1ab429';
    ctx.moveTo(30, this.chart.height - 40);
    let count = 0;
    this.updateChart = [];
    for (let i = 0; i < statisticsChart.length; i += 1) {
      const dp = statisticsChart[i].wordsLearned;
      count += dp;
      ctx.lineTo(50 + i * ((this.chart.width - 25) / statisticsChart.length),
        (this.chart.height - 40) - (this.chart.height - 100) * (count / countWords));
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(50 + i * ((this.chart.width - 25) / statisticsChart.length),
        (this.chart.height - 40) - (this.chart.height - 100) * (count / countWords),
        2, 0, 2 * Math.PI, true);
      this.updateChart.push({
        wordsLearned: statisticsChart[i].wordsLearned,
        date: new Date(statisticsChart[i].date).toLocaleDateString(),
        y: (this.chart.height - 40) - (this.chart.height - 100) * (count / countWords),
        x: 50 + i * ((this.chart.width - 25) / statisticsChart.length),
      });
      ctx.fill();
    }
    this.chart.addEventListener('mousemove', (event) => this.handlerClick(event));
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
          ctx.fillText(`Изучено ${element.wordsLearned} слов за ${element.date}`, 50, 30);
          this.isHover = true;
        }
      });
    } else {
      this.isHover = false;
      ctx.clearRect(50, 20, 200, 50);
    }
  }
}
