/* global d3 */
import loadData from './load-data';
import './pudding-chart/arc-histogram';

const $section = d3.select('[data-js="distance"');
const $figure = $section.select('[data-js="distance__figure"');

const BIN_SIZE = 10;

let chart = null;

function resize() {}

function cleanData(data) {
  const clean = data.map(d => ({
    ...d,
    distance: +d.distance,
    bin: Math.floor(+d.distance / BIN_SIZE),
  }));

  const nested = d3
    .nest()
    .key(d => d.book_title)
    .rollup(values => {
      const setting = values.map(d => d.setting);
      const residence = values.map(d => d.residence);
      const { book_title, author_name, distance, bin } = values[0];
      return {
        book_title,
        author_name,
        distance,
        setting,
        residence,
        bin,
      };
    })
    .entries(clean)
    .map(d => d.value);

  nested.sort((a, b) => d3.ascending(a.distance, b.distance));
  return nested;
}

function setup(data) {
  const clean = cleanData(data);
  const maxBin = d3.max(
    d3
      .nest()
      .key(d => d.bin)
      .entries(clean),
    d => d.values.length
  );
  chart = $figure
    .datum(clean)
    .puddingChartArcHistogram({ binSize: BIN_SIZE, maxBin });
  chart.resize();
  setTimeout(() => {
    chart.filter(d => ['White Teeth'].includes(d.book_title)).render();
  }, 1000);
  setTimeout(() => {
    chart.filter(d => ['White Teeth', '2666'].includes(d.book_title)).render();
  }, 5000);
  setTimeout(() => {
    chart.filter(d => true).render();
  }, 10000);
}

function init() {
  loadData('top-100.csv').then(setup);
}

export default { init, resize };
