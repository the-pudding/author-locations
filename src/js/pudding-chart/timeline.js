/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.puddingChartTimeline = function init(options) {
  function createChart(el) {
    const $sel = d3.select(el);
    let data = $sel.datum();
    const authors = data.filteredAuthors[0].values;
    const books = data.filteredBooks[0].values;
    // dimension stuff
    let width = 0;
    let height = 0;
    const marginTop = 0;
    const marginBottom = 0;
    const marginLeft = 50;
    const marginRight = 50;
    const barHeight = 20;
    const RADIUS = 6;
    let nestedBooks = null;

    // scales
    const scaleX = d3.scaleLinear();
    const scaleY = null;

    // dom elements
    let $svg = null;
    let $axes = null;
    let $vis = null;

    // helper functions

    const Chart = {
      // called once at start
      init() {
        $svg = $sel.append('svg').attr('class', 'pudding-chart');
        const $g = $svg.append('g');

        // offset chart for margins
        $g.attr('transform', `translate(${marginLeft}, ${marginTop})`);

        // create axis
        $axes = $svg
          .append('g')
          .attr('class', 'g-axis')
          .attr('transform', `translate(${marginLeft}, ${marginTop})`);

        // setup viz group
        $vis = $g.append('g').attr('class', 'g-vis');

        // find extent of data
        const minYear = d3.min(authors, d => d.start_year);
        const maxYear = d3.max(authors, d => d.end_year);
        scaleX.domain([minYear, maxYear]).ticks(5);

        // nest locations by book
        nestedBooks = d3
          .nest()
          .key(d => d.title)
          .rollup(leaves => {
            console.log({ leaves });
            const pubYear = d3.max(leaves, d => d.pub_year);
            return { values: leaves, year: pubYear };
          })
          .entries(books);

        Chart.resize();
        Chart.render();
      },
      // on resize, update new dimensions
      resize() {
        // defaults to grabbing dimensions from container element
        width = $sel.node().offsetWidth - marginLeft - marginRight;
        height = $sel.node().offsetHeight - marginTop - marginBottom;
        $svg
          .attr('width', width + marginLeft + marginRight)
          .attr('height', height + marginTop + marginBottom);

        scaleX.range([0, width]);
        return Chart;
      },
      // update scales and render chart
      render() {
        // setting up both underlying axes
        $axes
          .append('g')
          .attr('class', 'author__axis')
          .attr('transform', `translate(0, ${height * 0.25})`)
          .call(d3.axisBottom(scaleX));

        $axes
          .append('g')
          .attr('class', 'book__axis')
          .attr('transform', `translate(0, ${height * 0.75})`)
          .call(d3.axisBottom(scaleX));

        console.log({ authors });

        // add in author locations
        $vis
          .selectAll('author__location')
          .data(authors)
          .join(enter => {
            console.log({ check: scaleX(1898) });
            enter
              .append('rect')
              .attr('x', d => scaleX(d.start_year))
              .attr('y', height * 0.25 - barHeight / 2)
              .attr('width', d => scaleX(d.end_year) - scaleX(d.start_year))
              .attr('height', barHeight);
          });

        console.log({ nestedBooks });
        // add in book releases (beeswarm to prevent overlap)
        const simulation = d3
          .forceSimulation(nestedBooks)
          .force('x', d3.forceX(d => scaleX(d.value.year)))
          .force('y', d3.forceY(height * 0.75))
          .force('collide', d3.forceCollide(RADIUS))
          .stop();

        for (let i = 0; i < 120; ++i) simulation.tick();

        $vis
          .selectAll('book')
          .data(nestedBooks)
          .join(enter => {
            enter
              .append('circle')
              .attr('cx', d => d.x)
              .attr('cy', d => d.y)
              .attr('r', RADIUS);
          });
      },
      // get / set data
      data(val) {
        if (!arguments.length) return data;
        data = val;
        $sel.datum(data);
        Chart.render();
        return Chart;
      },
    };
    Chart.init();

    return Chart;
  }

  // create charts
  const charts = this.nodes().map(createChart);
  return charts.length > 1 ? charts : charts.pop();
};
