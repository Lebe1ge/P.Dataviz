function displayCloud(div, dataset){
    var descString = "";
    $.each(dataset,function(d, val) {
        descString += val.channels + " ";
    });

    descString = descString.replace(/[^\w\s]/gi, '');

    var descArray = descString.split(" ");


    var descObjects = [];

    descArray.forEach(function(d) {
        if (!$.isNumeric(d)) {
            var descObject = {}
            descObject.description = d;
            descObjects.push(descObject);
        }
    });

    var wordCount = d3.nest()
        .key(function(d) { return d.description; })
        .rollup(function(v) { return v.length; })
        .entries(descObjects);

    wordCount.sort(function(a,b) {
        return b.values - a.values;
    });

    var tags = [];

    wordCount.forEach(function(d) {
        tags.push([d.key,parseInt(d.values)]);
    });

    tags = tags.slice(0,250);
    console.log(tags);

    WordCloud(document.getElementById('graph-4'), {
        gridSize: Math.round(16 * $('#graph-4').width() / 1024),
        weightFactor: function (size) {
            return Math.pow(size, 2.3) * $('#graph-4').width() / 1024;
        },
        rotateRatio: 0.5,
        list : tags.map(function(word) { return [word[0], Math.round(word[1]/5)]; }),
        wait: 10
    });
}