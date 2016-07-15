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
        }
    });
    
 }

$(function() {
    
    var data_JSON;
    
    $("button#loadData").on('click', function() {
        loadJSON();
    });
    
    
    
});