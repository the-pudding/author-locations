/* global d3 */
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
    const $tooltip = $sel.select('[data-js="figure__tooltip"]');
    let data = $sel.datum();

    const authorLocations = data.filteredAuthors[0].values;
    const books = data.filteredBooks[0].values;
    const { oldest } = data;
    // dimension stuff
    let width = 0;
    let height = 0;
    const marginTop = 16;
    const marginBottom = 16;
    const marginLeft = 50;
    const marginRight = 50;
    const barHeight = 20;
    const RADIUS = 6;
    let nestedBooks = null;
    let authorLine = null;
    let bookLine = null;
    const FONT_SIZE = 12;
    let vertical = false;

    // scales
    const scaleX = d3.scaleLinear();
    const scaleColor = d3.scaleOrdinal(d3.schemeSet1);
    const scaleY = d3.scaleLinear();

    // dom elements
    let $svg = null;
    let $axes = null;
    let $vis = null;
    let $authors = null;
    let $books = null;
    let $connections = null;
    let bookLocs = null;
    let matchedLocs = null;

    // helper functions
    function handleBookHover(d) {
      const sel = d3.select(this);
      const loc = sel.attr('data-loc');
      const year = sel.attr('data-age');
      const allLocs = loc.split(';').map(d => d.trim());

      // find matching connections
      const lived = $sel.selectAll('.latest');

      lived.classed('is-dimmed', true).classed('is-hidden', false);

      const allConn = $sel
        .selectAll('.connection__lived')
        .filter((d, i, n) => {
          const thisLoc = d3.select(n[i]).attr('data-loc');
          const check = allLocs.includes(thisLoc) && +year === d.pub_age;
          return check;
        })
        .classed('is-dimmed', false)
        .classed('is-hidden', false);

      // find matching blocks
      const blocks = $sel.selectAll('.author__location');
      blocks.classed('is-dimmed', true);
      blocks
        .filter((d, i, n) => {
          const thisLoc = d3.select(n[i]).attr('data-loc');
          const check = allLocs.includes(thisLoc) && d.start_age <= year;
          return check;
        })
        .classed('is-dimmed', false)
        .classed('match', true);

      // update tooltip
      const bookInfo = d.value.values;
      $tooltip.select("[data-js='tooltip__book'] span").text(bookInfo[0].title);
      $tooltip.select("[data-js='tooltip__residence'] span").text(f => {
        const allMatches = bookInfo
          .filter(g => g.match_locs.length)
          .map(g => {
            const match = g.match_locs
              .map(h => {
                return h.location;
              })
              .filter(g => g);
            return match.join('; ');
          });
        const str = allMatches.join('; ');

        return str;
      });

      const neverLived = bookInfo.filter(e => !e.match.length);
      $tooltip.select("[data-js='tooltip__setting'] span").text(() => {
        const locations = neverLived.map(g => g.location);
        return locations.join('; ');
      });

      // $tooltip
      //   .select("[data-js='tooltip__distance'] span")
      //   .text(`${Math.round(d.distance)} miles`);

      // TODO search for all loc matches in data-loc
    }

    function handleMouseOut() {
      $sel
        .selectAll('.connection__lived')
        .classed('is-dimmed', false)
        .classed('is-hidden', true);
      $sel.selectAll('.latest').classed('is-hidden', false);
      $sel
        .selectAll('.author__location')
        .classed('is-dimmed', false)
        .classed('match', false);
    }

    const Chart = {
      // called once at start
      init() {
        $svg = $sel.append('svg').attr('class', 'pudding-chart');
        // create axis
        $axes = $svg
          .append('g')
          .attr('class', 'g-axis')
          .attr('transform', `translate(${marginLeft}, ${marginTop})`);

        $axes.append('g').attr('class', 'author__axis');

        $axes.append('g').attr('class', 'book__axis');

        const $g = $svg.append('g');

        // offset chart for margins
        $g.attr('transform', `translate(${marginLeft}, ${marginTop})`);

        // setup viz group
        $vis = $g.append('g').attr('class', 'g-vis');

        // add group for author rectangles
        $connections = $vis.append('g').attr('class', 'g-connections');
        $authors = $vis.append('g').attr('class', 'g-authors');
        $books = $vis.append('g').attr('class', 'g-books');

        // put all authors on same x scale of age
        scaleX
          .domain([0, oldest])
          // .ticks(5)
          .tickFormat((d, i) => (i === 0 ? `${d} years old` : d));
        scaleY
          .domain([0, oldest])
          // .ticks(5)
          .tickFormat((d, i) => (i === 0 ? `${d} years old` : d));

        // nest locations by book
        nestedBooks = d3
          .nest()
          .key(d => d.title)
          .rollup(leaves => {
            const pubYear = d3.max(leaves, d => d.pub_age);
            return { values: leaves, year: pubYear };
          })
          .entries(books);

        // reconsider how this all works

        bookLocs = books.filter(d => d.match.length);

        const allMatches = bookLocs
          .map(d => d.match_locs)
          // .map(d => d[0])
          .map(d => {
            let loc = null;
            if (d) loc = { location: d.location, mid: d.mid };
            return loc;
          });
        const nonEmpty = allMatches.filter(d => d);

        if (nonEmpty) {
          matchedLocs = Array.from(new Set(nonEmpty.map(d => d.location))).map(
            location => ({
              location,
              mid: nonEmpty.find(e => e.location === location).mid,
            })
          );
        }

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

        $sel.classed('vertical', vertical);

        // flip graphic if portrait instead of landscape orientation
        vertical = window.innerHeight > window.innerWidth;

        scaleX.range([0, width]);
        scaleY.range([0, height]);
        authorLine = vertical ? width * 0.25 : height * 0.25;
        bookLine = vertical ? width * 0.75 : height * 0.75;

        // setting up both underlying axes

        $axes
          .select('.author__axis')
          .attr(
            'transform',
            vertical
              ? `translate(${authorLine}, 0)`
              : `translate(0, ${authorLine})`
          )
          .call(vertical ? d3.axisLeft(scaleY) : d3.axisTop(scaleX));

        $axes
          .select('.book__axis')
          .attr(
            'transform',
            vertical ? `translate(${bookLine}, 0)` : `translate(0, ${bookLine})`
          )
          .call(vertical ? d3.axisRight(scaleY) : d3.axisBottom(scaleX));

        return Chart;
      },
      // update scales and render chart
      render() {
        // setting up color scale
        // scaleColor.domain([uniqueLocs]);
        const matchesOnly = bookLocs
          .map(d => d.match_locs)
          .filter(d => d.length);

        // only unique midpoints
        const mids = matchesOnly.map(d => d.mid);
        // adding places never lived
        const neverLocs = books.filter(d => !d.match.length);
        const neverBooks = [...new Set(neverLocs.map(d => d.title))];

        // add in author locations
        $authors
          .selectAll('.author__location')
          .data(authorLocations, d => d.start_age)
          .join(enter => enter.append('rect').attr('class', 'author__location'))
          .attr('x', d =>
            vertical ? authorLine - barHeight / 2 : scaleX(d.start_age)
          )
          .attr('y', d =>
            vertical ? scaleY(d.start_age) : authorLine - barHeight / 2
          )
          .attr('width', d =>
            vertical ? barHeight : scaleX(d.end_age) - scaleX(d.start_age)
          )
          .attr('height', d =>
            vertical ? scaleY(d.end_age) - scaleY(d.start_age) : barHeight
          )
          .classed('matched', d => mids.includes(d.mid))
          .attr('data-mid', d => d.mid)
          .attr('data-loc', d => d.location);

        // add in book releases (beeswarm to prevent overlap)
        const simulation = d3
          .forceSimulation(nestedBooks)
          .force(
            'x',
            vertical
              ? d3.forceX(bookLine)
              : d3.forceX(d => scaleX(d.value.year))
          )
          .force(
            'y',
            vertical
              ? d3.forceY(d => scaleY(d.value.year))
              : d3.forceY(bookLine)
          )
          .force('collide', d3.forceCollide(RADIUS))
          .stop();

        for (let i = 0; i < 120; i += 1) simulation.tick();
        // adding an extra circle for books with never-visited locations
        $books
          .selectAll('.book__never')
          .data(nestedBooks.filter(d => neverBooks.includes(d.key)))
          .join(enter => enter.append('circle').attr('class', 'book__never'))
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', RADIUS + 3);

        $books
          .selectAll('.book')
          .data(nestedBooks)
          .join(enter => enter.append('circle').attr('class', 'book'))
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', RADIUS)
          .attr('data-loc', d => {
            const vals = d.value.values;
            const locMatches = vals.map(e => e.match);
            const locString = locMatches.join('; ');
            return locString;
          })
          .attr('data-age', d => {
            return d.value.values[0].pub_age;
          })
          .on('mouseover', handleBookHover)
          .on('mouseout', handleMouseOut);

        // add connecting lines to places lived
        // filtering data

        // add connecting line groups
        $connections
          .selectAll('.g__connections')
          .data(matchesOnly)
          .join(enter => enter.append('g').attr('class', 'g__connections'))
          .selectAll('.connection__lived')
          .data(d => d)
          .join(enter =>
            enter.append('path').attr('class', 'connection__lived')
          )
          .attr('d', d => {
            const thisBook = vertical ? scaleY(d.pub_age) : scaleX(d.pub_age);
            const thisLoc = vertical ? scaleY(d.mid) : scaleX(d.mid);
            const padding = 10;
            const starting = vertical
              ? [authorLine, thisLoc]
              : [thisLoc, authorLine];
            const ending = vertical
              ? [bookLine, thisBook]
              : [thisBook, bookLine];
            const startControl = vertical
              ? [width / 2 + padding, thisLoc]
              : [thisLoc, height / 2 + padding];
            const endControl = vertical
              ? [width / 2 - padding, thisBook]
              : [thisBook, height / 2 - padding];

            const path = [
              // move to starting point
              'M',
              starting,
              // add cubic bezier curve
              'C',
              startControl,
              endControl,
              // add end point
              ending,
            ];

            const joined = path.join(' ');
            return joined;
          })
          .attr('data-mid', d => d.mid)
          .attr('data-loc', d => d.location)
          .attr('data-age', d => d.pub_age)
          .classed('is-hidden', (d, i) => {
            return i !== 0;
          })
          .classed('latest', (d, i) => i === 0);

        // // add names above lived in places with matches

        $vis
          .selectAll('.cities__lived')
          .data(matchedLocs)
          .join(enter =>
            enter
              .append('text')
              .text(d => d.location)
              .attr('class', 'cities__lived')
              .attr('text-anchor', 'middle')
              .attr('alignment-baseline', 'bottom')
          )
          // .attr('transform', d =>
          //   vertical
          //     ? `translate(${authorLine - barHeight * 2}, ${scaleY(d.mid)})`
          //     : `translate(${scaleX(d.mid)}, ${authorLine - barHeight})`
          // )
          .style('font-size', FONT_SIZE)
          .classed('is-hidden', d => {
            const uniqueMids = [...new Set(mids.filter(e => e !== d.mid))];

            const check = uniqueMids
              .map(e => Math.abs(d.mid - e < 5) && d.mid - e > 0)
              .filter(e => e === true);

            return check.length > 0 === true;
          })
          .attr('data-mid', d => d.mid);

        const neverNest = d3
          .nest()
          .key(d => d.title)
          .rollup(e => {
            const mapped = e.map(f => {
              return f.location;
            });
            return { locs: mapped, year: e[0].pub_age };
          })
          .entries(neverLocs);

        const $gNever = $vis
          .selectAll('.group__never')
          .data(neverNest)
          .join(enter =>
            enter.append('g').attr('class', 'group__never is-hidden')
          )
          .attr('transform', d =>
            vertical
              ? `translate(${bookLine}, ${scaleY(d.value.year)})`
              : `translate(${scaleX(d.value.year)}, ${bookLine})`
          )
          .attr('data-mid', d => d.value.year);

        $gNever
          .selectAll('.cities__never')
          .data(d => {
            return d.value.locs;
          })
          .join(enter => {
            enter
              .append('text')
              .text(d => d)
              .attr('class', 'cities__never')
              .attr('text-anchor', 'middle')
              .attr('transform', (d, i) => `translate(0, ${i * FONT_SIZE})`)
              .attr('alignment-baseline', 'hanging')
              .style('font-size', FONT_SIZE);
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
