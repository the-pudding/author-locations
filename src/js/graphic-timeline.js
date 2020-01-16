import loadData from './load-data';
import './pudding-chart/timeline';

const $section = d3.select('[data-js="timeline"]');
const $figure = $section.selectAll('[data-js="timeline__figure"]');
// const $article = $section.select('[data-js="distance__article"]');
// const $step = $article.selectAll('[data-js="article__step"]');

function setup(data) {
  console.log({ data });
}

function resize() {}
function init() {
  loadData(['authors.json', 'books.json']).then(setup);
}

export default { init, resize };
