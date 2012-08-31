
Type.registerNamespace('Client');
////////////////////////////////////////////////////////////////////////////////
// Client.BuildSite
Client.BuildSite = function(gatewayServerAddress) {
	this.$gatewayServerAddress = null;
	this.codeArea = null;
	this.devArea = null;
	this.home = null;
	this.questionArea = null;
	this.$scriptLoader = new Client.ScriptLoader();
	this.$shuffUIManager = null;
	Client.BuildSite.instance = this;
	this.$gatewayServerAddress = gatewayServerAddress;
	var url = 'http://50.116.22.241:8881/';
	(window).topLevel = url;
	this.$loadCss(url + 'lib/jquery-ui-1.8.20.custom.css');
	this.$loadCss(url + 'lib/codemirror/codemirror.css');
	this.$loadCss(url + 'lib/site.css');
	this.$loadCss(url + 'lib/codemirror/theme/night.css');
	this.$loadCss(url + 'lib/jqwidgets/styles/jqx.base.css');
	this.$scriptLoader.loadSync([url + 'lib/jquery-1.7.2.min.js', url + 'lib/jquery-ui-1.8.20.custom.min.js', url + 'lib/jqwidgets/scripts/gettheme.js', url + 'lib/jqwidgets/jqxcore.js'], Function.mkdel(this, function() {
		this.$scriptLoader.load([url + 'lib/jqwidgets/jqxbuttons.js', url + 'lib/jqwidgets/jqxscrollbar.js', url + 'lib/linq.js', url + 'lib/tween.js', url + 'lib/socket.io.js', url + 'lib/codemirror/codemirror.js', url + 'lib/jqwidgets/jqxlistbox.js'], false, Function.mkdel(this, function() {
			this.$scriptLoader.load([url + 'lib/codemirror/mode/javascript/javascript.js', url + 'lib/WorkerConsole.js', url + 'lib/FunctionWorker.js', url + 'lib/Stats.js', url + 'lib/keyboardjs.js', url + 'lib/Dialog.js'], false, Function.mkdel(this, function() {
				this.$scriptLoader.load([url + 'CommonLibraries.js', url + 'ShuffleGameLibrary.js', url + 'Models.js'], true, Function.mkdel(this, function() {
					this.$scriptLoader.load([url + 'lib/RawDeflate.js'], true, Function.mkdel(this, this.$ready));
				}));
			}));
		}));
	}));
};
Client.BuildSite.prototype = {
	$ready: function() {
		var elem = document.getElementById('loading');
		elem.parentNode.removeChild(elem);
		var stats = new xStats();
		document.body.appendChild(stats.element);
		window.setTimeout(function() {
			($('.xstats')).css('right', '0px');
			($('.xstats')).css('position', 'absolute');
			($('.xstats')).css('z-index', '9998!important');
			($('.xstats')).children().css('z-index', '9998!important');
		}, 1000);
		var pageHandler = new Client.PageHandler(this.$gatewayServerAddress, this);
		var shuffUIManager = new Client.ShuffUI.ShuffUIManager();
		this.$shuffUIManager = shuffUIManager;
		var $t1 = new (Type.makeGenericType(Client.ShuffUI.ShuffWindow$1, [Client.Information.HomeAreaInformation]).$ctor1)(new Client.Information.HomeAreaInformation());
		$t1.title = 'CardGame';
		$t1.set_x(($('body')).innerWidth() - 500);
		$t1.set_y(100);
		$t1.set_width(Client.ShuffUI.Number.op_Implicit$2(420));
		$t1.set_height(Client.ShuffUI.Number.op_Implicit$2(450));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(false);
		this.home = shuffUIManager.createWindow(Client.Information.HomeAreaInformation).call(shuffUIManager, $t1);
		var $t3 = this.home;
		var $t2 = Client.ShuffUI.ShuffButtonOptions.$ctor();
		$t2.x = 280;
		$t2.y = 54;
		$t2.width = Client.ShuffUI.Number.op_Implicit$2(150);
		$t2.height = Client.ShuffUI.Number.op_Implicit$2(25);
		$t2.text = 'Update game list';
		$t2.onClick = Function.mkdel(this, function(e) {
			pageHandler.gateway.emit('Area.Game.GetGames', this.devArea.data.gameServer, null);
			//NO EMIT'ING OUTSIDE OF PageHandler
		});
		$t3.addElement(Client.ShuffUI.ShuffButton).call($t3, new Client.ShuffUI.ShuffButton($t2));
		//home.AddButton(new ShuffButton()
		//{
		//X = 280,
		//Y = 84,
		//Width = "150",
		//Height = "25",
		//Text = "Create Game",
		//Click = (e) =>
		//{
		//
		//pageHandler.gateway.Emit("Area.Game.Create", new { user = new { userName = home.Data.txtUserName[0].NodeValue } }, devArea.Data.gameServer); //NO EMIT'ING OUTSIDE OF PageHandler
		//
		//
		//}
		//});
		var $t6 = this.home.data;
		var $t5 = this.home;
		var $t4 = Client.ShuffUI.ShuffButtonOptions.$ctor();
		$t4.x = 280;
		$t4.y = 164;
		$t4.width = Client.ShuffUI.Number.op_Implicit$2(120);
		$t4.height = Client.ShuffUI.Number.op_Implicit$2(25);
		$t4.text = 'Start Game';
		$t4.onClick = Function.mkdel(this, function(e1) {
			pageHandler.gateway.emit('Area.Game.Start', Models.StartGameRequestModel.$ctor(pageHandler.gameStuff.roomID), this.devArea.data.gameServer);
			//NO EMIT"ING OUTSIDE OF PageHandler
		});
		$t6.btnStartGame = $t5.addElement(Client.ShuffUI.ShuffButton).call($t5, new Client.ShuffUI.ShuffButton($t4));
		var randomName = '';
		var ra = Math.random() * 10;
		for (var i = 0; i < ra; i++) {
			randomName += String.fromCharCode(ss.Int32.trunc(65 + Math.random() * 26));
		}
		var $t9 = this.home.data;
		var $t8 = this.home;
		var $t7 = Client.ShuffUI.ShuffTextboxOptions.$ctor();
		$t7.x = 130;
		$t7.y = 43;
		$t7.width = Client.ShuffUI.Number.op_Implicit$2(130);
		$t7.height = Client.ShuffUI.Number.op_Implicit$2(20);
		$t7.text = randomName;
		$t7.label = 'Username=';
		$t9.txtUserName = $t8.addElement(Client.ShuffUI.ShuffTextbox).call($t8, new Client.ShuffUI.ShuffTextbox($t7));
		//home.Data.gameList = home.AddListBox(new ShuffListBox()
		//{
		//X = 30,
		//Y = 85,
		//Width = "215",
		//Height = "150".ToString(),
		//Label = "Rooms",
		//Click = (e) =>
		//{
		//pageHandler.gateway.Emit("Area.Game.Join", new { roomID = "foo", user = new { userName = home.Data.txtUserName.GetValue() } }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
		//}
		//});
		//
		//            home.Data.userList = home.AddElement(new ShuffListBox(new ShuffListBoxOptions() {
		//
		//            X = 30,
		//
		//            Y = 280,
		//
		//            Width = 215,
		//
		//            Height = 25 * 5,
		//
		//            Label = "Users"
		//
		//            }));
		this.home.data.loadRoomInfo = function(room) {
			//
			//
			//                home.Data.userList.Remove();
			//
			//
			//                home.Data.btnStartGame.CSS("display","block");
			//
			//
			//                
			//
			//
			//                var users = new List<string>();
			//
			//
			//                
			//
			//
			//                for (var i = 0; i < room.players.length; i++) {
			//
			//
			//                
			//
			//
			//                users.Add(room.players[i]);
			//
			//
			//                
			//
			//
			//                }
			//
			//
			//                
			//
			//
			//                
			//
			//
			//                home.Data.userList = home.AddListBox(new ShuffListBox(){
			//
			//
			//                X= 30,
			//
			//
			//                Y= 280,
			//
			//
			//                Width= "215",
			//
			//
			//                Height = "125",
			//
			//
			//                Label= "Users",
			//
			//
			//                Items= users
			//
			//
			//                });
		};
		this.home.data.loadRoomInfos = function(room1) {
			//   home.Data.gameList.Remove();
			//   
			//   var rooms = new List<string>();
			//   
			//   for (var i = 0; i < room.length; i++) {
			//   //rooms.Add({ label= room[i].name, value= room[i].roomID });
			//   }
			//   
			//   
			//   home.Data.gameList = home.AddListBox(new ShuffListBox(){
			//   X= 30,
			//   Y= 85,
			//   Width = "215",
			//   Height = "150",
			//   Label= "Rooms",
			//   Items= rooms,
			//   Click=  (item)=> {
			//   pageHandler.gateway.Emit("Area.Game.Join", new { roomID= item.value, user=new  { userName= home.Data.txtUserName.GetValue()} }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
			//   }
			//   });
		};
		var $t10 = new (Type.makeGenericType(Client.ShuffUI.ShuffWindow$1, [Client.Information.DevAreaInformation]).$ctor1)(new Client.Information.DevAreaInformation());
		$t10.title = 'Developer';
		$t10.set_x(500);
		$t10.set_y(100);
		$t10.set_width(Client.ShuffUI.Number.op_Implicit$2(420));
		$t10.set_height(Client.ShuffUI.Number.op_Implicit$2(450));
		$t10.allowClose = true;
		$t10.allowMinimize = true;
		this.devArea = shuffUIManager.createWindow(Client.Information.DevAreaInformation).call(shuffUIManager, $t10);
		this.devArea.data.beginGame = Function.mkdel(this, function() {
			this.devArea.data.created = false;
			this.devArea.data.joined = 0;
			pageHandler.startGameServer();
			var $t12 = pageHandler.gateway;
			var $t11 = new Models.UserModel();
			$t11.userName = this.devArea.data.txtNumOfPlayers.get_text();
			$t12.emit('Area.Debug.Create', { user: $t11, Name: 'main room', Source: this.codeArea.data.codeEditor.information.editor.getValue(), BreakPoints: this.codeArea.data.breakPoints }, null);
		});
		var $t14 = this.devArea;
		var $t13 = Client.ShuffUI.ShuffButtonOptions.$ctor();
		$t13.x = 280;
		$t13.y = 54;
		$t13.width = Client.ShuffUI.Number.op_Implicit$2(150);
		$t13.height = Client.ShuffUI.Number.op_Implicit$2(25);
		$t13.text = 'Begin Game';
		$t13.onClick = Function.mkdel(this, function(e2) {
			this.devArea.data.beginGame();
		});
		$t14.addElement(Client.ShuffUI.ShuffButton).call($t14, new Client.ShuffUI.ShuffButton($t13));
		var $t17 = this.devArea.data;
		var $t16 = this.devArea;
		var $t15 = Client.ShuffUI.ShuffLabelOptions.$ctor();
		$t15.x = 80;
		$t15.y = 80;
		$t15.width = Client.ShuffUI.Number.op_Implicit$2(250);
		$t15.height = Client.ShuffUI.Number.op_Implicit$2(25);
		$t15.text = 'How Many= ';
		$t17.lblHowFast = $t16.addElement(Client.ShuffUI.ShuffLabel).call($t16, new Client.ShuffUI.ShuffLabel($t15));
		var $t20 = this.devArea.data;
		var $t19 = this.devArea;
		var $t18 = Client.ShuffUI.ShuffLabelOptions.$ctor();
		$t18.x = 80;
		$t18.y = 100;
		$t18.width = Client.ShuffUI.Number.op_Implicit$2(250);
		$t18.height = Client.ShuffUI.Number.op_Implicit$2(25);
		$t18.text = 'Another: ';
		$t20.lblAnother = $t19.addElement(Client.ShuffUI.ShuffLabel).call($t19, new Client.ShuffUI.ShuffLabel($t18));
		// devArea.AddButton(new ShuffButton()
		// {
		// X = 280,
		// Y = 94,
		// Width = "150",
		// Height = "25",
		// Text = "Continue",
		// Click = (evt) =>
		// {
		// pageHandler.gateway.Emit("Area.Debug.Continue", new { }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
		// }
		// });
		var pop;
		var $t22 = this.devArea;
		var $t21 = Client.ShuffUI.ShuffListBoxOptions.$ctor();
		$t21.x = 25;
		$t21.y = 200;
		$t21.width = Client.ShuffUI.Number.op_Implicit$2(250);
		$t21.height = Client.ShuffUI.Number.op_Implicit$2(250);
		$t21.itemCreation = function(item, index) {
			var ik = $(String.format('<div style=\'width=100%;height=25px; background-color={0};\'></div>', ((index % 2 === 0) ? 'red' : 'green')));
			var ikc = $(String.format('<div style=\'width=50%;height=25px; float=left;\'>{0}</div>', item.label));
			ik.append(ikc);
			var ikd = $(String.format('<input type=\'text\' style=\'width=48%;height=25px\' value=\'{0}\' />', item.value));
			ik.append(ikd);
			return ik;
		};
		var propBox = $t22.addElement(Client.ShuffUI.ShuffListBox).call($t22, pop = new Client.ShuffUI.ShuffListBox($t21));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		pop.addItem(new Client.ShuffUI.ShuffListItem('foos', 99));
		var $t25 = this.devArea.data;
		var $t24 = this.devArea;
		var $t23 = Client.ShuffUI.ShuffTextboxOptions.$ctor();
		$t23.x = 150;
		$t23.y = 134;
		$t23.width = Client.ShuffUI.Number.op_Implicit$2(100);
		$t23.height = Client.ShuffUI.Number.op_Implicit$2(25);
		$t23.label = 'Var Lookup';
		$t25.varText = $t24.addElement(Client.ShuffUI.ShuffTextbox).call($t24, new Client.ShuffUI.ShuffTextbox($t23));
		//  devArea.AddButton(new ShuffButton()
		//  {
		//  X = 280,
		//  Y = 134,
		//  Width = "150",
		//  Height = "25",
		//  Text = "Lookup",
		//  Click = (evt) =>
		//  {
		//  pageHandler.gateway.Emit("Area.Debug.VariableLookup.Request", new { variableName = devArea.Data.varText.GetValue() }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
		//  }
		//  });
		//   devArea.AddButton(new ShuffButton()
		//   {
		//   X = 280,
		//   Y = 164,
		//   Width = "150",
		//   Height = "25",
		//   Text = "Push New Source",
		//   Click = (evt) =>
		//   {
		//   pageHandler.gateway.Emit("Area.Debug.PushNewSource", new { source = codeArea.Data.codeEditor.editor.GetValue(), breakPoints = codeArea.Data.breakPoints },
		//   devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
		//   }
		//   });
		this.devArea.data.loadRoomInfo = Function.mkdel(this, function(room2) {
			this.devArea.data.gameServer = room2.gameServer;
			this.devArea.data.lblAnother.set_text(room2.gameServer);
			var count = parseInt(this.devArea.data.txtNumOfPlayers.get_text());
			if (!this.devArea.data.created) {
				pageHandler.gateway.emit('Area.Game.DebuggerJoin', Models.DebuggerJoinRequestModel.$ctor(room2.roomID), this.devArea.data.gameServer);
				//NO EMIT"ING OUTSIDE OF PageHandler
				for (var i1 = 0; i1 < count; i1++) {
					var $t28 = pageHandler.gateway;
					var $t27 = room2.roomID;
					var $t26 = new Models.UserModel();
					$t26.userName = 'player ' + (i1 + 1);
					$t28.emit('Area.Game.Join', Models.JoinGameRequestModel.$ctor($t27, $t26), this.devArea.data.gameServer);
					//NO EMIT"ING OUTSIDE OF PageHandler
				}
				this.devArea.data.created = true;
			}
			else if (++this.devArea.data.joined === count) {
				pageHandler.gateway.emit('Area.Game.Start', Models.StartGameRequestModel.$ctor(room2.roomID), this.devArea.data.gameServer);
				//NO EMIT"ING OUTSIDE OF PageHandler
			}
		});
		var $t31 = this.devArea.data;
		var $t30 = this.devArea;
		var $t29 = Client.ShuffUI.ShuffTextboxOptions.$ctor();
		$t29.x = 130;
		$t29.y = 43;
		$t29.width = Client.ShuffUI.Number.op_Implicit$2(130);
		$t29.height = Client.ShuffUI.Number.op_Implicit$2(20);
		$t29.text = '6';
		$t29.label = 'Number of players=';
		$t29.labelStyle = 'font-size=13px';
		$t31.txtNumOfPlayers = $t30.addElement(Client.ShuffUI.ShuffTextbox).call($t30, new Client.ShuffUI.ShuffTextbox($t29));
		var $t32 = new (Type.makeGenericType(Client.ShuffUI.ShuffWindow$1, [Client.Information.CodeAreaInformation]).$ctor1)(new Client.Information.CodeAreaInformation());
		$t32.title = 'Code';
		$t32.set_x(0);
		$t32.set_y(0);
		$t32.staticPositioning = true;
		$t32.set_width(Client.ShuffUI.Number.op_Implicit$2(($(window)).width() * 0.5));
		$t32.set_height(Client.ShuffUI.Number.op_Implicit$2(($(window)).height() * 0.9));
		$t32.allowClose = true;
		$t32.allowMinimize = true;
		$t32.set_visible(true);
		this.codeArea = shuffUIManager.createWindow(Client.Information.CodeAreaInformation).call(shuffUIManager, $t32);
		debugger;
		this.codeArea.data.breakPoints = new Array();
		var $t35 = this.codeArea.data;
		var $t34 = this.codeArea;
		var $t33 = Client.ShuffUI.ShuffCodeEditorOptions.$ctor();
		$t33.height = Client.ShuffUI.Number.op_Implicit$3('80%');
		$t33.lineNumbers = true;
		$t35.codeEditor = $t34.addElement(Client.ShuffUI.ShuffCodeEditor).call($t34, new Client.ShuffUI.ShuffCodeEditor.$ctor1($t33));
		var $t38 = this.codeArea.data;
		var $t37 = this.codeArea;
		var $t36 = Client.ShuffUI.ShuffCodeEditorOptions.$ctor();
		$t36.height = Client.ShuffUI.Number.op_Implicit$3('20%');
		$t36.lineNumbers = false;
		$t38.console = $t37.addElement(Client.ShuffUI.ShuffCodeEditor).call($t37, new Client.ShuffUI.ShuffCodeEditor.$ctor1($t36));
		var $t39 = new (Type.makeGenericType(Client.ShuffUI.ShuffWindow$1, [Client.Information.QuestionAreaInformation]).$ctor1)(new Client.Information.QuestionAreaInformation());
		$t39.title = 'Question';
		$t39.set_x(600);
		$t39.set_y(100);
		$t39.set_width(Client.ShuffUI.Number.op_Implicit$2(300));
		$t39.set_height(Client.ShuffUI.Number.op_Implicit$2(275));
		$t39.allowClose = true;
		$t39.allowMinimize = true;
		$t39.set_visible(true);
		this.questionArea = shuffUIManager.createWindow(Client.Information.QuestionAreaInformation).call(shuffUIManager, $t39);
		var $t42 = this.questionArea.data;
		var $t41 = this.questionArea;
		var $t40 = Client.ShuffUI.ShuffLabelOptions.$ctor();
		$t40.x = 20;
		$t40.y = 5;
		$t40.width = Client.ShuffUI.Number.op_Implicit$2(150);
		$t40.height = Client.ShuffUI.Number.op_Implicit$2(25);
		$t40.text = '';
		$t42.question = $t41.addElement(Client.ShuffUI.ShuffLabel).call($t41, new Client.ShuffUI.ShuffLabel($t40));
		this.questionArea.data.load = Function.mkdel(this, function(question) {
			this.questionArea.set_visible(true);
			this.questionArea.data.question.set_text(question.question);
			var $t43 = this.questionArea.data.answerBox.get_parent();
			$t43.removeElement(Client.ShuffUI.ShuffListBox).call($t43, this.questionArea.data.answerBox);
			var answers = new Array();
			for (var i2 = 0; i2 < question.answers.length; i2++) {
				answers.add(new Client.ShuffUI.ShuffListItem(question.answers[i2], i2));
			}
			var $t46 = this.questionArea.data;
			var $t45 = this.questionArea;
			var $t44 = Client.ShuffUI.ShuffListBoxOptions.$ctor();
			$t44.x = 30;
			$t44.y = 65;
			$t44.width = Client.ShuffUI.Number.op_Implicit$2(215);
			$t44.height = Client.ShuffUI.Number.op_Implicit$2(125);
			$t44.label = 'Answers';
			$t44.items = answers;
			$t46.answerBox = $t45.addElement(Client.ShuffUI.ShuffListBox).call($t45, new Client.ShuffUI.ShuffListBox($t44));
		});
		var $t49 = this.questionArea.data;
		var $t48 = this.questionArea;
		var $t47 = Client.ShuffUI.ShuffListBoxOptions.$ctor();
		$t47.x = 30;
		$t47.y = 65;
		$t47.width = Client.ShuffUI.Number.op_Implicit$2(215);
		$t47.height = Client.ShuffUI.Number.op_Implicit$2(125);
		$t47.label = 'Answers';
		$t49.answerBox = $t48.addElement(Client.ShuffUI.ShuffListBox).call($t48, new Client.ShuffUI.ShuffListBox($t47));
		shuffUIManager.focus(this.devArea.information);
		//
		//
		//
		//
		//
		//        var chatArea = shuffUIManager.createWindow({
		//
		//
		//
		//
		//
		//        title: "Chat",
		//
		//
		//
		//
		//
		//        x: 600,
		//
		//
		//
		//
		//
		//        y: 100,
		//
		//
		//
		//
		//
		//        width: 300,
		//
		//
		//
		//
		//
		//        height: 275,
		//
		//
		//
		//
		//
		//        allowClose: true,
		//
		//
		//
		//
		//
		//        allowMinimize: true,
		//
		//
		//
		//
		//
		//        visible: false
		//
		//
		//
		//
		//
		//        
		//
		//
		//
		//
		//
		//        });
	},
	$loadCss: function(filename) {
		var fileref = document.createElement('link');
		fileref.setAttribute('rel', 'stylesheet');
		fileref.setAttribute('type', 'text/css');
		fileref.setAttribute('href', filename);
		document.getElementsByTagName('head')[0].appendChild(fileref);
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.GameCanvasInformation
Client.GameCanvasInformation = function() {
	this.canvas = null;
	this.domCanvas = null;
};
////////////////////////////////////////////////////////////////////////////////
// Client.GameInfo
Client.GameInfo = function() {
	this.roomID = '-1';
};
////////////////////////////////////////////////////////////////////////////////
// Client.Gateway
Client.Gateway = function(gatewayServer) {
	this.$channels = null;
	this.gatewaySocket = null;
	this.$channels = new Object();
	var someChannels = this.$channels;
	this.gatewaySocket = io.connect(gatewayServer);
	this.gatewaySocket.on('Client.Message', function(data) {
		someChannels[data.channel](data.content);
	});
};
Client.Gateway.prototype = {
	emit: function(channel, content, gameServer) {
		this.gatewaySocket.emit('Gateway.Message', Models.GatewayMessageModel.$ctor(channel, content, gameServer));
	},
	on: function(channel, callback) {
		this.$channels[channel] = callback;
	},
	login: function(userName) {
		var $t2 = this.gatewaySocket;
		var $t1 = new Models.UserModel();
		$t1.userName = userName;
		$t2.emit('Gateway.Login', $t1);
	}
};
Type.registerNamespace('Client.Information');
////////////////////////////////////////////////////////////////////////////////
// Client.Information.CodeAreaInformation
Client.Information.CodeAreaInformation = function() {
	this.codeEditor = null;
	this.console = null;
	this.breakPoints = null;
};
////////////////////////////////////////////////////////////////////////////////
// Client.Information.DevAreaInformation
Client.Information.DevAreaInformation = function() {
	this.txtNumOfPlayers = null;
	this.loadRoomInfo = null;
	this.varText = null;
	this.lblAnother = null;
	this.lblHowFast = null;
	this.gameServer = null;
	this.beginGame = null;
	this.joined = 0;
	this.created = false;
};
////////////////////////////////////////////////////////////////////////////////
// Client.Information.HomeAreaInformation
Client.Information.HomeAreaInformation = function() {
	this.loadRoomInfos = null;
	this.userList = null;
	this.gameList = null;
	this.txtUserName = null;
	this.btnStartGame = null;
	this.loadRoomInfo = null;
};
////////////////////////////////////////////////////////////////////////////////
// Client.Information.QuestionAreaInformation
Client.Information.QuestionAreaInformation = function() {
	this.question = null;
	this.answerBox = null;
	this.load = null;
};
Type.registerNamespace('Client');
////////////////////////////////////////////////////////////////////////////////
// Client.PageGameContext
Client.PageGameContext = function(context, canvasInfo) {
	this.context = null;
	this.canvasInfo = null;
	this.context = context;
	this.canvasInfo = canvasInfo;
};
////////////////////////////////////////////////////////////////////////////////
// Client.PageHandler
Client.PageHandler = function(gatewayServerAddress, buildSite) {
	this.$buildSite = null;
	this.$cardImages = null;
	this.$endTime = 0;
	this.gameStuff = null;
	this.gateway = null;
	this.$numOfTimes = 0;
	this.$startTime = 0;
	this.$timeValue = 0;
	this.$spaces = ({});
	this.$cards = ({});
	this.$resetStyles = ['border-radius', '-moz-border-radius', '-webkit-border-radius', 'box-shadow', '-moz-box-shadow', 'transform', '-webkit-transform', 'padding', 'background-color', 'border'];
	this.$buildSite = buildSite;
	this.gameStuff = new Client.GameInfo();
	this.$startTime = Date.get_now();
	window.setTimeout(function() {
		buildSite.devArea.data.beginGame();
	}, 2000);
	this.gateway = new Client.Gateway(gatewayServerAddress);
	this.gateway.on('Area.Main.Login.Response', function(data) {
		window.alert(JSON.stringify(data));
	});
	this.gateway.on('Area.Lobby.ListCardGames.Response', function(data1) {
	});
	this.gateway.on('Area.Lobby.ListRooms.Response', function(data2) {
		console.log(data2);
	});
	var randomName = '';
	var ra = Math.random() * 10;
	for (var i = 0; i < ra; i++) {
		randomName += String.fromCharCode(ss.Int32.trunc(65 + Math.random() * 26));
	}
	this.gateway.login(randomName);
	this.gateway.on('Area.Debug.GetGameSource.Response', Function.mkdel(this, function(data3) {
		var endTime = new Date();
		var time = endTime - this.$startTime;
		this.$numOfTimes++;
		this.$timeValue += time;
		buildSite.devArea.data.lblHowFast.set_text('How Many: ' + ss.Int32.div(this.$timeValue, this.$numOfTimes));
		buildSite.codeArea.data.codeEditor.information.editor.setValue(data3.content);
		buildSite.codeArea.data.codeEditor.information.editor.setMarker(0, '<span style="color: #900">&nbsp;&nbsp;</span> %N%');
		buildSite.codeArea.data.codeEditor.information.editor.refresh();
	}));
	this.gateway.emit('Area.Debug2.GetGameSource.Request', Models.GameSourceRequestModel.$ctor('Sevens'), null);
	this.$cardImages = ({});
	for (var i1 = 101; i1 < 153; i1++) {
		var img = new Image();
		var domain = (window).topLevel + 'assets';
		var src = domain + '/cards/' + i1;
		var jm;
		img.src = jm = Type.cast(src + '.gif', String);
		this.$cardImages[jm] = img;
	}
	var dvGame;
	($('body')).append(dvGame = document.createElement('div'));
	dvGame.id = 'dvGame';
	dvGame.style.left = '50%';
	dvGame.style.position = 'absolute';
	dvGame.style.top = '0';
	dvGame.style.right = '0';
	dvGame.style.bottom = '0';
	document.body.addEventListener('contextmenu', function(e) {
		//e.PreventDefault();
		//todo: Sspecial right click menu;
	}, false);
	//ie8
	//   {
	//   dynamic d2 = (Action<string, ElementEventHandler>)Document.Body.AttachEvent;
	//   
	//   var m = (Action<string, ElementEventHandler>)d2;
	//   m("contextmenu", () =>
	//   {
	//   
	//   });
	//   }
};
Client.PageHandler.prototype = {
	startGameServer: function() {
		this.gateway.on('Area.Game.RoomInfo', Function.mkdel(this, function(data) {
			this.gameStuff.roomID = data.roomID;
			this.$buildSite.home.data.loadRoomInfo(data);
			this.$buildSite.devArea.data.loadRoomInfo(data);
		}));
		//
		//                        gateway.On<GameRoom>("Area.Game.RoomInfos", data =>
		//
		//                        {
		//
		//                        buildSite.home.Data.loadRoomInfos(data);
		//
		//                        
		//
		//                        });
		this.gateway.on('Area.Debug.Log', Function.mkdel(this, function(data1) {
			this.$buildSite.home.data.loadRoomInfos(data1);
			var lines = this.$buildSite.codeArea.data.console.information.editor.getValue().split('\n');
			lines = Type.cast(lines.extract(lines.length - 40, 40), Array);
			this.$buildSite.codeArea.data.console.information.editor.setValue(lines.join('\n') + '\n' + data1.value);
			this.$buildSite.codeArea.data.console.information.editor.setCursor(this.$buildSite.codeArea.data.console.information.editor.lineCount(), 0);
		}));
		this.gateway.on('Area.Debug.Break', Function.mkdel(this, function(data2) {
			this.$buildSite.home.data.loadRoomInfos(data2);
			var cm = this.$buildSite.codeArea.data.codeEditor;
			cm.information.editor.clearMarker(data2.lineNumber);
			cm.information.editor.setMarker(data2.lineNumber, '<span style="color: #059">●</span> %N%');
			cm.information.editor.setCursor(data2.lineNumber + 15, 0);
			cm.information.editor.setCursor(data2.lineNumber - 15, 0);
			cm.information.editor.setCursor(data2.lineNumber, 0);
		}));
		//
		//                        gateway.On("Area.Debug.VariableLookup.Response", data =>
		//
		//                        {
		//
		//                        Window.Alert(Json.Stringify(data));
		//
		//                        });
		this.gateway.on('Area.Game.AskQuestion', Function.mkdel(this, function(data3) {
			this.$buildSite.questionArea.data.load(data3);
			//alert(JSON.stringify(data));
			this.$endTime = new Date();
			var time = this.$endTime - this.$startTime;
			this.$buildSite.devArea.data.lblHowFast.set_text('how long: ' + time);
			window.setTimeout(Function.mkdel(this, function() {
				this.gateway.emit('Area.Game.AnswerQuestion', Models.GameAnswerQuestionModel.$ctor1(this.gameStuff.roomID, 1), this.$buildSite.devArea.data.gameServer);
				this.$buildSite.questionArea.set_visible(false);
				this.$startTime = new Date();
			}), 200);
		}));
		this.gateway.on('Area.Game.UpdateState', Function.mkdel(this, function(data21) {
			var data4 = JSON.parse((new Compressor()).DecompressText(data21));
			//  gameContext.Context.ClearRect(0, 0, gameContext.CanvasInfo.canvas.Width, gameContext.CanvasInfo.canvas.Height);
			var $t1 = data4.spaces.getEnumerator();
			try {
				while ($t1.moveNext()) {
					var space = $t1.get_current();
					space.appearance = this.$fixAppearance(space.appearance);
					var $t2 = space.pile.cards.getEnumerator();
					try {
						while ($t2.moveNext()) {
							var card = $t2.get_current();
							card.appearance = this.$fixAppearance(card.appearance);
						}
					}
					finally {
						$t2.dispose();
					}
				}
			}
			finally {
				$t1.dispose();
			}
			this.drawArea(data4);
		}));
		this.gateway.on('Area.Game.Started', function(data5) {
			//alert(JSON.stringify(data));
		});
		this.gateway.on('Area.Game.GameOver', function(data6) {
		});
		this.gateway.on('Area.Debug.GameOver', Function.mkdel(this, function(data7) {
			window.setTimeout(Function.mkdel(this, function() {
				this.$buildSite.devArea.data.beginGame();
			}), 1000);
		}));
	},
	$fixAppearance: function(appearance) {
		return global.Appearance.fromJson(appearance);
	},
	drawArea: function(mainArea) {
		this.$newDrawArea(mainArea);
		var $t1 = mainArea.textAreas.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var ta = $t1.get_current();
				//  gameboard.Context.FillStyle = "rgba(200, 0, 200, 0.5)";
				//  gameboard.Context.FillText(ta.Text, ta.X * scale.X, ta.Y * scale.Y);
			}
		}
		finally {
			$t1.dispose();
		}
	},
	$findSpace: function(space) {
		var id = 'dv_space_' + space.name;
		if (ss.isValue(this.$spaces[id])) {
			return this.$spaces[id];
		}
		else {
			var sp = document.createElement('div');
			sp.id = id;
			sp.style.position = 'absolute';
			($('#dvGame')).append(sp);
			return this.$spaces[id] = new global.SpaceDrawing(sp);
		}
	},
	$findCard: function(wantedSpace, card) {
		var id = 'dv_card_' + card.type + '_' + card.value;
		var space = this.$findSpace(wantedSpace);
		var doc;
		if (ss.isValue(this.$cards[id])) {
			var m = document.getElementById(id);
			if (!ss.referenceEquals(m.parentNode, space.outerElement)) {
				m.parentNode.removeChild(m);
				space.outerElement.appendChild(m);
			}
			doc = this.$cards[id];
		}
		else {
			var sp = document.createElement('div');
			sp.id = id;
			($(space.outerElement)).append(sp);
			var cardImage = this.$cloneImage(this.$cardImages[this.drawCard(card)]);
			sp.appendChild(cardImage);
			sp.style.position = 'absolute';
			doc = this.$cards[id] = new global.CardDrawing(sp, cardImage);
		}
		return doc;
	},
	$newDrawArea: function(mainArea) {
		//jQuery.Select("#dvGame").Children().Remove();
		var scale = new CommonLibraries.Point(ss.Int32.div(($('#dvGame')).width(), mainArea.size.width), ss.Int32.div(($(document)).height() - 100, mainArea.size.height));
		//ExtensionMethods.debugger(null);
		var l;
		var sl = mainArea.spaces.length;
		for (var spaceIndex = 0; spaceIndex < sl; spaceIndex++) {
			var space = mainArea.spaces[spaceIndex];
			var jf = this.$findSpace(space).outerElement;
			for (var i = 0; i < this.$resetStyles.length; i++) {
				jf.style[this.$resetStyles[i]] = null;
			}
			l = space.pile.cards.length;
			for (var index = 0; index < l; index++) {
				var card = space.pile.cards[index];
				var m = this.$findCard(space, card);
				for (var i1 = 0; i1 < this.$resetStyles.length; i1++) {
					m.outerElement.style[this.$resetStyles[i1]] = null;
					m.image.style[this.$resetStyles[i1]] = null;
				}
			}
		}
		l = mainArea.spaces.length;
		for (var index1 = 0; index1 < l; index1++) {
			var space1 = mainArea.spaces[index1];
			var vertical = space1.vertical;
			var spaceDiv = this.$findSpace(space1);
			// var spaceDivJ = jQuery.FromElement(spaceDiv);
			spaceDiv.outerElement.style.left = global.domUtils.px(space1.x * scale.x);
			spaceDiv.outerElement.style.top = global.domUtils.px(space1.y * scale.y);
			spaceDiv.outerElement.style.width = global.domUtils.px(space1.width * scale.x);
			spaceDiv.outerElement.style.height = global.domUtils.px(space1.height * scale.y);
			//ExtensionMethods.debugger();
			var cl = space1.appearance.effects.length;
			for (var i2 = 0; i2 < cl; i2++) {
				var effect = space1.appearance.effects[i2];
				effect.build$1(spaceDiv);
			}
			//   gameboard.Context.FillRect(space.X * scale.X, space.Y * scale.Y, space.Width * scale.X, space.Height * scale.Y);
			var spaceScale = new CommonLibraries.Point(space1.width / space1.pile.cards.length, space1.height / space1.pile.cards.length);
			var j = 0;
			var lc = space1.pile.cards.length;
			for (var i3 = 0; i3 < lc; i3++) {
				var card1 = space1.pile.cards[i3];
				var xx = 0;
				var yy = 0;
				switch (space1.resizeType) {
					case 1: {
						if (vertical) {
							yy = card1.value * scale.y / 2;
						}
						else {
							xx = card1.value * scale.x / 2;
						}
						break;
					}
					case 0: {
						xx = (!vertical ? (j * spaceScale.x * scale.x) : 0);
						yy = (vertical ? (j * spaceScale.y * scale.y) : 0);
						break;
					}
					default: {
						xx = (!vertical ? (j * spaceScale.x * scale.x) : 0);
						yy = (vertical ? (j * spaceScale.y * scale.y) : 0);
						break;
					}
				}
				var cardDiv = this.$findCard(space1, card1);
				xx -= ss.Int32.div(cardDiv.image.width, 2);
				yy -= ss.Int32.div(cardDiv.image.height, 2);
				//cardDiv.OuterElement.Style["transform"] = 0.0.transformRadius();
				cardDiv.outerElement.style.left = global.domUtils.px(xx + (vertical ? (space1.width * scale.x / 2) : 0));
				cardDiv.outerElement.style.top = global.domUtils.px(yy + (!vertical ? (space1.height * scale.y / 2) : 0));
				cardDiv.outerElement.style['transform'] = global.domUtils.transformRadius(space1.appearance.innerStyle.rotate);
				this.$styleAppearanceFromSpace(cardDiv, j, space1);
				this.$styleAppearance(cardDiv, card1.appearance);
				cardDiv.image.style['border-radius'] = '5px';
				cardDiv.image.style['box-shadow'] = '3px 3px 2px #2c2c2c';
				this.fixBrowserPrefixes(cardDiv.outerElement.style);
				this.fixBrowserPrefixes(cardDiv.image.style);
				//                    spaceDiv.AppendChild(cardDiv);
				j++;
				//effects
			}
			var el = space1.appearance.effects.length;
			for (var i4 = 0; i4 < el; i4++) {
				var effect1 = space1.appearance.effects[i4];
				effect1.tearDown$1(spaceDiv);
			}
		}
		//   foreach (var space in mainArea.Spaces)
		//   {
		//   setStyle(findSpace(space).OuterElement.Style, findSpace(space).OuterElement.Style);
		//   foreach (var card in space.Pile.Cards)
		//   {
		//   var m = findCard(space, card);
		//   setStyle(findSpace(space).OuterElement.Style, findSpace(space).OuterElementStyle);
		//   
		//   m.ImageStyle = new MyStyle();
		//   m.OuterElementStyle = new MyStyle();
		//   
		//   }
		//   }
		//
		//
		//            foreach (var ta in mainArea.TextAreas)
		//
		//
		//            {
		//
		//
		//            gameboard.Context.FillStyle = "rgba(200, 0, 200, 0.5)";
		//
		//
		//            gameboard.Context.FillText(ta.Text, ta.X * scale.X, ta.Y * scale.Y);
		//
		//
		//            }
	},
	$styleAppearanceFromSpace: function(element, cardIndex, space) {
		var appearance = space.appearance;
		var $t1 = appearance.effects.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var cardGameAppearanceEffect = $t1.get_current();
				//   cardGameAppearanceEffect.Build(element.Item1);
				switch (cardGameAppearanceEffect.type) {
					case 2: {
						var bEffect = cardGameAppearanceEffect;
						var trans = element.outerElement.style['transform'];
						if (trans.startsWith('rotate(')) {
							element.outerElement.style['transform'] = global.domUtils.transformRadius(-bEffect.degrees / 2 + bEffect.degrees / (space.pile.cards.length - 1) * cardIndex + global.domUtils.noTransformRadius(trans));
						}
						else {
							element.outerElement.style['transform'] = global.domUtils.transformRadius(appearance.innerStyle.rotate);
						}
						break;
					}
				}
			}
		}
		finally {
			$t1.dispose();
		}
		element.image.style.backgroundColor = appearance.innerStyle.backColor;
	},
	$styleAppearance: function(element, appearance) {
		var $t1 = appearance.effects.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var cardGameAppearanceEffect = $t1.get_current();
				cardGameAppearanceEffect.build(element);
				//new object().debugger();
				cardGameAppearanceEffect.tearDown(element);
			}
		}
		finally {
			$t1.dispose();
		}
		//rotate
		var trans = element.outerElement.style['transform'];
		if (trans.startsWith('rotate(')) {
			element.outerElement.style['transform'] = String.format('rotate({0}deg)', appearance.innerStyle.rotate + (parseInt(trans.replaceAll('rotate(', '').replaceAll('deg)', ''))));
			//todo regex??
		}
		else {
			element.outerElement.style['transform'] = String.format('rotate({0}deg)', appearance.innerStyle.rotate);
		}
		element.image.style.backgroundColor = appearance.innerStyle.backColor;
	},
	fixBrowserPrefixes: function(cardImage) {
		if (ss.isValue(cardImage['transform'])) {
			cardImage['-webkit-transform'] = cardImage['transform'];
		}
		if (ss.isValue(cardImage['box-shadow'])) {
			cardImage['-moz-box-shadow'] = cardImage['box-shadow'];
			cardImage['-webkit-box-shadow'] = cardImage['box-shadow'];
		}
		if (ss.isValue(cardImage['border-radius'])) {
			cardImage['-moz-border-radius'] = cardImage['box-shadow'];
			cardImage['-webkit-border-radius'] = cardImage['box-shadow'];
		}
	},
	$cloneImage: function(cardImage) {
		var img = new Image();
		img.src = cardImage.src;
		return img;
	},
	drawCard: function(card) {
		var src = '';
		var domain = (window).topLevel + 'assets';
		src = Type.cast(domain + '/cards/' + (100 + (card.value + 1) + card.type * 13), String);
		return src + '.gif';
	},
	canvasOnClick: function(e) {
		e.preventDefault();
	},
	canvasMouseMove: function(e) {
		e.preventDefault();
		document.body.style.cursor = 'default';
	},
	canvasMouseUp: function(e) {
		e.preventDefault();
	},
	handleScroll: function(e) {
		e.preventDefault();
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ScriptLoader
Client.ScriptLoader = function() {
};
Client.ScriptLoader.prototype = {
	$loadScript: function(url, cache, callback) {
		cache = false;
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url + (cache ? ('?' + Math.floor(Math.random() * 10000)) : '');
		//caching
		if (ss.isValue(callback)) {
			(script).onreadystatechange = function(a) {
				if (!!((script).readyState === 'loaded' || (script).readyState === 'complete')) {
					callback();
				}
			};
			(script).onload = function(a1) {
				callback();
			};
		}
		head.appendChild(script);
	},
	load: function(items, cache, done) {
		var counter = 0;
		for (var i = 0; i < items.length; i++) {
			this.$loadScript(items[i], cache, function() {
				counter++;
				if (counter >= items.length) {
					done();
				}
			});
		}
	},
	loadSync: function(items, done) {
		var counter = 0;
		var nextOne = null;
		nextOne = Function.mkdel(this, function() {
			counter++;
			if (counter >= items.length) {
				done();
			}
			else {
				this.$loadScript(items[counter], false, nextOne);
			}
		});
		this.$loadScript(items[0], false, nextOne);
	}
};
Type.registerNamespace('Client.ShuffUI');
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ButtonClickedEvent
Client.ShuffUI.ButtonClickedEvent = function() {
};
Client.ShuffUI.ButtonClickedEvent.$ctor = function(x, y) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.CodeMirrorInformation
Client.ShuffUI.CodeMirrorInformation = function() {
	this.codeElement = null;
	this.editor = null;
	this.element = null;
	this.data = null;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.CodeMirrorInformationData
Client.ShuffUI.CodeMirrorInformationData = function() {
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ItemClickedEvent
Client.ShuffUI.ItemClickedEvent = function() {
};
Client.ShuffUI.ItemClickedEvent.$ctor = function(item) {
	var $this = {};
	$this.item = null;
	$this.item = item;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.Number
Client.ShuffUI.Number = function(s) {
	this.$value = null;
	this.$value = s.toString();
};
Client.ShuffUI.Number.$ctor1 = function(s) {
	this.$value = null;
	this.$value = s;
};
Client.ShuffUI.Number.$ctor1.prototype = Client.ShuffUI.Number.prototype;
Client.ShuffUI.Number.op_Implicit = function(d) {
	return parseFloat(d.$value);
};
Client.ShuffUI.Number.op_Implicit$3 = function(d) {
	return new Client.ShuffUI.Number.$ctor1(d);
};
Client.ShuffUI.Number.op_Implicit$2 = function(d) {
	return new Client.ShuffUI.Number(d);
};
Client.ShuffUI.Number.op_Implicit$1 = function(d) {
	return ((d.$value.indexOf('%') < 0) ? (d.$value + 'px') : d.$value);
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ParentChangedEvent
Client.ShuffUI.ParentChangedEvent = function() {
};
Client.ShuffUI.ParentChangedEvent.$ctor = function(parent) {
	var $this = {};
	$this.parent = null;
	$this.parent = parent;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.PositionChangedEvent
Client.ShuffUI.PositionChangedEvent = function() {
};
Client.ShuffUI.PositionChangedEvent.$ctor = function(x, y) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffButton
Client.ShuffUI.ShuffButton = function(options) {
	this.text = null;
	Client.ShuffUI.ShuffElement.call(this);
	var but = $('<div></div>');
	this.element = but;
	but.css('position', 'absolute');
	this.text = options.text;
	this.set_x(options.x);
	this.set_y(options.y);
	this.set_width(options.width);
	this.set_height(options.height);
	this.set_visible(options.visible);
	but.button();
	but.click(function(a) {
		options.onClick(Client.ShuffUI.ButtonClickedEvent.$ctor(a.clientX, a.clientY));
	});
	but.disableSelection();
};
Client.ShuffUI.ShuffButton.prototype = {
	bindCustomEvents: function() {
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffButton$1
Client.ShuffUI.ShuffButton$1 = function(T) {
	var $type = function(options, data) {
		this.data = T.getDefaultValue();
		Client.ShuffUI.ShuffButton.call(this, options);
		this.data = data;
	};
	$type.registerGenericClassInstance($type, Client.ShuffUI.ShuffButton$1, [T], function() {
		return Client.ShuffUI.ShuffButton;
	}, function() {
		return [];
	});
	return $type;
};
Client.ShuffUI.ShuffButton$1.registerGenericClass('Client.ShuffUI.ShuffButton$1', 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffButtonOptions
Client.ShuffUI.ShuffButtonOptions = function() {
};
Client.ShuffUI.ShuffButtonOptions.$ctor = function() {
	var $this = Client.ShuffUI.ShuffOptions.$ctor();
	$this.text = null;
	$this.onClick = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffCodeEditor
Client.ShuffUI.ShuffCodeEditor = function() {
	this.$2$TextChangedField = null;
	this.information = null;
	this.$codeMirror = null;
	this.text = null;
	this.lineNumbers = false;
	Client.ShuffUI.ShuffElement.call(this);
	this.set_width(Client.ShuffUI.Number.op_Implicit$3('100%'));
	this.set_height(Client.ShuffUI.Number.op_Implicit$3('100%'));
};
Client.ShuffUI.ShuffCodeEditor.prototype = {
	get_textChanged: function() {
		return this.$2$TextChangedField;
	},
	set_textChanged: function(value) {
		this.$2$TextChangedField = value;
	},
	bindCustomEvents: function() {
		this.set_textChanged(Function.combine(this.get_textChanged(), Function.mkdel(this, function(e) {
			this.element.text(e.text);
		})));
		this.parentChanged = Function.combine(this.parentChanged, Function.mkdel(this, function(ev) {
			if (ss.isValue(ev.parent)) {
				var hlLine = null;
				this.$codeMirror.editor = CodeMirror.fromTextArea(this.$codeMirror.element, {
					lineNumbers: this.lineNumbers,
					lineWrapping: true,
					matchBrackets: true,
					onGutterClick: function(cm, n, e1) {
						var info = cm.lineInfo(n);
						if (info.markerText) {
							Client.BuildSite.instance.codeArea.data.breakPoints.extract(Client.BuildSite.instance.codeArea.data.breakPoints.indexOf(n - 1), 0);
							cm.clearMarker(n);
						}
						else {
							Client.BuildSite.instance.codeArea.data.breakPoints.add(n - 1);
							cm.setMarker(n, '<span style="color= #900">●</span> %N%');
						}
					},
					onCursorActivity: Function.mkdel(this, function(e2) {
						this.$codeMirror.editor.setLineClass(hlLine, null);
						hlLine = this.$codeMirror.editor.setLineClass(this.$codeMirror.editor.getCursor().line, 'activeline');
					}),
					onFocus: function(e3) {
					},
					onBlur: function(e4) {
					}
				});
				hlLine = this.$codeMirror.editor.setLineClass(0, 'activeline');
				var scroller = this.$codeMirror.editor.getScrollerElement();
				scroller.style.height = this.element[0].offsetHeight + 'px';
				scroller.style.width = this.element[0].offsetWidth + 'px';
				this.$codeMirror.editor.refresh();
				this.$codeMirror.editor.setOption('theme', 'night');
				this.information = this.$codeMirror;
			}
			else {
			}
		}));
	}
};
Client.ShuffUI.ShuffCodeEditor.$ctor1 = function(options) {
	this.$2$TextChangedField = null;
	this.information = null;
	this.$codeMirror = null;
	this.text = null;
	this.lineNumbers = false;
	Client.ShuffUI.ShuffElement.call(this);
	var fmw = options.width;
	var fmh = options.height;
	if (!!!fmw) {
		options.width = Client.ShuffUI.Number.op_Implicit$3('100%');
	}
	if (!!!fmh) {
		options.height = Client.ShuffUI.Number.op_Implicit$3('100%');
	}
	var divs = $('<div style=\'width:' + Client.ShuffUI.Number.op_Implicit$1(options.width) + '; height:' + Client.ShuffUI.Number.op_Implicit$1(options.height) + '\'> </div>');
	var fm = $('<textarea id=\'code\' name=\'code\' class=\'CodeMirror-fullscreen \' style=\'\'></textarea>');
	divs.append(fm);
	this.element = divs;
	var $t1 = new Client.ShuffUI.CodeMirrorInformation();
	$t1.element = fm.get(0);
	this.$codeMirror = $t1;
	this.$codeMirror.element.value = this.text = options.text;
	this.lineNumbers = options.lineNumbers;
	this.set_x(options.x);
	this.set_y(options.y);
	this.set_width(options.width);
	this.set_height(options.height);
	this.set_visible(options.visible);
};
Client.ShuffUI.ShuffCodeEditor.$ctor1.prototype = Client.ShuffUI.ShuffCodeEditor.prototype;
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffCodeEditor$1
Client.ShuffUI.ShuffCodeEditor$1 = function(T) {
	var $type = function(data) {
		this.data = T.getDefaultValue();
		Client.ShuffUI.ShuffCodeEditor.call(this);
		this.data = data;
	};
	$type.registerGenericClassInstance($type, Client.ShuffUI.ShuffCodeEditor$1, [T], function() {
		return Client.ShuffUI.ShuffCodeEditor;
	}, function() {
		return [];
	});
	return $type;
};
Client.ShuffUI.ShuffCodeEditor$1.registerGenericClass('Client.ShuffUI.ShuffCodeEditor$1', 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffCodeEditorOptions
Client.ShuffUI.ShuffCodeEditorOptions = function() {
};
Client.ShuffUI.ShuffCodeEditorOptions.$ctor = function() {
	var $this = Client.ShuffUI.ShuffOptions.$ctor();
	$this.text = null;
	$this.lineNumbers = false;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffElement
Client.ShuffUI.ShuffElement = function() {
	this.$myVisible = false;
	this.$myX = 0;
	this.$myY = 0;
	this.$myWidth = null;
	this.$myHeight = null;
	this.parentChanged = null;
	this.positionChanged = null;
	this.sizeChanged = null;
	this.visibleChanged = null;
	this.$1$ParentField = null;
	this.element = null;
	this.$myWidth = Client.ShuffUI.Number.op_Implicit$2(0);
	this.$myHeight = Client.ShuffUI.Number.op_Implicit$2(0);
	this.$bindEvents();
};
Client.ShuffUI.ShuffElement.prototype = {
	get_x: function() {
		return this.$myX;
	},
	set_x: function(value) {
		this.$myX = value;
		this.positionChanged(Client.ShuffUI.PositionChangedEvent.$ctor(this.$myX, this.$myY));
	},
	get_parent: function() {
		return this.$1$ParentField;
	},
	set_parent: function(value) {
		this.$1$ParentField = value;
	},
	get_y: function() {
		return this.$myY;
	},
	set_y: function(value) {
		this.$myY = value;
		this.positionChanged(Client.ShuffUI.PositionChangedEvent.$ctor(this.$myX, this.$myY));
	},
	get_width: function() {
		return this.$myWidth;
	},
	set_width: function(value) {
		this.$myWidth = value;
		this.sizeChanged(Client.ShuffUI.SizeChangedEvent.$ctor(this.$myWidth, this.$myHeight));
	},
	get_height: function() {
		return this.$myHeight;
	},
	set_height: function(value) {
		this.$myHeight = value;
		this.sizeChanged(Client.ShuffUI.SizeChangedEvent.$ctor(this.$myWidth, this.$myHeight));
	},
	get_visible: function() {
		return this.$myVisible;
	},
	set_visible: function(value) {
		this.$myVisible = value;
		this.visibleChanged(Client.ShuffUI.VisibleChangedEvent.$ctor(this.$myVisible));
	},
	$bindEvents: function() {
		this.sizeChanged = Function.combine(this.sizeChanged, Function.mkdel(this, function(e) {
			if (!!e.width) {
				this.element.css('width', Client.ShuffUI.Number.op_Implicit$1(e.width));
			}
			if (!!e.height) {
				this.element.css('height', Client.ShuffUI.Number.op_Implicit$1(e.height));
			}
		}));
		this.positionChanged = Function.combine(this.positionChanged, Function.mkdel(this, function(e1) {
			this.element.css('left', e1.x + 'px');
			this.element.css('top', e1.y + 'px');
		}));
		this.visibleChanged = Function.combine(this.visibleChanged, Function.mkdel(this, function(e2) {
			this.element.css('display', (e2.visible ? 'block' : 'none'));
		}));
		this.parentChanged = Function.combine(this.parentChanged, Function.mkdel(this, function(e3) {
			this.set_parent(e3.parent);
			if (ss.isNullOrUndefined(this.get_parent())) {
				this.element.remove();
			}
			else {
				this.get_parent().element.append(this.element);
			}
		}));
		this.bindCustomEvents();
	},
	bindCustomEvents: function() {
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffLabel
Client.ShuffUI.ShuffLabel = function(options) {
	this.$myText = null;
	this.$2$TextChangedField = null;
	Client.ShuffUI.ShuffElement.call(this);
	var but = $('<span></span>');
	this.element = but;
	but.css('position', 'absolute');
	this.set_text(options.text);
	this.set_x(options.x);
	this.set_y(options.y);
	this.set_visible(options.visible);
	but.disableSelection();
};
Client.ShuffUI.ShuffLabel.prototype = {
	get_text: function() {
		return this.$myText;
	},
	set_text: function(value) {
		this.$myText = value;
		this.get_textChanged()(Client.ShuffUI.TextChangedEvent.$ctor(this.$myText, false));
	},
	get_textChanged: function() {
		return this.$2$TextChangedField;
	},
	set_textChanged: function(value) {
		this.$2$TextChangedField = value;
	},
	bindCustomEvents: function() {
		this.set_textChanged(Function.combine(this.get_textChanged(), Function.mkdel(this, function(e) {
			this.element.text(e.text);
		})));
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffLabel$1
Client.ShuffUI.ShuffLabel$1 = function(T) {
	var $type = function(options, data) {
		this.data = T.getDefaultValue();
		Client.ShuffUI.ShuffLabel.call(this, options);
		this.data = data;
	};
	$type.registerGenericClassInstance($type, Client.ShuffUI.ShuffLabel$1, [T], function() {
		return Client.ShuffUI.ShuffLabel;
	}, function() {
		return [];
	});
	return $type;
};
Client.ShuffUI.ShuffLabel$1.registerGenericClass('Client.ShuffUI.ShuffLabel$1', 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffLabelOptions
Client.ShuffUI.ShuffLabelOptions = function() {
};
Client.ShuffUI.ShuffLabelOptions.$ctor = function() {
	var $this = Client.ShuffUI.ShuffOptions.$ctor();
	$this.text = null;
	$this.onClick = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffListBox
Client.ShuffUI.ShuffListBox = function(options) {
	this.label = null;
	this.itemCreation = null;
	this.onClick = null;
	this.items = null;
	Client.ShuffUI.ShuffElement.call(this);
	var but = $('<div></div>');
	this.element = but;
	this.set_x(options.x);
	this.set_y(options.y);
	this.set_width(options.width);
	this.set_height(options.height);
	this.set_visible(options.visible);
	// var theme = "getTheme()".me();
	// var theme = getTheme();
	// but.jqxListBox({ source: options.items, width: options.width, height: options.height, theme: theme });
	// but.bind('select', function (event) {
	// var item = event.args.item;
	// if (options.click)
	// options.click(item);
	// });
	// return but;
};
Client.ShuffUI.ShuffListBox.prototype = {
	bindCustomEvents: function() {
	},
	addItem: function(p0) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffListBox$1
Client.ShuffUI.ShuffListBox$1 = function(T) {
	var $type = function(opts, data) {
		this.data = T.getDefaultValue();
		Client.ShuffUI.ShuffListBox.call(this, opts);
		this.data = data;
	};
	$type.registerGenericClassInstance($type, Client.ShuffUI.ShuffListBox$1, [T], function() {
		return Client.ShuffUI.ShuffListBox;
	}, function() {
		return [];
	});
	return $type;
};
Client.ShuffUI.ShuffListBox$1.registerGenericClass('Client.ShuffUI.ShuffListBox$1', 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffListBoxOptions
Client.ShuffUI.ShuffListBoxOptions = function() {
};
Client.ShuffUI.ShuffListBoxOptions.$ctor = function() {
	var $this = Client.ShuffUI.ShuffOptions.$ctor();
	$this.label = null;
	$this.items = null;
	$this.itemCreation = null;
	$this.onClick = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffListItem
Client.ShuffUI.ShuffListItem = function(label, value) {
	this.label = null;
	this.value = 0;
	this.label = label;
	this.value = value;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffOptions
Client.ShuffUI.ShuffOptions = function() {
};
Client.ShuffUI.ShuffOptions.$ctor = function() {
	var $this = {};
	$this.visible = true;
	$this.x = 0;
	$this.y = 0;
	$this.width = null;
	$this.height = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffPanel
Client.ShuffUI.ShuffPanel = function() {
	this.elements = null;
	Client.ShuffUI.ShuffElement.call(this);
	this.elements = new Array();
	var but = $('<div />');
	this.element = but;
	but.css('position', 'absolute');
	but.css('width', '100%');
	but.css('height', '100%');
	but.css('top', '0');
	but.css('left', '0');
	this.set_visible(true);
};
Client.ShuffUI.ShuffPanel.prototype = {
	addElement: function(T) {
		return function(element) {
			this.element.append(element.element);
			this.elements.add(element);
			element.parentChanged(Client.ShuffUI.ParentChangedEvent.$ctor(this));
			return element;
		};
	},
	removeElement: function(T) {
		return function(element) {
			element.element.remove();
			this.elements.remove(element);
			element.parentChanged(Client.ShuffUI.ParentChangedEvent.$ctor(null));
			return element;
		};
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffTextbox
Client.ShuffUI.ShuffTextbox = function(options) {
	this.$myText = null;
	this.$2$TextChangedField = null;
	this.$2$LabelElementField = null;
	Client.ShuffUI.ShuffElement.call(this);
	var but = $('<input value=\'' + Object.coalesce(options.text, '') + '\' />');
	this.element = but;
	but.css('position', 'absolute');
	this.set_text(options.text);
	this.set_x(options.x);
	this.set_y(options.y);
	this.set_width(options.width);
	this.set_height(options.height);
	this.set_visible(options.visible);
	but.keydown(Function.mkdel(this, function(a) {
		this.$myText = but.text();
		this.get_textChanged()(Client.ShuffUI.TextChangedEvent.$ctor(this.$myText, true));
	}));
	if (ss.isValue(options.label)) {
		this.parentChanged = Function.combine(this.parentChanged, Function.mkdel(this, function(e) {
			if (ss.isNullOrUndefined(e.parent)) {
				this.get_labelElement().remove();
				this.set_labelElement(null);
			}
			else {
				//to LabeledElement
				var lbl = $('<span style=\'' + options.labelStyle + '\'></span>');
				this.set_labelElement(lbl);
				lbl.text(options.label);
				this.get_parent().element.append(lbl);
				lbl.css('position', 'absolute');
				lbl.css('left', this.get_x() - lbl.width());
				lbl.css('top', this.get_y() + 2);
				lbl.disableSelection();
			}
		}));
	}
	but.disableSelection();
};
Client.ShuffUI.ShuffTextbox.prototype = {
	get_text: function() {
		return this.$myText;
	},
	set_text: function(value) {
		this.$myText = value;
		this.get_textChanged()(Client.ShuffUI.TextChangedEvent.$ctor(this.$myText, false));
	},
	get_textChanged: function() {
		return this.$2$TextChangedField;
	},
	set_textChanged: function(value) {
		this.$2$TextChangedField = value;
	},
	get_labelElement: function() {
		return this.$2$LabelElementField;
	},
	set_labelElement: function(value) {
		this.$2$LabelElementField = value;
	},
	bindCustomEvents: function() {
		this.set_textChanged(Function.combine(this.get_textChanged(), Function.mkdel(this, function(e) {
			if (!e.live) {
				this.element.val(e.text);
			}
		})));
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffTextbox$1
Client.ShuffUI.ShuffTextbox$1 = function(T) {
	var $type = function(options, data) {
		this.data = T.getDefaultValue();
		Client.ShuffUI.ShuffTextbox.call(this, options);
		this.data = data;
	};
	$type.registerGenericClassInstance($type, Client.ShuffUI.ShuffTextbox$1, [T], function() {
		return Client.ShuffUI.ShuffTextbox;
	}, function() {
		return [];
	});
	return $type;
};
Client.ShuffUI.ShuffTextbox$1.registerGenericClass('Client.ShuffUI.ShuffTextbox$1', 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffTextboxOptions
Client.ShuffUI.ShuffTextboxOptions = function() {
};
Client.ShuffUI.ShuffTextboxOptions.$ctor = function() {
	var $this = Client.ShuffUI.ShuffOptions.$ctor();
	$this.label = null;
	$this.labelStyle = null;
	$this.text = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffUIManager
Client.ShuffUI.ShuffUIManager = function() {
	this.$uiAreas = new Array();
};
Client.ShuffUI.ShuffUIManager.prototype = {
	createWindow: function(T) {
		return function(ui) {
			var windowID = ui.title;
			var outer = $('<div class=\'window-outer\' style=\'background-color: #87B6D9;\'></div>');
			($('body')).append(outer);
			ui.outer = outer;
			var tp = outer[0].style;
			tp['box-shadow'] = '4px 4px 2px #333';
			if (ss.isValue(tp['box-shadow'])) {
				tp['-moz-box-shadow'] = tp['box-shadow'];
				tp['-webkit-box-shadow'] = tp['box-shadow'];
			}
			outer.css('position', 'absolute');
			outer.css('padding', '2em 0.8em 0.8em 1.3em');
			outer.css('left', ui.get_x() + 'px');
			outer.css('top', ui.get_y() + 'px');
			outer.css('width', Client.ShuffUI.Number.op_Implicit$1(ui.get_width()));
			outer.css('height', Client.ShuffUI.Number.op_Implicit$1(ui.get_height()));
			outer.css('display', ((ui.get_visible() === false) ? 'none' : 'block'));
			var top = $('<div style=\'width:100%; text-align:center; font-size:25px; position:absolute; top:0px;left:-2px;  \'></div>');
			outer.append(top);
			var title = $('<div class=\'rounded\' style=\'margin:auto; background-color:white; width:40%; text-align:center;opacity:0.4;\'>' + ui.title + '</div>');
			top.append(title);
			var rightSideBar = $('<div style=\'width:100%; text-align:center; font-size:25px; position:absolute; top:0px;left:-2px;\'></div>');
			top.append(rightSideBar);
			var x = $('<div class=\'rounded window-header-button window-close\' style=\'height:30px; vertical-align:top;background-color:white; width:6%; text-align:center;opacity:0.4;float:right;\'>X</div> ');
			rightSideBar.append(x);
			var max = $('<div class=\'rounded window-header-button window-maximize\' style=\'height:30px; vertical-align:top; background-color:white; width:6%; text-align:center;opacity:0.4;float:right;\'>[]</div>  ');
			rightSideBar.append(max);
			var min = $('<div class=\'rounded window-header-button window-minimize\' style=\'height:30px; vertical-align:top; background-color:white; width:6%; text-align:center;opacity:0.4;float:right;\'>_</div>  ');
			rightSideBar.append(min);
			var inner = $('<div class=\'window-inner\' id=\'window' + windowID + '\' style=\'background-color: #FDFEFE;width:100%; height:100%; \'> </div> ');
			outer.append(inner);
			ui.set_$window(($('#window' + windowID)));
			var info;
			this.$uiAreas.add(info = new Client.ShuffUI.UIAreaInformation(outer, inner));
			ui.information = info;
			x.click(function(evt) {
				outer.css('display', 'none');
			});
			var toggleSize = false;
			max.click(function(evt1) {
				toggleSize = !toggleSize;
				if (toggleSize) {
					outer.css('width', '100%');
					outer.css('height', '100%');
					outer.css('left', '0px');
					outer.css('top', '0px');
				}
				else {
					outer.css('width', '100%');
					outer.css('height', '100%');
				}
			});
			($('.window-minimize')).click(function(evt2) {
				window.alert('3');
			});
			outer.mousedown(Function.mkdel(this, function(evt3) {
				this.focus(info);
			}));
			($('.window-header-button')).button();
			if (!ui.staticPositioning) {
				outer.draggable({
					cancel: '.window-inner, .CodeMirror, .CodeMirror-fullscreen, .CodeMirror-wrap, .CodeMirror-focused',
					containment: ('window'),
					start: function(evt4, o) {
					}
				});
				outer.resizable({
					handles: ('n, e, s, w, ne, se, sw, nw'),
					resize: function(evt5, o1) {
					}
				});
			}
			ui.element = inner;
			//inner.Append(ui.Element);
			return ui;
		};
	},
	focus: function(info) {
		for (var i = 0; i < this.$uiAreas.length; i++) {
			this.$uiAreas[i].get_element().css('z-index', 1800);
		}
		info.get_element().css('z-index', 1900);
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffWindow$1
Client.ShuffUI.ShuffWindow$1 = function(T) {
	var $type = function() {
		this.outer = null;
		this.data = T.getDefaultValue();
		this.$3$WindowField = null;
		this.title = null;
		this.allowClose = false;
		this.allowMinimize = false;
		this.staticPositioning = false;
		this.information = null;
		Client.ShuffUI.ShuffPanel.call(this);
	};
	$type.prototype = {
		get_$window: function() {
			return this.$3$WindowField;
		},
		set_$window: function(value) {
			this.$3$WindowField = value;
		},
		get_$outer: function() {
			return this.outer;
		},
		set_$outer: function(value) {
			this.outer = value;
			this.outer.resizable({ handles: ('n, e, s, w, ne, se, sw, nw') });
		},
		bindCustomEvents: function() {
			Client.ShuffUI.ShuffElement.prototype.bindCustomEvents.call(this);
			this.visibleChanged = Function.combine(this.visibleChanged, Function.mkdel(this, function(e) {
				if (ss.isValue(this.get_$window())) {
					this.get_$window().css('display', (e.visible ? 'block' : 'none'));
				}
			}));
		}
	};
	$type.$ctor1 = function(data) {
		this.outer = null;
		this.data = T.getDefaultValue();
		this.$3$WindowField = null;
		this.title = null;
		this.allowClose = false;
		this.allowMinimize = false;
		this.staticPositioning = false;
		this.information = null;
		Client.ShuffUI.ShuffPanel.call(this);
		this.data = data;
	};
	$type.$ctor1.prototype = $type.prototype;
	$type.registerGenericClassInstance($type, Client.ShuffUI.ShuffWindow$1, [T], function() {
		return Client.ShuffUI.ShuffPanel;
	}, function() {
		return [];
	});
	return $type;
};
Client.ShuffUI.ShuffWindow$1.registerGenericClass('Client.ShuffUI.ShuffWindow$1', 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.SizeChangedEvent
Client.ShuffUI.SizeChangedEvent = function() {
};
Client.ShuffUI.SizeChangedEvent.$ctor = function(w, h) {
	var $this = {};
	$this.width = null;
	$this.height = null;
	$this.width = w;
	$this.height = h;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.TextChangedEvent
Client.ShuffUI.TextChangedEvent = function() {
};
Client.ShuffUI.TextChangedEvent.$ctor = function(text, live) {
	var $this = {};
	$this.text = null;
	$this.live = false;
	$this.live = live;
	$this.text = text;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.UIAreaInformation
Client.ShuffUI.UIAreaInformation = function(element, inner) {
	this.$1$ElementField = null;
	this.$1$InnerField = null;
	this.set_element(element);
	this.set_inner(inner);
};
Client.ShuffUI.UIAreaInformation.prototype = {
	get_element: function() {
		return this.$1$ElementField;
	},
	set_element: function(value) {
		this.$1$ElementField = value;
	},
	get_inner: function() {
		return this.$1$InnerField;
	},
	set_inner: function(value) {
		this.$1$InnerField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.VisibleChangedEvent
Client.ShuffUI.VisibleChangedEvent = function() {
};
Client.ShuffUI.VisibleChangedEvent.$ctor = function(visible) {
	var $this = {};
	$this.visible = false;
	$this.visible = visible;
	return $this;
};
Type.registerNamespace('');
////////////////////////////////////////////////////////////////////////////////
// Globals
Globals = function() {
};
Client.BuildSite.registerClass('Client.BuildSite', Object);
Client.GameCanvasInformation.registerClass('Client.GameCanvasInformation', Object);
Client.GameInfo.registerClass('Client.GameInfo', Object);
Client.Gateway.registerClass('Client.Gateway', Object);
Client.Information.CodeAreaInformation.registerClass('Client.Information.CodeAreaInformation', Object);
Client.Information.DevAreaInformation.registerClass('Client.Information.DevAreaInformation', Object);
Client.Information.HomeAreaInformation.registerClass('Client.Information.HomeAreaInformation', Object);
Client.Information.QuestionAreaInformation.registerClass('Client.Information.QuestionAreaInformation', Object);
Client.PageGameContext.registerClass('Client.PageGameContext', Object);
Client.PageHandler.registerClass('Client.PageHandler', Object);
Client.ScriptLoader.registerClass('Client.ScriptLoader', Object);
Client.ShuffUI.ButtonClickedEvent.registerClass('Client.ShuffUI.ButtonClickedEvent', Object);
Client.ShuffUI.CodeMirrorInformation.registerClass('Client.ShuffUI.CodeMirrorInformation', Object);
Client.ShuffUI.CodeMirrorInformationData.registerClass('Client.ShuffUI.CodeMirrorInformationData', Object);
Client.ShuffUI.ItemClickedEvent.registerClass('Client.ShuffUI.ItemClickedEvent', Object);
Client.ShuffUI.Number.registerClass('Client.ShuffUI.Number', Object);
Client.ShuffUI.ParentChangedEvent.registerClass('Client.ShuffUI.ParentChangedEvent', Object);
Client.ShuffUI.PositionChangedEvent.registerClass('Client.ShuffUI.PositionChangedEvent', Object);
Client.ShuffUI.ShuffElement.registerClass('Client.ShuffUI.ShuffElement', Object);
Client.ShuffUI.ShuffLabel.registerClass('Client.ShuffUI.ShuffLabel', Client.ShuffUI.ShuffElement);
Client.ShuffUI.ShuffListBox.registerClass('Client.ShuffUI.ShuffListBox', Client.ShuffUI.ShuffElement);
Client.ShuffUI.ShuffListItem.registerClass('Client.ShuffUI.ShuffListItem', Object);
Client.ShuffUI.ShuffOptions.registerClass('Client.ShuffUI.ShuffOptions', Object);
Client.ShuffUI.ShuffPanel.registerClass('Client.ShuffUI.ShuffPanel', Client.ShuffUI.ShuffElement);
Client.ShuffUI.ShuffTextbox.registerClass('Client.ShuffUI.ShuffTextbox', Client.ShuffUI.ShuffElement);
Client.ShuffUI.ShuffTextboxOptions.registerClass('Client.ShuffUI.ShuffTextboxOptions');
Client.ShuffUI.ShuffUIManager.registerClass('Client.ShuffUI.ShuffUIManager', Object);
Client.ShuffUI.SizeChangedEvent.registerClass('Client.ShuffUI.SizeChangedEvent', Object);
Client.ShuffUI.TextChangedEvent.registerClass('Client.ShuffUI.TextChangedEvent', Object);
Client.ShuffUI.UIAreaInformation.registerClass('Client.ShuffUI.UIAreaInformation', Object);
Client.ShuffUI.VisibleChangedEvent.registerClass('Client.ShuffUI.VisibleChangedEvent', Object);
Globals.registerClass('Globals', Object);
Client.ShuffUI.ShuffButton.registerClass('Client.ShuffUI.ShuffButton', Client.ShuffUI.ShuffElement);
Client.ShuffUI.ShuffButtonOptions.registerClass('Client.ShuffUI.ShuffButtonOptions');
Client.ShuffUI.ShuffCodeEditor.registerClass('Client.ShuffUI.ShuffCodeEditor', Client.ShuffUI.ShuffElement);
Client.ShuffUI.ShuffCodeEditorOptions.registerClass('Client.ShuffUI.ShuffCodeEditorOptions');
Client.ShuffUI.ShuffLabelOptions.registerClass('Client.ShuffUI.ShuffLabelOptions');
Client.ShuffUI.ShuffListBoxOptions.registerClass('Client.ShuffUI.ShuffListBoxOptions');
Client.BuildSite.instance = null;

