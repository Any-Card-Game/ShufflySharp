
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
		this.$scriptLoader.load([url + 'lib/jqwidgets/jqxbuttons.js', url + 'lib/jqwidgets/jqxscrollbar.js', url + 'lib/linq.js', url + 'lib/tween.js', url + 'lib/socket.io.js', url + 'lib/codemirror/codemirror.js', url + 'lib/jqwidgets/jqxlistbox.js'], Function.mkdel(this, function() {
			this.$scriptLoader.load([url + 'lib/codemirror/mode/javascript/javascript.js', url + 'lib/WorkerConsole.js', url + 'lib/FunctionWorker.js', url + 'lib/Stats.js', url + 'lib/keyboardjs.js', url + 'lib/Dialog.js'], Function.mkdel(this, function() {
				this.$scriptLoader.load([url + 'CommonLibraries.js', url + 'ShuffleGameLibrary.js', url + 'Models.js'], Function.mkdel(this, this.$ready));
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
		var pageHandler = new Client.PageHandler(this.$gatewayServerAddress, this);
		var shuffUIManager = new Client.ShuffUI.ShuffUIManager();
		this.$shuffUIManager = shuffUIManager;
		var $t1 = new (Type.makeGenericType(Client.ShuffUI.ShuffWindow$1, [Client.Information.HomeAreaInformation]))(new Client.Information.HomeAreaInformation());
		$t1.title = 'CardGame';
		$t1.x = ($('body')).innerWidth() - 500;
		$t1.y = 100;
		$t1.width = Client.ShuffUI.Number.op_Implicit$2(420);
		$t1.height = Client.ShuffUI.Number.op_Implicit$2(450);
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(false);
		this.home = shuffUIManager.createWindow(Client.Information.HomeAreaInformation).call(shuffUIManager, $t1);
		var $t3 = this.home;
		var $t2 = new Client.ShuffUI.ShuffButton();
		$t2.x = 280;
		$t2.y = 54;
		$t2.width = Client.ShuffUI.Number.op_Implicit$2(150);
		$t2.height = Client.ShuffUI.Number.op_Implicit$2(25);
		$t2.text = 'Update Game List';
		$t2.click = Function.mkdel(this, function(e) {
			pageHandler.gateway.emit('Area.Game.GetGames', this.devArea.data.gameServer, null);
			//NO EMIT'ING OUTSIDE OF PageHandler
		});
		$t3.addButton($t2);
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
		var $t4 = new Client.ShuffUI.ShuffButton();
		$t4.x = 280;
		$t4.y = 164;
		$t4.width = Client.ShuffUI.Number.op_Implicit$2(120);
		$t4.height = Client.ShuffUI.Number.op_Implicit$2(25);
		$t4.text = 'Start Game';
		$t4.click = Function.mkdel(this, function(e1) {
			pageHandler.gateway.emit('Area.Game.Start', Models.StartGameRequestModel.$ctor(pageHandler.gameStuff.roomID), this.devArea.data.gameServer);
			//NO EMIT"ING OUTSIDE OF PageHandler
		});
		$t6.btnStartGame = $t5.addButton($t4);
		var randomName = '';
		var ra = Math.random() * 10;
		for (var i = 0; i < ra; i++) {
			randomName += String.fromCharCode(ss.Int32.trunc(65 + Math.random() * 26));
		}
		var $t9 = this.home.data;
		var $t8 = this.home;
		var $t7 = new Client.ShuffUI.ShuffTextBox();
		$t7.x = 130;
		$t7.y = 43;
		$t7.width = Client.ShuffUI.Number.op_Implicit$2(130);
		$t7.height = Client.ShuffUI.Number.op_Implicit$2(20);
		$t7.text = randomName;
		$t7.label = 'Username=';
		$t9.txtUserName = $t8.addTextbox($t7);
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
		var $t12 = this.home.data;
		var $t11 = this.home;
		var $t10 = new Client.ShuffUI.ShuffListBox();
		$t10.x = 30;
		$t10.y = 280;
		$t10.width = Client.ShuffUI.Number.op_Implicit$2(215);
		$t10.height = Client.ShuffUI.Number.op_Implicit$2(125);
		$t10.label = 'Users';
		$t12.userList = $t11.addListBox($t10);
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
		var $t13 = new (Type.makeGenericType(Client.ShuffUI.ShuffWindow$1, [Client.Information.DevAreaInformation]))(new Client.Information.DevAreaInformation());
		$t13.title = 'Developer';
		$t13.x = 500;
		$t13.y = 100;
		$t13.width = Client.ShuffUI.Number.op_Implicit$2(420);
		$t13.height = Client.ShuffUI.Number.op_Implicit$2(450);
		$t13.allowClose = true;
		$t13.allowMinimize = true;
		this.devArea = shuffUIManager.createWindow(Client.Information.DevAreaInformation).call(shuffUIManager, $t13);
		this.devArea.data.beginGame = Function.mkdel(this, function() {
			this.devArea.data.created = false;
			this.devArea.data.joined = 0;
			pageHandler.startGameServer();
			var $t15 = pageHandler.gateway;
			var $t14 = new Models.UserModel();
			$t14.userName = this.devArea.data.txtNumOfPlayers.val();
			$t15.emit('Area.Debug.Create', { user: $t14, Name: 'main room', Source: this.codeArea.data.codeEditor.editor.getValue(), BreakPoints: this.codeArea.data.breakPoints }, null);
		});
		var $t17 = this.devArea;
		var $t16 = new Client.ShuffUI.ShuffButton();
		$t16.x = 280;
		$t16.y = 54;
		$t16.width = Client.ShuffUI.Number.op_Implicit$2(150);
		$t16.height = Client.ShuffUI.Number.op_Implicit$2(25);
		$t16.text = 'Begin Game';
		$t16.click = Function.mkdel(this, function(e2) {
			this.devArea.data.beginGame();
		});
		$t17.addButton($t16);
		var $t20 = this.devArea.data;
		var $t19 = this.devArea;
		var $t18 = new Client.ShuffUI.ShuffLabel();
		$t18.x = 80;
		$t18.y = 80;
		$t18.width = Client.ShuffUI.Number.op_Implicit$2(250);
		$t18.height = Client.ShuffUI.Number.op_Implicit$2(25);
		$t18.text = 'How Many= ';
		$t20.lblHowFast = $t19.addLabel($t18);
		var $t23 = this.devArea.data;
		var $t22 = this.devArea;
		var $t21 = new Client.ShuffUI.ShuffLabel();
		$t21.x = 80;
		$t21.y = 100;
		$t21.width = Client.ShuffUI.Number.op_Implicit$2(250);
		$t21.height = Client.ShuffUI.Number.op_Implicit$2(25);
		$t21.text = 'Another: ';
		$t23.lblAnother = $t22.addLabel($t21);
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
		var $t25 = this.devArea;
		var $t24 = new Client.ShuffUI.ShuffPropertyBox();
		$t24.x = 25;
		$t24.y = 200;
		$t24.width = Client.ShuffUI.Number.op_Implicit$2(250);
		$t24.height = Client.ShuffUI.Number.op_Implicit$2(250);
		$t24.itemCreation = function(item, index) {
			var ik = $(String.format('<div style=\'width=100%;height=25px; background-color={0};\'></div>', ((index % 2 === 0) ? 'red' : 'green')));
			var ikc = $(String.format('<div style=\'width=50%;height=25px; float=left;\'>{0}</div>', item.label));
			ik.append(ikc);
			var ikd = $(String.format('<input type=\'text\' style=\'width=48%;height=25px\' value=\'{0}\' />', item.value));
			ik.append(ikd);
			return ik;
		};
		var propBox = $t25.addPropertyBox(pop = $t24);
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
		var $t28 = this.devArea.data;
		var $t27 = this.devArea;
		var $t26 = new Client.ShuffUI.ShuffTextBox();
		$t26.x = 150;
		$t26.y = 134;
		$t26.width = Client.ShuffUI.Number.op_Implicit$2(100);
		$t26.height = Client.ShuffUI.Number.op_Implicit$2(25);
		$t26.label = 'Var Lookup';
		$t28.varText = $t27.addTextbox($t26);
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
			this.devArea.data.lblAnother.text(room2.gameServer);
			var count = parseInt(this.devArea.data.txtNumOfPlayers.val());
			if (!this.devArea.data.created) {
				pageHandler.gateway.emit('Area.Game.DebuggerJoin', Models.DebuggerJoinRequestModel.$ctor(room2.roomID), this.devArea.data.gameServer);
				//NO EMIT"ING OUTSIDE OF PageHandler
				for (var i1 = 0; i1 < count; i1++) {
					var $t31 = pageHandler.gateway;
					var $t30 = room2.roomID;
					var $t29 = new Models.UserModel();
					$t29.userName = 'player ' + (i1 + 1);
					$t31.emit('Area.Game.Join', Models.JoinGameRequestModel.$ctor($t30, $t29), this.devArea.data.gameServer);
					//NO EMIT"ING OUTSIDE OF PageHandler
				}
				this.devArea.data.created = true;
			}
			else if (++this.devArea.data.joined === count) {
				pageHandler.gateway.emit('Area.Game.Start', Models.StartGameRequestModel.$ctor(room2.roomID), this.devArea.data.gameServer);
				//NO EMIT"ING OUTSIDE OF PageHandler
			}
		});
		var $t34 = this.devArea.data;
		var $t33 = this.devArea;
		var $t32 = new Client.ShuffUI.ShuffTextBox();
		$t32.x = 130;
		$t32.y = 43;
		$t32.width = Client.ShuffUI.Number.op_Implicit$2(130);
		$t32.height = Client.ShuffUI.Number.op_Implicit$2(20);
		$t32.text = '6';
		$t32.label = 'Number of players=';
		$t32.labelStyle = 'font-size=13px';
		$t34.txtNumOfPlayers = $t33.addTextbox($t32);
		var $t35 = new (Type.makeGenericType(Client.ShuffUI.ShuffWindow$1, [Client.Information.CodeAreaInformation]))(new Client.Information.CodeAreaInformation());
		$t35.title = 'Code';
		$t35.x = 0;
		$t35.y = 0;
		$t35.staticPositioning = true;
		$t35.width = Client.ShuffUI.Number.op_Implicit$2(($(window)).width() * 0.5);
		$t35.height = Client.ShuffUI.Number.op_Implicit$2(($(window)).height() * 0.9);
		$t35.allowClose = true;
		$t35.allowMinimize = true;
		$t35.set_visible(true);
		this.codeArea = shuffUIManager.createWindow(Client.Information.CodeAreaInformation).call(shuffUIManager, $t35);
		this.codeArea.data.breakPoints = new Array();
		var $t38 = this.codeArea.data;
		var $t37 = this.codeArea;
		var $t36 = new Client.ShuffUI.ShuffCodeEditor();
		$t36.height = Client.ShuffUI.Number.op_Implicit$3('20%');
		$t36.lineNumbers = false;
		$t38.console = $t37.addCodeEditor($t36);
		var $t41 = this.codeArea.data;
		var $t40 = this.codeArea;
		var $t39 = new Client.ShuffUI.ShuffCodeEditor();
		$t39.height = Client.ShuffUI.Number.op_Implicit$3('80%');
		$t39.lineNumbers = true;
		$t41.codeEditor = $t40.addCodeEditor($t39);
		var $t42 = new (Type.makeGenericType(Client.ShuffUI.ShuffWindow$1, [Client.Information.QuestionAreaInformation]))(new Client.Information.QuestionAreaInformation());
		$t42.title = 'Question';
		$t42.x = 600;
		$t42.y = 100;
		$t42.width = Client.ShuffUI.Number.op_Implicit$2(300);
		$t42.height = Client.ShuffUI.Number.op_Implicit$2(275);
		$t42.allowClose = true;
		$t42.allowMinimize = true;
		$t42.set_visible(false);
		this.questionArea = shuffUIManager.createWindow(Client.Information.QuestionAreaInformation).call(shuffUIManager, $t42);
		var $t45 = this.questionArea.data;
		var $t44 = this.questionArea;
		var $t43 = new Client.ShuffUI.ShuffLabel();
		$t43.x = 20;
		$t43.y = 5;
		$t43.width = Client.ShuffUI.Number.op_Implicit$2(150);
		$t43.height = Client.ShuffUI.Number.op_Implicit$2(25);
		$t43.text = '';
		$t45.question = $t44.addLabel($t43);
		this.questionArea.data.load = Function.mkdel(this, function(question) {
			this.questionArea.set_visible(true);
			this.questionArea.data.question.text(question.question);
			this.questionArea.data.answerBox.remove();
			var answers = new Array();
			for (var i2 = 0; i2 < question.answers.length; i2++) {
				answers.add(new Client.ShuffUI.ShuffListItem(question.answers[i2], i2));
			}
			var $t48 = this.questionArea.data;
			var $t47 = this.questionArea;
			var $t46 = new Client.ShuffUI.ShuffListBox();
			$t46.x = 30;
			$t46.y = 65;
			$t46.width = Client.ShuffUI.Number.op_Implicit$2(215);
			$t46.height = Client.ShuffUI.Number.op_Implicit$2(125);
			$t46.label = 'Answers';
			$t46.items = answers;
			$t46.click = Function.mkdel(this, function(item1) {
				pageHandler.gateway.emit('Area.Game.AnswerQuestion', Models.GameAnswerQuestionModel.$ctor1(pageHandler.gameStuff.roomID, item1.value), this.devArea.data.gameServer);
				this.questionArea.set_visible(false);
			});
			$t48.answerBox = $t47.addListBox($t46);
		});
		var $t51 = this.questionArea.data;
		var $t50 = this.questionArea;
		var $t49 = new Client.ShuffUI.ShuffListBox();
		$t49.x = 30;
		$t49.y = 65;
		$t49.width = Client.ShuffUI.Number.op_Implicit$2(215);
		$t49.height = Client.ShuffUI.Number.op_Implicit$2(125);
		$t49.label = 'Answers';
		$t49.click = Function.mkdel(this, function(item2) {
			pageHandler.gateway.emit('Area.Game.AnswerQuestion', Models.GameAnswerQuestionModel.$ctor1(pageHandler.gameStuff.roomID, item2.value), this.devArea.data.gameServer);
			this.questionArea.set_visible(false);
		});
		$t51.answerBox = $t50.addListBox($t49);
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
		(document.getElementsByTagName('head')[0]).appendChild(fileref);
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
	this.$endTime = null;
	this.$gameCanvas = null;
	this.$gameContext = null;
	this.gameStuff = null;
	this.gateway = null;
	this.$lastMainArea = null;
	this.$numOfTimes = 0;
	this.$startTime = null;
	this.$timeValue = 0;
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
		buildSite.devArea.data.lblHowFast.text('How Many: ' + ss.Int32.div(this.$timeValue, this.$numOfTimes));
		buildSite.codeArea.data.codeEditor.editor.setValue(data3.content);
		buildSite.codeArea.data.codeEditor.editor.setMarker(0, '<span style="color: #900">&nbsp;&nbsp;</span> %N%');
		buildSite.codeArea.data.codeEditor.editor.refresh();
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
	this.$lastMainArea = null;
	($('body')).append(this.$gameCanvas = document.createElement('canvas'));
	var props = {};
	props['margin'] = '0px';
	props['position'] = 'absolute';
	props['top'] = '0px';
	props['left'] = ($(window)).width() * 0.5 + 'px';
	props['z-index'] = ($(window)).width() * 0.5 + 'px';
	($(this.$gameCanvas)).css(props);
	this.$gameContext = new Client.PageGameContext(this.$gameCanvas.getContext('2d'), new Client.GameCanvasInformation());
	this.$gameContext.canvasInfo.canvas = this.$gameCanvas;
	this.$gameContext.canvasInfo.domCanvas = ($(this.$gameCanvas));
	this.$gameContext.canvasInfo.canvas.width = ss.Int32.trunc(($(window)).width() * 0.5);
	this.$gameContext.canvasInfo.canvas.height = ($(window)).height();
	this.$gameCanvas.addEventListener('DOMMouseScroll', Function.mkdel(this, this.handleScroll), false);
	this.$gameCanvas.addEventListener('mousewheel', Function.mkdel(this, this.handleScroll), false);
	this.$gameCanvas.addEventListener('touchmove', Function.mkdel(this, this.canvasMouseMove), true);
	this.$gameCanvas.addEventListener('touchstart', Function.mkdel(this, this.canvasOnClick), true);
	this.$gameCanvas.addEventListener('touchend', Function.mkdel(this, this.canvasMouseUp), true);
	this.$gameCanvas.addEventListener('mousedown', Function.mkdel(this, this.canvasMouseMove), true);
	this.$gameCanvas.addEventListener('mouseup', Function.mkdel(this, this.canvasOnClick), true);
	this.$gameCanvas.addEventListener('mousemove', Function.mkdel(this, this.canvasMouseUp), true);
	this.$gameCanvas.addEventListener('contextmenu', function(e) {
		e.preventDefault();
		//todo: Sspecial right click menu;
	}, false);
	($(window)).resize(Function.mkdel(this, this.resizeCanvas));
	this.resizeCanvas(null);
	window.setInterval(Function.mkdel(this, this.draw), 16);
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
			var lines = this.$buildSite.codeArea.data.console.editor.getValue().split('\n');
			lines = Type.cast(lines.extract(lines.length - 40, 40), Array);
			this.$buildSite.codeArea.data.console.editor.setValue(lines.join('\n') + '\n' + data1.value);
			this.$buildSite.codeArea.data.console.editor.setCursor(this.$buildSite.codeArea.data.console.editor.lineCount(), 0);
		}));
		this.gateway.on('Area.Debug.Break', Function.mkdel(this, function(data2) {
			this.$buildSite.home.data.loadRoomInfos(data2);
			var cm = this.$buildSite.codeArea.data.codeEditor;
			cm.editor.clearMarker(data2.lineNumber);
			cm.editor.setMarker(data2.lineNumber, '<span style="color: #059">●</span> %N%');
			cm.editor.setCursor(data2.lineNumber + 15, 0);
			cm.editor.setCursor(data2.lineNumber - 15, 0);
			cm.editor.setCursor(data2.lineNumber, 0);
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
			this.$buildSite.devArea.data.lblHowFast.text('how long: ' + time);
			window.setTimeout(Function.mkdel(this, function() {
				this.gateway.emit('Area.Game.AnswerQuestion', Models.GameAnswerQuestionModel.$ctor1(this.gameStuff.roomID, 1), this.$buildSite.devArea.data.gameServer);
				this.$buildSite.questionArea.set_visible(false);
				this.$startTime = new Date();
			}), 200);
		}));
		this.gateway.on('Area.Game.UpdateState', Function.mkdel(this, function(data4) {
			this.$gameContext.context.clearRect(0, 0, this.$gameContext.canvasInfo.canvas.width, this.$gameContext.canvasInfo.canvas.height);
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
	drawArea: function(mainArea) {
		var gameboard = this.$gameContext;
		this.$lastMainArea = mainArea;
		var scale = new CommonLibraries.Point(ss.Int32.div(this.$gameContext.canvasInfo.canvas.width, mainArea.size.width), ss.Int32.div(this.$gameContext.canvasInfo.canvas.height, mainArea.size.height));
		gameboard.context.fillStyle = 'rgba(0,0,200,0.5)';
		var $t1 = mainArea.spaces.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var space = $t1.get_current();
				var vertical = space.vertical;
				var $t2 = space.effects.getEnumerator();
				try {
					while ($t2.moveNext()) {
						var effect = $t2.get_current();
						if (effect.type === 'highlight') {
							var hEffect = effect;
							gameboard.context.save();
							gameboard.context.translate(hEffect.offsetX, hEffect.offsetY);
							gameboard.context.rotate(hEffect.rotate * Math.PI / 180);
							gameboard.context.translate(-hEffect.radius, -hEffect.radius);
							gameboard.context.fillStyle = hEffect.color;
							gameboard.context.strokeStyle = 'black';
							gameboard.context.lineWidth = 5;
							gameboard.context.fillRect(space.x * scale.x, space.y * scale.y, space.width * scale.x + hEffect.radius * 2, space.height * scale.y + hEffect.radius * 2);
							gameboard.context.strokeRect(space.x * scale.x, space.y * scale.y, space.width * scale.x + hEffect.radius * 2, space.height * scale.y + hEffect.radius * 2);
							gameboard.context.restore();
						}
						//
						//                        switch (effect.Type)
						//
						//                        {
						//
						//                        case EffectType.Highlight:
						//
						//                        
						//
						//                        break;
						//
						//                        }
					}
				}
				finally {
					if (Type.isInstanceOfType($t2, ss.IDisposable)) {
						Type.cast($t2, ss.IDisposable).dispose();
					}
				}
				gameboard.context.fillRect(space.x * scale.x, space.y * scale.y, space.width * scale.x, space.height * scale.y);
				var spaceScale = new CommonLibraries.Point(space.width / space.pile.cards.length, space.height / space.pile.cards.length);
				var j = 0;
				var $t3 = space.pile.cards.getEnumerator();
				try {
					while ($t3.moveNext()) {
						var card = $t3.get_current();
						var xx = 0;
						var yy = 0;
						if (space.resizeType === 'grow') {
							xx = Math.floor(space.x * scale.x + (!vertical ? (j * spaceScale.x * scale.x) : 0));
							yy = Math.floor(space.y * scale.y + (vertical ? (j * spaceScale.y * scale.y) : 0));
						}
						else if (space.resizeType === 'static') {
							if (vertical) {
								xx = space.x * scale.x;
								yy = space.y * scale.y + card.value * scale.y / 2;
							}
							else {
								xx = space.x * scale.x + card.value * scale.x / 2;
								yy = space.y * scale.y;
							}
						}
						var cardImage = this.$cardImages[this.drawCard(card)];
						gameboard.context.save();
						gameboard.context.translate(xx + (vertical ? (space.width * scale.x / 2) : 0), yy + (!vertical ? (space.height * scale.y / 2) : 0));
						gameboard.context.rotate(space.rotate * Math.PI / 180);
						gameboard.context.translate(ss.Int32.div(-cardImage.width, 2), ss.Int32.div(-cardImage.height, 2));
						var $t4 = card.effects.getEnumerator();
						try {
							while ($t4.moveNext()) {
								var effect1 = $t4.get_current();
								if (effect1.type === 'highlight') {
									var hEffect1 = effect1;
									gameboard.context.save();
									gameboard.context.translate(hEffect1.offsetX, hEffect1.offsetY);
									gameboard.context.rotate(hEffect1.rotate * Math.PI / 180);
									gameboard.context.translate(-hEffect1.radius, -hEffect1.radius);
									gameboard.context.lineWidth = 2;
									gameboard.context.fillStyle = hEffect1.color;
									gameboard.context.strokeStyle = '#454545';
									gameboard.context.fillRect(0, 0, cardImage.width + hEffect1.radius * 2, cardImage.height + hEffect1.radius * 2);
									gameboard.context.strokeRect(0, 0, cardImage.width + hEffect1.radius * 2, cardImage.height + hEffect1.radius * 2);
									gameboard.context.restore();
								}
							}
						}
						finally {
							if (Type.isInstanceOfType($t4, ss.IDisposable)) {
								Type.cast($t4, ss.IDisposable).dispose();
							}
						}
						var $t5 = card.effects.getEnumerator();
						try {
							while ($t5.moveNext()) {
								var effect2 = $t5.get_current();
								switch (effect2.post) {
									case 1: {
										if (effect2.type === 'rotate') {
											var hEffect2 = effect2;
											gameboard.context.save();
											gameboard.context.translate(ss.Int32.div(cardImage.width, 2), ss.Int32.div(cardImage.height, 2));
											gameboard.context.rotate(hEffect2.degrees * Math.PI / 180);
											gameboard.context.translate(ss.Int32.div(-cardImage.width, 2), ss.Int32.div(-cardImage.height, 2));
										}
										break;
									}
								}
							}
						}
						finally {
							if (Type.isInstanceOfType($t5, ss.IDisposable)) {
								Type.cast($t5, ss.IDisposable).dispose();
							}
						}
						var $t6 = space.effects.getEnumerator();
						try {
							while ($t6.moveNext()) {
								var effect3 = $t6.get_current();
								switch (effect3.post) {
									case 1: {
										if (effect3.type === 'bend') {
											var hEffect3 = effect3;
											gameboard.context.save();
											gameboard.context.translate(ss.Int32.div(cardImage.width, 2), ss.Int32.div(cardImage.height, 2));
											gameboard.context.rotate((-hEffect3.degrees / 2 + hEffect3.degrees / (space.pile.cards.length - 1) * j) * Math.PI / 180);
											gameboard.context.translate(ss.Int32.div(-cardImage.width, 2), ss.Int32.div(-cardImage.height, 2));
											//gameboard.Context.Translate(0, -(j - (space.Pile.Cards.Count - 1) / 2) * 5);
										}
										break;
									}
								}
							}
						}
						finally {
							if (Type.isInstanceOfType($t6, ss.IDisposable)) {
								Type.cast($t6, ss.IDisposable).dispose();
							}
						}
						gameboard.context.drawImage(cardImage, 0, 0);
						var $t7 = card.effects.getEnumerator();
						try {
							while ($t7.moveNext()) {
								var effect4 = $t7.get_current();
								switch (effect4.post) {
									case 1: {
										if (effect4.type === 'rotate') {
											gameboard.context.restore();
										}
										break;
									}
								}
							}
						}
						finally {
							if (Type.isInstanceOfType($t7, ss.IDisposable)) {
								Type.cast($t7, ss.IDisposable).dispose();
							}
						}
						var $t8 = space.effects.getEnumerator();
						try {
							while ($t8.moveNext()) {
								var effect5 = $t8.get_current();
								switch (effect5.post) {
									case 1: {
										if (effect5.type === 'bend') {
											gameboard.context.restore();
										}
										break;
									}
								}
							}
						}
						finally {
							if (Type.isInstanceOfType($t8, ss.IDisposable)) {
								Type.cast($t8, ss.IDisposable).dispose();
							}
						}
						gameboard.context.restore();
						j++;
					}
				}
				finally {
					if (Type.isInstanceOfType($t3, ss.IDisposable)) {
						Type.cast($t3, ss.IDisposable).dispose();
					}
				}
			}
		}
		finally {
			if (Type.isInstanceOfType($t1, ss.IDisposable)) {
				Type.cast($t1, ss.IDisposable).dispose();
			}
		}
		var $t9 = mainArea.textAreas.getEnumerator();
		try {
			while ($t9.moveNext()) {
				var ta = $t9.get_current();
				gameboard.context.fillStyle = 'rgba(200, 0, 200, 0.5)';
				gameboard.context.fillText(ta.text, ta.x * scale.x, ta.y * scale.y);
			}
		}
		finally {
			if (Type.isInstanceOfType($t9, ss.IDisposable)) {
				Type.cast($t9, ss.IDisposable).dispose();
			}
		}
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
	},
	resizeCanvas: function(jQueryEvent) {
		if (!ss.referenceEquals(this.$gameContext.canvasInfo.domCanvas.attr('width'), ($(window)).width().toString())) {
			this.$gameContext.canvasInfo.domCanvas.attr('width', (($(window)).width() * 0.5).toString());
		}
		if (!ss.referenceEquals(this.$gameContext.canvasInfo.domCanvas.attr('height'), ($(window)).height().toString())) {
			this.$gameContext.canvasInfo.domCanvas.attr('height', ($(window)).height().toString());
		}
		if (ss.isValue(this.$lastMainArea)) {
			this.drawArea(this.$lastMainArea);
		}
	},
	draw: function() {
		this.$gameContext.canvasInfo.canvas.width = this.$gameContext.canvasInfo.canvas.width;
		if (ss.isValue(this.$lastMainArea)) {
			this.drawArea(this.$lastMainArea);
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ScriptLoader
Client.ScriptLoader = function() {
};
Client.ScriptLoader.prototype = {
	$loadScript: function(url, callback) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		// +"?" + (Math.floor(Math.random() * 10000)); //caching
		if (ss.isValue(callback)) {
			(script).onreadystatechange = function(a) {
				if (ss.Nullable.unbox(Type.cast((script).readyState === 'loaded', Boolean))) {
					callback();
				}
			};
			(script).onload = function(a1) {
				callback();
			};
		}
		head.appendChild(script);
	},
	load: function(items, done) {
		var counter = 0;
		for (var i = 0; i < items.length; i++) {
			this.$loadScript(items[i], function() {
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
				this.$loadScript(items[counter], nextOne);
			}
		});
		this.$loadScript(items[0], nextOne);
	}
};
Type.registerNamespace('Client.ShuffUI');
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
	return d.$value;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffButton
Client.ShuffUI.ShuffButton = function() {
	this.text = null;
	this.click = null;
	Client.ShuffUI.ShuffElement.call(this);
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffButton$1
Client.ShuffUI.ShuffButton$1 = function(T) {
	var $type = function(data) {
		this.data = T.getDefaultValue();
		Client.ShuffUI.ShuffButton.call(this);
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
// Client.ShuffUI.ShuffCodeEditor
Client.ShuffUI.ShuffCodeEditor = function() {
	this.lineNumbers = false;
	Client.ShuffUI.ShuffElement.call(this);
	this.width = Client.ShuffUI.Number.op_Implicit$3('100%');
	this.height = Client.ShuffUI.Number.op_Implicit$3('100%');
};
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
// Client.ShuffUI.ShuffElement
Client.ShuffUI.ShuffElement = function() {
	this.$visible = false;
	this.x = 0;
	this.y = 0;
	this.width = null;
	this.height = null;
	this.element = null;
	this.$visible = true;
};
Client.ShuffUI.ShuffElement.prototype = {
	get_visible: function() {
		return this.$visible;
	},
	set_visible: function(value) {
		if (ss.isValue(this.element)) {
			this.element.css('display', (this.$visible ? 'block' : 'none'));
		}
		this.$visible = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffLabel
Client.ShuffUI.ShuffLabel = function() {
	this.text = null;
	Client.ShuffUI.ShuffElement.call(this);
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffLabel$1
Client.ShuffUI.ShuffLabel$1 = function(T) {
	var $type = function(data) {
		this.data = T.getDefaultValue();
		Client.ShuffUI.ShuffLabel.call(this);
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
// Client.ShuffUI.ShuffListBox
Client.ShuffUI.ShuffListBox = function() {
	this.label = null;
	this.click = null;
	this.items = null;
	Client.ShuffUI.ShuffElement.call(this);
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffListBox$1
Client.ShuffUI.ShuffListBox$1 = function(T) {
	var $type = function(data) {
		this.data = T.getDefaultValue();
		Client.ShuffUI.ShuffListBox.call(this);
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
// Client.ShuffUI.ShuffListItem
Client.ShuffUI.ShuffListItem = function(label, value) {
	this.label = null;
	this.value = 0;
	this.label = label;
	this.value = value;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffPropertyBox
Client.ShuffUI.ShuffPropertyBox = function() {
	this.addItem = null;
	this.items = null;
	this.itemCreation = null;
	Client.ShuffUI.ShuffElement.call(this);
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffPropertyBox$1
Client.ShuffUI.ShuffPropertyBox$1 = function(T) {
	var $type = function(data) {
		this.data = T.getDefaultValue();
		Client.ShuffUI.ShuffPropertyBox.call(this);
		this.data = data;
	};
	$type.registerGenericClassInstance($type, Client.ShuffUI.ShuffPropertyBox$1, [T], function() {
		return Client.ShuffUI.ShuffPropertyBox;
	}, function() {
		return [];
	});
	return $type;
};
Client.ShuffUI.ShuffPropertyBox$1.registerGenericClass('Client.ShuffUI.ShuffPropertyBox$1', 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffTextBox
Client.ShuffUI.ShuffTextBox = function() {
	this.labelStyle = null;
	this.label = null;
	this.text = null;
	Client.ShuffUI.ShuffElement.call(this);
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffTextBox$1
Client.ShuffUI.ShuffTextBox$1 = function(T) {
	var $type = function(data) {
		this.data = T.getDefaultValue();
		Client.ShuffUI.ShuffTextBox.call(this);
		this.data = data;
	};
	$type.registerGenericClassInstance($type, Client.ShuffUI.ShuffTextBox$1, [T], function() {
		return Client.ShuffUI.ShuffTextBox;
	}, function() {
		return [];
	});
	return $type;
};
Client.ShuffUI.ShuffTextBox$1.registerGenericClass('Client.ShuffUI.ShuffTextBox$1', 1);
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
			outer.css('position', 'absolute');
			outer.css('padding', '2em 0.8em 0.8em 1.3em');
			outer.css('left', ui.x + 'px');
			outer.css('top', ui.y + 'px');
			outer.css('width', Client.ShuffUI.Number.op_Implicit$1(ui.width) + 'px');
			outer.css('height', Client.ShuffUI.Number.op_Implicit$1(ui.height) + 'px');
			outer.css('di', Client.ShuffUI.Number.op_Implicit$1(ui.height) + 'px');
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
			return ui;
		};
	},
	focus: function(info) {
		for (var i = 0; i < this.$uiAreas.length; i++) {
			(this.$uiAreas[i]).get_element().css('z-index', 1800);
		}
		info.get_element().css('z-index', 1900);
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffWindow$1
Client.ShuffUI.ShuffWindow$1 = function(T) {
	var $type = function(data) {
		this.outer = null;
		this.data = T.getDefaultValue();
		this.elements = null;
		this.title = null;
		this.allowClose = false;
		this.allowMinimize = false;
		this.staticPositioning = false;
		this.information = null;
		Client.ShuffUI.ShuffElement.call(this);
		this.data = data;
		this.elements = new Array();
	};
	$type.prototype = {
		get_$window: function() {
			return this.element;
		},
		set_$window: function(value) {
			this.element = value;
		},
		get_$outer: function() {
			return this.outer;
		},
		set_$outer: function(value) {
			this.outer = value;
			this.outer.resizable({ handles: ('n, e, s, w, ne, se, sw, nw') });
		},
		addButton: function(element) {
			this.elements.add(element);
			var but = $('<div></div>');
			element.element = but;
			this.get_$window().append(but);
			but.text(element.text);
			but.css('position', 'absolute');
			but.css('left', element.x + 'px');
			but.css('top', element.y + 'px');
			but.css('width', Client.ShuffUI.Number.op_Implicit$1(element.width) + 'px');
			but.css('height', Client.ShuffUI.Number.op_Implicit$1(element.height) + 'px');
			but.button();
			but.click(element.click);
			but.disableSelection();
			but.css('display', ((element.get_visible() === false) ? 'none' : 'block'));
			return but;
		},
		addLabel: function(element) {
			this.elements.add(element);
			var but = $('<span></span>');
			element.element = but;
			this.get_$window().append(but);
			but.text(element.text);
			but.css('position', 'absolute');
			but.css('left', element.x + 'px');
			but.css('top', element.y + 'px');
			but.disableSelection();
			but.css('display', ((element.get_visible() === false) ? 'none' : 'block'));
			return but;
		},
		addTextbox: function(element) {
			this.elements.add(element);
			var but = $('<input value=\'' + Object.coalesce(element.text, '') + '\' />');
			element.element = but;
			this.get_$window().append(but);
			but.text(element.text);
			but.css('position', 'absolute');
			but.css('left', element.x + 'px');
			but.css('top', element.y + 'px');
			but.css('width', Client.ShuffUI.Number.op_Implicit$1(element.width) + 'px');
			but.css('height', Client.ShuffUI.Number.op_Implicit$1(element.height) + 'px');
			but.disableSelection();
			if (ss.isValue(element.label)) {
				var lbl = $('<span style=\'' + element.labelStyle + '\'></span>');
				lbl.text(element.label);
				this.get_$window().append(lbl);
				lbl.css('position', 'absolute');
				lbl.css('left', element.x - lbl.width());
				lbl.css('top', element.y + 2);
				lbl.disableSelection();
			}
			but.css('display', ((element.get_visible() === false) ? 'none' : 'block'));
			return but;
		},
		addCodeEditor: function(_editor) {
			//options = objMerge({ width: '100%', height: '100%' }, options);
			this.elements.add(_editor);
			var divs = $('<div style=\'width:' + Client.ShuffUI.Number.op_Implicit$1(_editor.width) + '; height:' + Client.ShuffUI.Number.op_Implicit$1(_editor.height) + '\'\'> </div>');
			this.get_$window().append(divs);
			divs.append('<textarea id=\'code\' name=\'code\' class=\'CodeMirror-fullscreen \' style=\'\'></textarea>');
			var $t1 = new Client.ShuffUI.CodeMirrorInformation();
			$t1.element = document.getElementById('code');
			var codeMirror = $t1;
			codeMirror.element.value = '';
			var hlLine = null;
			codeMirror.editor = CodeMirror.fromTextArea(codeMirror.element, {
				lineNumbers: _editor.lineNumbers,
				lineWrapping: true,
				matchBrackets: true,
				onGutterClick: function(cm, n, e) {
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
				onCursorActivity: function(e1) {
					codeMirror.editor.setLineClass(hlLine, null);
					hlLine = codeMirror.editor.setLineClass(codeMirror.editor.getCursor().line, 'activeline');
				},
				onFocus: function(e2) {
				},
				onBlur: function(e3) {
				}
			});
			hlLine = codeMirror.editor.setLineClass(0, 'activeline');
			var scroller = codeMirror.editor.getScrollerElement();
			scroller.style.height = (divs[0]).offsetHeight + 'px';
			scroller.style.width = (divs[0]).offsetWidth + 'px';
			codeMirror.editor.refresh();
			codeMirror.editor.setOption('theme', 'night');
			this.outer.resizable({
				handles: ('n, e, s, w, ne, se, sw, nw'),
				resize: function(e4, c) {
					scroller.style.height = (divs[0]).offsetHeight + 'px';
					scroller.style.width = (divs[0]).offsetWidth + 'px';
				}
			});
			return codeMirror;
		},
		addListBox: function(element) {
			this.elements.add(element);
			var but = $('<div></div>');
			element.element = but;
			this.get_$window().append(but);
			but.css('position', 'absolute');
			but.css('left', element.x + 'px');
			but.css('top', element.y + 'px');
			// var theme = "getTheme()".me();
			// var theme = getTheme();
			// but.jqxListBox({ source: options.items, width: options.width, height: options.height, theme: theme });
			// but.bind('select', function (event) {
			// var item = event.args.item;
			// if (options.click)
			// options.click(item);
			// });
			// return but;
			return but;
		},
		addPropertyBox: function(shuffPropertyBox) {
			var but = $('<div></div>');
			this.get_$window().append(but);
			but.css('position', 'absolute');
			but.css('left', shuffPropertyBox.x);
			but.css('top', shuffPropertyBox.y);
			but.css('width', Client.ShuffUI.Number.op_Implicit$1(shuffPropertyBox.width));
			but.css('height', Client.ShuffUI.Number.op_Implicit$1(shuffPropertyBox.height));
			but.css('overflow', 'scroll');
			shuffPropertyBox.items = new Array();
			shuffPropertyBox.addItem = function(ij) {
				but.append(shuffPropertyBox.itemCreation(ij, shuffPropertyBox.items.length));
				shuffPropertyBox.items.add(ij);
			};
			return but;
		}
	};
	$type.registerGenericClassInstance($type, Client.ShuffUI.ShuffWindow$1, [T], function() {
		return Client.ShuffUI.ShuffElement;
	}, function() {
		return [];
	});
	return $type;
};
Client.ShuffUI.ShuffWindow$1.registerGenericClass('Client.ShuffUI.ShuffWindow$1', 1);
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
Client.ShuffUI.CodeMirrorInformation.registerClass('Client.ShuffUI.CodeMirrorInformation', Object);
Client.ShuffUI.CodeMirrorInformationData.registerClass('Client.ShuffUI.CodeMirrorInformationData', Object);
Client.ShuffUI.Number.registerClass('Client.ShuffUI.Number', Object);
Client.ShuffUI.ShuffElement.registerClass('Client.ShuffUI.ShuffElement', Object);
Client.ShuffUI.ShuffLabel.registerClass('Client.ShuffUI.ShuffLabel', Client.ShuffUI.ShuffElement);
Client.ShuffUI.ShuffListBox.registerClass('Client.ShuffUI.ShuffListBox', Client.ShuffUI.ShuffElement);
Client.ShuffUI.ShuffListItem.registerClass('Client.ShuffUI.ShuffListItem', Object);
Client.ShuffUI.ShuffPropertyBox.registerClass('Client.ShuffUI.ShuffPropertyBox', Client.ShuffUI.ShuffElement);
Client.ShuffUI.ShuffTextBox.registerClass('Client.ShuffUI.ShuffTextBox', Client.ShuffUI.ShuffElement);
Client.ShuffUI.ShuffUIManager.registerClass('Client.ShuffUI.ShuffUIManager', Object);
Client.ShuffUI.UIAreaInformation.registerClass('Client.ShuffUI.UIAreaInformation', Object);
Globals.registerClass('Globals', Object);
Client.ShuffUI.ShuffButton.registerClass('Client.ShuffUI.ShuffButton', Client.ShuffUI.ShuffElement);
Client.ShuffUI.ShuffCodeEditor.registerClass('Client.ShuffUI.ShuffCodeEditor', Client.ShuffUI.ShuffElement);
Client.BuildSite.instance = null;

