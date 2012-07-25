// CommonShuffleLibraries.js
(function(){
Type.registerNamespace('CommonShuffleLibraries');CommonShuffleLibraries.Help=function(){}
CommonShuffleLibraries.Help.sanitize=function(name,value){if(Type.getInstanceType(value)===Function){return null;}if(!!name.indexOf('_')&&name.toLowerCase()!=='socket'&&name.toLowerCase()!=='fiber'&&name.toLowerCase()!=='debuggingsocket'){return value;}return null;}
CommonShuffleLibraries.IPs=function(){}
CommonShuffleLibraries.IPs.get_gatewayIP=function(){return '50.116.22.241';}
CommonShuffleLibraries.IPs.get_redisIP=function(){return '50.116.28.16';}
CommonShuffleLibraries.PubSub=function(ready){this.$0={};var $0=require('redis');$0.debug_mode=false;this.$3=$0.createClient(6379,CommonShuffleLibraries.IPs.get_redisIP());this.$4=$0.createClient(6379,CommonShuffleLibraries.IPs.get_redisIP());this.$3.on('subscribe',function($p1_0,$p1_1){
global.console.log('subscribed: '+$p1_0+' '+$p1_1);});this.$3.on('unsubscribe',function($p1_0,$p1_1){
global.console.log('unsubscribed: '+$p1_0+' '+$p1_1);});this.$3.on('message',ss.Delegate.create(this,function($p1_0,$p1_1){
if(Object.keyExists(this.$0,$p1_0)){this.$0[$p1_0]($p1_1);}}));this.$3.on('ready',ss.Delegate.create(this,function(){
this.$1=true;if(this.$1&&this.$2){ready();}}));this.$4.on('ready',ss.Delegate.create(this,function(){
this.$2=true;if(this.$1&&this.$2){ready();}}));}
CommonShuffleLibraries.PubSub.prototype={$1:false,$2:false,$3:null,$4:null,publish:function(channel,content){this.$4.publish(channel,content);},subscribe:function(channel,callback){this.$3.subscribe(channel);this.$0[channel]=callback;}}
CommonShuffleLibraries.QueueItem=function(){}
CommonShuffleLibraries.QueueItem.prototype={$0:null,get_channel:function(){return this.$0;},set_channel:function(value){this.$0=value;return value;}}
CommonShuffleLibraries.QueueManager=function(name,options){this.name=name;this.channels={};this.qw=[];this.qp=[];var $enum1=ss.IEnumerator.getEnumerator(options.get_watchers());while($enum1.moveNext()){var $0=$enum1.current;if($0.get_callback()==null){$0.set_callback(ss.Delegate.create(this,this.$0));}this.qw.add($0);}this.qw.addRange(options.get_watchers());var $enum2=ss.IEnumerator.getEnumerator(options.get_pushers());while($enum2.moveNext()){var $1=$enum2.current;this.qp.add(new CommonShuffleLibraries.QueuePusher($1));}this.$1=new CommonShuffleLibraries._QueueItemCollection((this.qw));this.$2=new CommonShuffleLibraries._QueueItemCollection((this.qp));}
CommonShuffleLibraries.QueueManager.prototype={name:null,channels:null,qw:null,qp:null,addChannel:function(channel,callback){this.channels[channel]=callback;},$0:function($p0,$p1,$p2,$p3){$p1.gateway=$p0;if(Object.keyExists(this.channels,$p2)){this.channels[$p2]($p1,$p3);}},$1:null,$2:null,sendMessage:function(user,channel,eventChannel,content){if(this.$2.$1(channel)==null){global.console.log(channel+' No Existy');return;}(this.$2.$1(channel)).message(channel,this.name,user,eventChannel,content);}}
CommonShuffleLibraries.QueueManagerOptions=function(watchers,pushers){this.set_pushers(pushers);this.set_watchers(watchers);}
CommonShuffleLibraries.QueueManagerOptions.prototype={$0:null,get_pushers:function(){return this.$0;},set_pushers:function(value){this.$0=value;return value;},$1:null,get_watchers:function(){return this.$1;},set_watchers:function(value){this.$1=value;return value;}}
CommonShuffleLibraries.QueuePusher=function(pusher){CommonShuffleLibraries.QueuePusher.initializeBase(this);var $0=require('redis');this.set_channel(pusher);this.$1=$0.createClient(6379,CommonShuffleLibraries.IPs.get_redisIP());}
CommonShuffleLibraries.QueuePusher.prototype={$1:null,message:function(channel,name,user,eventChannel,content){this.$1.rpush(channel,JSON.stringify(new CommonShuffleLibraries.QueueMessage(name,user,eventChannel,content),CommonShuffleLibraries.Help.sanitize));}}
CommonShuffleLibraries.QueueMessage=function(name,user,eventChannel,content){this.name=name;this.user=user;this.eventChannel=eventChannel;this.content=content;}
CommonShuffleLibraries.QueueMessage.prototype={name:null,user:null,eventChannel:null,content:null}
CommonShuffleLibraries.QueueWatcher=function(queue,callback){CommonShuffleLibraries.QueueWatcher.initializeBase(this);this.set_channel(queue);this.$1=callback;var $0=require('redis');($0)['foo']=2;this.$2=$0.createClient(6379,CommonShuffleLibraries.IPs.get_redisIP());this.cycle(queue);}
CommonShuffleLibraries.QueueWatcher.prototype={$1:null,$2:null,get_callback:function(){return this.$1;},set_callback:function(value){this.$1=value;return value;},cycle:function(channel){this.$2.blpop([channel,0],ss.Delegate.create(this,function($p1_0,$p1_1){
var $1_0=$p1_1;if($p1_1!=null){var $1_1=JSON.parse($1_0[1]);this.get_callback()($1_1.name,$1_1.user,$1_1.eventChannel,$1_1.content);}this.cycle(channel);}));}}
CommonShuffleLibraries._QueueItemCollection=function(queueItems){this.$0=queueItems;}
CommonShuffleLibraries._QueueItemCollection.prototype={$0:null,$1:function($p0){var $enum1=ss.IEnumerator.getEnumerator(this.$0);while($enum1.moveNext()){var $0=$enum1.current;if($0.get_channel()===$p0||!$p0.indexOf($0.get_channel().replaceAll('*',''))){return $0;}}return null;}}
CommonShuffleLibraries.User=function(){}
CommonShuffleLibraries.User.prototype={socket:null,gateway:null,userName:null}
CommonShuffleLibraries.Consumer=function(obj){var $0=(this);var $enum1=ss.IEnumerator.getEnumerator(Object.keys(obj));while($enum1.moveNext()){var $1=$enum1.current;$0[$1]=obj[$1];}}
CommonShuffleLibraries.Help.registerClass('CommonShuffleLibraries.Help');CommonShuffleLibraries.IPs.registerClass('CommonShuffleLibraries.IPs');CommonShuffleLibraries.PubSub.registerClass('CommonShuffleLibraries.PubSub');CommonShuffleLibraries.QueueItem.registerClass('CommonShuffleLibraries.QueueItem');CommonShuffleLibraries.QueueManager.registerClass('CommonShuffleLibraries.QueueManager');CommonShuffleLibraries.QueueManagerOptions.registerClass('CommonShuffleLibraries.QueueManagerOptions');CommonShuffleLibraries.QueuePusher.registerClass('CommonShuffleLibraries.QueuePusher',CommonShuffleLibraries.QueueItem);CommonShuffleLibraries.QueueMessage.registerClass('CommonShuffleLibraries.QueueMessage');CommonShuffleLibraries.QueueWatcher.registerClass('CommonShuffleLibraries.QueueWatcher',CommonShuffleLibraries.QueueItem);CommonShuffleLibraries._QueueItemCollection.registerClass('CommonShuffleLibraries._QueueItemCollection');CommonShuffleLibraries.User.registerClass('CommonShuffleLibraries.User');CommonShuffleLibraries.Consumer.registerClass('CommonShuffleLibraries.Consumer');})();// This script was generated using Script# v0.7.4.0
