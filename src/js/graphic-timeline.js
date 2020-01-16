const $section = d3.select('[data-js="timeline"]');
const $figure = $section.selectAll('[data-js="timeline__figure"]');
// const $article = $section.select('[data-js="distance__article"]');
// const $step = $article.selectAll('[data-js="article__step"]');

function resize() { }
function init() {
    console.log($figure);
}

export default { init, resize };
