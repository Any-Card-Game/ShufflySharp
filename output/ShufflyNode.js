// ShufflyNode.js
(function(){
Type.registerNamespace('ShufflyNode.Common');ShufflyNode.Common.IPs=function(){}
ShufflyNode.Common.IPs.get_gatewayIP=function(){return '';}
Type.registerNamespace('ShufflyNode.GameServer');ShufflyNode.GameServer.PubSub=function(started){var $0=require('redis');}
ShufflyNode.GameServer.PubSub.prototype={publish:function(pubsubGatewayservers,s){},subscribe:function(pubsubGatewayserversPing,action){}}
ShufflyNode.GameServer.QueueManager=function(gatewayIndex,queueManagerOptions){}
ShufflyNode.GameServer.QueueManager.prototype={sendMessage:function(user,s,content){}}
ShufflyNode.GameServer.QueueManagerOptions=function(queueManagerWatchers,strings){}
ShufflyNode.GameServer.QueueManagerWatcher=function(queue,callback){this.$1=queue;this.$0=callback;}
ShufflyNode.GameServer.QueueManagerWatcher.prototype={$0:null,$1:null,get_queueName:function(){return this.$1;},set_queueName:function(value){this.$1=value;return value;},get_callback:function(){return this.$0;},set_callback:function(value){this.$0=value;return value;}}
ShufflyNode.GameServer.User=function(){}
ShufflyNode.GameServer.User.prototype={$0:null,$1:null,get_socket:function(){return this.$1;},set_socket:function(value){this.$1=value;return value;},get_userName:function(){return this.$0;},set_userName:function(value){this.$0=value;return value;}}
Type.registerNamespace('ShufflyNode');ShufflyNode.GatewayLoginMessage=function(){}
ShufflyNode.GatewayLoginMessage.prototype={userName:null,password:null}
ShufflyNode.GatewayMessage=function(){}
ShufflyNode.GatewayMessage.prototype={channel:null,content:null,gameServer:null}
ShufflyNode.SocketClientMessage=function(user,channel,content){this.user=user;this.channel=channel;this.content=content;}
ShufflyNode.SocketClientMessage.prototype={user:null,channel:null,content:null}
ShufflyNode.GatewayServer=function(){this.users={};var $0=require('http');var $1=$0.createServer(function($p1_0,$p1_1){
$p1_1.end();});var $2=require('socket.io').listen($1);var $3=require('fs');var $4=new ShufflyNode.Libs.Guid();var $5;var $6=1800+parseInt((Math.random()*4000));$1.listen($6);$2.set('log lvl',1);var $7='Gateway '+$4.newGuid();this.ps=new ShufflyNode.GameServer.PubSub(ss.Delegate.create(this,function(){
this.ps.subscribe('PUBSUB.GatewayServers.Ping',ss.Delegate.create(this,function($p2_0){
this.ps.publish('PUBSUB.GatewayServers','http://'+ShufflyNode.Common.IPs.get_gatewayIP()+':'+$6);}));this.ps.publish('PUBSUB.GatewayServers','http://'+ShufflyNode.Common.IPs.get_gatewayIP()+':'+$6);}));$5=new ShufflyNode.GameServer.QueueManager($7,new ShufflyNode.GameServer.QueueManagerOptions([new ShufflyNode.GameServer.QueueManagerWatcher('GatewayServer',ss.Delegate.create(this,this.$0)),new ShufflyNode.GameServer.QueueManagerWatcher($7,ss.Delegate.create(this,this.$0))],['SiteServer','GameServer*','DebugServer','ChatServer','HeadServer']));$2.get_sockets().emit('connection',ss.Delegate.create(this,function($p1_0){
var $1_0=null;$p1_0.emit('Gateway.Message',function($p2_0){
var $2_0='Bad';switch($p2_0.channel.split('.')[0]){case 'Game':$2_0='GameServer';break;case 'Site':$2_0='SiteServer';break;case 'Debug':$2_0='GameServer';break;case 'Debug2':$2_0='DebugServer';break;case 'Chat':$2_0='ChatServer';break;}$5.sendMessage($1_0,$p2_0.gameServer||$2_0,$p2_0.content);});$p1_0.emit('Gateway.Login',ss.Delegate.create(this,function($p2_0){
$1_0=new ShufflyNode.GameServer.User();$1_0.set_socket($p1_0);$1_0.set_userName($p2_0.userName);this.users[$p2_0.userName]=$1_0;}));$p1_0.emit('disconnect',ss.Delegate.create(this,function($p2_0){
delete this.users[$1_0.get_userName()];}));}));}
ShufflyNode.GatewayServer.prototype={ps:null,$0:function($p0,$p1,$p2,$p3){if(Object.keyExists(this.users,$p1.get_userName())){var $0=this.users[$p1.get_userName()];$0.get_socket().emit('Client.Message',new ShufflyNode.SocketClientMessage($p1,$p2,$p3));}}}
Type.registerNamespace('ShufflyNode.Libs');ShufflyNode.Libs.FS=function(){ShufflyNode.Libs.FS.initializeBase(this);}
ShufflyNode.Libs.Guid=function(){ShufflyNode.Libs.Guid.initializeBase(this);}
ShufflyNode.Libs.Guid.prototype={newGuid:function(){var $0='';for(var $1=0;$1<25;$1++){$0+=((Math.random()*26+65));}return $0;}}
ShufflyNode.Common.IPs.registerClass('ShufflyNode.Common.IPs');ShufflyNode.GameServer.PubSub.registerClass('ShufflyNode.GameServer.PubSub');ShufflyNode.GameServer.QueueManager.registerClass('ShufflyNode.GameServer.QueueManager');ShufflyNode.GameServer.QueueManagerOptions.registerClass('ShufflyNode.GameServer.QueueManagerOptions');ShufflyNode.GameServer.QueueManagerWatcher.registerClass('ShufflyNode.GameServer.QueueManagerWatcher');ShufflyNode.GameServer.User.registerClass('ShufflyNode.GameServer.User');ShufflyNode.GatewayLoginMessage.registerClass('ShufflyNode.GatewayLoginMessage');ShufflyNode.GatewayMessage.registerClass('ShufflyNode.GatewayMessage');ShufflyNode.SocketClientMessage.registerClass('ShufflyNode.SocketClientMessage');ShufflyNode.GatewayServer.registerClass('ShufflyNode.GatewayServer');ShufflyNode.Libs.FS.registerClass('ShufflyNode.Libs.FS',NodeJS.NodeModule);ShufflyNode.Libs.Guid.registerClass('ShufflyNode.Libs.Guid',NodeJS.NodeModule);})();// This script was generated using Script# v0.7.4.0
