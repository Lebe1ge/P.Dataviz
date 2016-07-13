function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'assets/dataset/xhamster/xhamster.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

$(function() {
    
    var data_JSON;
    
    $("button#loadData").on('click', function() {
        loadJSON(function(response) {
            // Parse JSON string into object
            data_JSON = JSON.parse(response);
            alert('Chargement réussi');
            console.log(data_JSON.length);
        });
    });
    
    
    
});