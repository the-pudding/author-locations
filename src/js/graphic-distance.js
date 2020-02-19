/* global d3 */
import "intersection-observer";
import scrollama from "scrollama";
import loadData from "./load-data";
import "./pudding-chart/arc-histogram";

const $section = d3.select('[data-js="distance"]');
const $figure = $section.select('[data-js="distance__figure"]');
const $article = $section.select('[data-js="distance__article"]');
const $step = $article.selectAll('[data-js="article__step"]');

const scroller = scrollama();
let binSize = 0;

let chart = null;
let mobile = false;

function updateDimensions() {
  mobile = $section.node().offsetWidth < 960;
  binSize = mobile ? 20 : 10;
  const stepH = Math.floor(window.innerHeight * (mobile ? 1 : 0.825));
  $figure.style("height", `${window.innerHeight}px`);
  $step.style("height", `${stepH}px`);
  $step.style("margin-top", (d, i) =>
    i === 0 ? `${-window.innerHeight * 0.5}px` : 0
  );
  $step.style("padding-bottom", (d, i) =>
    i === $step.size() - 1 ? `${window.innerHeight * 1.05}px` : 0
  );

  // const figureH = $figure.node().offsetHeight;
  // const figureMarginTop = (window.innerHeight - figureHeight) / 2

  // figure
  // 	.style('height', figureHeight + 'px')
  // 	.style('top', figureMarginTop + 'px');
}

function resize() {
  updateDimensions();
  scroller.resize();
}

function handleStepEnter({ index }) {
  $step.classed("is-active", (d, i) => i === index);
  if (index === 0)
    chart
      .filter(d => ["White Teeth"].includes(d.book_title))
      .highlight("White Teeth")
      .render();
  else if (index === 1)
    chart
      .filter(d => ["White Teeth", "2666"].includes(d.book_title))
      .highlight("2666")
      .render();
  else if (index === 2)
    chart
      .filter(() => true)
      .highlight()
      .render();
  else if (index === 3) chart.highlight("Rabbit at Rest").render();

  $figure
    .select('[data-js="figure__tooltip"]')
    .classed("is-active", index === 4);

  $figure.select('[data-js="figure__chart"]').classed("is-active", index === 4);
}

function cleanData(data) {
  const clean = data.map(d => ({
    ...d,
    distance: +d.distance,
    bin: Math.floor(+d.distance / binSize),
    top: d.book_title === "White Teeth"
  }));

  const nested = d3
    .nest()
    .key(d => d.book_title)
    .rollup(values => {
      const setting = values.map(d => d.setting);
      const residence = values.map(d => d.residence);
      const { book_title, author_name, distance, bin, top } = values[0];
      return {
        book_title,
        author_name,
        distance,
        setting,
        residence,
        bin,
        top
      };
    })
    .entries(clean)
    .map(d => d.value);

  nested.sort((a, b) => d3.ascending(a.distance, b.distance));
  return nested;
}

function setupScroller() {
  const mid = `${Math.floor(window.innerHeight * 0.625)}px`;
  scroller
    .setup({
      step: "#distance article .step",
      offset: mobile ? mid : 0.5,
      debug: false
    })
    .onStepEnter(handleStepEnter);
}

function setup(data) {
  updateDimensions();

  const clean = cleanData(data);
  const maxBin = d3.max(
    d3
      .nest()
      .key(d => d.bin)
      .entries(clean),
    d => d.values.length
  );
  chart = $figure.datum(clean).puddingChartArcHistogram({ binSize, maxBin });
  chart.resize();
  setupScroller();
  resize();
}

function init() {
  loadData("top-100.csv").then(setup);
}

export default { init, resize };
