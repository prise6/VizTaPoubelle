export function loadJSON(url, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", url, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

export function getNbHabColor(d) {
    return d > 100000
        ? "#bd0026"
        : d > 60000
            ? "#f03b20"
            : d > 30000
                ? "#fd8d3c"
                : d > 10000
                    ? "#fecc5c"
                    : "#ffffb2";
}

// C'est moche mais pas le temps
export function getColor(v, legend){
    let colors = legend.colors;
    let values = legend.values;
    var color = null;
    for(var i = 0; i < values.length; i++){
        if(v >= values[i]){
            color = colors[i];
            break;
        }
    }

    return color;
}