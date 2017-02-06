var legendFullHeight = 440;
var legendFullWidth = 65;

var legendMargin = { top: 20, bottom: 20, left: 5, right: 20 };

// use same margins as main plot
var legendWidth = legendFullWidth - legendMargin.left - legendMargin.right;
var legendHeight = legendFullHeight - legendMargin.top - legendMargin.bottom;

/*
var legendSvg = d3.select('#legend-svg')
    .attr('width', legendFullWidth)
    .attr('height', legendFullHeight)
    .append('g').append('rect')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('width', legendWidth)
    .attr('height', legendHeight)
    .style('fill', '#7f3b08');
*/
var legendSvg = d3.select('#legend-svg')
    .attr('width', legendFullWidth)
    .attr('height', legendFullHeight)
    .append('g')
    .attr('transform', 'translate(' + legendMargin.left + ',' +
        legendMargin.top + ')');

//updateColourScale(scales['puOr11']);
//console.log(scales['puOr11']);

function updateColourScale(scale) {
    // create colour scale
    var colorScale = d3.scale.linear()
        .domain(linspace(10, 30, scale.length))
        .range(scale);

    // append gradient bar
    var gradient = legendSvg.append('defs')
        .append('linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%') // bottom
        .attr('y1', '100%')
        .attr('x2', '0%') // to top
        .attr('y2', '0%')
        .attr('spreadMethod', 'pad');

    // programatically generate the gradient for the legend
    // this creates an array of [pct, colour] pairs as stop
    // values for legend
    var pct = linspace(0, 100, scale.length).map(function(d) {
        return Math.round(d) + '%';
    });

    var colourPct = d3.zip(pct, scale);

    colourPct.forEach(function(d) {
        gradient.append('stop')
            .attr('offset', d[0])
            .attr('stop-color', d[1])
            .attr('stop-opacity', 1);
    });

    legendSvg.append('rect')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#gradient)');

    // create a scale and axis for the legend
    var legendScale = d3.scale.linear()
        .domain([10,30])
        .range([legendHeight, 0]);

    var legendAxis = d3.svg.axis()
        .scale(legendScale)
        .orient("right")
        .tickValues(d3.range(-3, 4))
        .tickFormat(d3.format("d"));

    legendSvg.append("g")
        .attr("class", "legend axis")
        .attr("transform", "translate(" + legendWidth + ", 0)")
        .call(legendAxis);
}

function linspace(start, end, n) {
    var out = [];
    var delta = (end - start) / (n - 1);

    var i = 0;
    while(i < (n - 1)) {
        out.push(start + (i * delta));
        i++;
    }

    out.push(end);
    return out;
}