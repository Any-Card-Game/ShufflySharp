//http://lisperator.net/uglifyjs/
var UglifyJS = require("uglify-js");
/*
var fs = require('fs');
var content='shuff.break_({ty:-1,line:9,funcdef:2,col:9},(typeof self != "undefined") && self.cardGame, function (variable) { var goodVar; eval("goodVar=" + variable); return goodVar; })';


var funcd = 1;
var mmf = process.argv[2];
var doo = mmf + '.js';
fs.readFile(mmf, 'utf8', function (err, data) {
    if (err) throw err; 
    var toplevel = UglifyJS.parse(data);
  
    var walker = new UglifyJS.TreeTransformer(null, function (node) {
         
        if(node.TYPE=="Toplevel"){
       
        return ;
        }   
        if(node.TYPE=="EmptyStatement"){
       
        return ;
        }
        
        if (Object.prototype.toString.call( node.body)=="[object Array]" && node.TYPE != "Switch" ) {
        
      //  debugger;

        var newats=UglifyJS.parse(content);
newats.body[0].body.args[0].properties[1].value.value=node.start.line;
newats.body[0].body.args[0].properties[2].value.value=1;
newats.body[0].body.args[0].properties[3].value.value=node.start.col;

          node.body.unshift(newats);
        return node; 
        } 

        if (node instanceof UglifyJS.AST_Statement) {
            if (node instanceof UglifyJS.AST_BlockStatement)
                return;
             
            if (node.TYPE == "Case"  || (walker.parent() != null && walker.parent().TYPE == "For")) {
                return;
            } 
            
      //  debugger;
       
var newats=UglifyJS.parse(content);
newats.body[0].body.args[0].properties[1].value.value=node.start.line;
newats.body[0].body.args[0].properties[2].value.value=2;
newats.body[0].body.args[0].properties[3].value.value=node.start.col;

var newats2=UglifyJS.parse(content);
newats2.body[0].body.args[0].properties[1].value.value=node.end.line+1;
newats2.body[0].body.args[0].properties[2].value.value=3;
newats2.body[0].body.args[0].properties[3].value.value=node.end.col;


            node = new UglifyJS.AST_BlockStatement({ start: node.start, end: node.end, body: [newats,node, newats2] })
 
            return node;
        }

    });
    
    var lastStatement=null;
    
      var walker2 = new UglifyJS.TreeTransformer(null, function (node) {
        if (node instanceof UglifyJS.AST_Statement) {
        debugger;
          if (node instanceof UglifyJS.AST_Call) {
            if(node.expression.property=="break_"){
              if(lastStatement!=null){
                return new UglifyJS.AST_EmptyStatement({start:node.start,end:node.end});
              }else{
                lastStatement=node;
                return node;
              }
              
            }else 
            {
            lastStatement=null;
              return node; 
            }
          } else{
            lastStatement=null;
            return node;
          } 
        
        } else{
            return node;
          }

    

    });
    var ast = toplevel.transform(walker);
    
    var ast2 = ast.transform(walker2);

    fs.writeFile(doo, ast2.print_to_string({ beautify: true }));

    console.log('done');
});*/


 
 
var content='shuff.break_({ty:-1,line:9,funcdef:2,col:9},(typeof self != "undefined") && self.cardGame, function (variable) { var goodVar; eval("goodVar=" + variable); return goodVar; })';
 
 
module.exports = {processJSFile:function(data){
 var toplevel = UglifyJS.parse(data);
  
    var walker = new UglifyJS.TreeTransformer(null, function (node) {
         
        if(node.TYPE=="Toplevel"){
       
        return ;
        }   
        if(node.TYPE=="EmptyStatement"){
       
        return ;
        }
        
        if (Object.prototype.toString.call( node.body)=="[object Array]" && node.TYPE != "Switch" ) {
        
      //  debugger;

        var newats=UglifyJS.parse(content);
newats.body[0].body.args[0].properties[1].value.value=node.start.line;
newats.body[0].body.args[0].properties[2].value.value=1;
newats.body[0].body.args[0].properties[3].value.value=node.start.col;

          node.body.unshift(newats);
        return node; 
        } 

        if (node instanceof UglifyJS.AST_Statement) {
            if (node instanceof UglifyJS.AST_BlockStatement)
                return;
             
            if (node.TYPE == "Case"  || (walker.parent() != null && walker.parent().TYPE == "For")) {
                return;
            } 
            
      //  debugger;
       
var newats=UglifyJS.parse(content);
newats.body[0].body.args[0].properties[1].value.value=node.start.line;
newats.body[0].body.args[0].properties[2].value.value=2;
newats.body[0].body.args[0].properties[3].value.value=node.start.col;

var newats2=UglifyJS.parse(content);
newats2.body[0].body.args[0].properties[1].value.value=node.end.line+1;
newats2.body[0].body.args[0].properties[2].value.value=3;
newats2.body[0].body.args[0].properties[3].value.value=node.end.col;


            node = new UglifyJS.AST_BlockStatement({ start: node.start, end: node.end, body: [newats,node, newats2] })
 
            return node;
        }

    });
    
    var lastStatement=null;
    
      var walker2 = new UglifyJS.TreeTransformer(null, function (node) {
        if (node instanceof UglifyJS.AST_Statement) {
        debugger;
          if (node instanceof UglifyJS.AST_Call) {
            if(node.expression.property=="break_"){
              if(lastStatement!=null){
                return new UglifyJS.AST_EmptyStatement({start:node.start,end:node.end});
              }else{
                lastStatement=node;
                return node;
              }
              
            }else 
            {
            lastStatement=null;
              return node; 
            }
          } else{
            lastStatement=null;
            return node;
          } 
        
        } else{
            return node;
          }

    

    });
    var ast = toplevel.transform(walker);
    
    var ast2 = ast.transform(walker2);

        console.log('done processing');
        
        return ast2.print_to_string({ beautify: true });
}};