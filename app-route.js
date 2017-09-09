var moment = require("moment");
var express = require('express');
var cors = require('cors');
var router = express.Router();


let sse = { "scoreConnList": [] };

router.get("/", function(req, res, next) {
    let resobj = { "title": "Hello WOrld" };
    res.json(resobj);
});


router.get("/sse-api", cors(), function(req, res, next) {
    // set timeout as high as possible
    req.socket.setTimeout(Number.MAX_VALUE);

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    res.write('\n');

    // Handle open event
    sse.scoreConnList.push(res);

    // Handle Close event.
    req.on("close", function() {
        var toRemove;
        for (var j = 0; j < sse.scoreConnList.length; j++) {
            if (sse.scoreConnList[j] == res) {
                toRemove = j;
                break;
            }
        }
        sse.scoreConnList.splice(j, 1);
    });

});


// SAMPLE EVENT GENERATOR
var max = 255;
var min = 100;
setInterval(function() {
    sse.scoreConnList.forEach(function(resp) {
        var rcode = Math.floor(Math.random() * (max - min + 1)) + min;
        var gcode = Math.floor(Math.random() * (max - min + 1)) + min;
        var bcode = Math.floor(Math.random() * (max - min + 1)) + min;
        var colorCode = `rgb(${rcode}, ${gcode}, ${bcode})`;

        let sresObj = {
            "title": "Affixus Systems System Pvt. Ltd",
            "ts": moment().toDate(),
            "bg": { "background-color": `${colorCode}`, "color": "WHITE" }
        };



        let sresStr = JSON.stringify(sresObj);

        var d = new Date();
        resp.write("data: " + sresStr + '\n\n'); // Note the extra newline
    });
}, 5000);




module.exports = router;