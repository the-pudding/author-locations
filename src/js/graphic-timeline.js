import loadData from './load-data';
import './pudding-chart/timeline';

const $section = d3.select('[data-js="timeline"]');
const $figure = $section.selectAll('[data-js="timeline__figure"]');
// const $article = $section.select('[data-js="distance__article"]');
// const $step = $article.selectAll('[data-js="article__step"]');

function cleanBooks(data) {
    const clean = data.map(d => ({
        ...d,
        pub_year: +d.pub_year,
    }));
    return clean;
}

function cleanAuthors(data) {
    const clean = data.map(d => ({
        ...d,
        start_year: +d.start_year,
        end_year: +d.end_year,
    }));
    return clean;
}

function setup(data) {
    const authors = cleanAuthors(data[0]);
    const books = cleanBooks(data[1]);
    console.log({ authors, books });
}

function resize() { }
function init() {
    loadData(['authors.json', 'books.json']).then(setup);
}

export default { init, resize };
