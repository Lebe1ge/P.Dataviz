function loadJSON(callback) {   

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "./assets/core/getData.php",
        success: function (data) {
            // replace div's content with returned data
            console.log(data);
            displayTreemap("#chart-1", data);
        }
    });
 }

$(function() {
    
    var data_JSON;
    
    $("button#loadData").on('click', function() {
        loadJSON(function(response) {
            // Parse JSON string into object
            //data_JSON = JSON.parse(response);
            alert('Chargement réussi');
            //console.log(data_JSON.length);
        });
    });
    
    
    
});