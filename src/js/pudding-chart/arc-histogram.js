/* global d3 */

/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.puddingChartArcHistogram = function init(options) {
  function createChart(el) {
    // dom elements
    const $chart = d3.select(el);
    const $tooltip = $chart.select('[data-js="figure__tooltip"]');
    const $main = d3.select("main");
    let $svg = null;
    let $axis = null;
    let $vis = null;

    // data
    let data = $chart.datum();
    let filter = () => false;
    let highlight = null;
    let mobile = false;

    // dimensions
    const { binSize, maxBin } = options;
    let width = 0;
    let height = 0;
    let mainW = 0;
    const MARGIN_TOP = 16;
    const MARGIN_BOTTOM = 16;
    const SPACER = 8;
    let marginLeft = 0;
    let marginRight = 0;
    let rectHeight = 0;
    let offY = 0;
    const SPLIT = 0.35;
    const DUR = 1000;
    const BUFFER = 26;

    // scales
    const scaleArcX = d3.scaleLinear();
    const scaleArcY = d3.scaleLinear();
    const scaleHistX = d3.scaleBand();

    // helper functions
    function handleEnter(d) {
      $tooltip.select("[data-js='tooltip__book'] span").text(d.book_title);
      $tooltip.select("[data-js='tooltip__author'] span").text(d.author_name);
      $tooltip
        .select("[data-js='tooltip__residence'] span")
        .text(d.residence.join(", "));
      $tooltip
        .select("[data-js='tooltip__setting'] span")
        .text(d.setting.join(", "));
      $tooltip
        .select("[data-js='tooltip__distance'] span")
        .text(`${Math.round(d.distance)} miles`);

      const $book = d3.select(this);
      const x = scaleHistX(d.bin * binSize);
      const y = +$book.attr("data-y");
      const left = x > width / 2 ? "auto" : `${x + marginLeft + binSize + 8}px`;
      const right =
        x > width / 2 ? `${width - x + marginRight + binSize}px` : "auto";
      const top =
        y > height / 2 - MARGIN_TOP ? "auto" : `${y - 1 + MARGIN_TOP}px`;
      const bottom = y > height / 2 ? `${height - y}px` : "auto";

      $book.select("rect").classed("is-highlight", true);

      if (mobile)
        $tooltip.classed("is-visible", true).classed("is-mobile", true);
      else
        $tooltip
          .style("top", top)
          .style("left", left)
          .style("bottom", bottom)
          .style("right", right)
          .classed("is-mobile", false)
          .classed("is-visible", true);
    }
    function handleOut() {
      d3.select(this)
        .select("rect")
        .classed("is-highlight", false);
      $tooltip.classed("is-visible", false);
    }
    function makeArc({ distance }) {
      const a = scaleArcX(distance) * 0.51;
      const b = scaleArcY(distance);
      const c = scaleArcX(distance);
      return `M0,0 A${a},${b} 0 0,1 ${c},0`;
    }

    function resetArc() {
      const $path = d3.select(this);
      const totalLength = $path.node().getTotalLength();
      $path
        .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
        .attr("stroke-dashoffset", totalLength);
    }

    function enterArc(e) {
      const $book = e.append("g").attr("class", "book");
      $book
        .append("path")
        .attr("d", makeArc)
        .each(resetArc);

      $book.append("text").text(d => d.book_title);
      return $book;
    }

    function enterBin(e) {
      return e.append("g").attr("class", "bin");
    }

    function enterHist(e) {
      const $book = e.append("g").attr("class", "book");

      $book
        .attr("transform", (d, i) => `translate(0, ${i * rectHeight + offY})`)
        .style("opacity", 0);

      $book
        .append("rect")
        .attr("x", 0)
        .attr("y", 0);

      $book.on("mouseenter", handleEnter).on("mouseout", handleOut);
      return $book;
    }

    const Chart = {
      // called once at start
      init() {
        $svg = $chart
          .select(".figure__chart")
          .append("svg")
          .attr("class", "pudding-chart");

        // create axis
        $axis = $svg.append("g").attr("class", "g-axis");

        // setup viz group
        $vis = $svg.append("g").attr("class", "g-vis");

        $vis.append("g").attr("class", "arc");
        $vis.append("g").attr("class", "hist");

        const extentX = d3.extent(data, d => d.distance);
        scaleArcX.domain(extentX).nice();
        scaleArcY.domain(extentX).nice();

        const binX = d3.range(0, scaleArcX.domain()[1], binSize);
        scaleHistX.domain(binX);
      },
      // on resize, update new dimensions
      resize() {
        mainW = $main.node().offsetWidth;
        mobile = mainW < 960;
        marginLeft = BUFFER;
        marginRight = BUFFER;

        // defaults to grabbing dimensions from container element
        width = $chart.node().offsetWidth - marginLeft - marginRight;
        height = $chart.node().offsetHeight - MARGIN_TOP - MARGIN_BOTTOM;

        $svg
          .attr("width", width + marginLeft + marginRight)
          .attr("height", height + MARGIN_TOP + MARGIN_BOTTOM);

        scaleArcX.range([0, width]);
        scaleArcY.range([0, SPLIT * height]);
        scaleHistX.range([0, width]);

        rectHeight = Math.floor(((1 - SPLIT) * height - SPACER) / maxBin);
        offY = SPLIT * height + SPACER;

        return Chart;
      },
      // update scales and render chart
      render() {
        // offset chart for margins
        $vis.attr("transform", `translate(${marginLeft}, ${MARGIN_TOP})`);

        const axis = d3
          .axisTop(scaleArcX)
          .ticks(mobile ? 5 : 10)
          .tickFormat((d, i) => (i === 0 ? `${d} mi.` : d));

        $axis
          .call(axis)
          .attr(
            "transform",
            `translate(${marginLeft}, ${MARGIN_TOP + offY - rectHeight})`
          );

        $axis
          .select(".tick text")
          .attr("text-anchor", "end")
          .attr("x", -4);

        const filteredData = data.filter(filter).map(d => ({
          ...d,
          highlight: d.book_title === highlight
        }));

        const nestedData = d3
          .nest()
          .key(d => d.bin)
          .entries(filteredData);

        // sort
        nestedData.forEach(n => {
          n.values.sort((a, b) => d3.descending(a.top, b.top));
        });

        const $arcBook = $vis
          .select(".arc")
          .selectAll(".book")
          .data(filteredData, d => d.book_title)
          .join(enterArc);

        $arcBook
          .select("path")
          .attr("transform", () => `translate(0, ${scaleArcY.range()[1]})`)
          .transition()
          .delay((d, i) => (filteredData.length > 2 ? d.bin * 20 : 0))
          .duration(DUR)
          .ease(d3.easeCubicInOut)
          .attr("stroke-dashoffset", 0);

        const $histBin = $vis
          .select(".hist")
          .attr("transform", `translate(${binSize / 2}, 0)`)
          .selectAll(".bin")
          .data(nestedData, d => d.key)
          .join(enterBin);

        $histBin.attr("transform", d => {
          const x = scaleHistX(+d.key * binSize) - binSize / 2;
          return `translate(${x}, 0)`;
        });

        const $histBook = $histBin
          .selectAll(".book")
          .data(d => d.values, d => d.book_title)
          .join(enterHist);

        $histBook
          .select("rect")
          .attr("width", scaleHistX.bandwidth())
          .attr("height", rectHeight)
          .classed("is-highlight", d => d.highlight);

        $histBook
          .transition()
          .duration(DUR)
          .delay((d, i) => (filteredData.length > 2 ? d.bin * 20 : 0))
          .ease(d3.easeCubicInOut)
          .attr("transform", (d, i) => `translate(0, ${i * rectHeight + offY})`)
          .attr("data-y", (d, i) => i * rectHeight + offY)
          .style("opacity", 1);

        return Chart;
      },
      // get / set data
      data(val) {
        if (!arguments.length) return data;
        data = val;
        $chart.datum(data);
        return Chart;
      },
      filter(val) {
        if (!arguments.length) return filter;
        filter = val;
        return Chart;
      },
      highlight(val) {
        highlight = val;
        return Chart;
      }
    };
    Chart.init();

    return Chart;
  }

  // create charts
  const charts = this.nodes().map(createChart);
  return charts.length > 1 ? charts : charts.pop();
};
