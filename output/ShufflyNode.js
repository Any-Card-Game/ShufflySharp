// ShufflyNode.js
(function(){
Type.registerNamespace('ShufflyNode.Libs');ShufflyNode.Libs.Guid=function(){}
ShufflyNode.Libs.Guid.newGuid=function(){var $0='';for(var $1=0;$1<25;$1++){$0+=((Math.random()*26+65));}return $0;}
Type.registerNamespace('ShufflyNode.Common');ShufflyNode.Common.IPs=function(){}
ShufflyNode.Common.IPs.get_gatewayIP=function(){return '';}
ShufflyNode.Common.IPs.get_redisIP=function(){return '';}
ShufflyNode.Common.PubSub=function(ready){this.$0={};var $0=require('redis');$0.debug_mode=false;this.$3=$0.createClient(6379,ShufflyNode.Common.IPs.get_redisIP());this.$4=$0.createClient(6379,ShufflyNode.Common.IPs.get_redisIP());this.$3.on('subscribe',function($p1_0,$p1_1){
console.log('subscribed: '+$p1_0+' '+$p1_1);});this.$3.on('unsubscribe',function($p1_0,$p1_1){
console.log('unsubscribed: '+$p1_0+' '+$p1_1);});this.$3.on('message',ss.Delegate.create(this,function($p1_0,$p1_1){
if(Object.keyExists(this.$0,$p1_0)){this.$0[$p1_0];}}));this.$3.on('ready',ss.Delegate.create(this,function(){
this.$1=true;if(this.$1&&this.$2){ready();}}));this.$4.on('ready',ss.Delegate.create(this,function(){
this.$2=true;if(this.$1&&this.$2){ready();}}));}
ShufflyNode.Common.PubSub.prototype={$1:false,$2:false,$3:null,$4:null,publish:function(channel,content){this.$4.publish(channel,content);},subscribe:function(channel,callback){this.$3.subscribe(channel);this.$0[channel]=callback;}}
ShufflyNode.Common.QueueItem=function(){}
ShufflyNode.Common.QueueItem.prototype={$0:null,get_channel:function(){return this.$0;},set_channel:function(value){this.$0=value;return value;}}
ShufflyNode.Common.ShufflyNode$0=function(queueItems){this.$0=queueItems;}
ShufflyNode.Common.ShufflyNode$0.prototype={$0:null,$1:function($p0){var $enum1=ss.IEnumerator.getEnumerator(this.$0);while($enum1.moveNext()){var $0=$enum1.current;if($0.get_channel()===$p0||!$p0.indexOf($0.get_channel().replaceAll('*',''))){return $0;}}return null;}}
ShufflyNode.Common.QueueManager=function(name,options){this.name=name;this.channels={};this.qw=[];this.qp=[];var $enum1=ss.IEnumerator.getEnumerator(options.get_watchers());while($enum1.moveNext()){var $0=$enum1.current;if($0.get_callback()==null){$0.set_callback(ss.Delegate.create(this,this.$0));}this.qw.add($0);}this.qw.addRange(options.get_watchers());var $enum2=ss.IEnumerator.getEnumerator(options.get_pushers());while($enum2.moveNext()){var $1=$enum2.current;this.qp.add(new ShufflyNode.Common.QueuePusher($1));}this.$1=new ShufflyNode.Common.ShufflyNode$0((this.qw));this.$2=new ShufflyNode.Common.ShufflyNode$0((this.qp));}
ShufflyNode.Common.QueueManager.prototype={name:null,channels:null,qw:null,qp:null,addChannel:function(channel,callback){this.channels[channel]=callback;},$0:function($p0,$p1,$p2,$p3){if(Object.keyExists(this.channels,$p2)){this.channels[$p2];}},$1:null,$2:null,sendMessage:function(user,channel,eventChannel,content){if(this.$2.$1(channel)==null){console.log(channel+' No Existy');return;}(this.$2.$1(channel)).message(channel,this.name,user,eventChannel,content);}}
ShufflyNode.Common.QueueManagerOptions=function(watchers,pushers){this.set_pushers(pushers);this.set_watchers(watchers);}
ShufflyNode.Common.QueueManagerOptions.prototype={$0:null,get_pushers:function(){return this.$0;},set_pushers:function(value){this.$0=value;return value;},$1:null,get_watchers:function(){return this.$1;},set_watchers:function(value){this.$1=value;return value;}}
ShufflyNode.Common.QueueWatcher=function(queue,callback){ShufflyNode.Common.QueueWatcher.initializeBase(this);this.set_channel(queue);this.$1=callback;var $0=require('redis');this.$2=$0.createClient(6379,ShufflyNode.Common.IPs.get_redisIP());this.cycle(queue);}
ShufflyNode.Common.QueueWatcher.prototype={$1:null,$2:null,get_callback:function(){return this.$1;},set_callback:function(value){this.$1=value;return value;},cycle:function(channel){this.$2.blpop([channel,0],ss.Delegate.create(this,function($p1_0,$p1_1){
if($p1_1!=null){var $1_0=JSON.parse($p1_1);this.get_callback()($1_0.get_name(),$1_0.get_user(),$1_0.get_eventChannel(),$1_0.get_content());}this.cycle(channel);}));}}
ShufflyNode.Common.QueuePusher=function(pusher){ShufflyNode.Common.QueuePusher.initializeBase(this);var $0=require('redis');this.set_channel(pusher);this.$1=$0.createClient(6379,ShufflyNode.Common.IPs.get_redisIP());}
ShufflyNode.Common.QueuePusher.prototype={$1:null,message:function(channel,name,user,eventChannel,content){this.$1.rpush(channel,JSON.stringify(new ShufflyNode.Common.QueueMessage(name,user,eventChannel,content)));}}
ShufflyNode.Common.QueueMessage=function(name,user,eventChannel,content){this.set_name(name);this.set_user(user);this.set_eventChannel(eventChannel);this.set_content(content);}
ShufflyNode.Common.QueueMessage.prototype={name:null,user:null,eventChannel:null,content:null,get_name:function(){return this.name;},set_name:function(value){this.name=value;return value;},get_user:function(){return this.user;},set_user:function(value){this.user=value;return value;},get_eventChannel:function(){return this.eventChannel;},set_eventChannel:function(value){this.eventChannel=value;return value;},get_content:function(){return this.content;},set_content:function(value){this.content=value;return value;}}
ShufflyNode.Common.User=function(){}
ShufflyNode.Common.User.prototype={$0:null,$1:null,get_socket:function(){return this.$1;},set_socket:function(value){this.$1=value;return value;},get_userName:function(){return this.$0;},set_userName:function(value){this.$0=value;return value;}}
Type.registerNamespace('ShufflyNode');ShufflyNode.GatewayLoginMessage=function(){}
ShufflyNode.GatewayLoginMessage.prototype={userName:null,password:null}
ShufflyNode.GatewayMessage=function(){}
ShufflyNode.GatewayMessage.prototype={channel:null,content:null,gameServer:null}
ShufflyNode.SocketClientMessage=function(user,channel,content){this.user=user;this.channel=channel;this.content=content;}
ShufflyNode.SocketClientMessage.prototype={user:null,channel:null,content:null}
ShufflyNode.GatewayServer=function(){this.users={};var $0=require('http');var $1=$0.createServer(function($p1_0,$p1_1){
$p1_1.end();});var $2=require('socket.io').listen($1);var $3=require('fs');var $4;var $5=1800+parseInt((Math.random()*4000));$1.listen($5);$2.set('log lvl',1);var $6='Gateway '+ShufflyNode.Libs.Guid.newGuid();this.ps=new ShufflyNode.Common.PubSub(ss.Delegate.create(this,function(){
this.ps.subscribe('PUBSUB.GatewayServers.Ping',ss.Delegate.create(this,function($p2_0){
this.ps.publish('PUBSUB.GatewayServers','http://'+ShufflyNode.Common.IPs.get_gatewayIP()+':'+$5);}));this.ps.publish('PUBSUB.GatewayServers','http://'+ShufflyNode.Common.IPs.get_gatewayIP()+':'+$5);}));$4=new ShufflyNode.Common.QueueManager($6,new ShufflyNode.Common.QueueManagerOptions([new ShufflyNode.Common.QueueWatcher('GatewayServer',ss.Delegate.create(this,this.$0)),new ShufflyNode.Common.QueueWatcher($6,ss.Delegate.create(this,this.$0))],['SiteServer','GameServer*','DebugServer','ChatServer','HeadServer']));$2.sockets.on('connection',ss.Delegate.create(this,function($p1_0){
var $1_0=null;$p1_0.on('Gateway.Message',function($p2_0){
var $2_0='Bad';switch($p2_0.channel.split('.')[0]){case 'Game':$2_0='GameServer';break;case 'Site':$2_0='SiteServer';break;case 'Debug':$2_0='GameServer';break;case 'Debug2':$2_0='DebugServer';break;case 'Chat':$2_0='ChatServer';break;}$4.sendMessage($1_0,$p2_0.gameServer||$2_0,$p2_0.channel,$p2_0.content);});$p1_0.on('Gateway.Login',ss.Delegate.create(this,function($p2_0){
$1_0=new ShufflyNode.Common.User();$1_0.set_socket($p1_0);$1_0.set_userName($p2_0.userName);this.users[$p2_0.userName]=$1_0;}));$p1_0.on('disconnect',ss.Delegate.create(this,function($p2_0){
delete this.users[$1_0.get_userName()];}));}));}
ShufflyNode.GatewayServer.prototype={ps:null,$0:function($p0,$p1,$p2,$p3){if(Object.keyExists(this.users,$p1.get_userName())){var $0=this.users[$p1.get_userName()];$0.get_socket().emit('Client.Message',new ShufflyNode.SocketClientMessage($p1,$p2,$p3));}}}
ShufflyNode.Libs.Guid.registerClass('ShufflyNode.Libs.Guid');ShufflyNode.Common.IPs.registerClass('ShufflyNode.Common.IPs');ShufflyNode.Common.PubSub.registerClass('ShufflyNode.Common.PubSub');ShufflyNode.Common.QueueItem.registerClass('ShufflyNode.Common.QueueItem');ShufflyNode.Common.ShufflyNode$0.registerClass('ShufflyNode.Common.ShufflyNode$0');ShufflyNode.Common.QueueManager.registerClass('ShufflyNode.Common.QueueManager');ShufflyNode.Common.QueueManagerOptions.registerClass('ShufflyNode.Common.QueueManagerOptions');ShufflyNode.Common.QueueWatcher.registerClass('ShufflyNode.Common.QueueWatcher',ShufflyNode.Common.QueueItem);ShufflyNode.Common.QueuePusher.registerClass('ShufflyNode.Common.QueuePusher',ShufflyNode.Common.QueueItem);ShufflyNode.Common.QueueMessage.registerClass('ShufflyNode.Common.QueueMessage');ShufflyNode.Common.User.registerClass('ShufflyNode.Common.User');ShufflyNode.GatewayLoginMessage.registerClass('ShufflyNode.GatewayLoginMessage');ShufflyNode.GatewayMessage.registerClass('ShufflyNode.GatewayMessage');ShufflyNode.SocketClientMessage.registerClass('ShufflyNode.SocketClientMessage');ShufflyNode.GatewayServer.registerClass('ShufflyNode.GatewayServer');})();// This script was generated using Script# v0.7.4.0
