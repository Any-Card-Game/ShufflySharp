// GatewayServer.js
(function(){
Type.registerNamespace('GatewayServer');GatewayServer.GatewayLoginMessage=function(){}
GatewayServer.GatewayLoginMessage.prototype={userName:null,password:null}
GatewayServer.GatewayMessage=function(){}
GatewayServer.GatewayMessage.prototype={channel:null,content:null,gameServer:null}
GatewayServer.GatewayServer=function(){this.users={};var $0=require('http');var $1=$0.createServer(function($p1_0,$p1_1){
$p1_1.end();});var $2=require('socket.io').listen($1);var $3=require('fs');var $4;var $5=1800+parseInt((Math.random()*4000));$1.listen($5);$2.set('log level',1);var $6='Gateway '+CommonLibraries.Guid.newGuid();this.ps=new CommonShuffleLibraries.PubSub(ss.Delegate.create(this,function(){
this.ps.subscribe('PUBSUB.GatewayServers.Ping',ss.Delegate.create(this,function($p2_0){
this.ps.publish('PUBSUB.GatewayServers','http://'+CommonShuffleLibraries.IPs.get_gatewayIP()+':'+$5);}));this.ps.publish('PUBSUB.GatewayServers','http://'+CommonShuffleLibraries.IPs.get_gatewayIP()+':'+$5);}));$4=new CommonShuffleLibraries.QueueManager($6,new CommonShuffleLibraries.QueueManagerOptions([new CommonShuffleLibraries.QueueWatcher('GatewayServer',ss.Delegate.create(this,this.$0)),new CommonShuffleLibraries.QueueWatcher($6,ss.Delegate.create(this,this.$0))],['SiteServer','GameServer*','DebugServer','ChatServer','HeadServer']));$2.sockets.on('connection',ss.Delegate.create(this,function($p1_0){
var $1_0=null;$p1_0.on('Gateway.Message',function($p2_0){
var $2_0='Bad';switch($p2_0.channel.split('.')[1]){case 'Game':$2_0='GameServer';break;case 'Site':$2_0='SiteServer';break;case 'Debug':$2_0='GameServer';break;case 'Debug2':$2_0='DebugServer';break;case 'Chat':$2_0='ChatServer';break;}$4.sendMessage($1_0,$p2_0.gameServer||$2_0,$p2_0.channel,$p2_0.content);});$p1_0.on('Gateway.Login',ss.Delegate.create(this,function($p2_0){
$1_0=new CommonShuffleLibraries.User();$1_0.socket=$p1_0;$1_0.userName=$p2_0.userName;this.users[$p2_0.userName]=$1_0;}));$p1_0.on('disconnect',ss.Delegate.create(this,function($p2_0){
delete this.users[$1_0.userName];}));}));}
GatewayServer.GatewayServer.prototype={ps:null,$0:function($p0,$p1,$p2,$p3){if(Object.keyExists(this.users,$p1.userName)){var $0=this.users[$p1.userName];$0.socket.emit('Client.Message',new GatewayServer.SocketClientMessage($p1,$p2,$p3));}}}
GatewayServer.SocketClientMessage=function(user,channel,content){this.user=user;this.channel=channel;this.content=content;}
GatewayServer.SocketClientMessage.prototype={user:null,channel:null,content:null}
GatewayServer.GatewayLoginMessage.registerClass('GatewayServer.GatewayLoginMessage');GatewayServer.GatewayMessage.registerClass('GatewayServer.GatewayMessage');GatewayServer.GatewayServer.registerClass('GatewayServer.GatewayServer');GatewayServer.SocketClientMessage.registerClass('GatewayServer.SocketClientMessage');})();// This script was generated using Script# v0.7.4.0
