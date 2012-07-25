//! HeadServer.debug.js
//

(function() {

Type.registerNamespace('HeadServer');

////////////////////////////////////////////////////////////////////////////////
// HeadServer.HeadServer

HeadServer.HeadServer = function HeadServer_HeadServer() {
    /// <field name="_fs" type="NodeJSLibrary.FS">
    /// </field>
    /// <field name="__dirname" type="String">
    /// </field>
    /// <field name="_indexPageData" type="String">
    /// </field>
    /// <field name="_qManager" type="CommonShuffleLibraries.QueueManager">
    /// </field>
    /// <field name="_pubsub" type="CommonShuffleLibraries.PubSub">
    /// </field>
    /// <field name="_indexForSites" type="Array">
    /// </field>
    /// <field name="_gateways" type="Array">
    /// </field>
    /// <field name="_oldGateways" type="Array">
    /// </field>
    /// <field name="_oldIndex" type="Array">
    /// </field>
    /// <field name="_siteIndex" type="Number" integer="true">
    /// </field>
    this._fs = require('fs');
    this._indexForSites = [];
    this._gateways = [];
    this._oldGateways = [];
    this._oldIndex = [];
    this._qManager = new CommonShuffleLibraries.QueueManager('Head1', new CommonShuffleLibraries.QueueManagerOptions([ new CommonShuffleLibraries.QueueWatcher('HeadServer', null), new CommonShuffleLibraries.QueueWatcher('Head1', null) ], [ 'GatewayServer' ]));
    this._fs.readFile(this.__dirname + '/index.html', ss.Delegate.create(this, this.ready));
    this._pubsub = new CommonShuffleLibraries.PubSub(ss.Delegate.create(this, function() {
        this._pubsub.subscribe('PUBSUB.GatewayServers', ss.Delegate.create(this, function(message) {
            this._indexForSites.add(this._indexPageData.replaceAll('{{gateway}}', message.toString()));
            this._gateways.add(message.toString());
        }));
    }));
    require('http').createServer(ss.Delegate.create(this, this._handlerWS)).listen(8844);
    this._qManager.addChannel('Head.GatewayUpdate', ss.Delegate.create(this, function(user, data) {
        this._indexForSites.add(this._indexPageData.replaceAll('{{gateway}}', data.toString()));
        this._gateways.add(data.toString());
    }));
    setInterval(ss.Delegate.create(this, this._pollGateways), 5000);
    this._pollGateways();
}
HeadServer.HeadServer.prototype = {
    __dirname: '/usr/local/src/headServer',
    _indexPageData: null,
    _qManager: null,
    _pubsub: null,
    _siteIndex: 0,
    
    _pollGateways: function HeadServer_HeadServer$_pollGateways() {
        this._pubsub.publish('PUBSUB.GatewayServers.Ping', '');
        if (this._indexForSites.length > 0) {
            this._oldIndex = this._indexForSites;
        }
        if (this._gateways.length > 0) {
            this._oldGateways = this._gateways;
        }
        this._indexForSites = [];
        this._gateways = [];
        this._siteIndex = 0;
    },
    
    _handlerWS: function HeadServer_HeadServer$_handlerWS(request, response) {
        /// <param name="request" type="NodeJSLibrary.HttpRequest">
        /// </param>
        /// <param name="response" type="NodeJSLibrary.HttpResponse">
        /// </param>
        if (this._oldGateways.length > 0) {
            var inj = (this._siteIndex++) % this._oldIndex.length;
            response.end(this._oldGateways[inj]);
            return;
        }
        response.end();
    },
    
    _handler: function HeadServer_HeadServer$_handler(request, response) {
        /// <param name="request" type="NodeJSLibrary.HttpRequest">
        /// </param>
        /// <param name="response" type="NodeJSLibrary.HttpResponse">
        /// </param>
        var dict = {};
        dict['Content-Type'] = 'text/html';
        if (this._oldIndex.length > 0) {
            response.writeHead(200, dict);
            var inj = (this._siteIndex++) % this._oldIndex.length;
            response.end(this._oldIndex[inj]);
        }
        else {
            response.writeHead(200, dict);
            response.end();
        }
    },
    
    ready: function HeadServer_HeadServer$ready(error, content) {
        /// <param name="error" type="NodeJSLibrary.FileSystemError">
        /// </param>
        /// <param name="content" type="Object">
        /// </param>
        this._indexPageData = content.toString();
        require('http').createServer(ss.Delegate.create(this, this._handler)).listen(80);
    }
}


HeadServer.HeadServer.registerClass('HeadServer.HeadServer');
})();

//! This script was generated using Script# v0.7.4.0
