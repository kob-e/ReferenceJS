var IndexUrl = window.location.href;
var frameworks = [];
frameworks['Uncaught ReferenceError: $ is not defined'] = 'https://code.jquery.com/jquery-2.1.4.min.js';
frameworks['Uncaught ReferenceError: Backbone is not defined'] = 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min.js';

function readTextFile(file, line) {

    //only js files
    if (!file.match(/\.(js)$/))
        return;

    line = line - 1; // 1 step closer
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                var lines = rawFile.responseText.split(/\r\n|\r|\n/g);
                for (; line < lines.length; line++) {
                    eval(lines[line]);
                }
            }
        }
    }
    rawFile.send(null);
}

window.onerror = function (msg, file, line, col, error) {
    console.log(file);
    //load the correct pacakge
    var src = frameworks[msg];
    if (file != IndexUrl)
    {
        //after the script is executed we need to continue the main run.
    }
    var script = document.createElement('script');
    script.src = src;
    script.onload = function () {
        readTextFile(file, line, col);
    };
    document.head.appendChild(script);
}
