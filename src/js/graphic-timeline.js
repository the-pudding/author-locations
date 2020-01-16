import loadData from './load-data';
import './pudding-chart/timeline';

const $section = d3.select('[data-js="timeline"]');
const $figures = $section.selectAll('[data-js="timeline__figure"]');
// const $article = $section.select('[data-js="distance__article"]');
// const $step = $article.selectAll('[data-js="article__step"]');

let allData = null;

function cleanBooks(data) {
  const clean = data.map(d => ({
    ...d,
    pub_year: +d.pub_year,
  }));

  const nested = d3
    .nest()
    .key(d => d.slug)
    .entries(clean);

  return nested;
}

function cleanAuthors(data) {
  const clean = data.map(d => ({
    ...d,
    start_year: +d.start_year,
    end_year: +d.end_year,
  }));

  const nested = d3
    .nest()
    .key(d => d.slug)
    .entries(clean);

  return nested;
}

function setupTimelines() {
  const $sel = d3.select(this);
  const slug = $sel.attr('data-author');

  console.log({ slug, allData });

  const filteredAuthors = allData.authors.filter(d => d.key === slug);
  const filteredBooks = allData.books.filter(d => d.key === slug);

  const allFiltered = { filteredAuthors, filteredBooks };

  $sel.data([allFiltered]).puddingChartTimeline();
}

function setup(data) {
  const authors = cleanAuthors(data[0]);
  const books = cleanBooks(data[1]);

  allData = { authors, books };

  $figures.each(setupTimelines);
}

function resize() {}
function init() {
  loadData(['authors.json', 'books.json']).then(setup);
}

export default { init, resize };
