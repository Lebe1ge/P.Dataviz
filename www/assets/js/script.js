google.charts.load('current', {'packages':['corechart']});

function loadJSON(callback) {   

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "./assets/core/getData.php",
        success: function (data) {
            
            $("#loadData span").removeClass("glyphicon-refresh normal-right-spinner").addClass("glyphicon-download-alt");
            
            $('body').animate({
                scrollTop:$(document).height()
            });
            $('div.heading').css("margin", "0 auto");
            $('div.blog-container').css("height", "auto");
            // replace div's content with returned data
            //console.log(data);
            
            //GRAPH 1
            displayTreemap("#chart-1", data.graph1);
            
            //GRAPH 2
            displayBaton("#chart-2", data.graph2);
            
            //GRAPH 3
            displayNuageDePoints("chart-3", data.graph3);
            
            //GRAPH 4
            displayCloud("#chart-4", data.graph4);

            // GRAPH 5
            displayBubble("chart-5", data.graph5);
        }
    });
    
 }

$(function() {
    
    var data_JSON;
    
    $("button#loadData").on('click', function() {
        $("#loadData span").removeClass("glyphicon-download-alt").addClass("glyphicon-refresh normal-right-spinner");
        loadJSON();
    });
    
    $("#graph3_year_filter").change(function(){
        $('#refresh_graph3_year').removeClass('hidden');

        year = $(this).val();

        $.ajax({
            type: "POST",
            data: { year: year, method: "countViewByDate" },
            dataType: "json",
            url: "./assets/core/getDataFilter.php",
            success: function (data) {
                //GRAPH 3
                $('#refresh_graph3_year').addClass('hidden');
                displayNuageDePoints("chart-3", data.graph);
            }
        });
    });
    
    $("#graph1_year_filter").change(function(){
        $('#refresh_graph1_year').removeClass('hidden');

        year = $(this).val();

        $.ajax({
            type: "POST",
            data: { year: year, method: "countTagsByYears" },
            dataType: "json",
            url: "./assets/core/getDataFilter.php",
            success: function (data) {
                //GRAPH 3
                $('#refresh_graph1_year').addClass('hidden');
                $("#chart-1 svg").remove();
                displayTreemap("#chart-1", data.graph);
            }
        });
    });
    $("#graph5_year_filter").change(function(){
        $('#refresh_graph1_year').removeClass('hidden');

        year = $(this).val();

        $.ajax({
            type: "POST",
            data: { year: year, method: "countVoteByDate" },
            dataType: "json",
            url: "./assets/core/getDataFilter.php",
            success: function (data) {
                //GRAPH 3
                $('#refresh_graph1_year').addClass('hidden');
                $("#chart-5").empty();
                displayBubble("chart-5", data.graph);
            }
        });
    });


    
});



function displayNuageDePoints(id, data) {

    //var afficher = google.visualization.arrayToDataTable(donnees);
    var afficher = new google.visualization.DataTable();
    var donnees = [];

    afficher.addColumn('number', 'Jours Écoulés');
    afficher.addColumn('number', 'Nombre de vues');
    afficher.addColumn({type:'string',role:'tooltip'});

    for (var i = 0; i < data.length; i++) {
        donnees.push([
                        parseInt(data[i].DateDiff),
                        parseInt(data[i].nb_views),
                        "Titre : " + data[i].title + "\nCatégorie : " + data[i].channels + "\nJour écoulés: " + data[i].DateDiff + " jours\nNombre de vues: " + data[i].nb_views
                    ]);
    }

    afficher.addRows(donnees);

    var options = {
        title: 'Nombre de vues vs Jours écoulés',
        hAxis: {title: 'Jours écoulés'},
        vAxis: {title: 'Nombre de vues'},
        legend: 'none',
        pointSize: 3,
    };

    var chart = new google.visualization.ScatterChart(document.getElementById(id));

    chart.draw(afficher, options);
}

function displayBubble(id, data){
    
    var donnees = [];
    var arr = [[11, 123, 1236, "Acura"], [45, 92, 1067, "Alfa Romeo"], 
    [24, 104, 1176, "AM General"], [50, 23, 610, "Aston Martin Lagonda"], 
    [18, 17, 539, "Audi"], [7, 89, 864, "BMW"], [2, 13, 1026, "Bugatti"]];

    data.forEach( function( key ){
        donnees.push( [parseInt(key.nb_comments), parseInt(key.nb_votes), parseInt(key.nb_votes), key.title ] );
    }) ;


    plot1 = $.jqplot(id,[arr],{
        title: 'Transparent Bubbles',
        seriesDefaults:{
            renderer: $.jqplot.BubbleRenderer,
            rendererOptions: {
                bubbleAlpha: 0.6,
                highlightAlpha: 0.8,
                showLabels: false
            },
            shadow: true,
            shadowAlpha: 0.05
        }
    }); 

    // Now bind function to the highlight event to show the tooltip
    // and highlight the row in the legend. 
    // Now bind function to the highlight event to show the tooltip
    // and highlight the row in the legend. 
    $('#chart-5').bind('jqplotDataHighlight', 
        function (ev, seriesIndex, pointIndex, data, radius) {    
            var chart_left = $('#chart-5').offset().left,
                chart_top = $('#chart-5').offset().top,
                x = plot1.axes.xaxis.u2p(data[0]),  // convert x axis unita to pixels on grid
                y = plot1.axes.yaxis.u2p(data[1]);  // convert y axis units to pixels on grid
            var color = 'rgb(50%,50%,100%)';
            $('#test').html('<span style="font-size:14px;font-weight:bold;color:black;">' + 
            data[3] + '</span><br />' + 'x: '+data[0] + '<br />' + 'y: ' + 
            data[1] + '<br />' + 'r: ' + data[2]);
            $('#tooltip1b').show();
        });
     
    // Bind a function to the unhighlight event to clean up after highlighting.
    $('#chart1b').bind('jqplotDataUnhighlight', 
        function (ev, seriesIndex, pointIndex, data) {
            $('#tooltip1b').empty();
            $('#tooltip1b').hide();
        });

}