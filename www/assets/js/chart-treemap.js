function displayTreemap(div, dataset = null){

    var width = $('#graph-1').width(),
        height = $('#graph-1').width()/4*3,
        color = d3.scale.category20c(),
        div = d3.select(div).append("div")
           .style("position", "relative");

    var treemap = d3.layout.treemap()
        .size([width, height])
        .sticky(true)
        .value(function(d) { return d.size; });
    
    var min_views = d3.min(dataset.children, function(d) { return d.nb_views; });
    var max_views = d3.max(dataset.children, function(d) { return d.nb_views; });
    
    
    var color = d3.scale.linear().domain([min_views,max_views])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb("#ff9be8"), d3.rgb('#ff00c4')]);
    

    var node = div.datum(dataset).selectAll(".node")
          .data(treemap.nodes)
        .enter().append("div")
          .attr("class", "node")
          .call(position)
          .style("background-color", function(d) {
              return d.name == 'tree' ? '#fff' : color(d.nb_views);
          })
          .append('div')
          .style("font-size", function(d) {
              // compute font size based on sqrt(area)
              return Math.max(15, 0.18*Math.sqrt(d.area))+'px'; })
          .text(function(d) { return d.children ? null : d.name; });

}

function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}
