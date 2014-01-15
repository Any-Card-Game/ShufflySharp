//http://lisperator.net/uglifyjs/
var processor = require("./uglify5.js");
var fs = require('fs');
var content='shuff.break_({ty:-1,line:9,funcdef:2,col:9},(typeof self != "undefined") && self.cardGame, function (variable) { var goodVar; eval("goodVar=" + variable); return goodVar; })';


var mmf = process.argv[2];
var doo = mmf + '.js';
fs.readFile(mmf, 'utf8', function (err, data) {
    if (err) throw err; 
    
    fs.writeFile(doo, processor.processJSFile(data));

    console.log('done');
});

 