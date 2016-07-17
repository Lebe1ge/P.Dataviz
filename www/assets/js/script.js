google.charts.load('current', {'packages':['corechart']});

function loadJSON(callback) {   

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "./assets/core/getData.php",
        success: function (data) {
            $('body').animate({
scrollTop:$(document).height()
});
            $('div.heading').css("margin", "0 auto");
            $('div.blog-container').css("height", "auto");
            // replace div's content with returned data
            //console.log(data);
            displayTreemap("#chart-1", data.graph1);
            displayBaton("#chart-2", data.graph2);

            //GRAPH 3
            displayNuageDePoints("chart-3", data.graph3);
        }
    });
    
 }

$(function() {
    
    var data_JSON;
    
    $("button#loadData").on('click', function() {
        loadJSON();
    });
    
    $("#graph3_year_filter").change(function(){
        $('#refresh_graph3_year').removeClass('hidden');

        year = $(this).val();

        $.ajax({
            type: "POST",
            data: { year: year },
            dataType: "json",
            url: "./assets/core/getDataFilter.php",
            success: function (data) {
                //GRAPH 3
                $('#refresh_graph3_year').addClass('hidden');
                displayNuageDePoints("chart-3", data.graph3);
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