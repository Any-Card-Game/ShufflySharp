
Type.registerNamespace('Client');
////////////////////////////////////////////////////////////////////////////////
// Client.BuildSite
Client.BuildSite = function(gatewayServerAddress) {
	this.$gatewayServerAddress = null;
	this.$scriptLoader = new Client.ScriptLoader();
	this.home = null;
	this.devArea = null;
	this.questionArea = null;
	this.codeArea = null;
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
			this.$scriptLoader.load([url + 'lib/codemirror/mode/javascript/javascript.js', url + 'lib/WorkerConsole.js', url + 'lib/FunctionWorker.js', url + 'lib/Stats.js', url + 'lib/keyboardjs.js', url + 'CommonLibraries.js', url + 'ShuffleGameLibrary.js', url + 'Models.js', url + 'lib/Dialog.js'], Function.mkdel(this, this.$ready));
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
		$t1.set_x(($('body')).innerWidth() - 500);
		$t1.set_y(100);
		$t1.set_width(Client.ShuffUI.Number.op_Implicit$2(420));
		$t1.set_height(Client.ShuffUI.Number.op_Implicit$2(450));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(false);
		this.home = shuffUIManager.createWindow(Client.Information.HomeAreaInformation).call(shuffUIManager, $t1);
		var $t3 = this.home;
		var $t2 = new Client.ShuffUI.ShuffButton();
		$t2.set_x(280);
		$t2.set_y(54);
		$t2.set_width(Client.ShuffUI.Number.op_Implicit$2(150));
		$t2.set_height(Client.ShuffUI.Number.op_Implicit$2(25));
		$t2.set_text('Update Game List');
		$t2.set_click(Function.mkdel(this, function(e) {
			pageHandler.gateway.emit('Area.Game.GetGames', this.devArea.get_data().gameServer, null);
			//NO EMIT'ING OUTSIDE OF PageHandler
		}));
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
		var $t6 = this.home.get_data();
		var $t5 = this.home;
		var $t4 = new Client.ShuffUI.ShuffButton();
		$t4.set_x(280);
		$t4.set_y(164);
		$t4.set_width(Client.ShuffUI.Number.op_Implicit$2(120));
		$t4.set_height(Client.ShuffUI.Number.op_Implicit$2(25));
		$t4.set_text('Start Game');
		$t4.set_click(Function.mkdel(this, function(e1) {
			pageHandler.gateway.emit('Area.Game.Start', Models.StartGameRequestModel.$ctor(pageHandler.gameStuff.roomID), this.devArea.get_data().gameServer);
			//NO EMIT"ING OUTSIDE OF PageHandler
		}));
		$t6.btnStartGame = $t5.addButton($t4);
		var randomName = '';
		var ra = Math.random() * 10;
		for (var i = 0; i < ra; i++) {
			randomName += String.fromCharCode(ss.Int32.trunc(65 + Math.random() * 26));
		}
		var $t9 = this.home.get_data();
		var $t8 = this.home;
		var $t7 = new Client.ShuffUI.ShuffTextBox();
		$t7.set_x(130);
		$t7.set_y(43);
		$t7.set_width(Client.ShuffUI.Number.op_Implicit$2(130));
		$t7.set_height(Client.ShuffUI.Number.op_Implicit$2(20));
		$t7.set_text(randomName);
		$t7.set_label('Username=');
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
		var $t12 = this.home.get_data();
		var $t11 = this.home;
		var $t10 = new Client.ShuffUI.ShuffListBox();
		$t10.set_x(30);
		$t10.set_y(280);
		$t10.set_width(Client.ShuffUI.Number.op_Implicit$2(215));
		$t10.set_height(Client.ShuffUI.Number.op_Implicit$2(125));
		$t10.set_label('Users');
		$t12.userList = $t11.addListBox($t10);
		this.home.get_data().loadRoomInfo = function(room) {
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
		this.home.get_data().loadRoomInfos = function(room1) {
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
		$t13.set_x(($('body')).innerWidth() - 500);
		$t13.set_y(100);
		$t13.set_width(Client.ShuffUI.Number.op_Implicit$2(420));
		$t13.set_height(Client.ShuffUI.Number.op_Implicit$2(450));
		$t13.allowClose = true;
		$t13.allowMinimize = true;
		this.devArea = shuffUIManager.createWindow(Client.Information.DevAreaInformation).call(shuffUIManager, $t13);
		this.devArea.get_data().beginGame = Function.mkdel(this, function() {
			this.devArea.get_data().created = false;
			this.devArea.get_data().joined = 0;
			pageHandler.startGameServer();
			var $t15 = pageHandler.gateway;
			var $t14 = new Models.UserModel();
			$t14.userName = this.devArea.get_data().txtNumOfPlayers.val();
			$t15.emit('Area.Debug.Create', { user: $t14, Name: 'main room', Source: this.codeArea.get_data().codeEditor.editor.getValue(), BreakPoints: this.codeArea.get_data().breakPoints }, null);
		});
		var $t17 = this.devArea;
		var $t16 = new Client.ShuffUI.ShuffButton();
		$t16.set_x(280);
		$t16.set_y(54);
		$t16.set_width(Client.ShuffUI.Number.op_Implicit$2(150));
		$t16.set_height(Client.ShuffUI.Number.op_Implicit$2(25));
		$t16.set_text('Begin Game');
		$t16.set_click(Function.mkdel(this, function(e2) {
			this.devArea.get_data().beginGame();
		}));
		$t17.addButton($t16);
		var $t20 = this.devArea.get_data();
		var $t19 = this.devArea;
		var $t18 = new Client.ShuffUI.ShuffLabel();
		$t18.set_x(80);
		$t18.set_y(80);
		$t18.set_width(Client.ShuffUI.Number.op_Implicit$2(250));
		$t18.set_height(Client.ShuffUI.Number.op_Implicit$2(25));
		$t18.set_text('How Many= ');
		$t20.lblHowFast = $t19.addLabel($t18);
		var $t23 = this.devArea.get_data();
		var $t22 = this.devArea;
		var $t21 = new Client.ShuffUI.ShuffLabel();
		$t21.set_x(80);
		$t21.set_y(100);
		$t21.set_width(Client.ShuffUI.Number.op_Implicit$2(250));
		$t21.set_height(Client.ShuffUI.Number.op_Implicit$2(25));
		$t21.set_text('Another: ');
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
		$t24.set_x(25);
		$t24.set_y(200);
		$t24.set_width(Client.ShuffUI.Number.op_Implicit$2(250));
		$t24.set_height(Client.ShuffUI.Number.op_Implicit$2(250));
		$t24.set_itemCreation(function(item, index) {
			var ik = $(String.format('<div style=\'width=100%;height=25px; background-color={0};\'></div>', ((index % 2 === 0) ? 'red' : 'green')));
			var ikc = $(String.format('<div style=\'width=50%;height=25px; float=left;\'>{0}</div>', item.get_label()));
			ik.append(ikc);
			var ikd = $(String.format('<input type=\'text\' style=\'width=48%;height=25px\' value=\'{0}\' />', item.get_value()));
			ik.append(ikd);
			return ik;
		});
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
		var $t28 = this.devArea.get_data();
		var $t27 = this.devArea;
		var $t26 = new Client.ShuffUI.ShuffTextBox();
		$t26.set_x(150);
		$t26.set_y(134);
		$t26.set_width(Client.ShuffUI.Number.op_Implicit$2(100));
		$t26.set_height(Client.ShuffUI.Number.op_Implicit$2(25));
		$t26.set_label('Var Lookup');
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
		this.devArea.get_data().loadRoomInfo = Function.mkdel(this, function(room2) {
			this.devArea.get_data().gameServer = room2.gameServer;
			this.devArea.get_data().lblAnother.text(room2.gameServer);
			var count = parseInt(this.devArea.get_data().txtNumOfPlayers.val());
			if (!this.devArea.get_data().created) {
				pageHandler.gateway.emit('Area.Game.DebuggerJoin', Models.DebuggerJoinRequestModel.$ctor(room2.roomID), this.devArea.get_data().gameServer);
				//NO EMIT"ING OUTSIDE OF PageHandler
				for (var i1 = 0; i1 < count; i1++) {
					var $t31 = pageHandler.gateway;
					var $t30 = room2.roomID;
					var $t29 = new Models.UserModel();
					$t29.userName = 'player ' + (i1 + 1);
					$t31.emit('Area.Game.Join', Models.JoinGameRequestModel.$ctor($t30, $t29), this.devArea.get_data().gameServer);
					//NO EMIT"ING OUTSIDE OF PageHandler
				}
				this.devArea.get_data().created = true;
			}
			else if (++this.devArea.get_data().joined === count) {
				pageHandler.gateway.emit('Area.Game.Start', Models.StartGameRequestModel.$ctor(room2.roomID), this.devArea.get_data().gameServer);
				//NO EMIT"ING OUTSIDE OF PageHandler
			}
		});
		var $t34 = this.devArea.get_data();
		var $t33 = this.devArea;
		var $t32 = new Client.ShuffUI.ShuffTextBox();
		$t32.set_x(130);
		$t32.set_y(43);
		$t32.set_width(Client.ShuffUI.Number.op_Implicit$2(130));
		$t32.set_height(Client.ShuffUI.Number.op_Implicit$2(20));
		$t32.set_text('6');
		$t32.set_label('Number of players=');
		$t32.set_labelStyle('font-size=13px');
		$t34.txtNumOfPlayers = $t33.addTextbox($t32);
		var $t35 = new (Type.makeGenericType(Client.ShuffUI.ShuffWindow$1, [Client.Information.CodeAreaInformation]))(new Client.Information.CodeAreaInformation());
		$t35.title = 'Code';
		$t35.set_x(0);
		$t35.set_y(0);
		$t35.static = true;
		$t35.set_width(Client.ShuffUI.Number.op_Implicit$2(($(window)).width() * 0.5));
		$t35.set_height(Client.ShuffUI.Number.op_Implicit$2(($(window)).height() * 0.9));
		$t35.allowClose = true;
		$t35.allowMinimize = true;
		$t35.set_visible(true);
		this.codeArea = shuffUIManager.createWindow(Client.Information.CodeAreaInformation).call(shuffUIManager, $t35);
		this.codeArea.get_data().breakPoints = new Array();
		var $t38 = this.codeArea.get_data();
		var $t37 = this.codeArea;
		var $t36 = new Client.ShuffUI.ShuffCodeEditor();
		$t36.set_height(Client.ShuffUI.Number.op_Implicit$3('20%'));
		$t36.set_lineNumbers(false);
		$t38.console = $t37.addCodeEditor($t36);
		var $t41 = this.codeArea.get_data();
		var $t40 = this.codeArea;
		var $t39 = new Client.ShuffUI.ShuffCodeEditor();
		$t39.set_height(Client.ShuffUI.Number.op_Implicit$3('80%'));
		$t39.set_lineNumbers(true);
		$t41.codeEditor = $t40.addCodeEditor($t39);
		var $t42 = new (Type.makeGenericType(Client.ShuffUI.ShuffWindow$1, [Client.Information.QuestionAreaInformation]))(new Client.Information.QuestionAreaInformation());
		$t42.title = 'Question';
		$t42.set_x(600);
		$t42.set_y(100);
		$t42.set_width(Client.ShuffUI.Number.op_Implicit$2(300));
		$t42.set_height(Client.ShuffUI.Number.op_Implicit$2(275));
		$t42.allowClose = true;
		$t42.allowMinimize = true;
		$t42.set_visible(false);
		this.questionArea = shuffUIManager.createWindow(Client.Information.QuestionAreaInformation).call(shuffUIManager, $t42);
		var $t45 = this.questionArea.get_data();
		var $t44 = this.questionArea;
		var $t43 = new Client.ShuffUI.ShuffLabel();
		$t43.set_x(20);
		$t43.set_y(5);
		$t43.set_width(Client.ShuffUI.Number.op_Implicit$2(150));
		$t43.set_height(Client.ShuffUI.Number.op_Implicit$2(25));
		$t43.set_text('');
		$t45.question = $t44.addLabel($t43);
		this.questionArea.get_data().load = Function.mkdel(this, function(question) {
			this.questionArea.set_visible(true);
			this.questionArea.get_data().question.text(question.question);
			this.questionArea.get_data().answerBox.remove();
			var answers = new Array();
			for (var i2 = 0; i2 < question.answers.length; i2++) {
				answers.add(new Client.ShuffUI.ShuffListItem(question.answers[i2], i2));
			}
			var $t48 = this.questionArea.get_data();
			var $t47 = this.questionArea;
			var $t46 = new Client.ShuffUI.ShuffListBox();
			$t46.set_x(30);
			$t46.set_y(65);
			$t46.set_width(Client.ShuffUI.Number.op_Implicit$2(215));
			$t46.set_height(Client.ShuffUI.Number.op_Implicit$2(125));
			$t46.set_label('Answers');
			$t46.set_items(answers);
			$t46.set_click(Function.mkdel(this, function(item1) {
				pageHandler.gateway.emit('Area.Game.AnswerQuestion', Models.GameAnswerQuestionModel.$ctor1(pageHandler.gameStuff.roomID, item1.get_value()), this.devArea.get_data().gameServer);
				this.questionArea.set_visible(false);
			}));
			$t48.answerBox = $t47.addListBox($t46);
		});
		var $t51 = this.questionArea.get_data();
		var $t50 = this.questionArea;
		var $t49 = new Client.ShuffUI.ShuffListBox();
		$t49.set_x(30);
		$t49.set_y(65);
		$t49.set_width(Client.ShuffUI.Number.op_Implicit$2(215));
		$t49.set_height(Client.ShuffUI.Number.op_Implicit$2(125));
		$t49.set_label('Answers');
		$t49.set_click(Function.mkdel(this, function(item2) {
			pageHandler.gateway.emit('Area.Game.AnswerQuestion', Models.GameAnswerQuestionModel.$ctor1(pageHandler.gameStuff.roomID, item2.get_value()), this.devArea.get_data().gameServer);
			this.questionArea.set_visible(false);
		}));
		$t51.answerBox = $t50.addListBox($t49);
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
	this.$1$GatewaySocketField = null;
	this.$channels = new Object();
	var someChannels = this.$channels;
	this.set_gatewaySocket(io.connect(gatewayServer));
	this.get_gatewaySocket().on('Client.Message', function(data) {
		someChannels[data.channel](data.content);
	});
};
Client.Gateway.prototype = {
	get_gatewaySocket: function() {
		return this.$1$GatewaySocketField;
	},
	set_gatewaySocket: function(value) {
		this.$1$GatewaySocketField = value;
	},
	emit: function(channel, content, gameServer) {
		this.get_gatewaySocket().emit('Gateway.Message', Models.GatewayMessageModel.$ctor(channel, content, gameServer));
	},
	on: function(channel, callback) {
		this.$channels[channel] = callback;
	},
	login: function(userName) {
		var $t2 = this.get_gatewaySocket();
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
	this.$1$ContextField = null;
	this.$1$CanvasInfoField = null;
	this.set_context(context);
	this.set_canvasInfo(canvasInfo);
};
Client.PageGameContext.prototype = {
	get_context: function() {
		return this.$1$ContextField;
	},
	set_context: function(value) {
		this.$1$ContextField = value;
	},
	get_canvasInfo: function() {
		return this.$1$CanvasInfoField;
	},
	set_canvasInfo: function(value) {
		this.$1$CanvasInfoField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.PageHandler
Client.PageHandler = function(gatewayServerAddress, buildSite) {
	this.$buildSite = null;
	this.gateway = null;
	this.$lastMainArea = null;
	this.$gameContext = null;
	this.$startTime = null;
	this.$numOfTimes = 0;
	this.$timeValue = 0;
	this.$cardImages = null;
	this.$gameCanvas = null;
	this.gameStuff = null;
	this.$endTime = null;
	this.$buildSite = buildSite;
	this.gameStuff = new Client.GameInfo();
	this.$startTime = Date.get_now();
	window.setTimeout(function() {
		buildSite.devArea.get_data().beginGame();
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
		buildSite.devArea.get_data().lblHowFast.text('How Many: ' + ss.Int32.div(this.$timeValue, this.$numOfTimes));
		buildSite.codeArea.get_data().codeEditor.editor.setValue(data3.content);
		buildSite.codeArea.get_data().codeEditor.editor.setMarker(0, '<span style="color: #900">&nbsp;&nbsp;</span> %N%');
		buildSite.codeArea.get_data().codeEditor.editor.refresh();
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
	this.$gameContext.get_canvasInfo().canvas = this.$gameCanvas;
	this.$gameContext.get_canvasInfo().domCanvas = ($(this.$gameCanvas));
	this.$gameContext.get_canvasInfo().canvas.width = ss.Int32.trunc(($(window)).width() * 0.5);
	this.$gameContext.get_canvasInfo().canvas.height = ($(window)).height();
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
			this.$buildSite.home.get_data().loadRoomInfo(data);
			this.$buildSite.devArea.get_data().loadRoomInfo(data);
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
			this.$buildSite.home.get_data().loadRoomInfos(data1);
			var lines = this.$buildSite.codeArea.get_data().console.editor.getValue().split('\n');
			lines = Type.cast(lines.extract(lines.length - 40, 40), Array);
			this.$buildSite.codeArea.get_data().console.editor.setValue(lines.join('\n') + '\n' + data1.value);
			this.$buildSite.codeArea.get_data().console.editor.setCursor(this.$buildSite.codeArea.get_data().console.editor.lineCount(), 0);
		}));
		this.gateway.on('Area.Debug.Break', Function.mkdel(this, function(data2) {
			this.$buildSite.home.get_data().loadRoomInfos(data2);
			var cm = this.$buildSite.codeArea.get_data().codeEditor;
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
			this.$buildSite.questionArea.get_data().load(data3);
			//alert(JSON.stringify(data));
			this.$endTime = new Date();
			var time = this.$endTime - this.$startTime;
			this.$buildSite.devArea.get_data().lblHowFast.text('how long: ' + time);
			window.setTimeout(Function.mkdel(this, function() {
				this.gateway.emit('Area.Game.AnswerQuestion', Models.GameAnswerQuestionModel.$ctor1(this.gameStuff.roomID, 1), this.$buildSite.devArea.get_data().gameServer);
				this.$buildSite.questionArea.set_visible(false);
				this.$startTime = new Date();
			}), 200);
		}));
		this.gateway.on('Area.Game.UpdateState', Function.mkdel(this, function(data4) {
			this.$gameContext.get_context().clearRect(0, 0, this.$gameContext.get_canvasInfo().canvas.width, this.$gameContext.get_canvasInfo().canvas.height);
			this.drawArea(data4);
		}));
		this.gateway.on('Area.Game.Started', function(data5) {
			//alert(JSON.stringify(data));
		});
		this.gateway.on('Area.Game.GameOver', function(data6) {
		});
		this.gateway.on('Area.Debug.GameOver', Function.mkdel(this, function(data7) {
			window.setTimeout(Function.mkdel(this, function() {
				this.$buildSite.devArea.get_data().beginGame();
			}), 1000);
		}));
	},
	drawArea: function(mainArea) {
		var gameboard = this.$gameContext;
		this.$lastMainArea = mainArea;
		var scale = new CommonLibraries.Point(ss.Int32.div(this.$gameContext.get_canvasInfo().canvas.width, mainArea.size.width), ss.Int32.div(this.$gameContext.get_canvasInfo().canvas.height, mainArea.size.height));
		gameboard.get_context().fillStyle = 'rgba(0,0,200,0.5)';
		var $t1 = mainArea.spaces.getEnumerator();
		try {
			while ($t1.moveNext()) {
				var space = $t1.get_current();
				var vertical = space.vertical;
				gameboard.get_context().fillRect(space.x * scale.x, space.y * scale.y, space.width * scale.x, space.height * scale.y);
				var spaceScale = new CommonLibraries.Point(space.width / space.pile.cards.length, space.height / space.pile.cards.length);
				var j = 0;
				var $t2 = space.pile.cards.getEnumerator();
				try {
					while ($t2.moveNext()) {
						var card = $t2.get_current();
						var xx = Math.floor(space.x * scale.x + (!vertical ? (j * spaceScale.x * scale.x) : 0));
						var yy = Math.floor(space.y * scale.y + (vertical ? (j * spaceScale.y * scale.y) : 0));
						var cardImage = this.$cardImages[this.drawCard(card)];
						gameboard.get_context().save();
						gameboard.get_context().translate(xx + (vertical ? (space.width * scale.x / 2) : 0), yy + (!vertical ? (space.height * scale.y / 2) : 0));
						gameboard.get_context().rotate(space.rotate * Math.PI / 180);
						gameboard.get_context().translate(ss.Int32.div(-cardImage.width, 2), ss.Int32.div(-cardImage.height, 2));
						var $t3 = card.effects.getEnumerator();
						try {
							while ($t3.moveNext()) {
								var effect = $t3.get_current();
								if (effect.type === 'highlight') {
									var hEffect = effect;
									gameboard.get_context().save();
									gameboard.get_context().translate(hEffect.offsetX, hEffect.offsetY);
									gameboard.get_context().rotate(hEffect.rotate * Math.PI / 180);
									gameboard.get_context().translate(-hEffect.radius, -hEffect.radius);
									gameboard.get_context().fillStyle = hEffect.color;
									gameboard.get_context().strokeStyle = 'black';
									gameboard.get_context().fillRect(0, 0, cardImage.width + hEffect.radius * 2, cardImage.height + hEffect.radius * 2);
									gameboard.get_context().strokeRect(0, 0, cardImage.width + hEffect.radius * 2, cardImage.height + hEffect.radius * 2);
									gameboard.get_context().restore();
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
							if (Type.isInstanceOfType($t3, ss.IDisposable)) {
								Type.cast($t3, ss.IDisposable).dispose();
							}
						}
						//todo gayness
						gameboard.get_context().drawImage((cardImage), 0, 0);
						gameboard.get_context().restore();
						j++;
					}
				}
				finally {
					if (Type.isInstanceOfType($t2, ss.IDisposable)) {
						Type.cast($t2, ss.IDisposable).dispose();
					}
				}
			}
		}
		finally {
			if (Type.isInstanceOfType($t1, ss.IDisposable)) {
				Type.cast($t1, ss.IDisposable).dispose();
			}
		}
		var $t4 = mainArea.textAreas.getEnumerator();
		try {
			while ($t4.moveNext()) {
				var ta = $t4.get_current();
				gameboard.get_context().fillStyle = 'rgba(200, 0, 200, 0.5)';
				gameboard.get_context().fillText(ta.text, ta.x * scale.x, ta.nayme * scale.y);
			}
		}
		finally {
			if (Type.isInstanceOfType($t4, ss.IDisposable)) {
				Type.cast($t4, ss.IDisposable).dispose();
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
		if (!ss.referenceEquals(this.$gameContext.get_canvasInfo().domCanvas.attr('width'), ($(window)).width().toString())) {
			this.$gameContext.get_canvasInfo().domCanvas.attr('width', (($(window)).width() * 0.5).toString());
		}
		if (!ss.referenceEquals(this.$gameContext.get_canvasInfo().domCanvas.attr('height'), ($(window)).height().toString())) {
			this.$gameContext.get_canvasInfo().domCanvas.attr('height', ($(window)).height().toString());
		}
		if (ss.isValue(this.$lastMainArea)) {
			this.drawArea(this.$lastMainArea);
		}
	},
	draw: function() {
		this.$gameContext.get_canvasInfo().canvas.width = this.$gameContext.get_canvasInfo().canvas.width;
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
	this.$2$TextField = null;
	this.$2$ClickField = null;
	Client.ShuffUI.ShuffElement.call(this);
};
Client.ShuffUI.ShuffButton.prototype = {
	get_text: function() {
		return this.$2$TextField;
	},
	set_text: function(value) {
		this.$2$TextField = value;
	},
	get_click: function() {
		return this.$2$ClickField;
	},
	set_click: function(value) {
		this.$2$ClickField = value;
	}
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
	this.$2$LineNumbersField = false;
	Client.ShuffUI.ShuffElement.call(this);
	this.set_width(Client.ShuffUI.Number.op_Implicit$3('100%'));
	this.set_height(Client.ShuffUI.Number.op_Implicit$3('100%'));
};
Client.ShuffUI.ShuffCodeEditor.prototype = {
	get_lineNumbers: function() {
		return this.$2$LineNumbersField;
	},
	set_lineNumbers: function(value) {
		this.$2$LineNumbersField = value;
	}
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
	this.$1$XField = 0;
	this.$1$YField = 0;
	this.$1$WidthField = null;
	this.$1$HeightField = null;
	this.$1$ElementField = null;
	this.$visible = false;
	this.$visible = true;
};
Client.ShuffUI.ShuffElement.prototype = {
	get_x: function() {
		return this.$1$XField;
	},
	set_x: function(value) {
		this.$1$XField = value;
	},
	get_y: function() {
		return this.$1$YField;
	},
	set_y: function(value) {
		this.$1$YField = value;
	},
	get_width: function() {
		return this.$1$WidthField;
	},
	set_width: function(value) {
		this.$1$WidthField = value;
	},
	get_height: function() {
		return this.$1$HeightField;
	},
	set_height: function(value) {
		this.$1$HeightField = value;
	},
	get_element: function() {
		return this.$1$ElementField;
	},
	set_element: function(value) {
		this.$1$ElementField = value;
	},
	get_visible: function() {
		return this.$visible;
	},
	set_visible: function(value) {
		if (ss.isValue(this.get_element())) {
			this.get_element().css('display', (this.$visible ? 'block' : 'none'));
		}
		this.$visible = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffLabel
Client.ShuffUI.ShuffLabel = function() {
	this.$2$TextField = null;
	Client.ShuffUI.ShuffElement.call(this);
};
Client.ShuffUI.ShuffLabel.prototype = {
	get_text: function() {
		return this.$2$TextField;
	},
	set_text: function(value) {
		this.$2$TextField = value;
	}
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
	this.$2$LabelField = null;
	this.$2$ClickField = null;
	this.$2$ItemsField = null;
	Client.ShuffUI.ShuffElement.call(this);
};
Client.ShuffUI.ShuffListBox.prototype = {
	get_label: function() {
		return this.$2$LabelField;
	},
	set_label: function(value) {
		this.$2$LabelField = value;
	},
	get_click: function() {
		return this.$2$ClickField;
	},
	set_click: function(value) {
		this.$2$ClickField = value;
	},
	get_items: function() {
		return this.$2$ItemsField;
	},
	set_items: function(value) {
		this.$2$ItemsField = value;
	}
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
	this.$1$LabelField = null;
	this.$1$ValueField = 0;
	this.set_label(label);
	this.set_value(value);
};
Client.ShuffUI.ShuffListItem.prototype = {
	get_label: function() {
		return this.$1$LabelField;
	},
	set_label: function(value) {
		this.$1$LabelField = value;
	},
	get_value: function() {
		return this.$1$ValueField;
	},
	set_value: function(value) {
		this.$1$ValueField = value;
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffPropertyBox
Client.ShuffUI.ShuffPropertyBox = function() {
	this.addItem = null;
	this.items = null;
	this.$2$ItemCreationField = null;
	Client.ShuffUI.ShuffElement.call(this);
};
Client.ShuffUI.ShuffPropertyBox.prototype = {
	get_itemCreation: function() {
		return this.$2$ItemCreationField;
	},
	set_itemCreation: function(value) {
		this.$2$ItemCreationField = value;
	}
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
	this.$2$LabelStyleField = null;
	this.$2$LabelField = null;
	this.$2$TextField = null;
	Client.ShuffUI.ShuffElement.call(this);
};
Client.ShuffUI.ShuffTextBox.prototype = {
	get_labelStyle: function() {
		return this.$2$LabelStyleField;
	},
	set_labelStyle: function(value) {
		this.$2$LabelStyleField = value;
	},
	get_label: function() {
		return this.$2$LabelField;
	},
	set_label: function(value) {
		this.$2$LabelField = value;
	},
	get_text: function() {
		return this.$2$TextField;
	},
	set_text: function(value) {
		this.$2$TextField = value;
	}
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
			outer.css('left', ui.get_x() + 'px');
			outer.css('top', ui.get_y() + 'px');
			outer.css('width', Client.ShuffUI.Number.op_Implicit$1(ui.get_width()) + 'px');
			outer.css('height', Client.ShuffUI.Number.op_Implicit$1(ui.get_height()) + 'px');
			outer.css('di', Client.ShuffUI.Number.op_Implicit$1(ui.get_height()) + 'px');
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
			this.$uiAreas.add(new Client.ShuffUI.UIAreaInformation(outer, inner));
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
				for (var i = 0; i < this.$uiAreas.length; i++) {
					(this.$uiAreas[i]).get_element().css('z-index', 1800);
				}
				outer.css('z-index', 1900);
			}));
			($('.window-header-button')).button();
			if (!ui.static) {
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
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffWindow$1
Client.ShuffUI.ShuffWindow$1 = function(T) {
	var $type = function(data) {
		this.$2$DataField = T.getDefaultValue();
		this.elements = null;
		this.title = null;
		this.allowClose = false;
		this.allowMinimize = false;
		this.outer = null;
		this.static = false;
		Client.ShuffUI.ShuffElement.call(this);
		this.set_data(data);
		this.elements = new Array();
	};
	$type.prototype = {
		get_data: function() {
			return this.$2$DataField;
		},
		set_data: function(value) {
			this.$2$DataField = value;
		},
		get_$window: function() {
			return this.get_element();
		},
		set_$window: function(value) {
			this.set_element(value);
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
			element.set_element(but);
			this.get_$window().append(but);
			but.text(element.get_text());
			but.css('position', 'absolute');
			but.css('left', element.get_x() + 'px');
			but.css('top', element.get_y() + 'px');
			but.css('width', Client.ShuffUI.Number.op_Implicit$1(element.get_width()) + 'px');
			but.css('height', Client.ShuffUI.Number.op_Implicit$1(element.get_height()) + 'px');
			but.button();
			but.click(element.get_click());
			but.disableSelection();
			but.css('display', ((element.get_visible() === false) ? 'none' : 'block'));
			return but;
		},
		addLabel: function(element) {
			this.elements.add(element);
			var but = $('<span></span>');
			element.set_element(but);
			this.get_$window().append(but);
			but.text(element.get_text());
			but.css('position', 'absolute');
			but.css('left', element.get_x() + 'px');
			but.css('top', element.get_y() + 'px');
			but.disableSelection();
			but.css('display', ((element.get_visible() === false) ? 'none' : 'block'));
			return but;
		},
		addTextbox: function(element) {
			this.elements.add(element);
			var but = $('<input value=\'' + Object.coalesce(element.get_text(), '') + '\' />');
			element.set_element(but);
			this.get_$window().append(but);
			but.text(element.get_text());
			but.css('position', 'absolute');
			but.css('left', element.get_x() + 'px');
			but.css('top', element.get_y() + 'px');
			but.css('width', Client.ShuffUI.Number.op_Implicit$1(element.get_width()) + 'px');
			but.css('height', Client.ShuffUI.Number.op_Implicit$1(element.get_height()) + 'px');
			but.disableSelection();
			if (ss.isValue(element.get_label())) {
				var lbl = $('<span style=\'' + element.get_labelStyle() + '\'></span>');
				lbl.text(element.get_label());
				this.get_$window().append(lbl);
				lbl.css('position', 'absolute');
				lbl.css('left', element.get_x() - lbl.width());
				lbl.css('top', element.get_y() + 2);
				lbl.disableSelection();
			}
			but.css('display', ((element.get_visible() === false) ? 'none' : 'block'));
			return but;
		},
		addCodeEditor: function(_editor) {
			//options = objMerge({ width: '100%', height: '100%' }, options);
			this.elements.add(_editor);
			var divs = $('<div style=\'width:' + Client.ShuffUI.Number.op_Implicit$1(_editor.get_width()) + '; height:' + Client.ShuffUI.Number.op_Implicit$1(_editor.get_height()) + '\'\'> </div>');
			this.get_$window().append(divs);
			divs.append('<textarea id=\'code\' name=\'code\' class=\'CodeMirror-fullscreen \' style=\'\'></textarea>');
			var $t1 = new Client.ShuffUI.CodeMirrorInformation();
			$t1.element = document.getElementById('code');
			var codeMirror = $t1;
			codeMirror.element.value = '';
			var hlLine = null;
			codeMirror.editor = CodeMirror.fromTextArea(codeMirror.element, {
				lineNumbers: _editor.get_lineNumbers(),
				lineWrapping: true,
				matchBrackets: true,
				onGutterClick: function(cm, n, e) {
					var info = cm.lineInfo(n);
					if (info.markerText) {
						Client.BuildSite.instance.codeArea.get_data().breakPoints.extract(Client.BuildSite.instance.codeArea.get_data().breakPoints.indexOf(n - 1), 0);
						cm.clearMarker(n);
					}
					else {
						Client.BuildSite.instance.codeArea.get_data().breakPoints.add(n - 1);
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
			element.set_element(but);
			this.get_$window().append(but);
			but.css('position', 'absolute');
			but.css('left', element.get_x() + 'px');
			but.css('top', element.get_y() + 'px');
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
			but.css('left', shuffPropertyBox.get_x());
			but.css('top', shuffPropertyBox.get_y());
			but.css('width', Client.ShuffUI.Number.op_Implicit$1(shuffPropertyBox.get_width()));
			but.css('height', Client.ShuffUI.Number.op_Implicit$1(shuffPropertyBox.get_height()));
			but.css('overflow', 'scroll');
			shuffPropertyBox.items = new Array();
			shuffPropertyBox.addItem = function(ij) {
				but.append(shuffPropertyBox.get_itemCreation()(ij, shuffPropertyBox.items.length));
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

