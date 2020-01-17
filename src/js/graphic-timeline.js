import loadData from './load-data';
import './pudding-chart/timeline';

const $section = d3.select('[data-js="timeline"]');
const $figures = $section.selectAll('[data-js="timeline__figure"]');
// const $article = $section.select('[data-js="distance__article"]');
// const $step = $article.selectAll('[data-js="article__step"]');

let allData = null;
let authorLocs = null;

function cleanBooks(data) {
  const clean = data.map(d => ({
    ...d,
    pub_year: +d.pub_year,
    match: authorLocs.filter(e => e.location === d.location),
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

  // create useful information for connecting lines later
  authorLocs = clean.map(d => {
    const mid = d3.mean([d.start_year, d.end_year]);
    return { location: d.location, mid };
  });

  const nested = d3
    .nest()
    .key(d => d.slug)
    .entries(clean);

  return nested;
}

function setupTimelines() {
  const $sel = d3.select(this);
  const slug = $sel.attr('data-author');

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
