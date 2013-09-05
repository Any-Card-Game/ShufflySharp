//http://lisperator.net/uglifyjs/
var UglifyJS = require("uglify-js"); 
 
 
var content='shuff.break_({ty:0,line:9,funcdef:2,col:9,isLast:0,nodeID:0},(typeof self != "undefined") && self.cardGame, function (variable) { var goodVar; eval("goodVar=" + variable); return goodVar; })';
 
module.exports = {processJSFile:function(data){
 var toplevel = UglifyJS.parse(data);
 var funcID=1;
  var NODEIDS=1;
    var walker = new UglifyJS.TreeTransformer(null, function (node) {
         if(!node.NODEID){
         node.NODEID=NODEIDS++;
         }
        if(node.TYPE=="Toplevel"){
       
        return ;
        }   
        if(node.TYPE=="EmptyStatement"){
       
        return ;
        }
        
        if (Object.prototype.toString.call( node.body)=="[object Array]" && node.TYPE != "Switch" ) {
        
      //  debugger;

        var newats=UglifyJS.parse(content);
newats.body[0].body.args[0].properties[0].value.value=1;
newats.body[0].body.args[0].properties[1].value.value=node.start.line;
newats.body[0].body.args[0].properties[2].value.value=findParentFunc();
newats.body[0].body.args[0].properties[3].value.value=node.start.col;
newats.body[0].body.args[0].properties[5].value.value=node.NODEID;


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
       var parentFn=findParentFunc();

var isLast=false;
if(amLastInFunction(node)){
isLast=true;
}


var newats=UglifyJS.parse(content);
newats.body[0].body.args[0].properties[0].value.value=2;
newats.body[0].body.args[0].properties[1].value.value=node.start.line;
newats.body[0].body.args[0].properties[2].value.value=parentFn;
newats.body[0].body.args[0].properties[3].value.value=node.start.col;
newats.body[0].body.args[0].properties[5].value.value=node.NODEID;

var newats2=UglifyJS.parse(content);
newats2.body[0].body.args[0].properties[0].value.value=3;
newats2.body[0].body.args[0].properties[1].value.value=node.end.line+1;
newats2.body[0].body.args[0].properties[2].value.value=parentFn;
newats2.body[0].body.args[0].properties[3].value.value=node.end.col;
newats2.body[0].body.args[0].properties[4].value.value=isLast;
newats2.body[0].body.args[0].properties[5].value.value=node.NODEID;
var oldID=node.NODEID;
            node = new UglifyJS.AST_BlockStatement({ start: node.start, end: node.end, body: [newats,node, newats2] })
 node.NODEID=oldID;
            return node;
        }

    });
    
    var lastStatement=null;
    /*
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

    

    });*/
    var ast2 = toplevel.transform(walker);
    
   // var ast2 = ast.transform(walker2);

        console.log('done processing');
        
        return ast2.print_to_string({ beautify: true });
        
        function findParentFunc(){
          for(var i=walker.stack.length-1;i>=0;i--){
            if(walker.stack[i] instanceof UglifyJS.AST_Defun || walker.stack[i] instanceof UglifyJS.AST_Function) {
              if(!walker.stack[i].funcID){
              walker.stack[i].funcID=funcID++;
              }
              return walker.stack[i].funcID;
            }          
          }
          return -1000;
        }     
        
         function amLastInFunction(node){
         if(node.TYPE=="Return"){
         return true;
         }
          for(var i=walker.stack.length-1;i>=0;i--){
            if(walker.stack[i] instanceof UglifyJS.AST_Defun || walker.stack[i] instanceof UglifyJS.AST_Function) {
                 if(!walker.stack[i].body[walker.stack[i].body.length-1].NODEID){
         walker.stack[i].body[walker.stack[i].body.length-1].NODEID=NODEIDS++;
         }
         
         console.log(walker.stack[i].body[walker.stack[i].body.length-1].NODEID+" "+node.NODEID);
              
              if(walker.stack[i].body[walker.stack[i].body.length-1].print_to_string()==node.print_to_string()){
              return true;
              }
             return false; 
            }          
          }
          return false;
        }
}};