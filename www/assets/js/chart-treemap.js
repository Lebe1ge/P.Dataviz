function displayTreemap(div, dataset = null) {
    var width = $('#graph-1').width(), 
        height = $('#graph-1').width() / 4 * 3,
        color = d3.scale.category20c(), 
        svg = d3.select(div).append("svg")
                .attr("width", width)
                .attr("height", height);
    
    var treemap = d3.layout.treemap().size([width, height]).sticky(true).value(function (d) {
        return d.size;
    });
    var min_views = d3.min(dataset.children, function (d) {
        return d.nb_views;
    });
    var max_views = d3.max(dataset.children, function (d) {
        return d.nb_views;
    });
    var color = d3.scale.linear().domain([min_views, max_views]).interpolate(d3.interpolateHcl).range([d3.rgb("#ff9be8"), d3.rgb('#ff00c4')]);
    
    // Div du tooltip
    var tip1 = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Nom:</strong> <span style='color:red'>" + d.name + "</span><br><strong>Nb de vue:</strong> <span style='color:red'>" + d.nb_views + "</span>";
      })
    
    svg.call(tip1);
    
    var node = svg.datum(dataset).selectAll(".node").data(treemap.nodes).enter()
        .append("rect")
        .attr("class", "node")
        .call(position)
        .attr("fill", function (d) {
            return d.name == 'tree' ? '#fff' : color(d.nb_views);
        })
        .on('mouseover', tip1.show)
        .on('mouseout', tip1.hide)
}

function position() {
    this.style("x", function (d) {
        return d.x + "px";
    }).style("y", function (d) {
        return d.y + "px";
    }).style("width", function (d) {
        return Math.max(0, d.dx - 1) + "px";
    }).style("height", function (d) {
        return Math.max(0, d.dy - 1) + "px";
    });
}