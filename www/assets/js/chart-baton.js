function displayBaton(div = "#chart-2", dataset = null){
    
    var width = $('#graph-1').width(), 
        height = $('#graph-1').width() / 2,
        barPadding = 1,
        svg = d3.select(div)
                .append("svg")
                .attr("width", width)
                .attr("height", height);
    
    var sum_count = d3.sum(dataset.children, function(g) {return g.count; });
    var sum_views = d3.sum(dataset.children, function(g) {return g.nb_views; });
    
    // Div du tooltip
    var tip2 = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Nom:</strong> <span style='color:red'>" + d.name + "</span><br><strong>Nb de vue:</strong> <span style='color:red'>" + d.nb_views + "</span>";
      })
    
    svg.call(tip2);
    
    var node = svg.datum(dataset).selectAll("rect").data(dataset.children).enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (width / dataset.children.length);
        })
        .attr("y", function(d) {
            return height - (d.nb_views / sum_views * height);
        })
        .attr("width", width / dataset.children.length - barPadding)
        .attr("height", function(d) {
            return d.nb_views / sum_views * height;
        })
        .attr("fill", function(d) {
            return "rgb(0, 0, " + Math.round(d.count / sum_count * 255) + ")";
        })
        .on('mouseover', tip2.show)
        .on('mouseout', tip2.hide);

    var node = svg.datum(dataset).selectAll("text").data(dataset.children).enter()
       .append("text")
       .text(function(d) {
            return d.name;
       })
       .attr("text-anchor", "middle")
       .attr("x", function(d, i) {
            return i * (width / dataset.children.length) + (width / dataset.children.length - barPadding) / 2;
       })
       .attr("y", function(d) {
            return height - (d.nb_views / sum_views * height) + 14;
       })
       .attr("font-size", "11px")
       .attr("fill", "white");
}