import loadData from './load-data';
import './pudding-chart/timeline';

const $section = d3.select('[data-js="timeline"]');
const $figures = $section.selectAll('[data-js="timeline__figure"]');
// const $article = $section.select('[data-js="distance__article"]');
// const $step = $article.selectAll('[data-js="article__step"]');

let allData = null;
let authorLocs = null;
let oldest = null;
let birthYearMap = null;
let unnestedAuthors = null;
const charts = [];

function findMatches(d) {
  const placeArr = d.match.split(';').map(e => e.trim());
  const matches = unnestedAuthors
    .filter(
      e =>
        e.slug === d.slug &&
        placeArr.includes(e.location) &&
        d.pub_year > e.start_year
    )
    .map(e => ({
      pub_age: d.pub_age,
      location: e.location.trim(),
      mid: e.mid,
    }))
    .sort((a, b) => d3.ascending(a.mid, b.mid));

  const mostRecent = matches.pop();
  return mostRecent;
}

function cleanBooks(data) {
  const clean = data
    .map(d => ({
      ...d,
      pub_year: +d.pub_year,
      pub_age: +d.pub_year - birthYearMap.get(d.slug),
    }))
    .map(d => ({
      ...d,
      match_locs: findMatches(d),
    }));

  const nested = d3
    .nest()
    .key(d => d.slug)
    .entries(clean);

  return nested;
}

function cleanAuthors(data) {
  const born = d3
    .nest()
    .key(d => d.slug)
    .rollup(leaves => {
      const years = leaves.map(e => +e.start_year);
      return Math.min(...years);
    })
    .entries(data)
    .map(d => [d.key, d.value]);

  birthYearMap = new Map(born);

  const clean = data
    .map(d => ({
      ...d,
      location: d.location.trim(),
      start_year: +d.start_year,
      end_year: +d.end_year,
      start_age: +d.start_year - birthYearMap.get(d.slug),
      end_age: +d.end_year - birthYearMap.get(d.slug),
    }))
    .map(d => ({
      ...d,
      mid: d3.mean([d.start_age, d.end_age]),
    }));

  // finding longest lifespan
  oldest = Math.max(...clean.map(d => d.end_age));

  // create useful information for connecting lines later
  authorLocs = clean.map(d => {
    const mid = d3.mean([d.start_age, d.end_age]);
    return { location: d.location, mid };
  });

  unnestedAuthors = clean;

  const nested = d3
    .nest()
    .key(d => d.slug)
    .entries(clean);

  return nested;
}

function setupTimelines() {
  const $sel = d3.select(this);
  const slug = $sel.attr('data-author');

  const filteredAuthors = allData.authors
    .filter(d => d.key === slug)
    .slice(0, 1);
  const filteredBooks = allData.books.filter(d => d.key === slug);

  const allFiltered = { filteredAuthors, filteredBooks, oldest };

  const chart = $sel.data([allFiltered]).puddingChartTimeline();
  charts.push(chart);
}

function setup(data) {
  const authors = cleanAuthors(data[0]);
  const books = cleanBooks(data[1]);

  allData = { authors, books };

  $figures.each(setupTimelines);
}

function resize() {
  charts.forEach(chart => chart.resize().render());
}
function init() {
  loadData(['authors.json', 'books.json']).then(setup);
}

export default { init, resize };
