var moment = require("moment");
var express = require('express');
var router = express.Router();

let sse = { "scoreConnList": [] };

router.get("/", function(req, res, next) {
    let resobj = { "title": "Hello WOrld" };
    res.json(resobj);
});


router.get("/score", function(req, res, next) {
    // set timeout as high as possible
    req.socket.setTimeout(Number.MAX_VALUE);

    /*
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.0.104:3001');
    */

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
setInterval(function() {
    sse.scoreConnList.forEach(function(resp) {
        let sresObj = { "title": "Affixus Systems System Pvt. Ltd", "ts": moment().toDate() };
        let sresStr = JSON.stringify(sresObj);

        var d = new Date();
        resp.write("data: " + sresStr + '\n\n'); // Note the extra newline
    });
}, 3000);




module.exports = router;