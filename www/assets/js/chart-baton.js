function displayBaton(div = "#chart-2", dataset = null){
    
    var width = $('#graph-1').width(), 
        height = $('#graph-1').width() / 2,
        barPadding = 1,
        svg = d3.select(div)
                .append("svg")
                .attr("width", width)
                .attr("height", height);
    
    console.log(dataset);
    
    var sum = d3.sum(dataset.children, function(g) {return g.count; });
    
    var node = svg.datum(dataset).selectAll("rect").data(dataset.children).enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (width / dataset.children.length);
        })
        .attr("y", function(d) {
            return height - (d.count / sum * height);
        })
        .attr("width", width / dataset.children.length - barPadding)
        .attr("height", function(d) {
            return d.count / sum * height;
        })
        .attr("fill", function(d) {
            return "rgb(0, 0, " + Math.round(d.count / sum * 255) + ")";
        });

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
            return height - (d.count / sum * height) + 14;
       })
       .attr("font-size", "11px")
       .attr("fill", "white");
}