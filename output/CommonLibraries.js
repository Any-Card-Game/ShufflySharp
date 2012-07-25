// CommonLibraries.js
(function(){
Type.registerNamespace('CommonLibraries');CommonLibraries.GameAnswer=function(){}
CommonLibraries.GameAnswer.prototype={value:0,lineNumber:0}
CommonLibraries.Guid=function(){}
CommonLibraries.Guid.newGuid=function(){var $0='';for(var $1=0;$1<25;$1++){$0+=((Math.random()*26+65));}return $0;}
CommonLibraries.Size=function(){}
CommonLibraries.Size.prototype={width:0,height:0}
CommonLibraries.GameAnswer.registerClass('CommonLibraries.GameAnswer');CommonLibraries.Guid.registerClass('CommonLibraries.Guid');CommonLibraries.Size.registerClass('CommonLibraries.Size');})();// This script was generated using Script# v0.7.4.0
